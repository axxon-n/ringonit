import React from "react";
import confetti from 'canvas-confetti';
import {SignIn} from "@/components/signin";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
useDisclosure, Button} from "@nextui-org/react";

interface Props {
  textSize?: string
  additionalClassData?: string
}

export const Rsvp = (props: Props): React.ReactNode => {

	const {isOpen, onOpen, onOpenChange} = useDisclosure();

	const handleConfetti = () => {
	   confetti({particleCount: 200, spread: 70});
	};

	const handleRsvp = () => {
	   handleConfetti();
	   onOpen();
	};

	return (
<>
	<Button className={`align-center outline-none justify-center ${props.textSize ? `text-[${props.textSize}]` : "text-[1.8rem]"}  font-['Rochester'] text-[#f9e285] ${props.additionalClassData ?? "border-[#f9e285] py-6"}`} 
		variant="bordered" onPress={() => handleRsvp()}>
        RSVP
	</Button> 

	<Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        placement="auto"
        backdrop="blur"
    >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Siamo felici di averti con noi!!!</ModalHeader>
              <SignIn onCloseForm={() => onClose()}/>
            </>
          )}
        </ModalContent>
  	</Modal> 
</>
	);

};