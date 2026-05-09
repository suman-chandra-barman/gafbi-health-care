/** @format */
"use client";
import React, { useMemo, useState } from "react";
import { PageHeader } from "@/components/HomeComponents";
import {
  CurrentAddressDisplay,
  AddressForm,
  type AddressFormData,
} from "@/components/ManageDeliveryAddressComponents";
import ManageDeliveryAddressSkeleton from "@/components/Skeleton/ManageDeliveryAddressSkeleton";
import {
  useGetUserDeliveryAddressQuery,
  useUpdateUserDeliveryAddressMutation,
  type DeliveryAddressData,
} from "@/redux/features/dashboard/delivery-address/deliveryAddressApi";

const emptyFormData: AddressFormData = {
  streetAddress: "",
  area: "",
  city: "",
  zipCode: "",
  email: "",
  phoneNumber: "",
};

const mapDeliveryAddressToFormData = (
  deliveryAddress: DeliveryAddressData,
): AddressFormData => ({
  streetAddress: deliveryAddress.street_address,
  area: deliveryAddress.area,
  city: deliveryAddress.city,
  zipCode: deliveryAddress.zip_code,
  email: deliveryAddress.email,
  phoneNumber: deliveryAddress.phone_number,
});

const ManageDeliveryAddressPage = () => {
  const [formData, setFormData] = useState<AddressFormData>(emptyFormData);
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading, isError } = useGetUserDeliveryAddressQuery();
  const [updateDeliveryAddress, { isLoading: isSaving }] =
    useUpdateUserDeliveryAddressMutation();

  const deliveryAddress = data?.data;

  const handleChange = (field: keyof AddressFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing || !deliveryAddress) {
      return;
    }

    try {
      await updateDeliveryAddress({
        street_address: formData.streetAddress,
        area: formData.area,
        city: formData.city,
        zip_code: formData.zipCode,
        phone_number: formData.phoneNumber,
      }).unwrap();
      setIsEditing(false);
      setFormData(emptyFormData);
    } catch {
      // Keep edit mode enabled so the user can retry.
    }
  };

  const readOnlyFormData = useMemo(() => {
    if (!deliveryAddress) {
      return emptyFormData;
    }
    return mapDeliveryAddressToFormData(deliveryAddress);
  }, [deliveryAddress]);

  const displayFormData = isEditing ? formData : readOnlyFormData;

  const currentAddress = useMemo(() => {
    if (deliveryAddress?.current_address) {
      const current = deliveryAddress.current_address;
      return `${current.street_address}, ${current.area}, ${current.city} ${current.zip_code}`;
    }

    return `${formData.streetAddress}, ${formData.area}, ${formData.city} ${formData.zipCode}`;
  }, [deliveryAddress, formData]);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl">
        <ManageDeliveryAddressSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-2xl">
        <PageHeader title="Manage Delivery Address" />
        <p className="mt-6 text-sm text-red-500">
          Failed to load delivery address. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <PageHeader title="Manage Delivery Address" />

      <div className="mt-6">
        <CurrentAddressDisplay address={currentAddress} />

        <AddressForm
          formData={displayFormData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isEditable={isEditing}
          isSaving={isSaving}
          onEdit={() => {
            if (deliveryAddress) {
              setFormData(mapDeliveryAddressToFormData(deliveryAddress));
              setIsEditing(true);
            }
          }}
          isEditDisabled={!deliveryAddress || isSaving}
        />
      </div>
    </div>
  );
};

export default ManageDeliveryAddressPage;
