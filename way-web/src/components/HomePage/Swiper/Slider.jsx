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
    range: {
      min: 0,
      max: 5
    },

    duration: 3500, 
    easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth easing
  });


  useImperativeHandle(ref, () => ({
    slideToEnd: () => {
     
      instanceRef.current?.moveToIdx(5, true); // true = animated
    },
    slideToStart: () => {
  
      instanceRef.current?.moveToIdx(0, true); // true = animated
    }
  }));

  return (
    <div ref={sliderRef} className="keen-slider rounded-[50px]">
      <div className="keen-slider__slide" id="Card1"><Card1 /></div>
      <div className="keen-slider__slide" id="Card2"><Card2 /></div>
      <div className="keen-slider__slide" id="Card3"><Card3 /></div>
      <div className="keen-slider__slide" id="Card4"><Card4 /></div>
      <div className="keen-slider__slide" id="Card5"><Card5 /></div>
      <div className="keen-slider__slide" id="Card6"><Card6 /></div>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;