'use client'

import React from "react";
import { Navbar } from "@/components/navbar";
import {FirstSection} from "@/components/firstSection";
import {SecondSection} from "@/components/secondSection";
import {ThirdSection} from "@/components/thirdSection";

export default function Home() {

	return (
		<div className="scroll-smooth" data-scroll-container>
			<FirstSection />
			<Navbar />
			<SecondSection />
			<ThirdSection />
		</div>
	);
}
