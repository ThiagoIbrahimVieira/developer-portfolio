import Hero from "@/components/Hero";
import About from "@/components/About";
import CurrentStatus from "@/components/CurrentStatus";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import LearningJourney from "@/components/LearningJourney";
import GitHubSection from "@/components/GitHubSection";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <CurrentStatus />
      <Projects />
      <Skills />
      <LearningJourney />
      <GitHubSection />
      <Contact />
    </>
  );
}
