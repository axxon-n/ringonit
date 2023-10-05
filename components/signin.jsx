import React from "react";
import {Phone} from "./phone";
import {ConfirmCode} from "./confirmationcode";
import {Input, Textarea, Skeleton, ModalBody, ModalFooter, Button, CheckboxGroup, Checkbox, CircularProgress} from "@nextui-org/react";
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
import { request_verify_code, enter_verify_code, post_user_info, get_user_info, is_refresh_token_valid, is_user_logged_in } from "../api.js";

export const SignIn = (props) => {

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
	const [valueLoader, setValueLoader] = React.useState(30);

	const [isDataLoading, setDataLoading] = React.useState(false);
	const [signinButtonLoading, setSigninButtonLoading] = React.useState(false);
	const [signupButtonLoading, setSignupButtonLoading] = React.useState(false);
	const [userinfoButtonLoading, setUserinfoButtonLoading] = React.useState(false);

	const [stepEnterPhoneNumber, setStepEnterPhoneNumber] = React.useState(false);
	const [stepVerify, setStepVerify] = React.useState(false);
	const [stepCompleteProfile, setStepCompleteProfile] = React.useState(false);

	setTimeout(() => phoneInputRef.current.focus(), 0);

	const initializeData = async () => {
		setDataLoading(true);
		let userInfo = await get_user_info();
		setValueFullNameOnlyText(userInfo["user_data"]["name"] || "");
		setValueInvitees(userInfo["user_data"]["people_number"] || "");
		let valuePresenceArray = [];
		userInfo["user_data"]["munic_confirm"] ? valuePresenceArray.push("comune") : null;
		userInfo["user_data"]["church_confirm"] ? valuePresenceArray.push("chiesa") : null;
		userInfo["user_data"]["party_confirm"] ? valuePresenceArray.push("rinfresco") : null;
		userInfo["user_data"]["ship_confirm"] ? valuePresenceArray.push("nave") : null;
		setValuePresence(valuePresenceArray);
		setValueNotes(userInfo["user_data"]["notes"]);
		setDataLoading(false);
		if (is_refresh_token_valid) {
			setStepEnterPhoneNumber(false);
			setStepVerify(false);
			setStepCompleteProfile(true);
		} else {
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
		await request_verify_code(valuePhone, "it");
		console.log("handelSignIn", valuePhone);
		setStepEnterPhoneNumber(false);
		setStepVerify(true);
		setSignupButtonLoading(false);
		setTimeout(() => verificationCodeInputRef.current.focus(), 0);
		setResendCodeInterval();
	};

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
		setStepCompleteProfile(true);
		setSigninButtonLoading(false);
		setTimeout(() => fullNameInputRef.current.focus(), 0);
	};

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
	    false,
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
		/>
		<ConfirmCode 
			ref={verificationCodeInputRef}
			isVisible={stepVerify}
			isDisabled={signinButtonLoading}
			value={valueVerificationCode}
			onChange={handleCode}
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
				label="Chi sei?"
			/>
			<Input
				isDisabled={userinfoButtonLoading}
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
	    			isDisabled={userinfoButtonLoading}
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
	    <div style={{
				"display": stepCompleteProfile ? 'flex' : 'none'
			}} className="justify-center">
				<Textarea
					isDisabled={userinfoButtonLoading}
		      variant="bordered"
		      value={valueNotes}
		      placeholder="...se volete dirci qualcosa..."
		      onValueChange={setValueNotes}
		      className="max-w"
		    />
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
	        <Button 
	        	isIconOnly 
	        	isLoading={signupButtonLoading}
	        	className={stepEnterPhoneNumber ? "visible" : "hidden"} 
	        	color="primary" 
	        	onPress={handleSignIn}
	        	spinner={buttonSpinnerComponent()}
	        >
	          <FontAwesomeIcon className={signupButtonLoading ? "hidden" : "visible"}  icon={faArrowRight} />
	        </Button>
	        <Button 
	        	isIconOnly 
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
	        	isLoading={userinfoButtonLoading}
	        	className={stepCompleteProfile ? "visible" : "hidden"} 
	        	color="success" 
	        	onPress={handleCompleteProfile}
	        	spinner={buttonSpinnerComponent()}
	        >
	          <FontAwesomeIcon className={userinfoButtonLoading ? "hidden" : "visible"} icon={faCircleCheck} />
	        </Button>
        </div>
    </ModalFooter>
</>
	);
};