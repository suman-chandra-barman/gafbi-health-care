/** @format */

"use client";

import Image from "next/image";
import React, { useState } from "react";
import ProductSelectionStep from "./ProductSelectionStep";
import DataEntryStep from "./DataEntryStep";
import ApplicationStep from "./ApplicationStep";
import DoneStep from "./DoneStep";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface FormData {
  selectedProducts: Array<{
    id: string;
    name: string;
    quantity: number;
    volume: string;
    price?: number;
  }>;
  personalDetails: {
    gender: "Mr" | "Mrs" | "";
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    careLevel: string;
  };
  address: {
    street: string;
    area: string;
    city: string;
    zipCode: string;
    differentDelivery: boolean;
    deliveryStreet: string;
    deliveryArea: string;
    deliveryCity: string;
    deliveryZipCode: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  consultation: {
    needsConsultation: boolean;
    consultationReason?: string;
    alreadyHasAids: boolean;
  };
  insurance: {
    type: "legal" | "private" | "local" | "";
    number: string;
  };
  applicationSign: {
    hasSignedCost: boolean;
    hasSignedSupplier: boolean;
  };
}

const getInitialFormData = (): FormData => ({
  selectedProducts: [],
  personalDetails: {
    gender: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    careLevel: "",
  },
  address: {
    street: "",
    area: "",
    city: "",
    zipCode: "",
    differentDelivery: false,
    deliveryStreet: "",
    deliveryArea: "",
    deliveryCity: "",
    deliveryZipCode: "",
  },
  contact: {
    email: "",
    phone: "",
  },
  consultation: {
    needsConsultation: false,
    consultationReason: "",
    alreadyHasAids: false,
  },
  insurance: {
    type: "",
    number: "",
  },
  applicationSign: {
    hasSignedCost: false,
    hasSignedSupplier: false,
  },
});

export default function ApplyBoxStepper() {
  const { t } = useTranslation();
  const steps = [
    { id: 1, label: t("apply.productSelection") },
    { id: 2, label: t("apply.dataEntry") },
    { id: 3, label: t("apply.application") },
    { id: 4, label: t("apply.done") },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(getInitialFormData);
  const [isApplicationCompleted, setIsApplicationCompleted] = useState(false);

  const handleNext = (updatedData?: Partial<FormData>) => {
    if (updatedData) {
      setFormData((prev) => ({ ...prev, ...updatedData }));
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    console.log("Application completed with data:", formData);
    setIsApplicationCompleted(true);
  };

  const handleStartNewApplication = () => {
    setFormData(getInitialFormData());
    setCurrentStep(1);
    setIsApplicationCompleted(false);
  };

  const getStepState = (stepId: number) => {
    if (currentStep > stepId) return "completed";
    if (currentStep === stepId) return "active";
    return "upcoming";
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProductSelectionStep
            data={formData.selectedProducts}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <DataEntryStep
            data={formData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <ApplicationStep
            data={formData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 4:
        return <DoneStep onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#d2d9df] pb-8 sm:pb-12">
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-full items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Gafbi"
              width={36}
              height={36}
              priority
            />
            <p className="text-[30px] font-semibold leading-none text-[#1e5a83]">
              {t("common.brand")}
            </p>
          </Link>
          <p className="hidden text-center text-base font-semibold text-[#1e5a83] md:block">
            {t("apply.helpLine")}
            <span className="ml-1 text-[#9cbf4b]">030 / 555 785 042</span>
          </p>
          <button className="rounded-md border border-[#1e5a83] px-3 py-1.5 text-sm font-semibold text-[#1e5a83] transition-colors hover:bg-[#eaf3fa]">
            {t("apply.requestChange")}
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-2/3 px-4 sm:px-6">
        <div className="mb-8 mt-8 flex w-full items-center overflow-x-auto pb-2 sm:mb-10">
          <div className="flex w-full items-center px-5 md:px-8">
            {steps.map((step, index) => {
              const stepState = getStepState(step.id);

              return (
                <React.Fragment key={step.id}>
                  <div
                    className={`flex h-12 flex-1 items-center justify-center rounded-[5px] border px-3 text-base font-semibold transition-all ${
                      stepState === "active"
                        ? "border-[#1e5a83] bg-[#1e5a83] text-white"
                        : "border-[#3d77a6] bg-white text-[#1e5a83]"
                    }`}
                  >
                    <span>
                      {step.id}. {step.label}
                    </span>
                    {stepState === "completed" && (
                      <span className="ml-2 text-lg leading-none text-[#22b45e]">
                        ✓
                      </span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="h-px flex-1 border-t border-dashed border-[#8fa2b1]" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="mx-auto w-full">
          {isApplicationCompleted ? (
            <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-10">
              <h3 className="text-2xl font-bold text-primary">
                {t("apply.appSubmitted")}
              </h3>
              <p className="mt-3 text-sm text-secondary">
                {t("apply.appSubmittedDesc")}
              </p>
              <div className="mt-6">
                <button
                  onClick={handleStartNewApplication}
                  className="rounded-md bg-button-bg px-6 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                >
                  {t("apply.startNew")}
                </button>
              </div>
            </div>
          ) : (
            renderStep()
          )}
        </div>
      </div>

      <div className="mx-auto mt-6 block w-full max-w-295 px-4 md:hidden">
        <p className="text-center text-base font-semibold text-[#1e5a83]">
          {t("apply.helpLine")}
          <span className="ml-1 text-[#9cbf4b]">030 / 555 785 042</span>
        </p>
      </div>
    </div>
  );
}
