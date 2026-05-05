/** @format */
"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface AddressFormData {
  streetAddress: string;
  area: string;
  city: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
}

interface AddressFormProps {
  formData: AddressFormData;
  onChange: (field: keyof AddressFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddressForm = ({ formData, onChange, onSubmit }: AddressFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">
          Street Address
        </label>
        <Input
          type="text"
          value={formData.streetAddress}
          onChange={(e) => onChange("streetAddress", e.target.value)}
          placeholder="Enter your street address"
          className="h-11 bg-card border-border"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Area
          </label>
          <Input
            type="text"
            value={formData.area}
            onChange={(e) => onChange("area", e.target.value)}
            placeholder="Enter area"
            className="h-11 bg-card border-border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            City
          </label>
          <Input
            type="text"
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="Enter city"
            className="h-11 bg-card border-border"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">
          ZIP Code
        </label>
        <Input
          type="text"
          value={formData.zipCode}
          onChange={(e) => onChange("zipCode", e.target.value)}
          placeholder="Enter ZIP code"
          className="h-11 bg-card border-border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">
          Email
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="Enter your email"
          className="h-11 bg-card border-border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">
          Phone Number
        </label>
        <Input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => onChange("phoneNumber", e.target.value)}
          placeholder="Enter your phone number"
          className="h-11 bg-card border-border"
        />
      </div>

      <div className="pt-4">
        <Button type="submit" className="w-full md:w-auto rounded-lg h-11 px-6">
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
