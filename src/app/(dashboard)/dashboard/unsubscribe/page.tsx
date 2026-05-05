/** @format */
"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/HomeComponents";
import { Button } from "@/components/ui/button";
import {
  UnsubscribeWarning,
  UnsubscribeModal,
} from "@/components/UnsubscribeComponents";

const UnsubscribePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUnsubscribe = () => {
    console.log("Unsubscribing...");
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-2xl">
      <PageHeader title="Unsubscribe" />

      <div className="mt-6">
        <UnsubscribeWarning />

        <div className="mt-6">
          <p className="text-sm text-tertiary mb-4">
            If you wish to cancel your subscription, click the button below. You
            can always resubscribe later if you change your mind.
          </p>
          <Button
            variant="destructive"
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto rounded-lg h-11 px-6"
          >
            Unsubscribe
          </Button>
        </div>
      </div>

      <UnsubscribeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleUnsubscribe}
      />
    </div>
  );
};

export default UnsubscribePage;
