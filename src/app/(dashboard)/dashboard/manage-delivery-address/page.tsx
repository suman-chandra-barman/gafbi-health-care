/** @format */
"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/HomeComponents";
import {
  CurrentAddressDisplay,
  AddressForm,
  type AddressFormData,
} from "@/components/ManageDeliveryAddressComponents";

const ManageDeliveryAddressPage = () => {
  const [formData, setFormData] = useState<AddressFormData>({
    streetAddress: "123 Main Street, Apt 4B",
    area: "Downtown",
    city: "Berlin",
    zipCode: "10115",
    email: "alexmorgan86@gmail.com",
    phoneNumber: "+49 123 456 7890",
  });

  const handleChange = (field: keyof AddressFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving address:", formData);
  };

  const currentAddress = `${formData.streetAddress}, ${formData.area}, ${formData.city} ${formData.zipCode}`;

  return (
    <div className="w-full max-w-2xl">
      <PageHeader title="Manage Delivery Address" />

      <div className="mt-6">
        <CurrentAddressDisplay address={currentAddress} />

        <AddressForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ManageDeliveryAddressPage;
