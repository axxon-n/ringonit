import React, { Dispatch, SetStateAction } from "react";
import './phone.css'
import PhoneInput from 'react-phone-number-input'
import { useTranslation } from "react-i18next";
// import { getCountries, getCountryCallingCode } from 'react-phone-number-input'
// import en from 'react-phone-number-input/locale/en'

// const CountrySelect = ({ value, onChange, labels, ...rest }) => (
//   <select
//     {...rest}
//     value={value}
//     onChange={event => onChange(event.target.value || undefined)}>
//     <option value="">
//       {labels['ZZ']}
//     </option>
//     {getCountries().map((country) => (
//     	["ZZ", "IT", "GB", "RO", "DE"].includes(country) ?
//     		<option key={country} value={country}>
// 		       {labels[country]} +{getCountryCallingCode(country)}
// 		    </option>
//     	:
//     		<></>
//     ))}
//   </select>
// )

export const Phone = React.forwardRef((props, ref) => {

	const { t, i18n: {changeLanguage, language} } = useTranslation();

	React.useEffect(() => {
	    let phoneCountries = document.getElementsByClassName('PhoneInputCountrySelect');
	    let idx = -1;
	    while (phoneCountries[0].length > 5) {
	    	idx += 1;
	    	if (!["IT","GB","RO","DE","ZZ"].includes(phoneCountries[0][idx]['value'])) {
	    		phoneCountries[0].remove(idx);
	    		idx -= 1;
	    	};
	    };
	}, []);

	return (
		<PhoneInput
				ref={ref}
			disabled={props.isDisabled}
			international={false}
	      placeholder={t('numeroDiTelefono')}
	      defaultCountry={language.toUpperCase().replace(/^.*-/, "") === "EN" ? "GB" : language.toUpperCase().replace(/^.*-/, "")}
	      value={props.valuePhone}
	      onChange={(v) => {
	      	console.log(v);
	      	if (v) {
	      		let vv  = v.replace(/^\+\d*\+/, "+");
	      		console.log(vv);
	      		props.setValuePhone(vv)
	      	} else {
	      		props.setValuePhone(v)
	      	};
	      }}
	      onKeyPress={props.onKeyPress}
	      style={{
	      	cursor: 'text',
	      	display: props.isVisible ? 'flex' : 'none'
	      }}
	      className="xs:text-[0.7em] ss:text-[1em] h-14 py-2 gap-2 transition-background !duration-150 transition-colors motion-reduce:transition-none border-medium border-default-200 hover:[&:not(:focus-within)]:border-default-400 focus-within:border-foreground px-3 rounded-medium min-h-unit-10"
	    />
	);
});