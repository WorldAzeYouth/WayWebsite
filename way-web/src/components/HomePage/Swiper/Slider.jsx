'use client';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { forwardRef, useImperativeHandle } from "react";

import Card1 from "../SliderComponents/Card1";
import Card2 from "../SliderComponents/QerbiAzerbaycanCard";
import Card3 from "../SliderComponents/YasilHedefCard";
import Card4 from "../SliderComponents/PhytonTrainingCard";
import Card5 from "../SliderComponents/AI4CultureCard";
import Card6 from "../SliderComponents/PesekarlardanOyren";

const Slider = forwardRef((props, ref) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'free',
    slides: {
      perView: "auto",
      spacing: 16,
    },
    rubberband: true,
    duration: 3500, 
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

 // Slider.jsx
useImperativeHandle(ref, () => ({
  slideToEnd: () => {
    const s = instanceRef.current;
    if (!s) return;

    // wait until the slider has finished measuring
    requestAnimationFrame(() => {
      const { slides, maxIdx } = s.track.details;
      const lastAllowedIdx = maxIdx;          // farthest the slider can go
      s.moveToIdx(lastAllowedIdx, true, { duration: 800 }); // animated
    });
  },

  slideToStart: () => {
    instanceRef.current?.moveToIdx(0, true, { duration: 800 });
  }
}));

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider rounded-[50px]">
        <div className="keen-slider__slide" id="Card1"><Card1 /></div>
        <div className="keen-slider__slide" id="Card2"><Card2 /></div>
        <div className="keen-slider__slide" id="Card3"><Card3 /></div>
        <div className="keen-slider__slide" id="Card4"><Card4 /></div>
        <div className="keen-slider__slide" id="Card5"><Card5 /></div>
        <div className="keen-slider__slide" id="Card6"><Card6 /></div>
        {/* Empty spacer slide to ensure last card is fully scrollable */}
        <div className="keen-slider__slide !min-w-[1px] !w-[1px]"></div>
      </div>
      
      
      <style jsx>{`
        
      
        /* Ensure the container has right padding */
        .keen-slider::after {
          content: '';
          display: block;
        
        }
      `}</style>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;