import React from "react";
import {Phone} from "./phone";
import {ConfirmCode} from "./confirmationcode";
import {Input, Textarea, Skeleton, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, CheckboxGroup, Checkbox, CircularProgress} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faArrowRight,
  faChurch,
  faShip,
  faChessRook,
  faWineGlass,
  faHeartCrack
} from "@fortawesome/free-solid-svg-icons";
import { request_verify_code, signout, remove_sign_in, enter_verify_code, post_user_info, get_user_info, is_refresh_token_valid, is_user_logged_in } from "../api.js";
import { useTranslation } from "react-i18next";
import { DownloadCalendar } from "./downloadCalendar";
import { isValidPhoneNumber } from 'react-phone-number-input'

export const SignIn = (props) => {

	const { t, i18n: {changeLanguage, language} } = useTranslation();

	const {isOpen, onOpen, onOpenChange} = useDisclosure();

	const verificationCodeInputRef = React.useRef(null);
	const phoneInputRef = React.useRef(null);
	const fullNameInputRef = React.useRef(null);

	const [valuePhone, setValuePhone] = React.useState('');
	const [valueVerificationCode, setValueVerificationCode] = React.useState('');
	const [valueFullName, setValueFullName] = React.useState('');
	const [valueFullNameOnlyText, setValueFullNameOnlyText] = React.useState('');
	const [valueNotes, setValueNotes] = React.useState('');
	const [valueInvitees, setValueInvitees] = React.useState('2');
	const [valuePresence, setValuePresence] = React.useState([]);
	const [valueIsLoading, setValueIsLoading] = React.useState(true);
	const [valueParcheggio, setValueParcheggio] = React.useState(false);
	const [valueLoader, setValueLoader] = React.useState(30);

	const [isDataLoading, setDataLoading] = React.useState(false);
	const [signinButtonLoading, setSigninButtonLoading] = React.useState(false);
	const [signupButtonLoading, setSignupButtonLoading] = React.useState(false);
	const [userinfoButtonLoading, setUserinfoButtonLoading] = React.useState(false);
	const [deleteProfileButtonLoading, setDeleteProfileButtonLoading] = React.useState(false);

	const [stepEnterPhoneNumber, setStepEnterPhoneNumber] = React.useState(false);
	const [stepVerify, setStepVerify] = React.useState(false);
	const [stepCompleteProfile, setStepCompleteProfile] = React.useState(false);
	const [stepDeleteProfile, setStepDeleteProfile] = React.useState(false);

	const [textError, setTextError] = React.useState('');

	setTimeout(() => phoneInputRef.current.focus(), 0);

	const set_user_data = async () => {
		let userInfo = await get_user_info();
		if (userInfo === null) {
			remove_sign_in();
			return false;
		};
		setValueFullNameOnlyText(userInfo["user_data"]["name"] || "");
		setValueInvitees(userInfo["user_data"]["people_number"] || "");
		let valuePresenceArray = [];
		userInfo["user_data"]["munic_confirm"] ? valuePresenceArray.push("comune") : null;
		userInfo["user_data"]["church_confirm"] ? valuePresenceArray.push("chiesa") : null;
		userInfo["user_data"]["party_confirm"] ? valuePresenceArray.push("rinfresco") : null;
		userInfo["user_data"]["ship_confirm"] ? valuePresenceArray.push("nave") : null;
		setValuePresence(valuePresenceArray);
		setValueNotes(userInfo["user_data"]["notes"]);
		setValueParcheggio(userInfo["user_data"]["needs_park"] || false);
		return true;
	}

	const handleSignUpKeyPress = async (event) => {
		if(event.key === 'Enter'){
			if (valuePhone && isValidPhoneNumber(valuePhone)) {
				await handleSignIn();
			};
		};
	}

	const handleSignInKeyPress = async (event) => {
		if(event.key === 'Enter'){
			if (valueVerificationCode.length === 6) {
				await handleVerifyNumber();
			};
		};
	}

	const handleCompleteProfileKeyPress = async (event) => {
		if(event.key === 'Enter'){
			if (!isButtonStepCompleteProfileDisabled()) {
				await handleCompleteProfile();
			};
		};
	}

	const initializeData = async () => {
		if (is_refresh_token_valid()) {
			setDataLoading(true);
			let retValue = await set_user_data();
			setDataLoading(false);
			if (retValue) {
				setStepDeleteProfile(false);
				setStepEnterPhoneNumber(false);
				setStepVerify(false);
				setStepCompleteProfile(true);
			} else {
				setStepDeleteProfile(false);
				setStepEnterPhoneNumber(true);
				setStepVerify(false);
				setStepCompleteProfile(false);
			};
		} else {
			setStepDeleteProfile(false);
			setStepEnterPhoneNumber(true);
			setStepVerify(false);
			setStepCompleteProfile(false);
		}
	};

	React.useEffect(() => {
    initializeData();
  }, []);

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

	const handleSignIn = async () => {
		setSignupButtonLoading(true);
		await request_verify_code(valuePhone, language);
		console.log("handelSignIn", valuePhone);
		setStepDeleteProfile(false);
		setStepEnterPhoneNumber(false);
		setStepVerify(true);
		setSignupButtonLoading(false);
		setTimeout(() => verificationCodeInputRef.current.focus(), 0);
		setResendCodeInterval();
	};

	const isButtonStepCompleteProfileDisabled = () => {
		let isDis = valuePresence.length === 0 || 
		!["1","2","3","4"].includes(valueInvitees.toString()) || 
		valueFullNameOnlyText === "" ;
		return isDis;
	}

	const handleCode = async (e) => {
		setValueVerificationCode(e);
		// if (e.length == 6) {
		// 	await handleVerifyNumber();
		// };
	};

	const handleInvitees = (e) => {
		setValueInvitees(e.target.value);
	};

	const handleVerifyNumber = async () => {
		setSigninButtonLoading(true);
		console.log("handleVerifyNumber", valuePhone);
		console.log("handleVerifyNumber", valueVerificationCode);
		await enter_verify_code(valuePhone, valueVerificationCode);
		setStepVerify(false);
		setDataLoading(true);
		await set_user_data();
		setStepDeleteProfile(false);
		setDataLoading(false);
		setStepCompleteProfile(true);
		setSigninButtonLoading(false);
		setTimeout(() => fullNameInputRef.current.focus(), 0);
	};

	const handleConfirmDeleteProfile = () => {
		setStepDeleteProfile(true);
		setStepCompleteProfile(false);
	}

	const handleDeleteProfile = async (onClose) => {
		setDeleteProfileButtonLoading(true);
		await signout();
		setDeleteProfileButtonLoading(false);
		props.onCloseForm();
	}

	const handleCompleteProfile = async () => {
		setUserinfoButtonLoading(true);
		console.log("handleCompleteProfile", valueFullName?.target?.value);
		console.log("handleCompleteProfile", valueInvitees);
		console.log("handleCompleteProfile", valuePresence);
		await post_user_info(
			valueFullNameOnlyText || "",
	    parseInt(valueInvitees) || 0,
	    valuePresence.includes("comune"),
	    valuePresence.includes("chiesa"),
	    valuePresence.includes("rinfresco"),
	    valuePresence.includes("nave"),
	    valueParcheggio,
	    false,
	    valueNotes
		);
		setUserinfoButtonLoading(false);
		props.onCloseForm();
	}

	const handleResendVerificationCode = async () => {
		setResendCodeInterval();
		console.log("handleResendVerificationCode", valuePhone);
		await request_verify_code(valuePhone, "it");
		setValueVerificationCode('');
		setTimeout(() => verificationCodeInputRef.current.setEmpty(), 0);
		setTimeout(() => verificationCodeInputRef.current.focus(), 0);
	};

	const buttonSpinnerComponent = () => {
		return(
			<svg
        className="animate-spin h-5 w-5 text-current"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        />
      </svg>
		)
	}

	const isInviteesValid = React.useMemo(() => {
		const pattern = /^[1-4]$/;
		if (valueInvitees == "") return "invalid";
		const isValidChar = pattern.test(valueInvitees);
		return isValidChar ? "valid" : "invalid";
	}, [valueInvitees]);

	return (
<>

	<ModalBody>

			<div className={`${isDataLoading ? "space-y-3" : "hidden"}`}>
				<Skeleton className="rounded-lg">
	        <div className="h-24 rounded-lg bg-default-300"></div>
	      </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-gray-400"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-gray-400"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">  
          <div className="h-3 w-2/5 rounded-lg bg-gray-400"></div>
        </Skeleton>
      </div>

      	<Phone 
      		ref={phoneInputRef}
      		isDisabled={signupButtonLoading}
      		isVisible={stepEnterPhoneNumber}
			valuePhone={valuePhone} 
			setValuePhone={setValuePhone} 
			onKeyPress={handleSignUpKeyPress}
		/>
		<ConfirmCode 
			ref={verificationCodeInputRef}
			isVisible={stepVerify}
			isDisabled={signinButtonLoading}
			value={valueVerificationCode}
			onChange={handleCode}
			onKeyPress={handleSignInKeyPress}
		/>
		<div style={{
			"display": stepCompleteProfile ? 'flex' : 'none'
		}} className="gap-3">
			<Input
				isDisabled={userinfoButtonLoading}
				ref={fullNameInputRef}
				value={valueFullNameOnlyText}
				isRequired
				variant="bordered"
				onChange={(e) => {
					setValueFullName(e);
					setValueFullNameOnlyText(e?.target?.value);
				}}
				onKeyPress={handleCompleteProfileKeyPress}
				label={t('chi')}
			/>
			<Input
				isDisabled={userinfoButtonLoading}
				isRequired
				value={valueInvitees}
				inputMode="numeric" 
				variant="bordered"
				onChange={handleInvitees}
				labelPlacement="outside-left"
				label={t('quanti')}
				onKeyPress={handleCompleteProfileKeyPress}
				color={isInviteesValid === "valid" ? "default" : "danger"}
			    validationState={isInviteesValid}
			    className="w-[50%]"
			/>
		</div>
		<div style={{
			"display": stepCompleteProfile ? 'flex' : 'none'
		}} className="justify-center">
	    	<CheckboxGroup
	    			isDisabled={userinfoButtonLoading}
		        label={t('ciSietePer')}
		        color="warning"
		        value={valuePresence}
		        onValueChange={setValuePresence}
		        className="flex gap-3 items-center"
	      	>	
	      		<div className="grid grid-cols-2 gap-x-5 gap-y-2">
			        <Checkbox value="comune" className="col-span-1">
			        	<div className="flex gap-x-1 items-center">
			        		<FontAwesomeIcon style={{ color: "#f9e285" }} icon={faChessRook} />
			        		<p>{t('comuneTitle')}</p>
			        	</div>
			        </Checkbox>
			        <Checkbox value="chiesa" className="col-span-1">
			        	<div className="flex gap-x-1 items-center">
			        		<FontAwesomeIcon style={{ color: "#f9e285" }} icon={faChurch} />
			        		<p>{t('chiesaTitle')}</p>
			        	</div>
			        </Checkbox>
			        <Checkbox value="rinfresco" className="col-span-1">
			        	<div className="flex gap-x-1 items-center">
			        		<FontAwesomeIcon style={{ color: "#f9e285" }} icon={faWineGlass} />
			        		<p>{t('rinfrescoTitle')}</p>
			        	</div>
			        </Checkbox>
			        <Checkbox value="nave" className="col-span-1">
			        	<div className="flex gap-x-1 items-center">
			        		<FontAwesomeIcon style={{ color: "#f9e285" }} icon={faShip} />
			        		<p>{t('partyTitle')}</p>
			        	</div>
			        </Checkbox>
			    </div>
	    	</CheckboxGroup>
	    </div>
	    <div style={{
				"display": stepCompleteProfile ? 'flex' : 'none'
			}} className="justify-center flex-col">
				<Textarea
					isDisabled={userinfoButtonLoading}
		      variant="bordered"
		      value={valueNotes}
		      placeholder={t('notesPH')}
		      onValueChange={setValueNotes}
		      onKeyPress={handleCompleteProfileKeyPress}
		      className="max-w"
		    />
		    <Checkbox isDisabled={userinfoButtonLoading} color="warning" defaultSelected={valueParcheggio} isSelected={valueParcheggio} value={valueParcheggio} onValueChange={setValueParcheggio}>
        	<div className="flex gap-x-1 items-center">
        		<p>{t('parcheggioCheckbox')}</p>
        	</div>
        </Checkbox>
			</div>
			<div style={{
				"display": stepDeleteProfile ? 'flex' : 'none'
			}} className="justify-center">
				<Textarea
					isDisabled={deleteProfileButtonLoading}
					isReadOnly={true}
		      variant="underlined"
		      value={t('eliminaRSVPModalContent')}
		      className="max-w"
		    />
			</div>

			<p style={{
				"display": textError !== "" ? 'flex' : 'none'
			}} className="justify-center text-center text-red-400">{t(textError)}</p>
    </ModalBody>
    <ModalFooter className="grid grid-cols-4 py-4 ">


    	<div className="col-span-2 flex -px-2 items-center">
    		<CircularProgress
			    aria-label={t('loader')}
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
	          {t('reCode')}
	        </Button>

	        <Button 
	        	isDisabled={userinfoButtonLoading}
	       	 	className={stepCompleteProfile ? "outline-none border-[#f9e285] text-[#f9e285] break-words" : "hidden"} 
	        	color="primary" 
	        	variant="bordered" 
	        	onPress={handleConfirmDeleteProfile}
	        >
	          {t('eliminaRSVP')}
	        </Button>

        </div>
    	<div className="col-span-2 gap-2 flex justify-end items-center">

	        <Button isIconOnly className={stepEnterPhoneNumber || stepCompleteProfile || stepVerify ? "visible" : "hidden"}  color="danger" variant="flat" onClick={props.onCloseForm}>
	          <FontAwesomeIcon icon={faCircleXmark} />
	        </Button>

	        <Button isIconOnly className={stepDeleteProfile ? "visible" : "hidden"}  color="danger" variant="flat" onClick={
	        	() => {
	        		setStepCompleteProfile(true);
	        		setStepDeleteProfile(false);
	        	}
	        }>
	          <FontAwesomeIcon icon={faCircleXmark} />
	        </Button>

	        <Button 
	        	isIconOnly 
	        	isDisabled={isButtonStepCompleteProfileDisabled()}
	        	className={stepCompleteProfile ? "visible" : "hidden"} 
	        >
	          <DownloadCalendar />
	        </Button>
	        <Button 
	        	isIconOnly 
	        	isLoading={signupButtonLoading}
	        	isDisabled={valuePhone && !isValidPhoneNumber(valuePhone) || !valuePhone}
	        	className={stepEnterPhoneNumber ? "visible" : "hidden"} 
	        	color="primary" 
	        	onPress={handleSignIn}
	        	spinner={buttonSpinnerComponent()}
	        >
	          <FontAwesomeIcon className={signupButtonLoading ? "hidden" : "visible"}  icon={faArrowRight} />
	        </Button>
	        <Button 
	        	isIconOnly 
	        	isDisabled={valueVerificationCode.length !== 6}
	        	isLoading={signinButtonLoading}
	        	className={stepVerify ? "visible" : "hidden"} 
	        	color="primary" 
	        	onPress={handleVerifyNumber}
	        	spinner={buttonSpinnerComponent()}
	        >
	          <FontAwesomeIcon className={signinButtonLoading ? "hidden" : "visible"} icon={faArrowRight} />
	        </Button>
	        <Button 
	        	isIconOnly 
	        	isDisabled={isButtonStepCompleteProfileDisabled()}
	        	isLoading={userinfoButtonLoading}
	        	className={stepCompleteProfile ? "visible" : "hidden"} 
	        	color="success" 
	        	onPress={handleCompleteProfile}
	        	spinner={buttonSpinnerComponent()}
	        >
	          <FontAwesomeIcon className={userinfoButtonLoading ? "hidden" : "visible"} icon={faCircleCheck} />
	        </Button>

	        <Button 
	        	isIconOnly 
	        	isLoading={deleteProfileButtonLoading}
	        	className={stepDeleteProfile ? "visible" : "hidden"} 
	        	color="primary" 
	        	onPress={handleDeleteProfile}
	        	spinner={buttonSpinnerComponent()}
	        >
	          <FontAwesomeIcon className={deleteProfileButtonLoading ? "hidden" : "visible"} icon={faCircleCheck} />
	        </Button>
        </div>
    </ModalFooter>
</>
	);
};