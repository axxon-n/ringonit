import React from "react";
import {Card, CardFooter, CardHeader, CardBody, Avatar} from "@nextui-org/react";
import {Heart} from "./heart";

export const ProfileCard = React.forwardRef(({ className, image, name, description, rightToLeftOrder, heartz, newHeart }, ref) => {

	return (
<Card ref={ref} className={`${className ?? ""}`}>
  <CardHeader className="justify-between border-b border-b-[#f9e285] ">

  	<div className={rightToLeftOrder ? "hidden" : "visible flex gap-5 justify-between w-full"}>
	    <div className="flex gap-5 items-center justify-center">
	      <Avatar isBordered className="ring-1 ring-[#f9e285]" radius="full" size="md" src={`https://ringon.it/img/${image}`} />
	      <h4 className="font-['Sacramento'] xs:text-[2em] ss:text-[3em] font-semibold leading-none text-[#f9e285]">
	        {name}
	      </h4>
	    </div>
	    <Heart newHeart={newHeart}/>
  	</div>

  	<div className={rightToLeftOrder ? "visible flex gap-5 justify-between w-full" : "hidden"}>
      <Heart newHeart={newHeart}/>
        <div className="flex gap-5 items-center justify-center">
          <h4 className="font-['Sacramento'] xs:text-[2em] ss:text-[3em] font-semibold leading-none text-[#f9e285]">
            {name}
          </h4>
          <Avatar isBordered className="ring-1 ring-[#f9e285]" radius="full" size="md" src={`https://ringon.it/img/${image}`} />
        </div>
    </div>
    
  </CardHeader>
  <CardBody className="px-3 py-0 mt-2 text-small justify-center item-center text-center text-[#f9e28590]">
    <p className="item-center">
      {description}
    </p>
  </CardBody>
  <CardFooter className={`gap-3 ${rightToLeftOrder ? "justify-start" : "justify-end"}`}>
    <div className="flex gap-1">
      <p className="font-semibold text-[#f9e28570] text-small">{heartz.toString()}</p>
      <p className="text-[#f9e28570] text-small">♥</p>
    </div>
  </CardFooter>
</Card>
	);
});

