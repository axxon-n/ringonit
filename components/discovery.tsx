import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
useDisclosure, Button} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChurch,
  faShip,
  faChessRook,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";
import confetti from 'canvas-confetti';

interface Props {
  noText: boolean,
  iconsHeight?: string
}

export const Discovery = (props: Props): React.ReactNode => {

	const {isOpen, onOpen, onOpenChange} = useDisclosure();

	const [modalTitle, setModalTitle] = React.useState<string>('');
	const [modalContent, setModalContent] = React.useState<React.ReactNode>(<></>);

	const handleConfetti = () => {
	   confetti({particleCount: 200, spread: 70});
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
<>
	<div className="flex lg:gap-10 text-[1.5rem]">
    	<div className="flex flex-col justify-center text-center items-center">
	        <Button isIconOnly variant="light" onPress={() => handleOpen("comune")} className="outline-none">
		        <FontAwesomeIcon
				    icon={faChessRook}
				    style={{ color: "#f9e285", height: props.iconsHeight ?? '2em' }}
				/>
			</Button>
			<div className={`font-['Rochester'] text-[#f9e285] ${props.noText ? "hidden" : "hidden lg:block"}`}>
				Comune
			</div>
		</div>
		<div className="flex flex-col justify-center text-center items-center">
			<Button isIconOnly variant="light" onPress={() => handleOpen("chiesa")} className="outline-none">
				<FontAwesomeIcon
				    icon={faChurch}
				    style={{ color: "#f9e285", height: props.iconsHeight ?? '2em' }}
				/>
			</Button>
			<div className={`font-['Rochester'] text-[#f9e285] ${props.noText ? "hidden" : "hidden lg:block"}`}>
				Chiesa
			</div>
		</div>
		<div className="flex flex-col justify-center text-center items-center">
			<Button isIconOnly variant="light" onPress={() => handleOpen("rinfresco")} className="outline-none">
				<FontAwesomeIcon
				    icon={faWineGlass}
				    style={{ color: "#f9e285", height: props.iconsHeight ?? '2em' }}
				/>
			</Button>
			<div className={`font-['Rochester'] text-[#f9e285] ${props.noText ? "hidden" : "hidden lg:block"}`}>
				Rinfresco
			</div>
		</div>
		<div className="flex flex-col justify-center text-center items-center">
			<Button isIconOnly variant="light" onPress={() => handleOpen("nave")} className="outline-none">
				<FontAwesomeIcon
				    icon={faShip}
				    style={{ color: "#f9e285", height: props.iconsHeight ?? '2em' }}
				/>
			</Button>
			<div className={`font-['Rochester'] text-[#f9e285] ${props.noText ? "hidden" : "hidden lg:block"}`}>
				Party
			</div>
		</div>
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

</>
	);
};