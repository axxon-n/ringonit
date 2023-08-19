import React from "react";
import {Phone} from "@/components/phone";
import {ConfirmCode} from "@/components/confirmationcode";
import {Input, ModalBody, ModalFooter, Button, CheckboxGroup, Checkbox, CircularProgress} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faArrowRight,
  faChurch,
  faShip,
  faChessRook,
  faWineGlass
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  onCloseForm?: Dispatch<SetStateAction<string>>;
}

export const SignIn = (props: Props): React.ReactNode => {

	const verificationCodeInputRef = React.useRef(null);
	const phoneInputRef = React.useRef(null);
	const fullNameInputRef = React.useRef(null);

	const [valuePhone, setValuePhone] = React.useState<string>('');
	const [valueVerificationCode, setValueVerificationCode] = React.useState<string>('');
	const [valueFullName, setValueFullName] = React.useState<string>('');
	const [valueInvitees, setValueInvitees] = React.useState<string>('2');
	const [valuePresence, setValuePresence] = React.useState(["comune", "chiesa", "rinfresco", "nave"]);
	const [valueIsLoading, setValueIsLoading] = React.useState<boolean>(true);
	const [valueLoader, setValueLoader] = React.useState<number>(30);

	const [stepEnterPhoneNumber, setStepEnterPhoneNumber] = React.useState<boolean>(true);
	const [stepVerify, setStepVerify] = React.useState<boolean>(false);
	const [stepCompleteProfile, setStepCompleteProfile] = React.useState<boolean>(false);

	setTimeout(() => phoneInputRef.current.focus(), 0);

  	const setResendCodeInterval = () => {
  		setValueIsLoading(true);
  		setValueLoader(30);
  		const interval = setInterval(() => {
	     	setValueLoader((v) => (v <= 0 ? 30 : v - 1));
	    }, 1000);
	    setTimeout(() => {
	    	setValueIsLoading(false);
	    	clearInterval(interval);
	    }, 30000);
  	};

	const handleSignIn = () => {
		// api call
		console.log("handelSignIn", valuePhone);
		setStepEnterPhoneNumber(false);
		setStepVerify(true);
		setTimeout(() => verificationCodeInputRef.current.focus(), 0);
		setResendCodeInterval();
	};

	const handleCode = (e) => {
		setValueVerificationCode(e);
		if (e.length == 6) {
			//api call
			setStepVerify(false);
			setStepCompleteProfile(true);
		};
	};

	const handleInvitees = (e) => {
		setValueInvitees(e.target.value);
	};

	const handleVerifyNumber = () => {
		console.log("handleVerifyNumber", valuePhone);
		console.log("handleVerifyNumber", valueVerificationCode);
		//api call
		setStepVerify(false);
		setStepCompleteProfile(true);
		setTimeout(() => fullNameInputRef.current.focus(), 0);
	};

	const handleCompleteProfile = () => {
		console.log("handleCompleteProfile", valueFullName?.target?.value);
		console.log("handleCompleteProfile", valueInvitees);
		console.log("handleCompleteProfile", valuePresence);
		//api call
		props.onCloseForm();
	}

	const handleResendVerificationCode = () => {
		setResendCodeInterval();
		console.log("handleResendVerificationCode", valuePhone);
		//api call
		setValueVerificationCode('');
		setTimeout(() => verificationCodeInputRef.current.setEmpty(), 0);
		setTimeout(() => verificationCodeInputRef.current.focus(), 0);
	};

	const isInviteesValid = React.useMemo((): string => {
		const pattern = /^[1-9]$/;
		if (valueInvitees == "") return "invalid";
		const isValidChar = pattern.test(valueInvitees);
		return isValidChar ? "valid" : "invalid";
	}, [valueInvitees]);

	return (
<>
	<ModalBody>
      	<Phone 
      		ref={phoneInputRef}
      		isVisible={stepEnterPhoneNumber}
			valuePhone={valuePhone} 
			setValuePhone={setValuePhone} 
		/>
		<ConfirmCode 
			ref={verificationCodeInputRef}
			isVisible={stepVerify}
			value={valueVerificationCode}
			onChange={handleCode}
		/>
		<div style={{
			"display": stepCompleteProfile ? 'flex' : 'none'
		}} className="gap-3">
			<Input
				ref={fullNameInputRef}
				isRequired
				variant="bordered"
				onChange={setValueFullName}
				label="Chi sei?"
			/>
			<Input
				isRequired
				value={valueInvitees}
				inputMode="numeric" 
				variant="bordered"
				onChange={handleInvitees}
				labelPlacement="outside-left"
				label="Quanti siete?"
				color={isInviteesValid === "valid" ? "default" : "danger"}
			    validationState={isInviteesValid}
			    className="w-[50%]"
			/>
		</div>
		<div style={{
			"display": stepCompleteProfile ? 'flex' : 'none'
		}} className="justify-center">
	    	<CheckboxGroup
		        label="Ci siete per..."
		        color="warning"
		        value={valuePresence}
		        onValueChange={setValuePresence}
		        className="flex gap-3 items-center"
	      	>	
	      		<div className="grid grid-cols-2 gap-x-5 gap-y-2">
			        <Checkbox value="comune" className="col-span-1">
			        	<div className="flex gap-x-1 items-center">
			        		<FontAwesomeIcon style={{ color: "#f9e285" }} icon={faChessRook} />
			        		<p>Comune</p>
			        	</div>
			        </Checkbox>
			        <Checkbox value="chiesa" className="col-span-1">
			        	<div className="flex gap-x-1 items-center">
			        		<FontAwesomeIcon style={{ color: "#f9e285" }} icon={faChurch} />
			        		<p>Chiesa</p>
			        	</div>
			        </Checkbox>
			        <Checkbox value="rinfresco" className="col-span-1">
			        	<div className="flex gap-x-1 items-center">
			        		<FontAwesomeIcon style={{ color: "#f9e285" }} icon={faWineGlass} />
			        		<p>Rinfresco</p>
			        	</div>
			        </Checkbox>
			        <Checkbox value="nave" className="col-span-1">
			        	<div className="flex gap-x-1 items-center">
			        		<FontAwesomeIcon style={{ color: "#f9e285" }} icon={faShip} />
			        		<p>Nave</p>
			        	</div>
			        </Checkbox>
			    </div>
	    	</CheckboxGroup>
	    </div>
    </ModalBody>
    <ModalFooter className="grid grid-cols-4 py-4 ">
    	<div className="col-span-2 flex -px-2 items-center">
    		<CircularProgress
			    aria-label="Loading..."
			    size="lg"
			    value={valueLoader}
			    color="primary"
			    maxValue={30}
			    minValue={0}
			    showValueLabel={true}
			    className={`text-small ${stepVerify && valueIsLoading ? "visible" : "hidden"} opacity-50`} 
			    formatOptions={{ style: "unit", unit: "second" }}
			/>
	        <Button 
	        	className={`text-small ${stepVerify ? "visible" : "hidden"} `} 
	        	isDisabled={valueIsLoading}
	        	color="primary" 
	        	variant="light" 
	        	onPress={handleResendVerificationCode}
	        >
	          reinvia codice
	        </Button>
        </div>
    	<div className="col-span-2 gap-2 flex justify-end items-center">
	        <Button isIconOnly color="danger" variant="flat" onClick={props.onCloseForm}>
	          <FontAwesomeIcon icon={faCircleXmark} />
	        </Button>
	        <Button isIconOnly className={stepEnterPhoneNumber ? "visible" : "hidden"} color="primary" onPress={handleSignIn}>
	          <FontAwesomeIcon icon={faArrowRight} />
	        </Button>
	        <Button isIconOnly className={stepVerify ? "visible" : "hidden"} color="primary" onPress={handleVerifyNumber}>
	          <FontAwesomeIcon icon={faArrowRight} />
	        </Button>
	        <Button isIconOnly className={stepCompleteProfile ? "visible" : "hidden"} color="success" onPress={handleCompleteProfile}>
	          <FontAwesomeIcon icon={faCircleCheck} />
	        </Button>
        </div>
    </ModalFooter>
</>
	);
};