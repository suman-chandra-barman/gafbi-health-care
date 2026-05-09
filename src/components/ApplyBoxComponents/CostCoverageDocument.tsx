/** @format */

import React from "react";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { CareboxFormData } from "@/types/carebox";

interface CostCoverageDocumentProps {
  data: CareboxFormData;
}

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 9,
    color: "#1f2933",
    fontFamily: "Helvetica",
  },
  headerBar: {
    backgroundColor: "#1e5a83",
    color: "#ffffff",
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 9,
  },
  section: {
    border: "1px solid #cfd6dd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  sectionIndex: {
    backgroundColor: "#1e5a83",
    color: "#ffffff",
    width: 18,
    height: 18,
    borderRadius: 3,
    textAlign: "center",
    lineHeight: 18,
    fontSize: 9,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
  },
  fieldRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  fieldLabel: {
    width: "35%",
    color: "#52606d",
  },
  fieldValue: {
    flex: 1,
    borderBottom: "1px solid #cfd6dd",
    minHeight: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  checkbox: {
    width: 10,
    height: 10,
    border: "1px solid #8f9ba8",
    textAlign: "center",
    lineHeight: 10,
    fontSize: 8,
  },
  gridTable: {
    border: "1px solid #cfd6dd",
  },
  gridRow: {
    flexDirection: "row",
    borderBottom: "1px solid #cfd6dd",
  },
  gridCell: {
    padding: 4,
    borderRight: "1px solid #cfd6dd",
  },
  gridHeader: {
    backgroundColor: "#f2f4f7",
    fontWeight: "bold",
  },
  signatureBox: {
    border: "1px solid #cfd6dd",
    height: 60,
    marginTop: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  signatureImage: {
    width: 160,
    height: 40,
    objectFit: "contain",
  },
  note: {
    color: "#52606d",
    marginTop: 6,
    fontSize: 8,
  },
  largeTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
  },
  digitBoxRow: {
    flexDirection: "row",
    gap: 3,
  },
  digitBox: {
    width: 14,
    height: 16,
    border: "1px solid #cfd6dd",
    textAlign: "center",
    lineHeight: 16,
    fontSize: 9,
  },
  pageBreakTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

const getDeliveryAddress = (data: CareboxFormData) => {
  if (!data.address.differentDelivery) return data.address;
  return {
    street: data.address.deliveryStreet,
    area: data.address.deliveryArea,
    city: data.address.deliveryCity,
    zipCode: data.address.deliveryZipCode,
  };
};

const renderDigitBoxes = (value: string, count: number) => {
  const digits = value.replace(/\D/g, "").slice(0, count);
  const padded = digits.padEnd(count, " ");
  return (
    <View style={styles.digitBoxRow}>
      {Array.from(padded).map((char, index) => (
        <Text key={`${char}-${index}`} style={styles.digitBox}>
          {char.trim() ? char : ""}
        </Text>
      ))}
    </View>
  );
};

const renderCheckbox = (checked: boolean) => (
  <Text style={styles.checkbox}>{checked ? "x" : ""}</Text>
);

export default function CostCoverageDocument({
  data,
}: CostCoverageDocumentProps) {
  const deliveryAddress = getDeliveryAddress(data);
  const selectedProducts = data.selectedProducts || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>Order Form - Sanubi Box</Text>
          <Text style={styles.headerSubtitle}>Build your individual box</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIndex}>1</Text>
            <Text style={styles.sectionTitle}>Applicant Details</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Gender</Text>
            <Text style={styles.fieldValue}>{data.personalDetails.gender}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>First name</Text>
            <Text style={styles.fieldValue}>
              {data.personalDetails.firstName}
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Last name</Text>
            <Text style={styles.fieldValue}>
              {data.personalDetails.lastName}
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Street / No.</Text>
            <Text style={styles.fieldValue}>{data.address.street}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>ZIP / City</Text>
            <Text style={styles.fieldValue}>
              {data.address.zipCode} {data.address.city}
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Phone</Text>
            <Text style={styles.fieldValue}>{data.contact.phone}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.fieldValue}>{data.contact.email}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Care level</Text>
            <Text style={styles.fieldValue}>
              {data.personalDetails.careLevel}
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Insurance type</Text>
            <Text style={styles.fieldValue}>{data.insurance.type}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIndex}>2</Text>
            <Text style={styles.sectionTitle}>Caregiver / Contact Person</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Name</Text>
            <Text style={styles.fieldValue}></Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Address</Text>
            <Text style={styles.fieldValue}></Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Phone</Text>
            <Text style={styles.fieldValue}></Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.fieldValue}></Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIndex}>3</Text>
            <Text style={styles.sectionTitle}>Sanubi Box</Text>
          </View>
          {selectedProducts.length === 0 ? (
            <Text style={styles.note}>
              No products selected. Fill in later if needed.
            </Text>
          ) : (
            selectedProducts.map((product) => (
              <View key={product.id} style={styles.checkboxRow}>
                {renderCheckbox(true)}
                <Text>
                  {product.name} ({product.volume}) - Qty: {product.quantity}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIndex}>4</Text>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>
          <View style={styles.checkboxRow}>
            {renderCheckbox(!data.address.differentDelivery)}
            <Text>Same as insured person</Text>
          </View>
          <View style={styles.checkboxRow}>
            {renderCheckbox(data.address.differentDelivery)}
            <Text>Different delivery address</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Street / No.</Text>
            <Text style={styles.fieldValue}>{deliveryAddress.street}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>ZIP / City</Text>
            <Text style={styles.fieldValue}>
              {deliveryAddress.zipCode} {deliveryAddress.city}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIndex}>5</Text>
            <Text style={styles.sectionTitle}>Invoice Recipient</Text>
          </View>
          <View style={styles.checkboxRow}>
            {renderCheckbox(true)}
            <Text>Insured person / care recipient</Text>
          </View>
          <View style={styles.checkboxRow}>
            {renderCheckbox(false)}
            <Text>Caregiver / representative</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIndex}>6</Text>
            <Text style={styles.sectionTitle}>Signature</Text>
          </View>
          <Text>Signature of insured person or authorized person</Text>
          <View style={styles.signatureBox}>
            {data.applicationSign.signatureDataUrl ? (
              <Image
                src={data.applicationSign.signatureDataUrl}
                style={styles.signatureImage}
              />
            ) : (
              <Text style={styles.note}>Signature required</Text>
            )}
          </View>
          <Text style={styles.note}>
            By signing, I confirm the information provided is correct.
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.pageBreakTitle}>
          Attachment 2 - Cost Coverage Request and Consultation Record
        </Text>
        <View style={styles.section}>
          <Text style={styles.largeTitle}>Applicant</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Name</Text>
            <Text style={styles.fieldValue}>
              {data.personalDetails.lastName}
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>First name</Text>
            <Text style={styles.fieldValue}>
              {data.personalDetails.firstName}
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Date of birth</Text>
            <View style={styles.fieldValue}>
              {renderDigitBoxes(data.personalDetails.dateOfBirth, 8)}
            </View>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Insurance number</Text>
            <View style={styles.fieldValue}>
              {renderDigitBoxes(data.insurance.number, 12)}
            </View>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Address</Text>
            <Text style={styles.fieldValue}>
              {data.address.street}, {data.address.zipCode} {data.address.city}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.largeTitle}>Selected products</Text>
          <View style={styles.gridTable}>
            <View style={[styles.gridRow, styles.gridHeader]}>
              <Text style={[styles.gridCell, { width: "55%" }]}>Item</Text>
              <Text style={[styles.gridCell, { width: "20%" }]}>Unit</Text>
              <Text style={[styles.gridCell, { width: "25%", borderRight: 0 }]}>
                Quantity
              </Text>
            </View>
            {selectedProducts.length === 0 ? (
              <View style={styles.gridRow}>
                <Text
                  style={[styles.gridCell, { width: "100%", borderRight: 0 }]}
                >
                  No selected items
                </Text>
              </View>
            ) : (
              selectedProducts.map((product) => (
                <View key={product.id} style={styles.gridRow}>
                  <Text style={[styles.gridCell, { width: "55%" }]}>
                    {product.name}
                  </Text>
                  <Text style={[styles.gridCell, { width: "20%" }]}>
                    {product.volume}
                  </Text>
                  <Text
                    style={[styles.gridCell, { width: "25%", borderRight: 0 }]}
                  >
                    {product.quantity}
                  </Text>
                </View>
              ))
            )}
          </View>
          <Text style={styles.note}>
            Please fill in any missing product details manually if needed.
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.pageBreakTitle}>Consultation Confirmation</Text>
        <View style={styles.section}>
          <Text style={styles.largeTitle}>Consultation</Text>
          <View style={styles.checkboxRow}>
            {renderCheckbox(data.consultation.alreadyProvided)}
            <Text>Already provided with care aids</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Answer</Text>
            <Text style={styles.fieldValue}>{data.consultation.answer}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Reason</Text>
            <Text style={styles.fieldValue}>{data.consultation.reason}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.largeTitle}>Signature</Text>
          <View style={styles.signatureBox}>
            {data.applicationSign.signatureDataUrl ? (
              <Image
                src={data.applicationSign.signatureDataUrl}
                style={styles.signatureImage}
              />
            ) : (
              <Text style={styles.note}>Signature required</Text>
            )}
          </View>
          <Text style={styles.note}>
            Date: ____________________ Signature: ____________________
          </Text>
        </View>
      </Page>
    </Document>
  );
}
