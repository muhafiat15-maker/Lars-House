const express = require('express');
const cors = require('cors');
const midtransClient = require('midtrans-client');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Midtrans CoreApi / Snap
// We use Snap for frontend popup
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// Endpoint to generate Snap Token
app.post('/api/checkout', async (req, res) => {
  try {
    const { order_id, gross_amount, customer_details, item_details } = req.body;

    const parameter = {
      transaction_details: {
        order_id: order_id || `LARS-${Date.now()}`,
        gross_amount: gross_amount
      },
      customer_details: customer_details,
      item_details: item_details,
      custom_field1: customer_details?.phone || ''
    };

    const transaction = await snap.createTransaction(parameter);
    res.json({ snapToken: transaction.token, redirectUrl: transaction.redirect_url });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for Midtrans Webhook Notification
app.post('/api/webhook/midtrans', async (req, res) => {
  try {
    const notificationJson = req.body;
    const statusResponse = await snap.transaction.notification(notificationJson);

    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;
    let fraudStatus = statusResponse.fraud_status;

    console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

    // If payment is settled/successful, send WA notification
    if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
      await sendWhatsAppNotification(orderId, statusResponse.gross_amount);
      
      // Send notification to customer if custom_field1 (phone) is available
      const customerPhone = notificationJson.custom_field1;
      if (customerPhone) {
        await sendCustomerConfirmation(customerPhone, orderId, statusResponse.gross_amount);
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).send('Webhook Error');
  }
});

// Function to send WhatsApp message via Fonnte
async function sendWhatsAppNotification(orderId, amount) {
  try {
    const fonnteToken = process.env.FONNTE_TOKEN;
    const targetNumber = process.env.SELLER_WA_NUMBER; 
    
    const message = `*Notifikasi Pesanan Baru Lars House*\n\nOrder ID: ${orderId}\nTotal: Rp ${amount}\nStatus: LUNAS (Settlement)\n\nSegera proses pesanan ini. Terima kasih!`;

    const response = await axios.post(
      'https://api.fonnte.com/send',
      {
        target: targetNumber,
        message: message
      },
      {
        headers: {
          'Authorization': fonnteToken
        }
      }
    );
    console.log('Fonnte notification sent:', response.data);
  } catch (error) {
    console.error('Failed to send Fonnte notification:', error.message);
  }
}

// Function to send WhatsApp message to CUSTOMER via Fonnte
async function sendCustomerConfirmation(customerPhone, orderId, amount) {
  try {
    const fonnteToken = process.env.FONNTE_TOKEN;
    
    // Ensure phone number format is correct (e.g., replace leading 0 with 62 if needed, though Fonnte usually handles standard formats)
    let target = customerPhone.trim();
    
    const message = `*Terima Kasih dari Lars House!*\n\nPembayaran pesanan Anda telah kami terima.\n\nNomor Order: ${orderId}\nTotal Pembayaran: Rp ${amount}\nStatus: LUNAS\n\nPesanan Anda akan segera kami proses. Anda dapat mengecek status pesanan kapan saja melalui menu Cek Pesanan di website kami.\n\nJika ada pertanyaan, silakan balas pesan ini.`;

    const response = await axios.post(
      'https://api.fonnte.com/send',
      {
        target: target,
        message: message
      },
      {
        headers: {
          'Authorization': fonnteToken
        }
      }
    );
    console.log('Customer Fonnte notification sent:', response.data);
  } catch (error) {
    console.error('Failed to send customer Fonnte notification:', error.message);
  }
}

// Endpoint to check order status
app.get('/api/order-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const statusResponse = await snap.transaction.status(orderId);
    
    res.json({
      order_id: statusResponse.order_id,
      transaction_status: statusResponse.transaction_status,
      gross_amount: statusResponse.gross_amount,
      payment_type: statusResponse.payment_type,
      transaction_time: statusResponse.transaction_time,
      fraud_status: statusResponse.fraud_status
    });
  } catch (error) {
    console.error('Error fetching order status:', error.message);
    // Midtrans returns 404 if order is not found
    if (error.message.includes('404')) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }
    res.status(500).json({ error: 'Terjadi kesalahan saat mengecek status' });
  }
});

// Endpoint to validate voucher
const validVouchers = {
  "LARS10": 10,
  "WELCOME15": 15
};

app.post('/api/validate-voucher', (req, res) => {
  const { code } = req.body;
  const upperCode = code ? code.toUpperCase() : '';
  
  if (validVouchers[upperCode]) {
    res.json({ valid: true, discountPercent: validVouchers[upperCode] });
  } else {
    res.status(404).json({ valid: false, error: 'Kode voucher tidak valid' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
