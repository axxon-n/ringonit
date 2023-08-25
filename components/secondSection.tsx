import React from "react";

import {Card, CardHeader, CardBody, CardFooter, Code, Image, Avatar, Button} from "@nextui-org/react";
import {Heart} from "@/components/heart";
import {ProfileCard} from "@/components/profilecard";
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import '@/components/heart.css'

export const SecondSection = (): React.ReactNode => {

	const laNostraStoria = React.useRef<HTMLDivElement>(null);
	const cristina = React.useRef<HTMLDivElement>(null);
	const cristina1 = React.useRef<HTMLDivElement>(null);
	const andrea = React.useRef<HTMLDivElement>(null);
	const sempreInsiemeImgSx = React.useRef<HTMLDivElement>(null);
	const sempreInsieme = React.useRef<HTMLDivElement>(null);
	const sempreInsiemeImgDx = React.useRef<HTMLDivElement>(null);
	const laNostraFamiglia = React.useRef<HTMLDivElement>(null);
	const nero = React.useRef<HTMLDivElement>(null);
	const nero1 = React.useRef<HTMLDivElement>(null);
	const gigi = React.useRef<HTMLDivElement>(null);
	const gigi1 = React.useRef<HTMLDivElement>(null);

	gsap.registerPlugin( 
	    ScrollTrigger
	);

	React.useEffect(() => {
		let mm = gsap.matchMedia(), breakPoint = 640;
		gsap.to(laNostraStoria.current, { 
		  opacity: 1,
		  duration: 0.5,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: laNostraStoria.current,
		    start: "25% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
		gsap.to(cristina.current, { 
		  opacity: 1,
		  duration: 1.5,
		  xPercent: 1,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: cristina.current,
		    start: "35% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
		gsap.to(cristina1.current, { 
		  opacity: 1,
		  duration: 1.5,
		  xPercent: 1,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: cristina1.current,
		    start: "35% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
		gsap.to(andrea.current, { 
		  opacity: 1,
		  duration: 1.5,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: andrea.current,
		    start: "35% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
		gsap.to(sempreInsiemeImgSx.current, { 
		  opacity: 1,
		  duration: 1,
		  xPercent: 10,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: sempreInsiemeImgSx.current,
		    start: "25% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
		gsap.to(sempreInsieme.current, { 
		  opacity: 1,
		  duration: 1.2,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: sempreInsieme.current,
		    start: "25% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
		gsap.to(sempreInsiemeImgDx.current, { 
		  opacity: 1,
		  duration: 1,
		  xPercent: -10,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: sempreInsiemeImgDx.current,
		    start: "25% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
		gsap.to(laNostraFamiglia.current, { 
		  opacity: 1,
		  duration: 0.5,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: laNostraFamiglia.current,
		    start: "25% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
		gsap.to(nero.current, { 
		  opacity: 1,
		  duration: 0.5,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: nero.current,
		    start: "25% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
		gsap.to(gigi.current, { 
		  opacity: 1,
		  duration: 0.5,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: gigi.current,
		    start: "25% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
		gsap.to(nero1.current, { 
		  opacity: 1,
		  duration: 0.5,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: nero1.current,
		    start: "25% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
		gsap.to(gigi1.current, { 
		  opacity: 1,
		  duration: 0.5,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: gigi1.current,
		    start: "25% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
	});

	return (
<section id="story" className="border-1 rounded-2xl pb-10 border-[#f9e285] h-full flex flex-col items-center justify-center gap-4 w-full" data-scroll-section>
	<div className="max-w-full max-h-full gap-2 grid grid-cols-12 px-8 mt-20">

	<ProfileCard
		ref={cristina1}
		className="opacity-0 col-span-12 sm:col-span-3 h-full overflow-visible sm:overflow-hidden sm:h-[20rem] sm:mt-[20%] hidden sm:flex"
		image="profilo_cristina.jpeg"
		name="Cristina"
		description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam."
		rightToLeftOrder={false}
	/>

    <Card ref={laNostraStoria} className="opacity-0 col-span-12 sm:col-span-6 overflow-visible sm:overflow-hidden h-full sm:h-[25rem] items-center">
      <CardHeader className="shadow-small border-0 bg-black/40 rounded-xl absolute z-10 h-10 top-2 w-30 lg:w-80 lg:h-20">
        <h4 className="w-full text-[2rem] lg:text-[3rem] font-['Rochester'] text-[#f9e285] text-center">La Nostra Storia</h4>
      </CardHeader>
      <Image
        removeWrapper
        loading='lazy'
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://ringon.it/img/story_2011_2.jpeg"
      />
      <CardFooter className="absolute bottom-0 z-10 justify-end">
      	<Code className="text-[#f9e28595]">23.03.2011</Code>
      </CardFooter>
    </Card>

    <ProfileCard
    	ref={cristina}
		className="opacity-0 col-span-12 sm:col-span-3 overflow-visible sm:overflow-hidden h-full sm:h-[50%] sm:mt-[20%] flex sm:hidden"
		image="profilo_cristina.jpeg"
		name="Cristina"
		description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam."
		rightToLeftOrder={false}
	/>

    <ProfileCard
    	ref={andrea}
    	className="opacity-0 col-span-12 sm:col-span-3 sm:h-[20rem] overflow-visible sm:overflow-hidden h-full sm:mt-[20%]"
		image="profilo_andrea.png"
		name="Andrea"
		description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam."
		rightToLeftOrder={true}
	/>

    <Card ref={sempreInsiemeImgSx} className="opacity-0 col-span-10 sm:col-span-4 overflow-visible sm:overflow-hidden h-full sm:h-[25rem] items-center">
      <Image
        removeWrapper
        loading='lazy'
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://ringon.it/img/story_2014.jpeg"
      />
      <CardFooter className="absolute bottom-0 z-10 justify-start">
      	<Code className="text-[#f9e28595]">08.02.2014</Code>
      </CardFooter>
    </Card>

    <Card ref={sempreInsieme} className="opacity-0 h-full sm:h-[60%] sm:mt-[20%] overflow-visible sm:overflow-hidden col-span-12 sm:col-span-4 h-full z-20">
	  <CardHeader className="justify-between border-b border-b-[#f9e285] ">

	  	<div className="visible flex gap-5 justify-center mt-2 items-center w-full">
	        <h4 className="font-['Rochester'] text-[1.8em] text-center font-semibold leading-none text-[#f9e285]">
              ...Sempre Insieme...
            </h4>
	    </div>
	    
	  </CardHeader>
	  <CardBody className="px-3 sm:py-0 py-10 text-small justify-center text-center text-[#f9e28590]">
	    <p>
	      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	  Nullam pulvinar risus non risus hendrerit venenatis.
      Pellentesque sit amet hendrerit risus, sed porttitor quam.
	    </p>
	  </CardBody>
	</Card>

    <Card ref={sempreInsiemeImgDx} className="opacity-0 col-start-3 sm:col-start-9 col-span-10 sm:col-span-4 h-full overflow-visible sm:overflow-hidden sm:h-[25rem] items-center">
      <Image
        removeWrapper
        loading='lazy'
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://ringon.it/img/story_2023.jpeg"
      />
      <CardFooter className="absolute bottom-0 z-10 justify-end">
      	<Code className="text-[#f9e28595]">15.08.2023</Code>
      </CardFooter>
    </Card>

    <Card ref={nero1} className="heart sm:col-span-1 hidden sm:flex opacity-0 h-full w-full sm:h-[50%] sm:mt-[70%] col-span-1 items-center text-center justify-center overflow-visible">
      <Image
        removeWrapper
        loading='lazy'
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://ringon.it/img/nero.jpg"
      />
    </Card>

    <Card ref={laNostraFamiglia} className="opacity-0 w-full h-full sm:h-[25rem] col-span-12 overflow-visible sm:overflow-visible sm:col-span-8 sm:col-start-3 items-center text-center justify-center">
      <CardHeader className="shadow-small border-0 bg-black/40 rounded-xl absolute z-10 h-10 top-2 w-30 lg:w-100 lg:h-20">
        <h4 className="w-full text-[2rem] lg:text-[3rem] font-['Rochester'] text-[#f9e285] text-center">La Nostra Famiglia</h4>
      </CardHeader>
      <Image
        removeWrapper
        loading='lazy'
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://ringon.it/img/foto_famiglia.jpeg"
      />
      <CardFooter className="absolute bottom-0 z-10 justify-center">
      	<Code className="text-[#f9e28595]">12.06.2023</Code>
      </CardFooter>
    </Card>

    <Card ref={gigi1} className="heart hidden sm:col-span-1 sm:flex opacity-0 h-full w-full sm:h-[50%] sm:mt-[70%] col-span-1 items-center text-center justify-center">
      <Image
        removeWrapper
        loading='lazy'
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://ringon.it/img/gigi_2.jpeg"
      />
    </Card>

    <div className="flex sm:hidden w-full h-full sm:h-[25rem] col-span-12 overflow-visible sm:overflow-hidden sm:col-span-4 items-center text-center justify-center grid grid-cols-2 grid-rows-1 sm:grid-cols-1 sm:grid-rows-2 gap-3">
	    <Card ref={nero} className="heart opacity-0 h-full w-auto sm:h-[110%] sm:ml-[15%] sm:mt-[10%] col-span-1 items-center text-center justify-center">
	      <Image
	        removeWrapper
	        loading='lazy'
	        alt="Card background"
	        className="z-0 w-full h-full object-cover"
	        src="https://ringon.it/img/nero.jpg"
	      />
	    </Card>
	    <Card ref={gigi} className="heart opacity-0 h-full w-auto sm:h-[110%] sm:ml-[15%]  col-span-1 items-center text-center justify-center">
	      <Image
	        removeWrapper
	        loading='lazy'
	        alt="Card background"
	        className="z-0 w-full h-full object-cover"
	        src="https://ringon.it/img/gigi.jpg"
	      />
	    </Card>
    </div>

  </div>
</section>
	);
};