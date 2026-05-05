import Footer from "@/components/CommonComponents/Footer";
import InfoNav from "@/components/CommonComponents/InfoNav";
import NavBar from "@/components/CommonComponents/NavBar";
import FooterBanner from "@/components/LandingPageComponents/FooterBanner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <InfoNav />
      <NavBar />
        {children}
      <FooterBanner />
      <Footer />
    </div>
  );
};

export default MainLayout;
