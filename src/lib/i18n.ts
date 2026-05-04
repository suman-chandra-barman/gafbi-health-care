/** @format */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const supportedLanguages = ["en", "de"] as const;
export type AppLanguage = (typeof supportedLanguages)[number];

export const languageStorageKey = "gafbi-language";

const resources = {
  en: {
    translation: {
      common: {
        brand: "Gafbi Health Care",
        home: "Home",
        products: "Products",
        contact: "Contact",
        faqs: "FAQs",
        submit: "Submit",
        details: "Details",
        previous: "Previous",
        next: "Next",
        done: "Done",
      },
      infoNav: {
        freeConsultation:
          "FREE consultation: 030 555 7850 65, Mon-Fri: 8:00-16:00",
        emergencySupport: "Apply for emergency call support",
        applyBox: "Apply for a box",
        signIn: "Sign in",
      },
      nav: {
        aboutUs: "About Us",
        careBox: "Carebox",
      },
      hero: {
        title: "Gafbi Care Box - Simple solutions for your care supply needs",
        subtitle:
          "Home care supplies - reliable, tailored to your needs, and delivered directly to you. We support families throughout Germany with home care.",
        applyNow: "Apply for a new care box now",
      },
      landing: {
        servicesTitle: "Our Services",
        productsTitle: "Trusted care products from Gafbi",
        addToBox: "+ Add to box",
        aboutTitle:
          "We supply families throughout Germany with high-quality, consumable care supplies",
        aboutDescription:
          "As a Schulke & Mayr company, we work to the highest standards - for quality you can trust.",
        aboutMore: "More about us",
        careTitle: "Free care aids from #care level 1",
        careDescription:
          "Receive high-quality care products completely free of charge through your long-term care insurance. Customize your personal Care Box with essential daily aids and have it delivered quickly and easily to your home.",
        careApply: "Apply for a care box now",
        clientsTitle: "Don't take our word for it, see what our clients say",
        clientsExcellent: "Excellent",
        clientsRatings: "4.7 ratings based on the 3,219 clients",
      },
      footer: {
        newsletter: "Stay in the loop with our latest listings",
        subscribePlaceholder: "Enter email to subscribe",
        quickLinks: "Quick links",
        company: "Company",
        findUs: "Find us",
        rights: "2026 @Gafbi - All rights reserved",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        imprint: "Imprint",
      },
      contactPage: {
        details: "Contact details",
        heading: "Unleash your potential with tailor made solutions",
        description:
          "Contact us at our office, by phone or email for fast and uncomplicated support.",
        getInTouch: "Get in touch",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Telephone Number",
        regarding: "Regarding",
        news: "News",
      },
      faqPage: {
        details: "FAQs details",
        heading: "Frequently asked questions about the Gafbi care box",
      },
      productsPage: {
        title: "Our Products",
        breadcrumbLabel: "Our products",
        bookingRequest: "Booking request +",
        productDetails: "Product details",
        descriptionTab: "Description",
        reviewsTab: "Reviews & ratings",
        reviewProduct: "Review this product",
        shareThoughts: "Share your thoughts with other customers...",
        mostRelevant: "Most relevant reviews",
      },
      auth: {
        loginManage: "Log in & manage Gafbi-Box",
        loginDescription:
          "To manage the contents of your Gafbi box and your delivery, please use our customer portal.",
        forgotPassword: "Forgot password?",
        login: "Log in",
        signingIn: "Signing in...",
        createAccount: "Create a new account",
        registerTitle: "Create an account",
        registerDescription:
          "What e-mail address did you provide when you ordered a Gafbi Box?",
        create: "Create",
        creating: "Creating...",
        backToLogin: "Back to login page",
        forgotTitle: "Forgot Password",
        forgotDescription:
          "Enter your email to receive a 4-digit OTP for password reset.",
        sendOtp: "Send OTP",
        sending: "Sending...",
        verifyTitle: "Verify OTP",
        verifyDescription: "Enter the 4-digit OTP sent to your email.",
        verify: "Verify",
        verifying: "Verifying...",
        termsAgreementPrefix: "By creating an account, you agree to our",
      },
      toasts: {
        signedIn: "Signed in successfully!",
        acceptTerms: "You must accept the Terms and Conditions.",
        accountCreated: "Account created! Please verify OTP.",
        otpSent: "OTP sent to your email",
        otpRequired: "Please enter the 4-digit OTP",
        otpVerified: "OTP verified! Please sign in.",
      },
      terms: {
        title: "Terms and Conditions",
        introHeading: "Welcome to Gafbi Health Care!",
        q1: "1. License",
        q2: "2. User Responsibilities",
        q3: "3. Privacy",
        q4: "4. Changes to Terms",
      },
      apply: {
        productSelection: "Product Selection",
        dataEntry: "Data Entry",
        application: "Application",
        done: "Done",
        helpLine: "For help with your application, please call:",
        requestChange: "Request to change Care Box",
        chooseProducts: "Choose your products",
        myCareBox: "My Care Box",
        itemsLeft: "{{count}} items left",
        noItems: "No items selected yet",
        continue: "Continue",
        appSubmitted: "Application submitted successfully",
        appSubmittedDesc:
          "Thank you. Your application has been received and will be processed shortly.",
        startNew: "Start a new application",
      },
    },
  },
  de: {
    translation: {
      common: {
        brand: "Gafbi Gesundheitspflege",
        home: "Startseite",
        products: "Produkte",
        contact: "Kontakt",
        faqs: "FAQs",
        submit: "Senden",
        details: "Details",
        previous: "Zuruck",
        next: "Weiter",
        done: "Fertig",
      },
      infoNav: {
        freeConsultation:
          "KOSTENLOSE Beratung: 030 555 7850 65, Mo-Fr: 8:00-16:00",
        emergencySupport: "Hausnotruf-Unterstutzung beantragen",
        applyBox: "Pflegebox beantragen",
        signIn: "Anmelden",
      },
      nav: {
        aboutUs: "Uber uns",
        careBox: "Pflegebox",
      },
      hero: {
        title: "Gafbi Pflegebox - Einfache Losungen fur Ihren Pflegebedarf",
        subtitle:
          "Pflegehilfsmittel fur zu Hause - zuverlassig, bedarfsgerecht und direkt zu Ihnen geliefert. Wir unterstutzen Familien in ganz Deutschland.",
        applyNow: "Jetzt neue Pflegebox beantragen",
      },
      landing: {
        servicesTitle: "Unsere Leistungen",
        productsTitle: "Bewahrte Pflegeprodukte von Gafbi",
        addToBox: "+ Zur Box hinzufugen",
        aboutTitle:
          "Wir versorgen Familien in ganz Deutschland mit hochwertigen Pflegeverbrauchsmaterialien",
        aboutDescription:
          "Als Unternehmen der Schulke & Mayr Gruppe arbeiten wir nach hochsten Standards - fur Qualitat, der Sie vertrauen konnen.",
        aboutMore: "Mehr uber uns",
        careTitle: "Kostenlose Pflegehilfsmittel ab Pflegegrad 1",
        careDescription:
          "Erhalten Sie hochwertige Pflegeprodukte vollig kostenlos uber Ihre Pflegeversicherung. Stellen Sie Ihre personliche Pflegebox mit den wichtigsten Alltagshilfen zusammen und lassen Sie sie schnell und einfach nach Hause liefern.",
        careApply: "Jetzt Pflegebox beantragen",
        clientsTitle:
          "Verlassen Sie sich nicht nur auf unser Wort - sehen Sie, was unsere Kunden sagen",
        clientsExcellent: "Ausgezeichnet",
        clientsRatings: "4,7 Bewertungen basierend auf 3.219 Kunden",
      },
      footer: {
        newsletter:
          "Bleiben Sie mit unseren neuesten Angeboten auf dem Laufenden",
        subscribePlaceholder: "E-Mail zum Abonnieren eingeben",
        quickLinks: "Schnellzugriffe",
        company: "Unternehmen",
        findUs: "Finden Sie uns",
        rights: "2026 @Gafbi - Alle Rechte vorbehalten",
        privacy: "Datenschutz",
        terms: "AGB",
        imprint: "Impressum",
      },
      contactPage: {
        details: "Kontaktinformationen",
        heading: "Entfalten Sie Ihr Potenzial mit maBgeschneiderten Losungen",
        description:
          "Kontaktieren Sie uns im Buro, per Telefon oder E-Mail fur schnelle und unkomplizierte Unterstutzung.",
        getInTouch: "Kontakt aufnehmen",
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail",
        phone: "Telefonnummer",
        regarding: "Betreff",
        news: "Nachricht",
      },
      faqPage: {
        details: "FAQ-Details",
        heading: "Haufig gestellte Fragen zur Gafbi Pflegebox",
      },
      productsPage: {
        title: "Unsere Produkte",
        breadcrumbLabel: "Unsere Produkte",
        bookingRequest: "Buchungsanfrage +",
        productDetails: "Produktdetails",
        descriptionTab: "Beschreibung",
        reviewsTab: "Bewertungen",
        reviewProduct: "Produkt bewerten",
        shareThoughts: "Teilen Sie Ihre Gedanken mit anderen Kunden...",
        mostRelevant: "Relevanteste Bewertungen",
      },
      auth: {
        loginManage: "Anmelden & Gafbi-Box verwalten",
        loginDescription:
          "Um den Inhalt Ihrer Gafbi-Box und Ihre Lieferung zu verwalten, nutzen Sie bitte unser Kundenportal.",
        forgotPassword: "Passwort vergessen?",
        login: "Anmelden",
        signingIn: "Anmeldung...",
        createAccount: "Neues Konto erstellen",
        registerTitle: "Konto erstellen",
        registerDescription:
          "Welche E-Mail-Adresse haben Sie bei der Bestellung Ihrer Gafbi-Box angegeben?",
        create: "Erstellen",
        creating: "Wird erstellt...",
        backToLogin: "Zuruck zur Anmeldung",
        forgotTitle: "Passwort vergessen",
        forgotDescription:
          "Geben Sie Ihre E-Mail ein, um einen 4-stelligen OTP fur das Zurucksetzen zu erhalten.",
        sendOtp: "OTP senden",
        sending: "Wird gesendet...",
        verifyTitle: "OTP verifizieren",
        verifyDescription:
          "Geben Sie den 4-stelligen OTP aus Ihrer E-Mail ein.",
        verify: "Verifizieren",
        verifying: "Wird verifiziert...",
        termsAgreementPrefix:
          "Mit der Kontoerstellung stimmen Sie unseren folgenden Bedingungen zu",
      },
      toasts: {
        signedIn: "Erfolgreich angemeldet!",
        acceptTerms: "Sie mussen den AGB zustimmen.",
        accountCreated: "Konto erstellt! Bitte OTP verifizieren.",
        otpSent: "OTP wurde an Ihre E-Mail gesendet",
        otpRequired: "Bitte geben Sie den 4-stelligen OTP ein",
        otpVerified: "OTP verifiziert! Bitte anmelden.",
      },
      terms: {
        title: "Allgemeine Geschaftsbedingungen",
        introHeading: "Willkommen bei Gafbi Health Care!",
        q1: "1. Lizenz",
        q2: "2. Verantwortlichkeiten der Nutzer",
        q3: "3. Datenschutz",
        q4: "4. Anderungen der Bedingungen",
      },
      apply: {
        productSelection: "Produktauswahl",
        dataEntry: "Dateneingabe",
        application: "Antrag",
        done: "Fertig",
        helpLine: "Bei Fragen zu Ihrem Antrag rufen Sie bitte an:",
        requestChange: "Anderung der Pflegebox anfragen",
        chooseProducts: "Wahlen Sie Ihre Produkte",
        myCareBox: "Meine Pflegebox",
        itemsLeft: "{{count}} Artikel ubrig",
        noItems: "Noch keine Artikel ausgewahlt",
        continue: "Weiter",
        appSubmitted: "Antrag erfolgreich ubermittelt",
        appSubmittedDesc:
          "Vielen Dank. Ihr Antrag ist eingegangen und wird in Kurze bearbeitet.",
        startNew: "Neuen Antrag starten",
      },
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
