import Hero from "@/components/Webpage/Hero";
import Solutions from "@/components/Webpage/Solutions";
import Features from "@/components/Webpage/Features"; 
import FAQ from "@/components/Webpage/FAQ";
import Contact from "@/components/Webpage/Contact";
// import Footer from "@/components/Webpage/Footer";
import Footer from './../components/Webpage/Footer';
export default function Home() {
  return (
    <>
      <Hero />
      <Solutions />
      <Features />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
