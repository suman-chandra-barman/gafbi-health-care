/** @format */
"use client";
import React from "react";

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <h1 className="text-xl md:text-2xl font-semibold text-primary uppercase tracking-wide">
      {title}
    </h1>
  );
};

export default PageHeader;
