/** @format */
"use client";
import React from "react";

const DateDisplay = () => {
  const formatDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <p className="text-sm md:text-base text-tertiary mt-1">{formatDate()}</p>
  );
};

export default DateDisplay;
