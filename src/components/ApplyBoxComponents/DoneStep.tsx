/** @format */

"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface DoneStepProps {
  onComplete: () => void;
}

export default function DoneStep({ onComplete }: DoneStepProps) {
  const { t } = useTranslation();
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [satisfaction, setSatisfaction] = useState("");
  const [informationSatisfaction, setInformationSatisfaction] = useState("");

  const handleContinue = () => {
    if (currentSubStep === 1) {
      setCurrentSubStep(2);
    } else if (currentSubStep === 2 && satisfaction) {
      setCurrentSubStep(3);
    } else if (currentSubStep === 3 && informationSatisfaction) {
      onComplete();
    }
  };

  return (
    <div className="w-full">
      {/* Step 1: Success Message */}
      {currentSubStep === 1 && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-12">
          <div className="mb-8 flex flex-col sm:flex-row items-center gap-8">
            {/* Success Message */}
            <div className="flex-1">
              <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-primary">
                Great, that worked!
              </h2>
              <p className="mb-4 text-sm sm:text-base text-secondary leading-relaxed">
                Thank you for taking the time to complete the application.
                We&apos;ll now forward the application for cost coverage to your
                long-term care insurance fund and inform you about the status of
                the processing.
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="flex-1 flex justify-center sm:justify-end">
              <div className="h-48 w-48 sm:h-64 sm:w-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-button-bg ">
                    <Image
                      src="/done-banner.jpg"
                      width={192}
                      height={192}
                      alt="Success"
                      className="h-48 w-48 sm:h-64 sm:w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Satisfaction Question */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="mb-6 text-lg sm:text-xl font-bold text-primary">
              Are you satisfied?
            </h3>
            <p className="mb-6 text-xs sm:text-sm text-secondary">
              If I submit this application for a third person in need of care, I
              assure that the person has authorized me to do so and can present
              this power of attorney at any time. I confirm that I have been
              informed that the desired products may be used without exception
              for home care by a private caregiver (and not by care services or
              day care facilities).
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => onComplete()}
                className="rounded-md cursor-pointer border-2 border-button-bg px-6 sm:px-8 py-1 text-sm sm:text-base font-semibold text-button-bg hover:bg-blue-50 transition-all"
              >
                {t("common.previous")}
              </button>
              <button
                onClick={handleContinue}
                className="rounded-md cursor-pointer bg-button-bg px-6 sm:px-8 py-1 text-sm sm:text-base font-semibold text-white hover:opacity-90 transition-all"
              >
                Give us a feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Overall Satisfaction with Ordering Process */}
      {currentSubStep === 2 && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-12">
          <h3 className="mb-8 text-lg sm:text-xl font-bold text-primary">
            How satisfied are you overall with our ordering process?
          </h3>

          <div className="mb-8 space-y-3">
            {[
              "Very satisfied",
              "Satisfied",
              "Ok",
              "Dissatisfied",
              "Very dissatisfied",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="process-satisfaction"
                  value={option}
                  checked={satisfaction === option}
                  onChange={(e) => setSatisfaction(e.target.value)}
                  className="h-4 w-4"
                />
                <span className="text-xs sm:text-sm text-secondary">
                  {option}
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!satisfaction}
            className="rounded-md cursor-pointer bg-button-bg px-8 py-2 text-sm sm:text-base font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("common.next")}
          </button>
        </div>
      )}

      {/* Step 3: Information Satisfaction */}
      {currentSubStep === 3 && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-12">
          <h3 className="mb-8 text-lg sm:text-xl font-bold text-primary">
            Are you satisfied with the available information about the care box?
          </h3>

          <div className="mb-8 space-y-3">
            {["Yes", "No"].map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="information-satisfaction"
                  value={option}
                  checked={informationSatisfaction === option}
                  onChange={(e) => setInformationSatisfaction(e.target.value)}
                  className="h-4 w-4"
                />
                <span className="text-xs sm:text-sm text-secondary">
                  {option}
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!informationSatisfaction}
            className="rounded-md cursor-pointer bg-button-bg px-8 py-2  text-sm sm:text-base font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("common.done")}
          </button>
        </div>
      )}
    </div>
  );
}
