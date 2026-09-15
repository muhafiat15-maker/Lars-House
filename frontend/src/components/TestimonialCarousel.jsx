import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Diana Puspita",
    image: "https://i.pravatar.cc/150?img=5",
    product: "Rumput Laut Panggang Pedas",
    review: "Kualitasnya jauh di atas rata-rata snack rumput laut yang ada di pasaran. Rasa pedasnya pas dan teksturnya sangat renyah. Sangat direkomendasikan!"
  },
  {
    id: 2,
    name: "Budi Santoso",
    image: "https://i.pravatar.cc/150?img=11",
    product: "Rumput Laut Kering Alami",
    review: "Sangat segar saat direbus kembali. Saya menggunakannya untuk sup dan tumisan. Rasanya murni laut, tidak amis sama sekali. Kualitas ekspor."
  },
  {
    id: 3,
    name: "Sarah Wijaya",
    image: "https://i.pravatar.cc/150?img=9",
    product: "Rumput Laut Panggang Garam Laut Asli",
    review: "Snack favorit anak-anak! Sehat dan kemasannya premium. Sangat terlihat kalau proses pembuatannya dijaga dengan standar tinggi."
  },
  {
    id: 4,
    name: "Arif Rachman",
    image: "https://i.pravatar.cc/150?img=68",
    product: "Nori Lembaran",
    review: "Cocok sekali untuk membuat sushi di rumah. Lembarannya tebal, tidak mudah sobek, dan aroma lautnya sangat khas."
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0
      };
    }
  };

  return (
    <div 
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden px-4 py-8 relative min-h-[400px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div 
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              if (swipe < -50) {
                next();
              } else if (swipe > 50) {
                prev();
              }
            }}
            className="absolute w-full px-4 md:px-12"
          >
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-center text-center">
              <Quote className="text-lars-gold/20 absolute top-8 left-8 w-12 h-12" />
              
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-6 relative z-10 bg-lars-sand">
                <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex text-lars-gold mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              
              <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed font-light italic relative z-10">"{testimonials[currentIndex].review}"</p>
              
              <div className="mt-auto">
                <div className="font-semibold text-lars-navy text-lg">{testimonials[currentIndex].name}</div>
                <div className="text-sm text-lars-teal mt-1 font-medium">{testimonials[currentIndex].product}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-6 bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-lars-navy hover:text-lars-gold hover:scale-110 transition-all focus:outline-none z-20 border border-gray-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-6 bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-lars-navy hover:text-lars-gold hover:scale-110 transition-all focus:outline-none z-20 border border-gray-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-lars-gold w-8' : 'bg-gray-300 w-2'}`}
          />
        ))}
      </div>
    </div>
  );
}
