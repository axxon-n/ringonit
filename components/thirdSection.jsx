import React, { useCallback } from 'react';
import { LaNostraGiornataCard } from './laNostraGiornataCard'
import {Card, CardHeader, Divider, CardBody, Image, CardFooter} from "@nextui-org/react";
// import { gsap, Power3 } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChurch,
	faShip,
	faChessRook,
	faWineGlass,
	faHotel,
	faPersonRunning
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Trans } from 'react-i18next';
import {Rsvp} from "./rsvp";

export const ThirdSection = ()  => {

	const { t, i18n: {changeLanguage, language} } = useTranslation();

	const ref = React.useRef(null);

	//loading="lazy"

	// gsap.registerPlugin( 
	//     ScrollTrigger
	// );

	// React.useEffect(() => {
	// 	gsap.to(ref.current, { 
	// 	  opacity: 1,
	// 	  duration: 0.2,
	// 	  translateY: -10,
	// 	  ease: Power3.easeOutQuad,
	// 	  scrollTrigger: {
	// 	  	trigger: ref.current,
	// 	    start: "30% bottom",
	// 	    toggleActions: "play none none reverse"
	// 	  }
	// 	});
	// },[]);

	return (
<section id="dday" className="border-1 rounded-2xl pb-10 border-[#f9e285] h-full mt-10 flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full" data-scroll-section>
	<Card className="mb-[10px]">
		<CardHeader className="justify-between">

		  	<div className="visible flex gap-5 justify-center items-center w-full">
		        <h4 className="font-['Rochester'] text-[2.5em] text-center font-semibold leading-none text-[#f9e285]">
	              {t('laNostraGiornata')}
	            </h4>
		    </div>
    
 		</CardHeader>
	</Card>

	<Card 
		ref={ref} 
		className="w-[90%] col-span-10 sm:col-span-4 overflow-visible sm:overflow-hidden h-full items-center"
	>

		<CardBody className="px-3 font-['Great_Vibes'] py-5 text-[1.6em] justify-center">
		    
			<p className="text-[1.2em] font-bold text-center mb-10 text-[#f9e28590]"><Trans i18nKey="thirdSection1"/></p>
			
			<p className="text-center"><Trans i18nKey="thirdSection3"/></p>
			<p className="text-center mb-5"><Trans i18nKey="thirdSection4"/></p>
			<FontAwesomeIcon icon={faChessRook} className="text-center text-[#f9e285] text-[1.2em]"/>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
			<p><Trans i18nKey="thirdSection7"/></p>
			</div>
			<p className="text-center"><Trans i18nKey="thirdSection9"/></p>
			<p className="mb-5 text-center"><Trans i18nKey="thirdSection10"/></p>
			<p className="text-center"><Trans i18nKey="thirdSection11"/></p>
			<p className="text-center font-bold text-[#f9e28590]"><Trans i18nKey="thirdSection12"/></p>
			<p className="text-center"><Trans i18nKey="thirdSection13"/></p>
			<p className="mb-10 text-center"><Trans i18nKey="thirdSection14"/></p>

			<p className="text-center"><Trans i18nKey="thirdSection16"/></p>
			<p className="text-center"><Trans i18nKey="thirdSection17"/></p>
			<p className="mb-5 text-center"><Trans i18nKey="thirdSection18"/></p>
			<FontAwesomeIcon icon={faChurch} className="text-center text-[#f9e285] text-[1.2em]"/>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
			<p><Trans i18nKey="thirdSection21"/></p>
			</div>
			<p className="text-center"><Trans i18nKey="thirdSection23"/></p>
			<p className="mb-5 text-center"><Trans i18nKey="thirdSection24"/></p>
			<p className="text-center mb-10"><Trans i18nKey="thirdSection25"/></p>

			<p className="text-center"><Trans i18nKey="thirdSection27"/></p>
			<p className="mb-5 text-center"><Trans i18nKey="thirdSection28"/></p>
			<FontAwesomeIcon icon={faWineGlass} className="text-center text-[#f9e285] text-[1.2em]"/>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
			<p><Trans i18nKey="thirdSection31"/></p>
			</div>
			<p className="text-center"><Trans i18nKey="thirdSection33"/></p>
			<p className="mb-10 text-center"><Trans i18nKey="thirdSection34"/></p>


			<div className="flex flex-row justify-between">
			<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]"><Trans i18nKey="thirdSection38"/></p>   
			<p className="text-right hidden md:flex mr-5 sm:mr-20"><Trans i18nKey="thirdSection39"/></p>
			</div>   
			<div className="flex flex-row justify-between">                                                                            
			<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]"><Trans i18nKey="thirdSection42"/></p>   
			<p className="text-right hidden md:flex mr-5 sm:mr-20"><Trans i18nKey="thirdSection43"/></p>   
			</div>
			<div className="flex flex-row justify-between">                                                                                
			<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]"><Trans i18nKey="thirdSection46"/></p>
			<div className="text-right hidden md:flex mr-5 sm:mr-20">
			<Rsvp textSize="0.7rem" additionalClassData="text-[1.5rem] border-[#f9e285]"/>
			</div>
			</div>

			<div className="max-w-[100%] w-[100%] sm:max-w-[50%] sm:w-[50%] md:mb-10">
			<Image
			width="100%"
			alt="dresscode-bologna"
			className="sm:ml-[50%]"
			src="https://ringon.it/img/dresscode-bologna-1.jpeg"
			/>
			</div>

			<div className="flex flex-col flex mb-10 md:mb-0 md:hidden justify-end text-[0.9em] sm:text-[1em]">
			<p className="text-right mr-5"><Trans i18nKey="thirdSection62"/></p>
			<p className="text-right mr-5"><Trans i18nKey="thirdSection63"/></p>   
			<div className="text-right mr-5">
			<Rsvp textSize="0.7rem" additionalClassData="text-[1.5rem] border-[#f9e285]"/>
			</div>
			</div>

			<Divider className="my-10" />

			<p className="text-[1.2em] font-bold text-center mb-10 text-[#f9e28590]"><Trans i18nKey="thirdSection71"/></p>

			<p className="text-center"><Trans i18nKey="thirdSection73"/></p>
			<p className="text-center mb-5"><Trans i18nKey="thirdSection74"/></p>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
			<p><Trans i18nKey="thirdSection76"/></p>
			</div>
			<p className="text-center"><Trans i18nKey="thirdSection78"/></p>
			<p className="mb-10 text-center"></p>
			<p className="text-center"><Trans i18nKey="thirdSection80"/></p>
			<p className="text-center mb-5"><Trans i18nKey="thirdSection81"/></p>
			<FontAwesomeIcon icon={faHotel} className="text-center text-[#f9e285] text-[1.2em]"/>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
			<p><Trans i18nKey="thirdSection84"/></p>
			</div>
			<p className="text-center"><Trans i18nKey="thirdSection86"/></p>
			<p className="text-center mb-5"><Trans i18nKey="thirdSection87"/></p>
			<p className="text-center mb-10"><Trans i18nKey="thirdSection88"/></p>

			<p className="text-center mb-5"><Trans i18nKey="thirdSection90"/></p>
			<FontAwesomeIcon icon={faShip} className="text-center text-[#f9e285] text-[1.2em]"/>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
			<p><Trans i18nKey="thirdSection93"/></p>
			</div>
			<p className="mb-10 text-center"><Trans i18nKey="thirdSection95"/></p>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
			<p><Trans i18nKey="thirdSection97"/></p>
			</div>
			<p className="mb-5 text-center"><Trans i18nKey="thirdSection99"/></p>

			<p className="text-center"><Trans i18nKey="thirdSection101"/></p>
			<p className="text-center"><Trans i18nKey="thirdSection102"/></p>
			<p className="mb-5 text-center"><Trans i18nKey="thirdSection103"/></p>

			<p className="text-center"><Trans i18nKey="thirdSection105"/></p>
			<div className="mb-10 flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
			<p><Trans i18nKey="thirdSection107"/></p>
			</div>

			<div className="flex flex-row justify-between">
			<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]"><Trans i18nKey="thirdSection111"/></p>   
			<p className="text-right hidden md:flex mr-5 sm:mr-20"><Trans i18nKey="thirdSection112"/></p>
			</div>   
			<div className="flex flex-row justify-between">                                                                            
			<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]"><Trans i18nKey="thirdSection115"/></p>   
			<p className="text-right hidden md:flex mr-5 sm:mr-20"><Trans i18nKey="thirdSection116"/></p>   
			</div>
			<div className="flex flex-row justify-between">                                                                                
			<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]"><Trans i18nKey="thirdSection119"/></p>
			<div className="text-right hidden md:flex mr-5 sm:mr-20">
			<Rsvp textSize="0.7rem" additionalClassData="text-[1.5rem] border-[#f9e285]"/>
			</div>
			</div>

			<div className="max-w-[50%] w-[50%] sm:max-w-[25%] sm:w-[25%] md:mb-20">
			<Image
			width="75%"
			alt="dresscode-bologna"
			className="sm:ml-[225%] ml-[100%]"
			src="https://ringon.it/img/dresscode-mare.jpeg"
			/>
			</div>

			<div className="flex flex-col flex mb-20 md:mb-0 md:hidden justify-end text-[0.9em] sm:text-[1em]">
			<p className="text-right mr-5"><Trans i18nKey="thirdSection135"/></p>
			<p className="text-right mr-5"><Trans i18nKey="thirdSection136"/></p>   
			<div className="text-right mr-5">
			<Rsvp textSize="0.7rem" additionalClassData="text-[1.5rem] border-[#f9e285]"/>
			</div>
			</div>

			<p className="mb-5 text-center"><Trans i18nKey="thirdSection142"/></p>
			<p className="mb-5 text-center"><Trans i18nKey="thirdSection143"/></p>
			<p className="mb-5 text-center"><Trans i18nKey="thirdSection144"/></p>


		    {/*<p className="text-[1.2em] font-bold text-center mb-10 text-[#f9e28590]">Sabato 15 giugno 2024 - Bologna</p>
			
			<p className="text-center">È finalmente giunto il momento di rendere ufficiale il nostro amore,</p>
			<p className="text-center mb-5">e non vediamo l'ora di farlo in grande stile!</p>
			<FontAwesomeIcon icon={faChessRook} className="text-center text-[#f9e285] text-[1.2em]"/>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
				<p>Alle <u>ore 10:00</u> “<u>Sala Rossa</u>”</p>
			</div>
			<p className="text-center">nel Palazzo del Comune in Piazza Maggiore, 6,</p>
			<p className="mb-5 text-center">40121 Bologna </p>
			<p className="text-center">Per rendere il vostro arrivo il più agevole possibile, vi proponiamo di parcheggiare le vostre auto a due passi dal centro storico e proseguire insieme!</p>
			<p className="text-center font-bold text-[#f9e28590]">Alle <u>ore 9:30</u> “<u>Parcheggio interrato</u>”</p>
			<p className="text-center">in Piazza <i className="font-['Quattrocento']"> VIII </i> Agosto, 33, </p>
			<p className="mb-10 text-center">40126 Bologna</p>

			<p className="text-center">Dopo la cerimonia, il nostro viaggio verso il matrimonio continua!  </p>
			<p className="text-center">Per coloro che volessero unirsi a noi in questo secondo momento speciale </p>
			<p className="mb-5 text-center">per la cerimonia religiosa Ortodossa! </p>
			<FontAwesomeIcon icon={faChurch} className="text-center text-[#f9e285] text-[1.2em]"/>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
				<p>Alle <u>ore 11:00</u> “<u>Chiesa di San Nicola</u>”</p>
			</div>
			<p className="text-center">In Via Monaldo Calari, 4, </p>
			<p className="mb-5 text-center">40122 Bologna  </p>
			<p className="text-center mb-10">Dalla Sala Rossa alla chiesa Rumena Ortodossa ci vorranno circa 15 minuti di cammino, sarà un'occasione perfetta per godersi il paesaggio. </p>
			
			<p className="text-center">Una volta finito il rito vi invitiamo a proseguire con noi, </p>
			<p className="mb-5 text-center">per un momento di relax e una pausa, riprendere fiato, uno spuntino e soprattutto bella musica con “Banda Rei”! </p>
			<FontAwesomeIcon icon={faWineGlass} className="text-center text-[#f9e285] text-[1.2em]"/>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
				<p>Alle <u>ore 13:00 (circa)</u> “<u>Bar Vittorio Emanuele</u>”</p>
			</div>
			<p className="text-center">In Piazza Maggiore, 1, </p>
			<p className="mb-10 text-center">40124 Bologna  </p>
			

			<div className="flex flex-row justify-between">
				<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]">Abbigliamento Cerimonia – Bologna</p>   
				<p className="text-right hidden md:flex mr-5 sm:mr-20">è richiesta</p>
			</div>   
			<div className="flex flex-row justify-between">                                                                            
				<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]">Formale / Black Tie</p>   
				<p className="text-right hidden md:flex mr-5 sm:mr-20">Gentile Conferma</p>   
			</div>
			<div className="flex flex-row justify-between">                                                                                
				<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]">(elegante, abito lungo)</p>
				<div className="text-right hidden md:flex mr-5 sm:mr-20">
					<Rsvp textSize="0.7rem"/>
				</div>
			</div>

			<div className="max-w-[100%] w-[100%] sm:max-w-[50%] sm:w-[50%] md:mb-10">
			<Image
			  width="100%"
		      alt="dresscode-bologna"
		      className="sm:ml-[50%]"
		      src="https://ringon.it/img/dresscode-bologna-1.jpeg"
		    />
		    </div>

			<div className="flex flex-col flex mb-10 md:mb-0 md:hidden justify-end text-[0.9em] sm:text-[1em]">
				<p className="text-right mr-5">è richiesta</p>
				<p className="text-right mr-5">Gentile Conferma</p>   
				<div className="text-right mr-5">
					<Rsvp textSize="0.7rem"/>
				</div>
			</div>

			<Divider className="my-10" />

			<p className="text-[1.2em] font-bold text-center mb-10 text-[#f9e28590]">Sabato 15 giugno 2024 – Cervia</p>
			
			<p className="text-center">Il nostro viaggio e divertimento continua. Ci sposteremo insieme da Bologna a Cervia,</p>
			<p className="text-center mb-5">dove abbiamo pianificato tutto per garantirvi il massimo comfort.</p>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
				<p>Verso le <u>ore 15:00</u> partenza dal “<u>Parcheggio interrato</u>”</p>
			</div>
			<p className="text-center">In Piazza <i className="font-['Quattrocento']"> VIII </i> Agosto, 33, 40126 Bologna</p>
			<p className="mb-10 text-center"></p>
			<p className="text-center">Cervia, dove abbiamo a disposizione un albergo di riferimento </p>
			<p className="text-center mb-5">per tutti i nostri ospiti, con ampio giardino e giochi per bambini, animali ammessi, e la possibilità di prenotare un posto auto privato.</p>
			<FontAwesomeIcon icon={faHotel} className="text-center text-[#f9e285] text-[1.2em]"/>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
				<p>Check-in <u>ore 16:30</u> “<u>Hotel Verde Luna</u>”</p>
			</div>
			<p className="text-center">In Viale Milazzo, 78, </p>
			<p className="text-center mb-5">48015 Cervia RA</p>
			<p className="text-center mb-10">I posti letto sono stati pensati per raggruppare una famiglia o due coppie in una stanza. Tuttavia, per esigenze particolari potete provvedere in autonomia per il pernottamento nell'albergo di riferimento o altrove e farci sapere. Per chi non vuole girare per trovare un parcheggio, prenotate il posto riservato a un costo di dieci Euro.</p>
			
			<p className="text-center mb-5">Il nostro viaggio verso la felicità continua con un'esperienza indimenticabile a bordo della motonave. </p>
			<FontAwesomeIcon icon={faShip} className="text-center text-[#f9e285] text-[1.2em]"/>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
				<p><u>Ore 18:55</u> Imbarco “<u>Motonave New Ghibli</u>” </p>
			</div>
			<p className="mb-10 text-center">Porto di Cervia (lato Milano Marittima) Via Ruggero Leoncavallo</p>
			<div className="flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
				<p><u>Ore 19:00</u> partenza (nel caso di mal tempo festeggeremo in porto) </p>
			</div>
			<p className="mb-5 text-center">La motonave New Ghibli ci offre uno sfondo spettacolare mentre navighiamo verso il tramonto, e non vediamo l'ora di condividere questo momento magico con tutti voi.</p>

			<p className="text-center"><u>Ore 19:00-21:00</u> Musica, apericena e tradizioni.  </p>
			<p className="text-center"><u>Ore 21:00-23:00</u> Cena + torta + discorsi. </p>
			<p className="mb-5 text-center"><u>Ore 23:00-01:00</u> Party con dink, musica, balli.  </p>

			<p className="text-center">E per finire, i più giovani e i più resistenti, con voglia di continuare a festeggiare ancora, non mancherà la tradizione rumena...</p>
			<div className="mb-10 flex justify-center gap-4 items-center text-[1.2em] font-bold text-center text-[#f9e28590] font-['Great_Vibes']">
				<p><u>Ore 01:00</u> del 16 giugno 2024 “<u>Rapimento della Sposa</u>”</p>
			</div>

			<div className="flex flex-row justify-between">
				<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]">Abbigliamento Ricevimento - Cervia</p>   
				<p className="text-right hidden md:flex mr-5 sm:mr-20">è richiesta</p>
			</div>   
			<div className="flex flex-row justify-between">                                                                            
				<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]">Smart Casual / Cocktail</p>   
				<p className="text-right hidden md:flex mr-5 sm:mr-20">Gentile Conferma</p>   
			</div>
			<div className="flex flex-row justify-between">                                                                                
				<p className="text-left ml-5 sm:ml-20 text-[0.9em] sm:text-[1em]">(elegante, comodo, abbitto corto, colore estivo)</p>
				<div className="text-right hidden md:flex mr-5 sm:mr-20">
					<Rsvp textSize="0.7rem"/>
				</div>
			</div>

			<div className="max-w-[50%] w-[50%] sm:max-w-[25%] sm:w-[25%] md:mb-20">
			<Image
			  width="75%"
		      alt="dresscode-bologna"
		      className="sm:ml-[225%] ml-[100%]"
		      src="https://ringon.it/img/dresscode-mare.jpeg"
		    />
		    </div>

			<div className="flex flex-col flex mb-20 md:mb-0 md:hidden justify-end text-[0.9em] sm:text-[1em]">
				<p className="text-right mr-5">è richiesta</p>
				<p className="text-right mr-5">Gentile Conferma</p>   
				<div className="text-right mr-5">
					<Rsvp textSize="0.7rem"/>
				</div>
			</div>

			<p className="mb-5 text-center">Ci aspettano emozioni, balli, e tanta allegria mentre festeggiamo insieme. </p>
			<p className="mb-5 text-center">Aggiungeremo maggiori informazioni al momento opportuno.</p>
			<p className="mb-5 text-center">Gli orari possono variare, sarete sempre informati di ogni cambiamento e aggiornati con eventuali novità che attualmente sono in fase di organizzazione.</p>*/}
			
		</CardBody>

	</Card>


	{/*<LaNostraGiornataCard 
		iconSection={faChessRook}
		time="ore10"
		location="comuneLocation"
		title="comuneTitle"
		description="comuneContent"
		maps="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11384.077227580136!2d11.3424552!3d44.4942712!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fd4959b695e13%3A0x727753f91a1d568!2sSala%20Rossa!5e0!3m2!1sit!2sit!4v1692953815679!5m2!1sit!2sit"
	/>
	<LaNostraGiornataCard
		iconSection={faChurch}
		time="ore11"
		location="chiesaLocation"
		title="chiesaTitle"
		description="chiesaContent"
		maps="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2846.028511158793!2d11.327400596789543!3d44.494082600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fd492867d896d%3A0x8c1f962b399e478b!2sChiesa%20Ortodossa%20san%20Basilio%20il%20Grande!5e0!3m2!1sit!2sit!4v1692957093475!5m2!1sit!2sit"
	/>
	<LaNostraGiornataCard
		iconSection={faWineGlass}
		time="ore13"
		location="rinfrescoLocation"
		title="rinfrescoTitle"
		description="rinfrescoContent"
		maps="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2846.029012692724!2d11.338085352203422!3d44.49407232329949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fd4958eccaebf%3A0xe6996ffd16d74a3b!2sBar%20Vittorio%20Emanuele!5e0!3m2!1sit!2sit!4v1692957174859!5m2!1sit!2sit"
	/>
	<LaNostraGiornataCard
		iconSection={faHotel}
		time="ore17"
		location="hotelLocation"
		title="hotelTitle"
		description="hotelContent"
		maps="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.549624622223!2d12.35579418433675!3d44.25618786764484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb402d76955a5%3A0xa4c3eeb9d108001d!2sHotel%20Verde%20Luna!5e0!3m2!1sit!2sit!4v1692957262714!5m2!1sit!2sit"
	/>
	<LaNostraGiornataCard
		iconSection={faShip}
		time="ore19"
		location="partyLocation"
		title="partyTitle"
		description="naveContent"
		maps="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2857.0742559390605!2d12.352805811715921!3d44.26729191237689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb5b30e48d387%3A0x73fa44b33c8d6887!2sMotonave%20New%20Ghibli%20-%20Scalo%20%22Cervia%22!5e0!3m2!1sit!2sit!4v1692957394651!5m2!1sit!2sit"
	/>*/}
</section>
	);
};