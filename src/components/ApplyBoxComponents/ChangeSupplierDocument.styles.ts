/** @format */

import { StyleSheet } from "@react-pdf/renderer";

export const changeSupplierStyles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 9,
    color: "#1f2933",
    fontFamily: "Helvetica",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  logo: {
    color: "#1e5a83",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoImage: {
    width: 26,
    height: 26,
    objectFit: "contain",
  },
  recipientBox: {
    border: "1px solid #2f6ea3",
    padding: 8,
    width: 210,
    minHeight: 70,
  },
  senderBox: {
    border: "1px solid #f2a65a",
    padding: 8,
    width: 210,
  },
  smallLabel: {
    fontSize: 7,
    color: "#52606d",
  },
  line: {
    borderBottom: "1px solid #cfd6dd",
    marginTop: 12,
  },
  foldLine: {
    borderBottom: "1px dotted #2f6ea3",
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e5a83",
    marginBottom: 10,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 6,
  },
  fieldLabel: {
    width: 110,
    color: "#52606d",
  },
  fieldValue: {
    flex: 1,
    borderBottom: "1px solid #cfd6dd",
    minHeight: 12,
  },
  fieldGroup: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  checkbox: {
    width: 10,
    height: 10,
    border: "1px solid #8f9ba8",
    textAlign: "center",
    lineHeight: 10,
    fontSize: 8,
  },
  paragraph: {
    marginTop: 8,
    lineHeight: 1.3,
  },
  addressBlock: {
    marginTop: 6,
    color: "#1e5a83",
  },
  signatureLine: {
    borderBottom: "1px solid #cfd6dd",
    width: 180,
    marginTop: 18,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    fontSize: 8,
    color: "#1e5a83",
  },
});
