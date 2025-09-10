import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import peoples from "../../../../public/svg/fluent_people-team-16-filled.svg";
import goal from "../../../../public/svg/Group.svg";
import shield from "../../../../public/svg/carbon_manage-protection.svg";
import global from "../../../../public/svg/solar_global-linear.svg";
import cup from "../../../../public/svg/material-symbols_emoji-events.svg";
import verified from "../../../../public/svg/icon-park-solid_success.svg";
import { useTranslations } from 'next-intl';

const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const useIntersectionObserver = (isMobile) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: isMobile ? 0.05 : 0.1,
        rootMargin: isMobile ? '20px 0px -20px 0px' : '50px 0px -50px 0px'
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [isMobile]);

  return [ref, isVisible];
};

const AnimatedSection = ({ 
  children, 
  animationType, 
  className = "", 
  delay = 0,
  isMobile = false 
}) => {
  const [ref, isVisible] = useIntersectionObserver(isMobile);

  const getAnimationClasses = () => {
    const baseTransition = "transition-all duration-500 ease-out";
    const delayClass = delay > 0 ? `delay-${delay}` : '';
    
    
    if (isMobile) {
      if (animationType === 'slideInRight') {
        return `${baseTransition} ${delayClass} ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-80'
        }`;
      }
   
      return `${baseTransition} ${delayClass} ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-80'
      }`;
    }

    switch (animationType) {
      case 'slideInLeft':
        return `${baseTransition} ${delayClass} ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
        }`;
      case 'slideInRight':
        return `${baseTransition} ${delayClass} ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
        }`;
      case 'slideInUp':
        return `${baseTransition} ${delayClass} ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`;
      case 'slideInDown':
        return `${baseTransition} ${delayClass} ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
        }`;
      default:
        return `${baseTransition} ${delayClass} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`;
    }
  };

  return (
    <div ref={ref} className={`${className} ${getAnimationClasses()}`}>
      {children}
    </div>
  );
};

const AzerbaijanYouthSection = () => {
  const tAboutUS = useTranslations("AboutUS");
  const tGoals = useTranslations("Goals");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${PoppinsFont.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 font-sans">
       
        <AnimatedSection 
          animationType={isMobile ? 'slideInLeft' : 'slideInDown'} 
          isMobile={isMobile} 
          className="mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#15529F]">{tAboutUS("title")}</h2>
        </AnimatedSection>
        
        <div className="mb-5 flex flex-col lg:flex-row gap-6 sm:gap-8">
         
          <AnimatedSection 
            animationType="slideInLeft" 
            delay={isMobile ? 50 : 200} 
            isMobile={isMobile}
            className="lg:w-1/2"
          >
            <p className="text-[#787878] text-base sm:text-lg font-medium mb-6 lg:mb-12 leading-relaxed">
              {tAboutUS("description")}
            </p>
          </AnimatedSection>
          
  
          <div className='lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
            <AnimatedSection 
              animationType="slideInRight" 
              delay={isMobile ? 100 : 300} 
              isMobile={isMobile}
            >
              <div className="border-[3px] border-[#437EAF] rounded-3xl py-3 px-3 flex flex-col items-center text-center min-h-[7rem] group relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 sm:hover:-translate-y-3 hover:rotate-1 hover:shadow-lg sm:hover:shadow-xl hover:shadow-blue-200/30">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/50 to-blue-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500 -z-10"></div>
                <div className="rounded-full mb-1 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10">
                  <Image
                    className="h-6 w-6 transition-all duration-500 group-hover:brightness-110"
                    priority
                    src={peoples}
                    alt="Team icon"
                  />
                </div>
                <p className="text-sm text-gray-700 group-hover:text-[#15529F] transition-colors duration-300 relative z-10">
                  {tGoals("p2")}
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection 
              animationType="slideInRight" 
              delay={isMobile ? 150 : 400} 
              isMobile={isMobile}
            >
              <div className="border-[3px] border-[#437EAF] rounded-3xl py-3 px-3 flex flex-col items-center text-center min-h-[7rem] group relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 sm:hover:-translate-y-3 hover:-rotate-1 hover:shadow-lg sm:hover:shadow-xl hover:shadow-purple-200/30">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/50 to-purple-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500 -z-10"></div>
                <div className="rounded-full mb-1 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 relative z-10">
                  <Image
                    className="h-6 w-6 transition-all duration-500 group-hover:brightness-110"
                    priority
                    src={goal}
                    alt="Goal icon"
                  />
                </div>
                <p className="text-sm text-gray-700 group-hover:text-[#15529F] transition-colors duration-300 relative z-10">
                  {tGoals("p3")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-32">
          <AnimatedSection 
            animationType={isMobile ? 'slideInLeft' : 'slideInLeft'} 
            delay={isMobile ? 50 : 100} 
            isMobile={isMobile}
          >
            <div className="border-[3px] border-[#437EAF] rounded-3xl py-3 px-3 flex flex-col items-center text-center min-h-[7rem] group relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 sm:hover:-translate-y-3 hover:rotate-1 hover:shadow-lg sm:hover:shadow-xl hover:shadow-blue-200/30">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/50 to-blue-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500 -z-10"></div>
              <div className="rounded-full mb-1 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10">
                <Image
                  className="h-6 w-6 transition-all duration-500 group-hover:brightness-110"
                  priority
                  src={shield}
                  alt="Shield icon"
                />
              </div>
              <p className="text-sm text-gray-700 group-hover:text-[#15529F] transition-colors duration-300 relative z-10">
                {tGoals("p1")}
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection 
            animationType={isMobile ? 'slideInRight' : 'slideInUp'} 
            delay={isMobile ? 100 : 200} 
            isMobile={isMobile}
          >
            <div className="border-[3px] border-[#437EAF] rounded-3xl py-3 px-3 flex flex-col items-center text-center min-h-[7rem] group relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 sm:hover:-translate-y-3 hover:-rotate-1 hover:shadow-lg sm:hover:shadow-xl hover:shadow-purple-200/30">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/50 to-purple-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500 -z-10"></div>
              <div className="rounded-full mb-1 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 relative z-10">
                <Image
                  className="h-6 w-6 transition-all duration-500 group-hover:brightness-110"
                  priority
                  src={cup}
                  alt="Cup icon"
                />
              </div>
              <p className="text-sm text-gray-700 group-hover:text-[#15529F] transition-colors duration-300 relative z-10">
                {tGoals("p4")}
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection 
            animationType={isMobile ? 'slideInLeft' : 'slideInDown'} 
            delay={isMobile ? 150 : 300} 
            isMobile={isMobile}
          >
            <div className="border-[3px] border-[#437EAF] rounded-3xl py-3 px-3 flex flex-col items-center text-center min-h-[7rem] group relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 sm:hover:-translate-y-3 hover:rotate-1 hover:shadow-lg sm:hover:shadow-xl hover:shadow-blue-200/30">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/50 to-blue-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500 -z-10"></div>
              <div className="rounded-full mb-1 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10">
                <Image
                  className="h-6 w-6 transition-all duration-500 group-hover:brightness-110"
                  priority
                  src={global}
                  alt="Global icon"
                />
              </div>
              <p className="text-sm text-gray-700 group-hover:text-[#15529F] transition-colors duration-300 relative z-10">
                {tGoals("p5")}
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection 
            animationType={isMobile ? 'slideInRight' : 'slideInRight'} 
            delay={isMobile ? 200 : 400} 
            isMobile={isMobile}
          >
            <div className="border-[3px] border-[#437EAF] rounded-3xl py-3 px-3 flex flex-col items-center text-center min-h-[7rem] group relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 sm:hover:-translate-y-3 hover:-rotate-1 hover:shadow-lg sm:hover:shadow-xl hover:shadow-purple-200/30">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/50 to-purple-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500 -z-10"></div>
              <div className="rounded-full mb-1 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 relative z-10">
                <Image
                  className="h-6 w-6 transition-all duration-500 group-hover:brightness-110"
                  priority
                  src={verified}
                  alt="Verified icon"
                />
              </div>
              <p className="text-sm text-gray-700 group-hover:text-[#15529F] transition-colors duration-300 relative z-10">
                {tGoals("p6")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default AzerbaijanYouthSection;