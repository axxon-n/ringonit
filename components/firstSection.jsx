import React from "react";
import {Card, CardFooter, CardBody} from "@nextui-org/react";
import {Discovery} from "./discovery";
import {Rsvp} from "./rsvp";
import { gsap, Power3 } from 'gsap';

export const FirstSection = () => {

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
  }} className="-z-1 h-screen flex flex-col items-center justify-center gap-4 rounded w-full h-full bg-center bg-cover" data-scroll-section>
	<Card
		ref = {ref}
      isBlurred
      className="opacity-0 border-none bg-background/60 bg-default-100/10 w-[80vw] h-[70vh] min-h-[70vh] md:w-[40vw] lg:min-w-[80vw] backdrop-blur-sm items-center justify-center"
			shadow="sm"
    >
    	<CardBody className="items-center">
	    	<div className="inline-block max-w-lg text-center flex-col items-center justify-center text-[1.5rem] text-[#f9e285] font-['Rochester']">Noi</div>
			<div className="inline-block max-w-lg text-center flex-col items-center justify-center mt-[2vh]">
				<h1 className="tracking-tight inline font-['Sacramento'] md:text-8xl text-7xl text-[#f9e285] font-semibold leading-[3rem] md:leading-none grid grid-cols-1">
					<div>Cristina</div>
					<div className="text-[3.5rem] px-3 md:px-20 relative flex items-center">
					    <div className="flex-grow border-t border-[#f9e285]"></div>
					    <span className="flex-shrink mx-4">&</span>
					    <div className="flex-grow border-t border-[#f9e285]"></div>
					</div>
					<div>Andrea</div>
				</h1>
				<div className="justify-center flex mt-[2vh] items-center space-x-1 text-[1.5rem] font-['Rochester'] text-[#f9e285]">
			    	vi invitiamo a celebrare insieme il nostro matrimonio
			    </div>
				<div className="justify-center flex mt-[2vh] items-center space-x-4 text-[1.5rem] font-['Rochester'] text-[#f9e285]">
			        <div className="text-right -space-y-2 flex-col border-[#f9e285] ">
			        	<div>Sabato</div>
			        	<div className="text-medium">9:00</div>
			        </div>
			        <div className="inline-block mt-2.5 h-[7vh] w-0.5 self-stretch opacity-70 bg-[#f9e285]"></div>
			        <div className="text-center text-[2rem] -space-y-2 flex-col border-[#f9e285]">
			        	15
			        </div>
			        <div className="inline-block mt-2.5 h-[7vh] w-0.5 self-stretch opacity-70 bg-[#f9e285]"></div>
			        <div className="text-left -space-y-2 flex-col border-[#f9e285]">
			        	<div>Giugno</div>
			        	<div className="text-medium">2024</div>
			        </div>
			    </div>
			</div>
		</CardBody>

        <CardFooter className="bg-default-100/90 justify-center gap-4 lg:gap-[3vw] before:bg-white/10 border-white/20 border-0 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        	<Discovery noText={false}/>
        	<Rsvp/>
	    </CardFooter>
    </Card>	

    <div className='text-center inset-x-0 bottom-0'>
        <audio className='object-center mx-auto mt-1 mb-7' autoPlay={true} loop={true} src="https://ringon.it/img/main_audio.mp3" controls>
            <p>If you are reading this, it is because your browser does not support the audio element.</p>
        </audio>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-down-circle mx-auto mt-2 animate-bounce " width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f9e285" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9" />
            <line x1="8" y1="12" x2="12" y2="16" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="16" y1="12" x2="12" y2="16" />
        </svg>
        <p className='text-[#f9e285] '>
            Scopri di più...
        </p>
    </div>
</section>
	);
};