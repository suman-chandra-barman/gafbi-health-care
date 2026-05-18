/** @format */

import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import type { CareboxFormData } from "@/types/carebox";
import { changeSupplierStyles as styles } from "./ChangeSupplierDocument.styles";

interface ChangeSupplierDocumentProps {
  data: CareboxFormData;
}

const renderCheckbox = (checked: boolean) => (
  <Text style={styles.checkbox}>{checked ? "x" : ""}</Text>
);

const formatDate = (value: string) => {
  if (!value) return "";
  return value;
};

const getToday = () => {
  const now = new Date();
  return now.toLocaleDateString("de-DE");
};

export default function ChangeSupplierDocument({
  data,
}: ChangeSupplierDocumentProps) {
  const logoSrc = "/logo.png";
  const fullName =
    `${data.personalDetails.firstName} ${data.personalDetails.lastName}`.trim();
  const addressLine = `${data.address.street}`.trim();
  const cityLine = `${data.address.zipCode} ${data.address.city}`.trim();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.logoRow}>
            <Image src={logoSrc} style={styles.logoImage} />
            <Text style={styles.logo}>Gafbi Health Care</Text>
          </View>
          <View style={styles.senderBox}>
            <Text style={styles.smallLabel}>Sender:</Text>
            <Text>{fullName || ""}</Text>
            <Text style={styles.smallLabel}>Name</Text>
            <View style={styles.line} />
            <Text>{addressLine || ""}</Text>
            <Text style={styles.smallLabel}>Street</Text>
            <View style={styles.line} />
            <Text>{cityLine || ""}</Text>
            <Text style={styles.smallLabel}>ZIP, City</Text>
          </View>
        </View>

        <View style={styles.headerRow}>
          <View style={styles.recipientBox}>
            <Text style={styles.smallLabel}>
              Recipient/Care Insurance Fund:
            </Text>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.line} />
          </View>
          <View style={{ width: 210 }} />
        </View>

        <View style={styles.foldLine} />

        <Text style={styles.title}>Change Declaration</Text>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Insured person&apos;s name</Text>
          <Text style={styles.fieldValue}>{fullName}</Text>
          <View style={styles.fieldGroup} />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Insurance No.</Text>
          <Text style={styles.fieldValue}>{data.insurance.number}</Text>
          <Text style={[styles.fieldLabel, { width: 90 }]}>Date of birth</Text>
          <Text style={styles.fieldValue}>
            {formatDate(data.personalDetails.dateOfBirth)}
          </Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={[styles.fieldLabel, { width: 90 }]}>Date</Text>
          <Text style={styles.fieldValue}>{getToday()}</Text>
        </View>

        <Text style={styles.paragraph}>Dear Sir or Madam,</Text>
        <Text style={styles.paragraph}>
          I hereby cancel the supply of care aids for consumption from my
          previous service provider
        </Text>

        <View style={styles.checkboxRow}>
          {renderCheckbox(data.applicationSign.hasSignedSupplier)}
          <Text>at the earliest possible date</Text>
          <Text style={{ marginLeft: 6 }}>on</Text>
          <View style={[styles.line, { width: 70 }]} />
        </View>

        <Text style={styles.paragraph}>I exercise my right of choice.</Text>

        <View style={styles.checkboxRow}>
          {renderCheckbox(data.applicationSign.hasSignedSupplier)}
          <Text>Immediately</Text>
          <Text style={{ marginLeft: 10 }}>From</Text>
          <View style={[styles.line, { width: 70 }]} />
        </View>

        <Text style={styles.paragraph}>
          I would like to receive the care aids for my caregiver from the
          following provider:
        </Text>
        <View style={styles.addressBlock}>
          <Text>Gafbi Health Care</Text>
          <Text>Salzufer 11</Text>
          <Text>10587 Berlin</Text>
        </View>

        <Text style={styles.paragraph}>
          Please transfer the approved cost coverage to Gafbi Health Care.
        </Text>

        <Text style={styles.paragraph}>Kind regards</Text>
        <View style={styles.signatureLine} />
        <Text style={styles.smallLabel}>Signature</Text>

        <View style={styles.footerRow}>
          <Text>Gafbi Health Care</Text>
          <Text>www.gafbi.com</Text>
        </View>
      </Page>
    </Document>
  );
}
