import React, { useState } from 'react';
import VerificationCodeInput from './VerificationCodeInput';

const VerificationCodeInputs = React.forwardRef(({codeLength, value, onChange, isDisabled, onKeyPress}, ref) => {
    const emptyCode = Array(codeLength).fill('');
    const [code, setCode] = useState(emptyCode);

    const myRefs = React.useRef([]);
    myRefs.current = code.map((_, i) => myRefs.current[i] ?? React.createRef());

    const handleCode = (ev, value, index) => {

        const newCode = [...code];
        const remainingFields = codeLength - index;
        const newValue = value.length ? value.split('', remainingFields) : [''];
        const newValueSize = value.length ? value.length : 1; 
        const target = ev.currentTarget;

        newCode.splice(index, newValueSize , ...newValue);
        setCode(newCode);

        if(value.length && value.length < codeLength  && index !== codeLength - 1) {
            (target.nextElementSibling || null).focus({preventScroll: true});
        }
        if(value.length === codeLength) {
            target.blur();
        }

        if (onChange) {
            onChange(newCode.join(""));
        };
        
    }

    const handleKey = (ev, index) => {
        const target = ev.currentTarget;
        if(ev.key === 'Backspace' && target.value === '' && index) {
            (target.previousElementSibling || null).focus({preventScroll: true});
        }
        if(ev.key === 'ArrowLeft') {
            const prevElement = target.previousElementSibling || null;
            if(prevElement) prevElement.focus({preventScroll: true});
        }
        if(ev.key === 'ArrowRight') {
            const nextElement = target.nextElementSibling || null;
            if(nextElement) nextElement.focus({preventScroll: true});
        }
    }

    React.useImperativeHandle(ref, () => ({
        focus: () => {
          myRefs.current[0].current.focus({preventScroll: true});
        },
        setEmpty: () => {
            setCode(emptyCode);
        }
    }));

    return (
            <div className="flex gap-2">
                {
                    code.map((char, index) => ( 
                        <VerificationCodeInput 
                            ref={myRefs.current[index]}
                            key={index} 
                            disabled={isDisabled}
                            handleCode={handleCode} 
                            handleKey={handleKey}
                            char={char} 
                            index={index} 
                            maxLength={codeLength}
                            onKeyPress={onKeyPress}
                        />
                    ))
                }
            </div>
    );
});

export default VerificationCodeInputs;