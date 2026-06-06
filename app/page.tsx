import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import BookingCTA from "@/components/BookingCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <Services />
        <TrustBar />
        <About />
        <Gallery />
        <Testimonials />
        <BookingCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
