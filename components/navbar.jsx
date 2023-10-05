import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
	Button
} from "@nextui-org/react";
import React from 'react';
import { Discovery } from "./discovery";
import { Rsvp } from "./rsvp";
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const Navbar = () => {

	const ref = React.useRef(null);

	gsap.registerPlugin( 
	    ScrollTrigger
	);

	React.useEffect(() => {
		gsap.to(ref.current, { 
		  opacity: 1,
		  duration: 0.4,
		  ease: Power3.easeOut,
		  scrollTrigger: {
		  	trigger: ref.current,
		    start: "top top",
		    toggleActions: "play none none reverse"
		  }
		});
	});

	const scrollToTop = () => {
		window.scrollTo({top: 0, behavior: "smooth"});
	};

	return (
		<NextUINavbar ref={ref} maxWidth="xl" position="sticky" className="opacity-0 bg-black/40 items-center justify-center sm:w-[60%] sm:ml-[20%] rounded-2xl sm:top-1">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<Button isIconOnly variant="light" onPress={scrollToTop} className="outline-none">
					<img src="https://ringon.it/img/wedding_ring.png" alt="❤️" className="h-5"/>
				</Button>
			</NavbarContent>

			<NavbarContent className="basis-1/5 sm:basis-full" justify="center">
				<Discovery noText={true} iconsHeight="1.5em" />
			</NavbarContent>

			<NavbarContent
				className="flex basis-1/5 sm:basis-full"
				justify="end"
			>	
				<Rsvp textSize="1rem" additionalClassData="border-transparent"/>
			</NavbarContent>

		</NextUINavbar>
	);
};
