/** @format */

"use client";

import Image from "next/image";
import { MoveLeft, NotebookText, RefreshCw } from "lucide-react";
import React, { useState, useRef } from "react";
import { PiWarning } from "react-icons/pi";
import { useTranslation } from "react-i18next";

interface ApplicationStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNext: (data: any) => void;
  onPrev: () => void;
}

export default function ApplicationStep({
  data,
  onNext,
  onPrev,
}: ApplicationStepProps) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    consultation: data.consultation,
    insurance: data.insurance,
    applicationSign: data.applicationSign,
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const [showPrivateInsuranceModal, setShowPrivateInsuranceModal] =
    useState(false);
  const [showInsuranceTipModal, setShowInsuranceTipModal] = useState(false);

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

  const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const point = getCanvasPoint(e);
    if (!point) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const point = getCanvasPoint(e);
    if (!point) return;

    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) ctx.closePath();
    setIsDrawing(false);
  };

  const resetSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleNext = () => {
    onNext(formData);
  };

  const handlePrivateInsuranceSelection = () => {
    setShowPrivateInsuranceModal(true);
    handleInputChange("insurance", "type", "private");
  };

  const isFormValid = () => {
    return (
      formData.insurance.type &&
      formData.insurance.number &&
      formData.applicationSign.hasSignedCost &&
      formData.applicationSign.hasSignedSupplier
    );
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 sm:mb-8 text-lg sm:text-2xl font-bold text-primary">
        {t("apply.application")}
      </h2>

      <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-8">
        <p className="mb-6 text-xs sm:text-sm text-secondary">
          Enter your insurance details now & sign it! If you do not have your
          insurance details at hand, we will automatically send you a package
          with the application documents.
        </p>

        {/* Insurance Section */}
        <div className="mb-8 space-y-4">
          <h4 className="text-sm sm:text-base font-bold text-primary">
            Information on the Health or long-term Care Insurance fund
          </h4>

          <div className="space-y-3">
            {[
              { value: "legal", label: "Legally insured" },
              { value: "private", label: "Privately insured" },
              { value: "local", label: "Local/Social Welfare Office" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="insurance"
                  value={option.value}
                  checked={formData.insurance.type === option.value}
                  onChange={() => {
                    if (option.value === "private") {
                      handlePrivateInsuranceSelection();
                    } else {
                      handleInputChange("insurance", "type", option.value);
                    }
                  }}
                  className="h-4 w-4"
                />
                <span className="text-xs sm:text-sm text-secondary">
                  {option.label}
                </span>
              </label>
            ))}
          </div>

          {/* Insurance Dropdown */}
          <div>
            <label className="mb-2 block text-sm font-medium text-primary">
              Health or long-term care insurance
            </label>
            <select
              defaultValue=""
              className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
            >
              <option value="">Select insurance provider</option>
            </select>
          </div>

          {/* Insurance Number Input */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
              Insurance Number
              <span className="text-yellow-500">
                <PiWarning />
              </span>
            </label>
            <input
              type="text"
              placeholder="Insurance Number"
              value={formData.insurance.number}
              onChange={(e) =>
                handleInputChange("insurance", "number", e.target.value)
              }
              className="w-full rounded-md border border-gray-300 px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-button-bg"
            />
            <button
              type="button"
              onClick={() => setShowInsuranceTipModal(true)}
              className="mb-2 inline-flex items-center text-xs text-yellow-600 underline cursor-pointer sm:text-sm mt-1 gap-1"
            >
              <Image
                src="/icons/Lightbulb.svg"
                alt="tips"
                width={20}
                height={20}
              />{" "}
              Tip: Find insurance number
            </button>
          </div>
        </div>

        {/* Signature Area */}
        <div className="mb-8">
          <h4 className="mb-4 text-sm sm:text-base font-bold text-primary">
            Sign the Application
          </h4>
          <p className="mb-4 text-xs sm:text-sm text-secondary">
            Your application is already filled out and ready. Here you have the
            opportunity to check everything again.
          </p>

          <div className="mb-4 flex flex-col gap-2">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-xs text-button-bg underline sm:text-sm"
            >
              <NotebookText /> Open application for cost coverage
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-xs text-button-bg underline sm:text-sm"
            >
              <NotebookText /> Open application for a change of supplier
            </a>
          </div>

          <div className="mb-4 rounded-md border-2 border-gray-200 bg-gray-50 p-4">
            <p className="mb-4 text-center text-xs sm:text-sm text-gray-400">
              Please sign here (by mouse or finger movement)
            </p>
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full border border-gray-300 bg-white cursor-crosshair"
            />
          </div>

          <button
            onClick={resetSignature}
            className="mb-4 inline-flex items-center gap-2 text-xs text-button-bg hover:underline sm:text-sm"
          >
            <RefreshCw /> Reset
          </button>

          {/* Sign checkboxes */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.applicationSign.hasSignedCost}
                onChange={(e) =>
                  handleInputChange(
                    "applicationSign",
                    "hasSignedCost",
                    e.target.checked,
                  )
                }
                className="mt-1 h-4 w-4"
              />
              <span className="text-xs sm:text-sm text-secondary">
                I hereby sign the application for the assumption of costs
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.applicationSign.hasSignedSupplier}
                onChange={(e) =>
                  handleInputChange(
                    "applicationSign",
                    "hasSignedSupplier",
                    e.target.checked,
                  )
                }
                className="mt-1 h-4 w-4"
              />
              <span className="text-xs sm:text-sm text-secondary">
                I hereby sign the application for the change of supplier
              </span>
            </label>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            If I submit this application for a third person in need of care, I
            assure that the person has authorized me to do so and can present
            this power of attorney at any time.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            I confirm that I have been informed that the desired products may be
            used without exception for home care by a private caregiver (and not
            by care services or day care facilities).
          </p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onPrev}
            className="flex cursor-pointer items-center gap-2 px-6 py-2 text-sm font-semibold text-button-bg transition-all hover:opacity-80 sm:py-3"
          >
            <MoveLeft /> {t("common.previous")}
          </button>
          <button
            onClick={handleNext}
            disabled={!isFormValid()}
            className="rounded-md bg-button-bg cursor-pointer px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("common.submit")}
          </button>
        </div>
      </div>

      {/* Private Insurance Modal */}
      {showPrivateInsuranceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 sm:p-8">
            <h3 className="mb-4 text-base font-bold text-primary">
              Important Information
            </h3>
            <h4 className="mb-4 text-sm font-bold text-primary">
              Privately insured?
            </h4>
            <p className="mb-6 text-xs sm:text-sm text-secondary">
              If you are privately insured, we cannot settle the bill directly
              with your long-term care insurance fund. We will send you an
              invoice for the care aids supplied, which you can then submit to
              your private long-term care insurance company for reimbursement.
              Please note that a care level must be available for this.
            </p>

            <button
              onClick={() => setShowPrivateInsuranceModal(false)}
              className="w-full rounded-md bg-button-bg py-3 text-xs sm:text-sm font-semibold text-white hover:opacity-90 transition-all"
            >
              Ok
            </button>
          </div>
        </div>
      )}

      {showInsuranceTipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-4 sm:p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-primary">
                Your insurance number
              </h3>
              <p className="mt-2 text-sm text-secondary">
                Please enter the insurance number including the capital letter
                in the field.
              </p>
            </div>

            <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
              <Image
                src="/insurance.png"
                alt="Insurance card example"
                width={680}
                height={410}
                className="h-auto w-full rounded-md"
                priority
              />
            </div>

            <button
              type="button"
              onClick={() => setShowInsuranceTipModal(false)}
              className="mt-4 w-full rounded-md cursor-pointer bg-button-bg py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
