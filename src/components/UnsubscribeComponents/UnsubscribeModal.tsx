/** @format */
"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UnsubscribeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const UnsubscribeModal = ({
  open,
  onOpenChange,
  onConfirm,
}: UnsubscribeModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-primary">
            Unsubscribe
          </DialogTitle>
          <DialogDescription className="text-sm text-tertiary pt-2">
            Are you sure you want to unsubscribe? This action will cancel your
            subscription and you will no longer receive Gafbi box deliveries.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto rounded-lg h-10"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="w-full sm:w-auto rounded-lg h-10"
          >
            Unsubscribe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnsubscribeModal;
