import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
useDisclosure, Button} from "@nextui-org/react";
import { Trans } from 'react-i18next'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChurch,
  faShip,
  faChessRook,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";
import confetti from 'canvas-confetti';
import { useTranslation } from "react-i18next";

export const Discovery = (props) => {

	const { t, i18n: {changeLanguage, language} } = useTranslation();

	const {isOpen, onOpen, onOpenChange} = useDisclosure();

	const [modalTitle, setModalTitle] = React.useState('');
	const [modalContent, setModalContent] = React.useState(<></>);

	const handleConfetti = () => {
	   confetti({particleCount: 200, spread: 70});
	};

	const modalTitleSwitcher = (kkey) => {
		switch(kkey) {
			case "chiesa":
				return t('chiesaTitle');
			case "comune":
				return t('comuneTitle');
			case "rinfresco":
				return t('rinfrescoTitle');
			case "nave":
				return t('partyTitle');
			default:
				return "";
		};
	}

	const modalContentSwitcher = (kkey) => {
		switch(kkey) {
			case "chiesa":
				return (
					<Trans i18nKey="chiesaContent" />
				);
			case "comune":
				return (
					<Trans i18nKey="comuneContent" />
				);
			case "rinfresco":
				return (
					<Trans i18nKey="rinfrescoContent" />
				);
			case "nave":
				return (
					<Trans i18nKey="naveContent" />
				);
		};
	}

	const handleOpen = (kkey) => {
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
				{t('comuneTitle')}
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
				{t('chiesaTitle')}
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
				{t('rinfrescoTitle')}
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
				{t('partyTitle')}
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