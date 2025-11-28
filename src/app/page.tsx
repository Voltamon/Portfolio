import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import ContactSection from "@/components/ContactSection"

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </main>
  )
}