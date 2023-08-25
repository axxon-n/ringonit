import React, { useRef, useEffect, useState, useCallback } from "react";
import { HeartFilledIcon } from "@/components/icons"
import {Button} from "@nextui-org/react";
import { gsap, Power3, TweenMax } from 'gsap';

interface Props {
  section?: string;
}

export const Heart = ({ section }: Props) => {

  const ref = useRef<HTMLDivElement>(null);

  gsap.registerPlugin( 
    gsap.CSSPlugin,
    gsap.CSSRulePlugin
  );

  const onPressHeart = () => {
    const animation = TweenMax.fromTo(ref.current,.9,
      {
        scale:2.8
      },
      {
        scale:1,
        ease: Power3.easeOut,
        yoyo: true
      }
    );
    animation.restart();
    //api call
  };

  return (
    <div ref={ref}>
      <Button variant="light" className="outline-none" isIconOnly onPress={() => onPressHeart()}>
        <HeartFilledIcon color="#ff4516" stroke="#f9e285"/>
      </Button>
    </div>
  );
};