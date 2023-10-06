import React from 'react';
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Trans } from 'react-i18next';

export const LaNostraGiornataCard = ({ iconSection, time, location, title, description, maps }) => {

	const { t, i18n: {changeLanguage, language} } = useTranslation();

	const ref = React.useRef(null);

	//loading="lazy"

	gsap.registerPlugin( 
	    ScrollTrigger
	);

	React.useEffect(() => {
		gsap.to(ref.current, { 
		  opacity: 1,
		  duration: 0.2,
		  translateY: -10,
		  ease: Power3.easeOutQuad,
		  scrollTrigger: {
		  	trigger: ref.current,
		    start: "30% bottom",
		    toggleActions: "play none none reverse"
		  }
		});
	});

	return (

		<Card 
			ref={ref} 
			className="w-[80%] opacity-0 col-span-10 sm:col-span-4 overflow-visible sm:overflow-hidden h-full items-center"
			style={{
				'borderRadius': '10px',
				background: '#0e0e0e',
				'boxShadow': '5px 5px 5px #000, -5px -5px 5px #181818'
			}}
		>
    		
			<CardHeader className="justify-between border-b border-b-[#f9e285] ">

			  	<div className="visible flex gap-5 justify-center mt-2 items-center w-full">
			  		<FontAwesomeIcon
					    icon={iconSection}
					    style={{ color: "#f9e285", height: '2em' }}
					/>
			        <h4 className="font-['Rochester'] text-[1.8em] text-center font-semibold leading-none text-[#f9e285]">
		              {t(title)}
		            </h4>
			    </div>
	    
	 		</CardHeader>
	 		<CardBody className="px-3 py-5 text-small justify-center text-center text-[#f9e28590]">
			    <div className="grid grid-cols-2 justify-center gap-5">
			    	<div className="col-start-1 font-['Rochester'] text-xl sm:text-2xl flex items-center gap-2 justify-center">
			    		<FontAwesomeIcon
						    icon={faClock}
						    style={{ color: "#f9e28590", height: '1em' }}
						/>
			    		{t(time)}
			    	</div>
			    	<div className="col-start-2 font-['Rochester'] text-xl sm:text-2xl flex items-center gap-2 justify-center">
			    		<FontAwesomeIcon
						    icon={faLocationDot}
						    style={{ color: "#f9e28590", height: '1em' }}
						/>
			    		{t(location)}
			    	</div>
			    </div>
			</CardBody>
			<CardBody className="px-3 py-5 text-lg sm:text-xl justify-center text-center text-[#f9e28590]">
			      <Trans i18nKey={description} />
			</CardBody>
			<CardBody className="px-3 py-5 text-small justify-center text-center text-[#f9e28590]">
			    <iframe 
			         src={maps}
			         width="100%"
			         height="100%"
			         style={{filter: "invert(100%)", border:"0"}}
			         allowFullScreen="" 
			         referrerPolicy="no-referrer-when-downgrade">
			      </iframe>
			</CardBody>
		
		</Card>
	);
}