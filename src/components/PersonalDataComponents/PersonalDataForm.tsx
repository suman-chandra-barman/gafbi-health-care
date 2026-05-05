/** @format */
"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GenderSelector from "./GenderSelector";

export interface PersonalFormData {
  gender: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  levelOfCare: string;
}

interface PersonalDataFormProps {
  formData: PersonalFormData;
  onChange: (field: keyof PersonalFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const careLevels = [
  { value: "level-1", label: "Level 1" },
  { value: "level-2", label: "Level 2" },
  { value: "level-3", label: "Level 3" },
  { value: "level-4", label: "Level 4" },
  { value: "level-5", label: "Level 5" },
];

const PersonalDataForm = ({
  formData,
  onChange,
  onSubmit,
}: PersonalDataFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <GenderSelector
        value={formData.gender}
        onChange={(value) => onChange("gender", value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            First Name
          </label>
          <Input
            type="text"
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            className="h-11 bg-card border-border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Last Name
          </label>
          <Input
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            className="h-11 bg-card border-border"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">
          Date of Birth
        </label>
        <Input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => onChange("dateOfBirth", e.target.value)}
          className="h-11 bg-card border-border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">
          Level of Care
        </label>
        <Select
          value={formData.levelOfCare}
          onValueChange={(value) => onChange("levelOfCare", value)}
        >
          <SelectTrigger className="h-11 bg-card border-border w-full">
            <SelectValue placeholder="Select level of care" />
          </SelectTrigger>
          <SelectContent>
            {careLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4">
        <Button type="submit" className="w-full md:w-auto rounded-lg h-11 px-6">
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default PersonalDataForm;
