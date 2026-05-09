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

export type PersonalGender = "mister" | "woman" | "diverse";

export interface PersonalFormData {
  gender: PersonalGender;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  levelOfCare: number;
  imageUrl: string;
  imageFile: File | null;
}

interface PersonalDataFormProps {
  formData: PersonalFormData;
  onChange: (field: keyof PersonalFormData, value: string | number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onImageChange?: (file: File | null) => void;
  isEditable?: boolean;
  isSaving?: boolean;
  onEdit?: () => void;
  isEditDisabled?: boolean;
}

const careLevels = Array.from({ length: 9 }, (_, index) => {
  const level = index + 1;
  return { value: String(level), label: `Level ${level}` };
});

const PersonalDataForm = ({
  formData,
  onChange,
  onSubmit,
  onImageChange,
  isEditable = true,
  isSaving = false,
  onEdit,
  isEditDisabled = false,
}: PersonalDataFormProps) => {
  const isDisabled = !isEditable || isSaving;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!isEditable && (
        <div className="flex items-center justify-end">
          <Button
            type="button"
            className="w-full md:w-auto rounded-lg h-11 px-6"
            onClick={onEdit}
            disabled={isEditDisabled}
          >
            Edit
          </Button>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-100">
          {formData.imageUrl ? (
            <img
              src={formData.imageUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-tertiary">
              No image
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-medium text-primary">
            Profile Image
          </label>
          <Input
            type="file"
            accept="image/*"
            className="h-11 bg-card border-border disabled:text-black disabled:opacity-100"
            disabled={isDisabled}
            onChange={(e) => onImageChange?.(e.target.files?.[0] ?? null)}
          />
        </div>
      </div>

      <GenderSelector
        value={formData.gender}
        onChange={(value) => onChange("gender", value)}
        isDisabled={isDisabled}
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
            className="h-11 bg-card border-border disabled:text-black disabled:opacity-100"
            disabled={isDisabled}
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
            className="h-11 bg-card border-border disabled:text-black disabled:opacity-100"
            disabled={isDisabled}
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
          className="h-11 bg-card border-border disabled:text-black disabled:opacity-100"
          disabled={isDisabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">
          Level of Care
        </label>
        <Select
          value={String(formData.levelOfCare)}
          onValueChange={(value) => onChange("levelOfCare", Number(value))}
          disabled={isDisabled}
        >
          <SelectTrigger className="h-11 bg-card border-border w-full data-disabled:opacity-100 data-disabled:text-black">
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

      {isEditable && (
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full md:w-auto rounded-lg h-11 px-6"
            disabled={isDisabled}
          >
            Save changes
          </Button>
        </div>
      )}
    </form>
  );
};

export default PersonalDataForm;
