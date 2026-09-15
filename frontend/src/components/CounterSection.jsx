import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Counter = ({ from = 0, to, duration = 2 }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;

      const animate = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / (duration * 1000), 1);
        
        // easeOutExpo for smooth deceleration
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(easeProgress * (to - from) + from));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, to, from, duration]);

  return <span ref={ref}>{count}</span>;
};

export default function CounterSection() {
  const stats = [
    { id: 1, label: 'Pelanggan Puas', value: 500, suffix: '+' },
    { id: 2, label: 'Produk Tersedia', value: 12, suffix: '' },
    { id: 3, label: 'Tahun Pengalaman', value: 9, suffix: '+' },
    { id: 4, label: 'Mitra Petani', value: 50, suffix: '+' },
  ];

  return (
    <section className="py-16 bg-lars-navy relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-lars-gold mb-2 flex items-baseline justify-center">
                <Counter from={0} to={stat.value} duration={2.5} />
                <span className="text-3xl md:text-4xl ml-1">{stat.suffix}</span>
              </div>
              <p className="text-white/80 font-medium uppercase tracking-wider text-xs md:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
