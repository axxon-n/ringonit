'use client'

import React from "react";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import {Button} from '@nextui-org/button'; 
import { Navbar } from "@/components/navbar";
import confetti from 'canvas-confetti';
import {Card, CardFooter, CardBody, Divider,
Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
useDisclosure, Input} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChurch,
  faShip,
  faChessRook,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";
import {SignIn} from "@/components/signin";


export default function Home() {

	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const [modalTitle, setModalTitle] = React.useState<string>('');
	const [modalContent, setModalContent] = React.useState<React.ReactNode>(<></>);
	const [isOpenForm, setOpenForm] = React.useState<boolean>(false);
	
	const [phoneNumber, setPhoneNumber] = React.useState<string>('');
	const [verificationCode, setVerificationCode] = React.useState<string>('');
	const [fullName, setFullName] = React.useState<string>('');
	const [peopleNumber, setPeopleNumber] = React.useState<number>(1);

	const handleConfetti = () => {
	   confetti({particleCount: 200, spread: 70});
	};

	const handleRsvp = () => {
	   handleConfetti();
	   setOpenForm(true);
	};

	const onCloseForm = () => {
		setOpenForm(false);
	};

	const onOpenFormChange = (e: boolean) => {
		setOpenForm(e);
	};

	const modalTitleSwitcher = (kkey: string): string => {
		switch(kkey) {
			case "chiesa":
				return "Chiesa";
			case "comune":
				return "Comune";
			case "rinfresco":
				return "Rinfresco";
			case "nave":
				return "Party";
			default:
				return "";
		};
	}

	const modalContentSwitcher = (kkey: string): React.ReactNode => {
		switch(kkey) {
			case "chiesa":
				return (
					<><p> 
	                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	                  Nullam pulvinar risus non risus hendrerit venenatis.
	                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
	                </p>
	                <p>
	                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	                  Nullam pulvinar risus non risus hendrerit venenatis.
	                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
	                </p></>
				);
			case "comune":
				return (
					<><p> 
	                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	                  Nullam pulvinar risus non risus hendrerit venenatis.
	                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
	                </p>
	                <p>
	                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	                  Nullam pulvinar risus non risus hendrerit venenatis.
	                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
	                </p></>
				);
			case "rinfresco":
				return (
					<><p> 
	                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	                  Nullam pulvinar risus non risus hendrerit venenatis.
	                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
	                </p>
	                <p>
	                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	                  Nullam pulvinar risus non risus hendrerit venenatis.
	                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
	                </p></>
				);
			case "nave":
				return (
					<><p> 
	                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	                  Nullam pulvinar risus non risus hendrerit venenatis.
	                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
	                </p>
	                <p>
	                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	                  Nullam pulvinar risus non risus hendrerit venenatis.
	                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
	                </p></>
				);
		};
	}

	const handleOpen = (kkey: string): any => {
		handleConfetti();
		setModalContent(modalContentSwitcher(kkey));
		setModalTitle(modalTitleSwitcher(kkey));
	    onOpen();
	}
	
	return (
		<div className="scroll-smooth" data-scroll-container>
		<section id="rsvp" style={{
			height: '100vh',
            backgroundImage: `linear-gradient(rgba(15, 41, 55, 0.40), rgba(15, 41, 55, 0.40)), url('https://ringon.it/img/image_16_2.png')`
          }} className="-z-1 h-screen flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full h-full bg-center bg-cover" data-scroll-section>
			<Card
		      isBlurred
		      className="border-none bg-background/60 bg-default-100/10 w-[80vw] h-[70vh] xl:w-[40vw] backdrop-blur-sm"
      			shadow="sm"
		    >
		    	<CardBody>
		    	<div className="inline-block max-w-lg text-center flex-col items-center justify-center text-[1.5rem] text-[#f9e285] font-['Rochester']">Noi</div>
				<div className="inline-block max-w-lg text-center flex-col items-center justify-center mt-[2vh]">
					<h1 className="tracking-tight inline font-['Sacramento'] xl:text-8xl lg:text-8xl text-7xl text-[#f9e285] font-semibold leading-[3rem] xl:leading-none lg:leading-none grid grid-cols-1">
						<div>Cristina</div>
						<div className="text-[3.5rem] px-3 lg:px-20 xl:px-20 relative flex items-center">
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
				<br />
				</CardBody>

		        <CardFooter className="justify-center gap-4 lg:gap-[3vw] before:bg-white/10 border-white/20 border-0 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
			        {/*<p className="text-[#f9e285] mr-10">SAVE THE DATE</p>*/}
			        <div className="flex lg:gap-10 text-[1.5rem]">
			        	<div className="flex flex-col justify-center text-center items-center">
					        <Button isIconOnly variant="light" onPress={() => handleOpen("comune")}>
						        <FontAwesomeIcon
								    icon={faChessRook}
								    style={{ color: "#f9e285", height: '2em' }}
								/>
							</Button>
							<div className="font-['Rochester'] text-[#f9e285] hidden lg:block">
								Comune
							</div>
						</div>
						<div className="flex flex-col justify-center text-center items-center">
							<Button isIconOnly variant="light" onPress={() => handleOpen("chiesa")}>
								<FontAwesomeIcon
								    icon={faChurch}
								    style={{ color: "#f9e285", height: '2em' }}
								/>
							</Button>
							<div className="font-['Rochester'] text-[#f9e285] hidden lg:block">
								Chiesa
							</div>
						</div>
						<div className="flex flex-col justify-center text-center items-center">
							<Button isIconOnly variant="light" onPress={() => handleOpen("rinfresco")}>
								<FontAwesomeIcon
								    icon={faWineGlass}
								    style={{ color: "#f9e285", height: '2em' }}
								/>
							</Button>
							<div className="font-['Rochester'] text-[#f9e285] hidden lg:block">
								Rinfresco
							</div>
						</div>
						<div className="flex flex-col justify-center text-center items-center">
							<Button isIconOnly variant="light" onPress={() => handleOpen("nave")}>
								<FontAwesomeIcon
								    icon={faShip}
								    style={{ color: "#f9e285", height: '2em' }}
								/>
							</Button>
							<div className="font-['Rochester'] text-[#f9e285] hidden lg:block">
								Party
							</div>
						</div>
					</div>
			        <Button className="align-center justify-center text-[1.8rem] font-['Rochester'] text-[#f9e285] border-[#f9e285] py-6" 
						variant="bordered" onPress={handleRsvp}>
			            RSVP
			        </Button>  
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

            <Modal 
		        isOpen={isOpen} 
		        placement="auto"
		        onOpenChange={onOpenChange} 
		        backdrop="blur"
		      >
		        <ModalContent>
		          {(onClose) => (
		            <>
		              <ModalHeader className="flex flex-col gap-1">{ modalTitle }</ModalHeader>
		              <ModalBody>
		                { modalContent }
		              </ModalBody>
		              
		            </>
		          )}
		        </ModalContent>
		      </Modal>

		    <Modal 
		        isOpen={isOpenForm} 
		        onOpenChange={onOpenFormChange} 
		        placement="auto"
		        backdrop="blur"
		      >
		        <ModalContent>
		          {(onClose) => (
		            <>
		              <ModalHeader className="flex flex-col gap-1">Siamo felici di averti con noi!!!</ModalHeader>
		              <SignIn onCloseForm={onCloseForm}/>
		            </>
		          )}
		        </ModalContent>
	      </Modal>
		</section>
		<Navbar />
		<section id="story" className="h-screen flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full h-full" data-scroll-section>
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
				<br />
				<h1 className={title()}>
					websites regardless of your design experience.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Beautiful, fast and modern React UI library.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					isExternal
					as={NextLink}
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
				</Snippet>
			</div>
		</section>
		<section id="dday" className="h-screen flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full h-full" data-scroll-section>
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
				<br />
				<h1 className={title()}>
					websites regardless of your design experience.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Beautiful, fast and modern React UI library.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					isExternal
					as={NextLink}
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
				</Snippet>
			</div>
		</section>
		</div>
	);
}
