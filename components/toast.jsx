import React from "react";

import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export function notifyToast(title, description, type) {

  toast.custom(
    (t) => (
      <div
        className={`flex flex-row items-center justify-between w-96 bg-gray-900 px-4 py-6 text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out ${t.visible ? "top-0": "-top-96"} toast-${type}`}
      >
        <div className="text-xl text-[#f9e285]">
          <FontAwesomeIcon icon={`${type === 's' ? "fa-solid fa-heart-circle-check" : "fa-solid fa-heart-circle-exclamation"}`} />
        </div>
        <div className="flex flex-col items-start justify-center ml-4 cursor-default">
          <h1 className="text-base text-[#f9e285] font-semibold leading-none tracking-wider">
          	{useTranslation(title)}
          </h1>
          <p className="text-sm text-[#f9e285] mt-2 leading-relaxed tracking-wider">
            {useTranslation(description)}
          </p>
        </div>
        <div className="absolute top-2 right-2 cursor-pointer text-lg;" onClick={() => toast.dismiss(t.id)}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
      </div>
    ),
    { id: "unique-notification", position: "top-center" }
  );
}

export function Toast(props) {

	return (
		<Toaster />
	);

}
