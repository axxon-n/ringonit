import React, { useState } from 'react';

interface CodeInputProps {
    handleCode: (ev: React.ChangeEvent<HTMLInputElement>, value: string, index: number) => void;
    handleKey: (ev: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
    char: string;
    index: number;
    maxLength: number
}

const VerificationCodeInput = React.forwardRef(({handleCode, handleKey, char, index, maxLength}: CodeInputProps, ref): React.ReactNode => {

    const inputRef = React.useRef(null);

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const pattern = /^\d*$/;
        const target = ev.currentTarget as HTMLInputElement;
        const isValidChar = pattern.test(target.value);

        if(!isValidChar) return;

        handleCode(ev, target.value, index);
    }
    const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
        (ev.currentTarget as HTMLInputElement).select();
    }

    React.useImperativeHandle(ref, () => ({
        focus: () => {
          inputRef.current.focus();
        }
    }));

    return (
        <input 
            id={"verification-code-" + index}
            ref={inputRef}
            type="text" 
            inputMode="numeric" 
            autoComplete="one-time-code"
            placeholder="-"
            onChange={handleChange}
            onKeyDown={(ev) => handleKey(ev, index)}
            value={char}
            onFocus={handleFocus}
            maxLength={maxLength}
            variant="bordered"
            className="relative text-center w-full inline-flex flex-row items-center shadow-sm px-3 gap-3 border-medium border-default-200 hover:[&:not(:focus-within)]:border-default-400 focus-within:placeholder-transparent focus-within:border-foreground focus-visible:outline-none h-unit-10 min-h-unit-10 rounded-medium transition-background !duration-150 transition-colors motion-reduce:transition-none"
        />
    )
});

export default VerificationCodeInput;