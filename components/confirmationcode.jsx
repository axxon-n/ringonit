import React from "react";
import VerificationCodeInputs from './VerificationCodeInputs';
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export const ConfirmCode = React.forwardRef((props, ref) => {

  const { t, i18n: {changeLanguage, language} } = useTranslation();

  const setVisible = () => {
    if (props.isVisible) {
      return 'block';
    } else {
      return 'none';
    };
  };

  return (
<div style={{
  display: props.isVisible ? 'block' : 'none'
}}>
  <Popover placement="top">
    <div className="flex items-center">
      <p className="relative text-small text-foreground-500">{t('verificaIlNumeroDiTelefonoTitle')}</p>
      <PopoverTrigger>
        <Button isIconOnly variant="light" className="relative text-small text-foreground-500">
          <FontAwesomeIcon style={{ color: "#f9e285", opacity: "0.5" }} icon={faCircleInfo} />
        </Button>
      </PopoverTrigger>
    </div>
    <PopoverContent>
      {(titleProps) => (
        <div className="px-1 py-2">
          <div className="text-tiny">{t('verificaIlNumeroDiTelefonoDescription')}</div>
        </div>
      )}
    </PopoverContent>
  </Popover>
  <VerificationCodeInputs 
    ref={ref}
    codeLength={6}
    isDisabled={props.isDisabled}
    value={props.value}
    onChange={props.onChange}
    onKeyPress={props.onKeyPress}
  />
</div>
  );

});