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
      item_details: item_details
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

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
