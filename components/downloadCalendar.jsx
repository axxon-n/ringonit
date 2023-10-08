import React from "react";
import ICalendarLink from "react-icalendar-link";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";

export const DownloadCalendar = (props) => {

  const { t, i18n: {changeLanguage, language} } = useTranslation();

  const event = {
    title: t('calendarInviteTitle'),
    description: t('calendarInviteDescription'),
    startTime: t('calendarInviteStartTime'),
    endTime: t('calendarInviteEndTime'),
    location: t('calendarInviteLocation')
    // attendees: [
    //   "Lo Sposo <andrea.scarpante@sydea.it>",
    //   "La Sposa <cristina.alexandru@sydea.it>",
    // ]
  }

  return (
    <ICalendarLink event={event} filename="ring-on-it.ics">
      <FontAwesomeIcon style={{ color: "#f9e285" }} className="text-xl" icon={faCalendarCheck} />
    </ICalendarLink>
  );

}