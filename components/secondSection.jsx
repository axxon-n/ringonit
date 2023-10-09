import React from "react";

import {Card, CardHeader, CardBody, CardFooter, Code, Image, Avatar, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import {Heart} from "./heart";
import {ProfileCard} from "./profilecard";
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import './heart.css';
import { useTranslation } from "react-i18next";
import { Trans } from 'react-i18next';
import { HeartFilledIcon } from "./icons"
import { get_heartz_info, post_heartz_info, is_refresh_token_valid, is_user_logged_in } from "../api.js";

export const SecondSection = () => {

	const { t, i18n: {changeLanguage, language} } = useTranslation();
	const {isOpen, onOpen, onOpenChange} = useDisclosure();

	const [brideHeartz, setBrideHeartz] = React.useState(0);
	const [groomHeartz, setGroomHeartz] = React.useState(0);

	const initializeData = async () => {
		let heartzInfo = await get_heartz_info();
		setBrideHeartz(heartzInfo["heartz_data"]["bride_heartz"] || 0);
		setGroomHeartz(heartzInfo["heartz_data"]["groom_heartz"] || 0);
	};

	React.useEffect(() => {
		initializeData();
	},[]);

	const newHeart = async (entity) => {
		if (is_refresh_token_valid()) {
			if (entity === "bride") {
				setBrideHeartz(brideHeartz + 1);
			};
			if (entity === "groom") {
				setGroomHeartz(groomHeartz + 1);
			};
			post_heartz_info(entity);
		} else {
			onOpenChange(true);
		};
	}

	const laNostraStoria = React.useRef(null);
	const cristina = React.useRef(null);
	const cristina1 = React.useRef(null);
	const andrea = React.useRef(null);
	const sempreInsiemeImgSx = React.useRef(null);
	const sempreInsieme = React.useRef(null);
	const sempreInsiemeImgDx = React.useRef(null);
	const laNostraFamiglia = React.useRef(null);
	const nero = React.useRef(null);
	const nero1 = React.useRef(null);
	const gigi = React.useRef(null);
	const gigi1 = React.useRef(null);

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

		<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{t('mustRSVPtitle')}</ModalHeader>
            <ModalBody>
              <div className="flex gap-4 mb-10 items-center"> 
              	<HeartFilledIcon color="#cccccc" stroke="#cccccc"/>
                <p>{t('mustRSVPcontent')}</p>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>

		<ProfileCard
			ref={cristina1}
			className="landscape:min-h-[300px] landscape:min-w-[300px] landscape:z-10 opacity-0 col-span-12 sm:col-span-3 h-full overflow-visible sm:overflow-hidden sm:h-[20rem] sm:mt-[20%] hidden sm:flex"
			image="profilo_cristina.jpeg"
			name="Cristina"
			description={t('brideDescription')}
			rightToLeftOrder={false}
			heartz={brideHeartz}
			newHeart={() => newHeart("bride")}
		/>

    <Card ref={laNostraStoria} className="opacity-0 col-span-12 sm:col-span-6 overflow-visible sm:overflow-hidden h-full sm:h-[25rem] items-center">
      <CardHeader className="shadow-small border-0 bg-black/40 rounded-xl absolute z-10 h-10 top-2 w-30 lg:w-80 lg:h-20">
        <h4 className="w-full text-[2rem] lg:text-[3rem] font-['Rochester'] text-[#f9e285] text-center">{t('laNostraStoriaTitle')}</h4>
      </CardHeader>
      <Image
        removeWrapper
        loading='lazy'
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://ringon.it/img/story_2011_2.jpeg"
      />
      <CardFooter className="absolute bottom-0 z-10 justify-end">
      	<Code className="text-[#f9e28595]">{t('23.03.2011')}</Code>
      </CardFooter>
    </Card>

    <ProfileCard
    	ref={cristina}
			className="landscape:min-h-[300px] landscape:min-w-[300px] opacity-0 col-span-12 sm:col-span-3 overflow-visible sm:overflow-hidden h-full sm:h-[50%] sm:mt-[20%] flex sm:hidden"
			image="profilo_cristina.jpeg"
			name="Cristina"
			description={t('brideDescription')}
			rightToLeftOrder={false}
			heartz={brideHeartz}
			newHeart={() => newHeart("bride")}
		/>

    <ProfileCard
    	ref={andrea}
    	className="landscape:min-h-[300px] landscape:min-w-[300px] landscape:z-10 landscape:-ml-[100px] landscape:lg:ml-[0px] opacity-0 col-span-12 sm:col-span-3 sm:h-[20rem] overflow-visible sm:overflow-hidden h-full sm:mt-[20%]"
			image="profilo_andrea.png"
			name="Andrea"
			description={t('groomDescription')}
			rightToLeftOrder={true}
			heartz={groomHeartz}
			newHeart={() => newHeart("groom")}
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
      	<Code className="text-[#f9e28595]">{t('08.02.2014')}</Code>
      </CardFooter>
    </Card>

    <Card ref={sempreInsieme} className="opacity-0 h-full sm:h-[60%] sm:mt-[20%] overflow-visible sm:overflow-hidden col-span-12 sm:col-span-4 h-full z-20">
	  <CardHeader className="justify-between border-b border-b-[#f9e285] ">

	  	<div className="visible flex gap-5 justify-center mt-2 items-center w-full">
	        <h4 className="font-['Rochester'] text-[1.8em] text-center font-semibold leading-none text-[#f9e285]">
              {t('sempreInsiemeTitle')}
            </h4>
	    </div>
	    
	  </CardHeader>
	  <CardBody className="landscape:min-h-[300px] px-3 sm:py-0 py-10 text-small text-center md:mt-10 text-[#f9e28590]">
	    <Trans i18nKey="sempreInsiemeContent" />
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
      	<Code className="text-[#f9e28595]">{t('15.08.2023')}</Code>
      </CardFooter>
    </Card>

    <Card ref={nero1} className="heart landscape:z-10 sm:col-span-1 hidden ml-5 sm:flex opacity-0 w-auto sm:h-[50%] sm:mt-[70%] col-span-1 items-center text-center justify-center overflow-visible">
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
        <h4 className="w-full text-[2rem] lg:text-[3rem] font-['Rochester'] text-[#f9e285] text-center">{t('laNostraFamiglia')}</h4>
      </CardHeader>
      <Image
        removeWrapper
        loading='lazy'
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://ringon.it/img/foto_famiglia.jpeg"
      />
      <CardFooter className="absolute bottom-0 z-10 justify-center">
      	<Code className="text-[#f9e28595]">{t('12.06.2023')}</Code>
      </CardFooter>
    </Card>

    <Card ref={gigi1} className="heart landscape:z-10 landscape:-ml-[100px] landscape:lg:ml-[0px] hidden sm:col-span-1 sm:flex opacity-0 w-auto sm:h-[50%] sm:mt-[70%] col-span-1 items-center text-center justify-center">
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