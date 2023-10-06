import React, { useCallback } from 'react';
import {Card, CardHeader, Skeleton} from "@nextui-org/react";
import {
    faChurch,
	faShip,
	faChessRook,
	faWineGlass,
	faHotel,
	faPersonRunning
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export const FourthSection = ()  => {

	const { t, i18n: {changeLanguage, language} } = useTranslation();

	return (
<section id="gallery" className="border-1 rounded-2xl pb-10 border-[#f9e285] h-full mt-10 flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full" data-scroll-section>
	<Card className="mb-[10px]">
		<CardHeader className="justify-between">

		  	<div className="visible flex gap-5 justify-center items-center w-full">
		        <h4 className="font-['Rochester'] text-[2.5em] text-center font-semibold leading-none text-[#f9e285]">
	              {t('gallery')}
	            </h4>
		    </div>
    
 		</CardHeader>
	</Card>
	<div className='flex-col flex items-center justify-center text-center'>
		<video controls autoPlay="" poster="https://ringon.it/img/image_16_2.png" src="https://ringon.it/img/main_video.MP4" type="video/mp4" className="items-center justify-center text-center" style={{ width: 'auto', height: '75vh' }}></video>
		<h4 className="font-['Rochester'] text-[1.5em] mt-2 text-center font-semibold  leading-none text-[#f9e285]">
          {t('galleryPH')}
        </h4>
	</div>
</section>
	);
};