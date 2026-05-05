/** @format */

import { render, screen } from "@testing-library/react";
import TermsPage from "./page";

describe("TermsPage", () => {
  it("renders the Terms and Conditions heading", () => {
    render(<TermsPage />);
    expect(screen.getByText(/Terms and Conditions/i)).toBeInTheDocument();
  });
});
