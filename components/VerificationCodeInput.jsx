import React, { useState } from 'react';

const VerificationCodeInput = React.forwardRef(({handleCode, handleKey, char, index, maxLength, disabled, onKeyPress}, ref) => {

    const inputRef = React.useRef(null);

    const handleChange = (ev) => {
        const pattern = /^\d*$/;
        const target = ev.currentTarget;
        const isValidChar = pattern.test(target.value);

        if(!isValidChar) return;

        handleCode(ev, target.value, index);
    }
    const handleFocus = (ev) => {
        ev.currentTarget.select();
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
            disabled={disabled}
            inputMode="numeric" 
            autoComplete="one-time-code"
            placeholder="-"
            onChange={handleChange}
            onKeyDown={(ev) => handleKey(ev, index)}
            value={char}
            onFocus={handleFocus}
            maxLength={maxLength}
            onKeyPress={onKeyPress}
            variant="bordered"
            className="relative text-center w-full inline-flex flex-row items-center shadow-sm px-3 gap-3 border-medium border-default-200 hover:[&:not(:focus-within)]:border-default-400 focus-within:placeholder-transparent focus-within:border-foreground focus-visible:outline-none h-unit-10 min-h-unit-10 rounded-medium transition-background !duration-150 transition-colors motion-reduce:transition-none"
        />
    )
});

export default VerificationCodeInput;