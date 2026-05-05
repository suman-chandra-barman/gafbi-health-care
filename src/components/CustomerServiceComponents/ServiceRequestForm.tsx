/** @format */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ServiceRequestData {
  reason: string;
  description: string;
}

interface ServiceRequestFormProps {
  formData: ServiceRequestData;
  onChange: (field: keyof ServiceRequestData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const requestReasons = [
  { value: "delivery-issue", label: "Delivery Issue" },
  { value: "product-inquiry", label: "Product Inquiry" },
  { value: "subscription-change", label: "Subscription Change" },
  { value: "billing-question", label: "Billing Question" },
  { value: "technical-support", label: "Technical Support" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

const ServiceRequestForm = ({
  formData,
  onChange,
  onSubmit,
}: ServiceRequestFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">
          Select a reason for request
        </label>
        <Select
          value={formData.reason}
          onValueChange={(value) => onChange("reason", value)}
        >
          <SelectTrigger className="h-11 bg-card border-border w-full">
            <SelectValue placeholder="Select a reason" />
          </SelectTrigger>
          <SelectContent>
            {requestReasons.map((reason) => (
              <SelectItem key={reason.value} value={reason.value}>
                {reason.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">
          Description
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Please describe your request in detail..."
          className="min-h-[120px] bg-card border-border resize-none"
        />
      </div>

      <div className="pt-4">
        <Button type="submit" className="w-full md:w-auto rounded-lg h-11 px-6">
          Submit request
        </Button>
      </div>
    </form>
  );
};

export default ServiceRequestForm;
