/** @format */
"use client";
import React from "react";
import { Clock, Phone } from "lucide-react";

interface ContactInfoCardProps {
  workingHours: string;
  phoneNumber: string;
}

const ContactInfoCard = ({
  workingHours,
  phoneNumber,
}: ContactInfoCardProps) => {
  return (
    <div className="bg-card rounded-xl p-4 mb-6">
      <h3 className="text-base font-semibold text-primary mb-4">Contact Us</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-tertiary">Working Hours</p>
            <p className="text-sm font-medium text-primary">{workingHours}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-tertiary">Phone Number</p>
            <p className="text-sm font-medium text-primary">{phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
