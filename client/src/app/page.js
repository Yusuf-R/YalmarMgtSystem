import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/components/HeroSection/Hero";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
      <div>
          <Hero />
          <Footer/>
      </div>
  );
}
