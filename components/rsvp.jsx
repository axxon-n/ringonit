import React from "react";
import confetti from 'canvas-confetti';
import {SignIn} from "./signin";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
useDisclosure, Button} from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export const Rsvp = (props) => {

	const { t, i18n: {changeLanguage, language} } = useTranslation();

	const {isOpen, onOpen, onOpenChange} = useDisclosure();

	const handleConfetti = () => {
	   confetti({particleCount: 200, spread: 70});
	};

	const handleRsvp = () => {
	   handleConfetti();
	   onOpen();
	};

	// const onOpenChangeForm = (e) => {
	// 	// // onOpenChangeForm({isFromSignIn: true, setOpen: false})
	// 	if (e?.isFromSignIn) {
	// 		onOpenChange(e?.setOpen || true);
	// 	};
	// }

	return (
<>
	<Button className={`align-center outline-none justify-center font-['Rochester'] text-[#f9e285] ${props.additionalClassData ?? "border-[#f9e285] py-6"}`} 
		variant="bordered" onPress={() => handleRsvp()}>
        RSVP
	</Button> 

	<Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        placement="auto"
        backdrop="blur"
        isDismissable={false}
    >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-['Rochester'] text-[#f9e285] text-[1.4em]">{t('feliciDiAvertiConNoi')}</ModalHeader>
              <SignIn onCloseForm={() => onClose()}/>
            </>
          )}
        </ModalContent>
  	</Modal> 
</>
	);

};