/** @format */

import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import type { CareboxFormData } from "@/types/carebox";
import { styles } from "./CostCoverageDocument.styles";

interface CostCoverageDocumentProps {
  data: CareboxFormData;
}

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

        {/* Applicant Details section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIndex}>
              <Text style={styles.sectionIndexText}>1</Text>
            </View>
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

        {/* Caregiver / Contact Person section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIndex}>
              <Text style={styles.sectionIndexText}>2</Text>
            </View>
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

        {/* Sanubi Box section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIndex}>
              <Text style={styles.sectionIndexText}>3</Text>
            </View>
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

        {/* Delivery Address section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIndex}>
              <Text style={styles.sectionIndexText}>4</Text>
            </View>
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

        {/* Invoice Recipient section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIndex}>
              <Text style={styles.sectionIndexText}>5</Text>
            </View>
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

        {/* Terms & Conditions section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIndex}>
              <Text style={styles.sectionIndexText}>6</Text>
            </View>
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          </View>
          <Text style={styles.legalText}>
            I hereby confirm that the information provided is true and complete.
            I agree that my data may be processed for the purpose of handling
            this application and for the delivery of care aids. Data will only
            be shared with authorized partners and insurers where necessary.
          </Text>
          <View style={[styles.checkboxRow, { marginTop: 6 }]}>
            {renderCheckbox(data.applicationSign.hasSignedCost)}
            <Text>I agree to the General Terms and Conditions (AGB).</Text>
          </View>

          <View style={styles.signatureRow}>
            <View style={styles.signatureField}>
              <Text style={styles.fieldLabel}>Place</Text>
              <View style={styles.signatureLine} />
            </View>
            <View style={styles.signatureField}>
              <Text style={styles.fieldLabel}>Date</Text>
              <View style={styles.signatureLine} />
            </View>
            <View style={styles.signatureField}>
              <Text style={styles.fieldLabel}>Signature</Text>
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
            </View>
          </View>
        </View>

        {/* Conclusion / Summary section  */}
        <View>
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
                {data.address.street}, {data.address.zipCode}{" "}
                {data.address.city}
              </Text>
            </View>
          </View>

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
            <Text style={styles.largeTitle}>Selected products</Text>
            <View style={styles.gridTable}>
              <View style={[styles.gridRow, styles.gridHeader]}>
                <Text style={[styles.gridCell, { width: "55%" }]}>Item</Text>
                <Text style={[styles.gridCell, { width: "20%" }]}>Unit</Text>
                <Text
                  style={[styles.gridCell, { width: "25%", borderRight: 0 }]}
                >
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
                      style={[
                        styles.gridCell,
                        { width: "25%", borderRight: 0 },
                      ]}
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
        </View>
      </Page>
    </Document>
  );
}
