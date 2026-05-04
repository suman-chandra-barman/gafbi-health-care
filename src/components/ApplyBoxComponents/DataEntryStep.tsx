/** @format */

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoveLeft, MoveRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DataEntryStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNext: (data: any) => void;
  onPrev: () => void;
}

export default function DataEntryStep({
  data,
  onNext,
  onPrev,
}: DataEntryStepProps) {
  const { t } = useTranslation();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [formData, setFormData] = useState({
    personalDetails: data.personalDetails,
    address: data.address,
    contact: data.contact,
  });
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [consultationChoice, setConsultationChoice] = useState("");
  const [consultationReason, setConsultationReason] = useState("");
  const [suppliedByAnotherProvider, setSuppliedByAnotherProvider] =
    useState(false);

  const handleInputChange = (
    section: string,
    field: string,
    value: string | boolean,
  ) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof formData],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    if (currentSubStep < 3) {
      setCurrentSubStep(currentSubStep + 1);
    } else {
      setShowAccountModal(true);
    }
  };

  const handlePrevSubStep = () => {
    if (currentSubStep > 1) {
      setCurrentSubStep(currentSubStep - 1);
      return;
    }

    onPrev();
  };

  const handleCreateAccount = () => {
    setShowAccountModal(false);
    onNext(formData);
  };

  const isStep1Valid = () => {
    return (
      formData.personalDetails.gender &&
      formData.personalDetails.firstName &&
      formData.personalDetails.lastName &&
      formData.personalDetails.dateOfBirth &&
      formData.personalDetails.careLevel
    );
  };

  const isStep2Valid = () => {
    return (
      formData.address.street &&
      formData.address.city &&
      formData.address.zipCode &&
      formData.contact.email &&
      formData.contact.phone &&
      (!formData.address.differentDelivery ||
        (formData.address.deliveryStreet &&
          formData.address.deliveryCity &&
          formData.address.deliveryZipCode))
    );
  };

  const isStep3Valid = () => {
    return true;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="mb-6 sm:mb-8 text-lg sm:text-2xl font-bold text-primary">
        {t("apply.dataEntry")}
      </h2>

      {/* Step 1: Personal Details */}
      {currentSubStep === 1 && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-8">
          <h3 className="mb-4 sm:mb-6 text-base sm:text-lg font-bold text-primary">
            Personal Details
          </h3>

          <div className="space-y-4 sm:space-y-6">
            {/* Gender Selection */}
            <div>
              <p className="mb-3 text-sm font-medium text-primary">Gender</p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Mr"
                    checked={formData.personalDetails.gender === "Mr"}
                    onChange={(e) =>
                      handleInputChange(
                        "personalDetails",
                        "gender",
                        e.target.value,
                      )
                    }
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-secondary">Mister</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Mrs"
                    checked={formData.personalDetails.gender === "Mrs"}
                    onChange={(e) =>
                      handleInputChange(
                        "personalDetails",
                        "gender",
                        e.target.value,
                      )
                    }
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-secondary">Woman</span>
                </label>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.personalDetails.firstName}
                  onChange={(e) =>
                    handleInputChange(
                      "personalDetails",
                      "firstName",
                      e.target.value,
                    )
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.personalDetails.lastName}
                  onChange={(e) =>
                    handleInputChange(
                      "personalDetails",
                      "lastName",
                      e.target.value,
                    )
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                />
              </div>
            </div>

            {/* Date of Birth and Care Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.personalDetails.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange(
                      "personalDetails",
                      "dateOfBirth",
                      e.target.value,
                    )
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Level of Care
                </label>
                <select
                  value={formData.personalDetails.careLevel}
                  onChange={(e) =>
                    handleInputChange(
                      "personalDetails",
                      "careLevel",
                      e.target.value,
                    )
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                >
                  <option value="">Select Level of Care</option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                  <option value="4">Level 4</option>
                  <option value="5">Level 5</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isStep1Valid()}
              className="flex cursor-pointer items-center gap-2 rounded-md bg-button-bg px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next 1/3 <MoveRight />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Address */}
      {currentSubStep === 2 && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-8">
          <h3 className="mb-4 sm:mb-6 text-base sm:text-lg font-bold text-primary">
            Address
          </h3>

          <div className="space-y-6">
            {/* Primary Address */}
            <div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Street Address & House No."
                    value={formData.address.street}
                    onChange={(e) =>
                      handleInputChange("address", "street", e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                  />
                  <input
                    type="text"
                    placeholder="Area"
                    value={formData.address.area}
                    onChange={(e) =>
                      handleInputChange("address", "area", e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={(e) =>
                      handleInputChange("address", "city", e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.address.zipCode}
                    onChange={(e) =>
                      handleInputChange("address", "zipCode", e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                  />
                </div>
              </div>
            </div>
            <h5 className="text-sm font-semibold">Contact details</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.contact.email}
                  onChange={(e) =>
                    handleInputChange("contact", "email", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.contact.phone}
                  onChange={(e) =>
                    handleInputChange("contact", "phone", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                />
              </div>
            </div>

            {/* Different Delivery Address */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.address.differentDelivery}
                onChange={(e) =>
                  handleInputChange(
                    "address",
                    "differentDelivery",
                    e.target.checked,
                  )
                }
                className="h-4 w-4"
              />
              <span className="text-sm font-medium text-primary">
                Different delivery address
              </span>
            </label>

            {formData.address.differentDelivery && (
              <div>
                <h4 className="mb-4 text-sm font-semibold text-primary">
                  Delivery Address
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={formData.address.deliveryStreet}
                      onChange={(e) =>
                        handleInputChange(
                          "address",
                          "deliveryStreet",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                    />
                    <input
                      type="text"
                      placeholder="Area"
                      value={formData.address.deliveryArea}
                      onChange={(e) =>
                        handleInputChange(
                          "address",
                          "deliveryArea",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.address.deliveryCity}
                      onChange={(e) =>
                        handleInputChange(
                          "address",
                          "deliveryCity",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={formData.address.deliveryZipCode}
                      onChange={(e) =>
                        handleInputChange(
                          "address",
                          "deliveryZipCode",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrevSubStep}
              className="flex cursor-pointer items-center gap-2 px-6 py-2 text-sm font-semibold text-button-bg transition-all hover:opacity-80 sm:py-3"
            >
              <MoveLeft /> {t("common.previous")}
            </button>
            <button
              onClick={handleNext}
              disabled={!isStep2Valid()}
              className="flex cursor-pointer items-center gap-2 rounded-md bg-button-bg px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("common.next")} 2/3{" "}
              <span>
                <MoveRight />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Details */}
      {currentSubStep === 3 && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-8">
          <h3 className="mb-4 sm:mb-6 text-base sm:text-lg font-bold text-primary">
            Do you need a Consultation on the Care Aids?
          </h3>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input
                  type="radio"
                  name="consultation"
                  value="yes-phone"
                  checked={consultationChoice === "yes-phone"}
                  onChange={(e) => setConsultationChoice(e.target.value)}
                  className="h-4 w-4"
                />
                Yes, you can get advice by phone
              </label>
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input
                  type="radio"
                  name="consultation"
                  value="no-professional"
                  checked={consultationChoice === "no-professional"}
                  onChange={(e) => setConsultationChoice(e.target.value)}
                  className="h-4 w-4"
                />
                No, I have already been advised (nursing service, health
                insurance or similar)
              </label>
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input
                  type="radio"
                  name="consultation"
                  value="no-products"
                  checked={consultationChoice === "no-products"}
                  onChange={(e) => setConsultationChoice(e.target.value)}
                  className="h-4 w-4"
                />
                No, I know my needs and the products.
              </label>
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input
                  type="radio"
                  name="consultation"
                  value="no-experience"
                  checked={consultationChoice === "no-experience"}
                  onChange={(e) => setConsultationChoice(e.target.value)}
                  className="h-4 w-4"
                />
                No, I already receive care aids and know my way around.
              </label>
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input
                  type="radio"
                  name="consultation"
                  value="no-dont-want"
                  checked={consultationChoice === "no-dont-want"}
                  onChange={(e) => setConsultationChoice(e.target.value)}
                  className="h-4 w-4"
                />
                No, I don&apos;t want to be advised.
              </label>
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input
                  type="radio"
                  name="consultation"
                  value="no-because"
                  checked={consultationChoice === "no-because"}
                  onChange={(e) => setConsultationChoice(e.target.value)}
                  className="h-4 w-4"
                />
                No, because:
              </label>
              {consultationChoice === "no-because" && (
                <textarea
                  placeholder="Tell us why don't you need advice?"
                  value={consultationReason}
                  onChange={(e) => setConsultationReason(e.target.value)}
                  className="min-h-22.5 w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
                />
              )}
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold text-primary">
                Are you already provided with Care Aids?
              </h4>
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={suppliedByAnotherProvider}
                  onChange={(e) =>
                    setSuppliedByAnotherProvider(e.target.checked)
                  }
                  className="h-4 w-4"
                />
                Yes, I am supplied by another provider
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrevSubStep}
              className="flex cursor-pointer items-center gap-2 px-6 py-2 text-sm font-semibold text-button-bg transition-all hover:opacity-80 sm:py-3"
            >
              <MoveLeft /> {t("common.previous")}
            </button>
            <button
              onClick={handleNext}
              disabled={!isStep3Valid()}
              className="flex cursor-pointer items-center gap-2 rounded-md bg-button-bg px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("common.next")} 3/3{" "}
              <span>
                <MoveRight />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Account Creation Modal */}
      <Dialog open={showAccountModal} onOpenChange={setShowAccountModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-primary">
              Manage Care Box Online
            </DialogTitle>
            <h1 className="text-xl font-bold">Create and Account</h1>
            <DialogDescription className="text-secondary">
              For faster and easier care box management, we suggest creating a
              user account.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <button
              onClick={handleCreateAccount}
              className="w-full cursor-pointer rounded-md bg-button-bg py-2 text-sm font-semibold text-white hover:opacity-90 transition-all"
            >
              Create
            </button>
            <button
              onClick={handleCreateAccount}
              className="w-full cursor-pointer rounded-md border-2 border-button-bg py-2 text-sm font-semibold text-button-bg hover:bg-blue-50 transition-all"
            >
              Do not manage care box online
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
