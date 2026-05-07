export interface CareboxFormData {
  applicationId: number | null;
  selectedProducts: Array<{
    id: number;
    name: string;
    quantity: number;
    volume: string;
    price: number;
    imageUrl?: string;
  }>;
  personalDetails: {
    gender: "Mr" | "Mrs" | "Diverse" | "";
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
    answer: string;
    reason: string;
    alreadyProvided: boolean;
  };
  insurance: {
    type: "legal" | "private" | "local" | "";
    name: string;
    number: string;
  };
  applicationSign: {
    hasSignedCost: boolean;
    hasSignedSupplier: boolean;
    signatureDataUrl: string;
  };
}