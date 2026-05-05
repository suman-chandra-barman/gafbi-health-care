/** @format */
"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/HomeComponents";
import {
  ContactInfoCard,
  ServiceRequestForm,
  type ServiceRequestData,
} from "@/components/CustomerServiceComponents";

const CustomerServicePage = () => {
  const [formData, setFormData] = useState<ServiceRequestData>({
    reason: "",
    description: "",
  });

  const handleChange = (field: keyof ServiceRequestData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting request:", formData);
  };

  return (
    <div className="w-full max-w-2xl">
      <PageHeader title="Customer Service" />

      <div className="mt-6">
        <ContactInfoCard
          workingHours="Mon - Fri, 9:00 AM - 6:00 PM"
          phoneNumber="+49 123 456 7890"
        />

        <ServiceRequestForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CustomerServicePage;
