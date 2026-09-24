import os

base_dir = r'C:\Users\HP SPECTRE\Documents\Lars House\frontend\src\components'

files = {
    'SmoothScroll.jsx': '''import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
''',

    'CustomCursor.jsx': '''import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      gsap.set(cursor, { x: cursorX - 7.5, y: cursorY - 7.5 });
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    const onMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setText(target.getAttribute("data-cursor"));
        gsap.to(cursor, { scale: 4, duration: 0.3, ease: "power2.out" });
        isHovering = true;
      }
    };

    const onMouseOut = (e) => {
      if (isHovering) {
        setText("");
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
        isHovering = false;
      }
    };

    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      {text && <span style={{ transform: "scale(0.25)" }}>{text}</span>}
    </div>
  );
};

export default CustomCursor;
'''
}

for filename, content in files.items():
    with open(os.path.join(base_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)

print("Files created.")
