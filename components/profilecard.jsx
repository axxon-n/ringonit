import React from "react";
import {Card, CardFooter, CardHeader, CardBody, Avatar} from "@nextui-org/react";
import {Heart} from "./heart";

export const ProfileCard = React.forwardRef(({ className, image, name, description, rightToLeftOrder }, ref) => {

	return (
<Card ref={ref} className={`${className ?? ""}`}>
  <CardHeader className="justify-between border-b border-b-[#f9e285] ">

  	<div className={rightToLeftOrder ? "hidden" : "visible flex gap-5 justify-between w-full"}>
	    <div className="flex gap-5 items-center justify-center">
	      <Avatar isBordered className="ring-1 ring-[#f9e285]" radius="full" size="md" src={`https://ringon.it/img/${image}`} />
	      <h4 className="font-['Sacramento'] text-[3em] font-semibold leading-none text-[#f9e285]">
	        {name}
	      </h4>
	    </div>
	    <Heart/>
  	</div>

  	<div className={rightToLeftOrder ? "visible flex gap-5 justify-between w-full" : "hidden"}>
      <Heart/>
        <div className="flex gap-5 items-center justify-center">
          <h4 className="font-['Sacramento'] text-[3em] font-semibold leading-none text-[#f9e285]">
            {name}
          </h4>
          <Avatar isBordered className="ring-1 ring-[#f9e285]" radius="full" size="md" src={`https://ringon.it/img/${image}`} />
        </div>
    </div>
    
  </CardHeader>
  <CardBody className="px-3 py-0 text-small justify-center text-center text-[#f9e28590]">
    <p>
      {description}
    </p>
  </CardBody>
  <CardFooter className={`gap-3 ${rightToLeftOrder ? "justify-start" : "justify-end"}`}>
    <div className="flex gap-1">
      <p className="font-semibold text-[#f9e28570] text-small">97.1K</p>
      <p className="text-[#f9e28570] text-small">Hearts</p>
    </div>
  </CardFooter>
</Card>
	);
});

