import React from "react";
import {Card, CardFooter, CardBody} from "@nextui-org/react";
import {Discovery} from "./discovery";
import {Rsvp} from "./rsvp";
import { gsap, Power3 } from 'gsap';
import { useTranslation } from "react-i18next";

export const FirstSection = () => {

	const { t, i18n: {changeLanguage, language} } = useTranslation();

	const ref = React.useRef(null);

	gsap.registerPlugin( 
	    gsap.CSSPlugin,
	    gsap.CSSRulePlugin
	);

	React.useEffect(() => {
		gsap.to(ref.current,
	      {
	        opacity: 1,
			duration: 1,
			ease: Power3.easeOutQuad
	      }
	    );
	});

	return(
<section id="ringonit-section-rsvp" style={{
	height: '100vh',
    backgroundImage: `linear-gradient(rgba(15, 41, 55, 0.40), rgba(15, 41, 55, 0.40)), url('https://ringon.it/img/image_16_2.png')`,
    'borderWidth': '10px',
    'borderRadius': '1em',
    'borderColor': 'black'
  }} className="-z-1 h-screen min-h-[800px] flex flex-col items-center justify-center gap-4 rounded w-full h-full bg-center bg-cover" data-scroll-section>
	<Card
		ref = {ref}
     	isBlurred
      	className="opacity-0 border-none bg-background/60 bg-default-100/10 w-[80vw] h-[70vh] text-[1rem] min-h-[550px] md:w-[40vw] lg:min-w-[80vw] backdrop-blur-sm items-center justify-center"
		shadow="sm"
    >
    	<CardBody className="items-center">
	    	<div className="inline-block max-w-lg text-center flex-col items-center justify-center xs:text-[1.2rem] ss:text-[1.5rem] text-[#f9e285] font-['Rochester']">{t('we')}</div>
			<div className="inline-block max-w-lg text-center flex-col items-center justify-center mt-[2vh]">
				<h1 className="tracking-tight inline font-['Sacramento'] lg:text-8xl ss:text-7xl xs:text-6xl text-[#f9e285] font-semibold leading-[3rem] md:leading-none grid grid-cols-1">
					<div>Cristina</div>
					<div className="xs:text-4xl ss:text-[3.5rem] px-3 md:px-20 relative flex items-center">
					    <div className="flex-grow border-t border-[#f9e285]"></div>
					    <span className="flex-shrink mx-4">&</span>
					    <div className="flex-grow border-t border-[#f9e285]"></div>
					</div>
					<div>Andrea</div>
				</h1>
				<div className="justify-center flex mt-[2vh] items-center space-x-1 xs:text-[1.2rem] ss:text-[1.5rem] font-['Rochester'] text-[#f9e285]">
			    	{t('inviteStatement')}
			    </div>
				<div className="grid grid-cols-3 divide-x-2 flex mt-[2vh] items-center xs:text-[1.1rem] ss:text-[1.5rem] font-['Rochester'] text-[#f9e285]">
			        <div className="text-center -space-y-2 flex-col border-[#f9e285]">
			        	<div>{t('giorno')}</div>
			        	<div className="xs:text-small ss:text-medium">{t('ora')}</div>
			        </div>
			        {/*<div className="inline-block mt-2.5 h-[7vh] w-0.5 self-stretch opacity-70 bg-[#f9e285]"></div>*/}
			        <div className="text-center xs:text-[1.595rem] ss:text-[2.165rem] -space-y-2 flex-col border-[#f9e285]">
			        	{t('data')}
			        </div>
			        {/*<div className="inline-block mt-2.5 h-[7vh] w-0.5 self-stretch opacity-70 bg-[#f9e285]"></div>*/}
			        <div className="text-center -space-y-2 xs:text-[1.1rem] ss:text-[1.5rem] flex-col border-[#f9e285]">
			        	<div>{t('mese')}</div>
			        	<div className="xs:text-small ss:text-medium">{t('anno')}</div>
			        </div>
			    </div>
			</div>
		</CardBody>

        <CardFooter className="bg-default-100/90 justify-center ss:gap-4 xs:gap-2 lg:gap-[3vw] before:bg-white/10 border-white/20 border-0 overflow-hidden py-0 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        	<Discovery noText={false} iconStyle="text-[#f9e285] xs:text-[1.5em] ss:text-[2em]"/>
        	<Rsvp additionalClassData="xs:text-[1.2rem] ss:text-[1.8rem] border-[#f9e285]"/>
	    </CardFooter>
    </Card>	

    <div className='text-center inset-x-0 bottom-0'>
        <audio className='object-center mx-auto mt-1 mb-7 xs:max-w-[268px] ss:max-w-auto' autoPlay={true} loop={true} src="https://ringon.it/img/main_audio.mp3" controls>
            <p>{t('noAudioDisclaimer')}</p>
        </audio>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-down-circle mx-auto mt-2 animate-bounce " width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f9e285" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9" />
            <line x1="8" y1="12" x2="12" y2="16" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="16" y1="12" x2="12" y2="16" />
        </svg>
        <p className='text-[#f9e285] '>
            {t('scopri')}
        </p>
    </div>
</section>
	);
};