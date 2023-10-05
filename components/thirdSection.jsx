import React, { useCallback } from 'react';
import { LaNostraGiornataCard } from './laNostraGiornataCard'
import {Card, CardHeader} from "@nextui-org/react";
import {
    faChurch,
	faShip,
	faChessRook,
	faWineGlass,
	faHotel,
	faPersonRunning
} from "@fortawesome/free-solid-svg-icons";

export const ThirdSection = ()  => {

	return (
<section id="dday" className="border-1 rounded-2xl pb-10 border-[#f9e285] h-full mt-10 flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full" data-scroll-section>
	<Card className="mb-[100px]">
		<CardHeader className="justify-between">

		  	<div className="visible flex gap-5 justify-center items-center w-full">
		        <h4 className="font-['Rochester'] text-[2.5em] text-center font-semibold leading-none text-[#f9e285]">
	              La Nostra Giornata
	            </h4>
		    </div>
    
 		</CardHeader>
	</Card>
	<LaNostraGiornataCard 
		iconSection={faChessRook}
		time="10:00"
		location="Sala Rossa (Bologna)"
		title="Comune"
		description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam."
		maps="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11384.077227580136!2d11.3424552!3d44.4942712!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fd4959b695e13%3A0x727753f91a1d568!2sSala%20Rossa!5e0!3m2!1sit!2sit!4v1692953815679!5m2!1sit!2sit"
	/>
	<LaNostraGiornataCard
		iconSection={faChurch}
		time="11:00"
		location="Chiesa di San Nicola (Bologna)"
		title="Chiesa"
		description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam."
		maps="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2846.028511158793!2d11.327400596789543!3d44.494082600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fd492867d896d%3A0x8c1f962b399e478b!2sChiesa%20Ortodossa%20san%20Basilio%20il%20Grande!5e0!3m2!1sit!2sit!4v1692957093475!5m2!1sit!2sit"
	/>
	<LaNostraGiornataCard
		iconSection={faWineGlass}
		time="13:00"
		location="Bar Vittorio Emanuele (Bologna)"
		title="Rinfresco"
		description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam."
		maps="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2846.029012692724!2d11.338085352203422!3d44.49407232329949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fd4958eccaebf%3A0xe6996ffd16d74a3b!2sBar%20Vittorio%20Emanuele!5e0!3m2!1sit!2sit!4v1692957174859!5m2!1sit!2sit"
	/>
	<LaNostraGiornataCard
		iconSection={faHotel}
		time="17:00"
		location="Hotel Verde Luna (Cervia)"
		title="Hotel"
		description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam."
		maps="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.549624622223!2d12.35579418433675!3d44.25618786764484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb402d76955a5%3A0xa4c3eeb9d108001d!2sHotel%20Verde%20Luna!5e0!3m2!1sit!2sit!4v1692957262714!5m2!1sit!2sit"
	/>
	<LaNostraGiornataCard
		iconSection={faShip}
		time="19:00 - 01:00"
		location="Motonave New Ghibli (Cervia)"
		title="Party - Motonave"
		description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam."
		maps="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2857.0742559390605!2d12.352805811715921!3d44.26729191237689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb5b30e48d387%3A0x73fa44b33c8d6887!2sMotonave%20New%20Ghibli%20-%20Scalo%20%22Cervia%22!5e0!3m2!1sit!2sit!4v1692957394651!5m2!1sit!2sit"
	/>
	<LaNostraGiornataCard
		iconSection={faPersonRunning}
		time="01:00 - TBD"
		location="TBD (Cervia)"
		title="Rapimento della sposa"
		description="TBD"
		maps="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2856.3740057638934!2d12.349537911716677!3d44.28169671143505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb4774c26b0ab%3A0x35477fa06db66f8!2sPapeete%20Beach%20.281!5e0!3m2!1sit!2sit!4v1692957546067!5m2!1sit!2sit"
	/>
</section>
	);
};