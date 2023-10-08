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
					<>
					<Trans i18nKey="chiesaContent" />
					<iframe 
		         src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11383.86104690056!2d11.3285603!3d44.4953786!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fd48c4b7e9c59%3A0xc6b362c9d8a41c5a!2sChiesa%20di%20San%20Nicola!5e0!3m2!1sit!2sit!4v1696773496783!5m2!1sit!2sit"
		         width="auto"
		         height="50%"
		         style={{filter: "invert(100%)", border:"0"}}
		         allowFullScreen="" 
		         referrerPolicy="no-referrer-when-downgrade">
		      </iframe>
					</>
				);
			case "comune":
				return (
					<>
					<Trans i18nKey="comuneContent" />
					<iframe 
		         src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11384.077227580136!2d11.3424552!3d44.4942712!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fd4959b695e13%3A0x727753f91a1d568!2sSala%20Rossa!5e0!3m2!1sit!2sit!4v1692953815679!5m2!1sit!2sit"
		         width="auto"
		         height="50%"
		         style={{filter: "invert(100%)", border:"0"}}
		         allowFullScreen="" 
		         referrerPolicy="no-referrer-when-downgrade">
		      </iframe>
					</>
				);
			case "rinfresco":
				return (
					<>
					<Trans i18nKey="rinfrescoContent" />
					<iframe 
		         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2846.029012692724!2d11.338085352203422!3d44.49407232329949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fd4958eccaebf%3A0xe6996ffd16d74a3b!2sBar%20Vittorio%20Emanuele!5e0!3m2!1sit!2sit!4v1692957174859!5m2!1sit!2sit"
		         width="auto"
		         height="50%"
		         style={{filter: "invert(100%)", border:"0"}}
		         allowFullScreen="" 
		         referrerPolicy="no-referrer-when-downgrade">
		      </iframe>
					</>
				);
			case "nave":
				return (
					<>
					<Trans i18nKey="naveContent" />
					<iframe 
		         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.549624622223!2d12.35579418433675!3d44.25618786764484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb402d76955a5%3A0xa4c3eeb9d108001d!2sHotel%20Verde%20Luna!5e0!3m2!1sit!2sit!4v1692957262714!5m2!1sit!2sit"
		         width="auto"
		         height="50%"
		         style={{filter: "invert(100%)", border:"0"}}
		         allowFullScreen="" 
		         referrerPolicy="no-referrer-when-downgrade">
		      </iframe>
					</>
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
	<div className="flex lg:gap-10 text-[1.3rem]">
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
              <ModalHeader className="flex flex-col gap-1 font-['Rochester'] text-[#f9e285] text-[1.4em]">{ modalTitle }</ModalHeader>
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