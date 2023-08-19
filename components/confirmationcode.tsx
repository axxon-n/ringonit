import React from "react";
import VerificationCodeInputs from '@/components/VerificationCodeInputs';
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  isVisible: boolean;
  value: string;
  onChange?: Dispatch<SetStateAction<string>>;
};

export const ConfirmCode = React.forwardRef((props: Props, ref): React.ReactNode => {

  const setVisible = (): string => {
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
      <p className="relative text-small text-foreground-500">Verifica il numero di telefono</p>
      <PopoverTrigger>
        <Button isIconOnly variant="light" className="relative text-small text-foreground-500">
          <FontAwesomeIcon style={{ color: "#f9e285", opacity: "0.5" }} icon={faCircleInfo} />
        </Button>
      </PopoverTrigger>
    </div>
    <PopoverContent>
      {(titleProps) => (
        <div className="px-1 py-2">
          <div className="text-tiny">Controlla i messaggi inviati al tuo numero di telefono e inserisci il codice</div>
        </div>
      )}
    </PopoverContent>
  </Popover>
  <VerificationCodeInputs 
    ref={ref}
    codeLength={6}
    value={props.value}
    onChange={props.onChange}
  />
</div>
  );

});