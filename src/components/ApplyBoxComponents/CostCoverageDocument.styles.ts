/** @format */

import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
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
    width: 18,
    height: 18,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionIndexText: {
    color: "#ffffff",
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
    height: 55,
    marginTop: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  signatureImage: {
    width: 160,
    height: 40,
    objectFit: "contain",
  },
  signatureRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  signatureField: {
    flex: 1,
  },
  signatureLine: {
    borderBottom: "1px solid #cfd6dd",
    minHeight: 16,
    marginTop: 4,
  },
  legalText: {
    fontSize: 8,
    lineHeight: 1.35,
    color: "#52606d",
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
