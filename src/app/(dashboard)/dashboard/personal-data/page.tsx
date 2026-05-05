/** @format */
"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/HomeComponents";
import {
  PersonalDataForm,
  type PersonalFormData,
} from "@/components/PersonalDataComponents";

const PersonalDataPage = () => {
  const [formData, setFormData] = useState<PersonalFormData>({
    gender: "mister",
    firstName: "Alex",
    lastName: "Morgan",
    dateOfBirth: "1986-05-15",
    levelOfCare: "level-2",
  });

  const handleChange = (field: keyof PersonalFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving personal data:", formData);
  };

  return (
    <div className="w-full max-w-2xl">
      <PageHeader title="Personal Data" />

      <div className="mt-6">
        <PersonalDataForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default PersonalDataPage;
