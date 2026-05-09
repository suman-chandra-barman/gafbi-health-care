/** @format */
"use client";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "@/components/HomeComponents";
import {
  PersonalDataForm,
  type PersonalFormData,
} from "@/components/PersonalDataComponents";
import PersonalDataSkeleton from "@/components/Skeleton/PersonalDataSkeleton";
import {
  useGetUserPersonalDataQuery,
  useUpdateUserPersonalDataMutation,
  type PersonalDataPayload,
} from "@/redux/features/dashboard/personal-data/personalDataApi";

const resolveImageUrl = (imagePath: string | null) => {
  if (!imagePath) {
    return "";
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  return `${baseUrl}${imagePath}`;
};

const PersonalDataPage = () => {
  const [formData, setFormData] = useState<PersonalFormData>({
    gender: "mister",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    levelOfCare: 1,
    imageUrl: "",
    imageFile: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading, isError } = useGetUserPersonalDataQuery();
  const [updatePersonalData, { isLoading: isSaving }] =
    useUpdateUserPersonalDataMutation();

  const personalData = data?.data;

  const mapPersonalDataToFormData = (
    payload: PersonalDataPayload,
  ): PersonalFormData => ({
    gender: payload.gender,
    firstName: payload.first_name,
    lastName: payload.last_name,
    dateOfBirth: payload.date_of_birth,
    levelOfCare: payload.level_of_care,
    imageUrl: resolveImageUrl(payload.image),
    imageFile: null,
  });

  const handleChange = (
    field: keyof PersonalFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing || !personalData) {
      return;
    }

    try {
      const response = await updatePersonalData({
        image: formData.imageFile,
        gender: formData.gender,
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        level_of_care: formData.levelOfCare,
      }).unwrap();
      toast.success(response.message || "Personal data updated.");
      setIsEditing(false);
      setFormData((prev) => ({ ...prev, imageFile: null }));
    } catch {
      toast.error("Failed to update personal data.");
    }
  };

  const readOnlyFormData = useMemo(() => {
    if (!personalData) {
      return formData;
    }

    return mapPersonalDataToFormData(personalData);
  }, [formData, personalData]);

  const displayFormData = isEditing ? formData : readOnlyFormData;

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl">
        <PersonalDataSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-2xl">
        <PageHeader title="Personal Data" />
        <p className="mt-6 text-sm text-red-500">
          Failed to load personal data. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <PageHeader title="Personal Data" />

      <div className="mt-6">
        <PersonalDataForm
          formData={displayFormData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onImageChange={(file) =>
            setFormData((prev) => ({ ...prev, imageFile: file }))
          }
          isEditable={isEditing}
          isSaving={isSaving}
          onEdit={() => {
            if (personalData) {
              setFormData(mapPersonalDataToFormData(personalData));
              setIsEditing(true);
            }
          }}
          isEditDisabled={!personalData || isSaving}
        />
      </div>
    </div>
  );
};

export default PersonalDataPage;
