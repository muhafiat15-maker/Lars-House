import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const WaveBottom = ({ colorClass }) => (
  <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 ${colorClass}`}>
    <svg className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current"></path>
    </svg>
  </div>
);

const faqs = [
  {
    question: "Apakah sayuran laut Lars House siap makan?",
    answer: "Produk camilan kami seperti Rumput Laut Panggang siap dimakan langsung sebagai snack. Sedangkan untuk produk rumput laut kering alami, Anda perlu merendamnya sebentar dalam air hangat sebelum digunakan untuk sup atau salad."
  },
  {
    question: "Berapa lama masa simpan produk ini?",
    answer: "Jika disimpan di tempat yang sejuk dan kering, produk kami dapat bertahan hingga 12 bulan. Untuk menjaga kerenyahan setelah kemasan dibuka, pastikan untuk menutup rapat zip-lock atau simpan di wadah kedap udara."
  },
  {
    question: "Apakah produk ini aman untuk anak-anak?",
    answer: "Sangat aman! Sayuran laut adalah sumber yodium dan mineral alami yang sangat baik untuk pertumbuhan. Kami sangat menyarankan produk panggang original kami sebagai camilan sehat pengganti keripik untuk anak-anak."
  },
  {
    question: "Apakah ada tambahan pengawet?",
    answer: "Tidak ada. Kami menggunakan metode pengeringan dan pemanggangan alami untuk mengawetkan sayuran laut kami. Rasa gurih didapat dari garam laut asli dan bumbu alami pilihan tanpa bahan kimia tambahan."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="pt-20 pb-32 bg-lars-sand relative bg-pattern-dots">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-fluid-h2 font-serif text-lars-navy mb-4">Pertanyaan Seputar Produk</h2>
          <div className="w-16 h-1 bg-lars-gold mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-light">Segala hal yang perlu Anda ketahui tentang produk sayuran laut premium kami.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow relative z-20"
            >
              <button
                className="w-full text-left px-8 py-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-serif text-xl text-lars-navy">{faq.question}</span>
                <ChevronDown 
                  className={`text-lars-gold transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={24} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-gray-600 font-light leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <WaveBottom colorClass="text-lars-navy" />
    </section>
  );
}
