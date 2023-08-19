import React, { useState } from 'react';
import VerificationCodeInput from '@/components/VerificationCodeInput';

interface OtpProps {
    codeLength: number;
    value: string;
    onChange?: Dispatch<SetStateAction<string>>;
}

const VerificationCodeInputs = React.forwardRef(({codeLength, value, onChange}: OtpProps, ref): React.ReactNode => {
    const emptyCode = Array(codeLength).fill('');
    const [code, setCode] = useState(emptyCode);

    const myRefs = React.useRef([]);
    myRefs.current = code.map((_, i) => myRefs.current[i] ?? React.createRef());

    const handleCode = (ev: React.ChangeEvent<HTMLInputElement>, value: string, index: number) => {
        const newCode = [...code];
        const remainingFields = codeLength - index;
        const newValue = value.length ? value.split('', remainingFields) : [''];
        const newValueSize = value.length ? value.length : 1; 
        const target = ev.currentTarget as HTMLInputElement;

        newCode.splice(index, newValueSize , ...newValue);
        setCode(newCode);

        if(value.length && value.length < codeLength  && index !== codeLength - 1) {
            (target.nextElementSibling as HTMLInputElement || null).focus();
        }
        if(value.length === codeLength) {
            target.blur();
        }

        if (onChange) {
            onChange(newCode.join(""));
        };
        
    }

    const handleKey = (ev: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const target = ev.currentTarget as HTMLInputElement;
        if(ev.key === 'Backspace' && target.value === '' && index) {
            (target.previousElementSibling as HTMLInputElement || null).focus();
        }
        if(ev.key === 'ArrowLeft') {
            const prevElement = target.previousElementSibling as HTMLInputElement || null;
            if(prevElement) prevElement.focus();
        }
        if(ev.key === 'ArrowRight') {
            const nextElement = target.nextElementSibling as HTMLInputElement || null;
            if(nextElement) nextElement.focus();
        }
    }

    React.useImperativeHandle(ref, () => ({
        focus: () => {
          myRefs.current[0].current.focus();
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
                            handleCode={handleCode} 
                            handleKey={handleKey}
                            char={char} 
                            index={index} 
                            maxLength={codeLength}
                        />
                    ))
                }
            </div>
    );
});

export default VerificationCodeInputs;