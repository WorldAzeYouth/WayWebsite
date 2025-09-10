import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const TeamMember = ({ name, title, imageSrc, isVisible, index, isScrollingUp }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div 
      className={`flex flex-col items-center group cursor-pointer transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : isScrollingUp 
            ? isEven 
              ? 'opacity-0 translate-x-8' 
              : 'opacity-0 -translate-x-8'
            : isEven 
              ? 'opacity-0 translate-x-8' 
              : 'opacity-0 -translate-x-8'
      }`}
      style={{
        transitionDelay: isVisible 
          ? `${index * 50}ms` 
          : isScrollingUp 
            ? `${(7 - index) * 30}ms` 
            : `${index * 50}ms`
      }}
    >
      <div className="w-full aspect-square bg-gray-100 overflow-hidden relative mb-3 h-[400px] rounded-4xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 transition-all duration-300 group-hover:bg-gray-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="text-xl font-bold text-center text-gray-900 transition-colors duration-300 group-hover:text-[#15529F]">
        {name}
      </h3>
      <p className="text-base text-gray-500 text-center transition-all duration-300 group-hover:text-gray-700 group-hover:transform group-hover:-translate-y-1">
        {title}
      </p>
    </div>
  );
};

const TeamSectionEnhanced = () => {
  const tTeam = useTranslations("Team");
  const sectionRef = useRef(null);
  const [visibleMembers, setVisibleMembers] = useState({});
  const [titleVisible, setTitleVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const teamMembers = [
    {
      id: 1,
      name: 'Ramin Həbibzadə',
      title: tTeam("raminHebibzade_title"),
      imageSrc: '/images/avatar/RaminHebibzade.jpeg'
    },
    {
      id: 2,
      name: 'Nəzrin Süleymanova',
      title: tTeam("nezrinSuleymanova_title"),
      imageSrc: '/images/avatar/NezrinSüleymanova.jpeg'
    },
    {
      id: 3,
      name: 'Rəsul Quliyev',
      title: tTeam("resulQuliyev_title"),
      imageSrc: '/images/avatar/ResulQuliyev.jpg'
    },
    {
      id: 4,
      name: 'Fətimə Hüseynova',
      title: tTeam("fatimeHuseynova_title"),
      imageSrc: '/images/avatar/FatimeHüseynova.jpg'
    },
    {
      id: 5,
      name: 'Şəbnəm İsmixanova',
      title: tTeam("sebnemIsmixanova_title"),
      imageSrc: '/images/avatar/Şəbnəmİsmixanova.jpeg'
    },
    {
      id: 6,
      name: 'Günay Mövlamova',
      title: tTeam("gunayMovlamova_title"),
      imageSrc: '/images/avatar/GünayMövlamova.jpeg'
    },
    {
      id: 7,
      name: 'Ayxan Hüseynov',
      title: tTeam("ayxanHuseynov_title"),
      imageSrc: '/images/avatar/AyxanHüseynov.jpeg'
    },
    {
      id: 8,
      name: 'Nuranə Vəliyeva',
      title: tTeam("nuraneVeliyeva_title"),
      imageSrc: '/images/avatar/NuranəVəliyeva.jpeg'
    },
    {
      id: 9,
      name: 'Aysel Kərimli',
      title: tTeam("ayselKerimli_title"),
      imageSrc: '/images/avatar/AyselKərimli.jpeg'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '50px 0px 50px 0px'
    };

    
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setTitleVisible(entry.isIntersecting);
      });
    }, observerOptions);

  
    const memberObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setVisibleMembers(prev => ({
          ...prev,
          [entry.target.dataset.id]: entry.isIntersecting
        }));
      });
    }, observerOptions);

    const titleElement = document.getElementById('team-title');
    if (titleElement) titleObserver.observe(titleElement);

  
    teamMembers.forEach(member => {
      const element = document.getElementById(`team-member-${member.id}`);
      if (element) memberObserver.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (titleElement) titleObserver.unobserve(titleElement);
      teamMembers.forEach(member => {
        const element = document.getElementById(`team-member-${member.id}`);
        if (element) memberObserver.unobserve(element);
      });
    };
  }, [lastScrollY]);

  return (
    <section className="py-16 bg-white" id="team" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl">
        <h2 
          id="team-title"
          className={`text-4xl font-bold text-[#15529F] mb-10 ml-5 transition-all duration-700 ease-out ${
            titleVisible 
              ? 'opacity-100 translate-x-0' 
              : isScrollingUp 
                ? 'opacity-0 translate-x-8' 
                : 'opacity-0 -translate-x-8'
          }`}
        >
          {tTeam("teamTitle")}
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.slice(0, 8).map((member, index) => (
            <div id={`team-member-${member.id}`} key={member.id} data-id={member.id}>
              <TeamMember
                name={member.name}
                title={member.title}
                imageSrc={member.imageSrc}
                isVisible={visibleMembers[member.id]}
                index={index}
                isScrollingUp={isScrollingUp}
              />
            </div>
          ))}
        </div>
        
        {teamMembers.length > 8 && (
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-xs" id={`team-member-${teamMembers[8].id}`} data-id={teamMembers[8].id}>
              <TeamMember
                name={teamMembers[8].name}
                title={teamMembers[8].title}
                imageSrc={teamMembers[8].imageSrc}
                isVisible={visibleMembers[teamMembers[8].id]}
                index={0}
                isScrollingUp={isScrollingUp}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSectionEnhanced;