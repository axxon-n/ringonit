import React, { Dispatch, SetStateAction } from "react";
import './phone.css'
import PhoneInput from 'react-phone-number-input'

export const Phone = React.forwardRef((props, ref) => {

	return (
		<PhoneInput
				ref={ref}
			disabled={props.isDisabled}
	      placeholder="Inserisci il tuo numero di telefono"
	      defaultCountry="IT"
	      value={props.valuePhone}
	      onChange={props.setValuePhone}
	      style={{
	      	cursor: 'text',
	      	display: props.isVisible ? 'flex' : 'none'
	      }}
	      className="h-14 py-2 gap-2 transition-background !duration-150 transition-colors motion-reduce:transition-none border-medium border-default-200 hover:[&:not(:focus-within)]:border-default-400 focus-within:border-foreground px-3 rounded-medium min-h-unit-10"
	    />
	);
});