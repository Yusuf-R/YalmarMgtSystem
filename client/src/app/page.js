import Image from "next/image";
import styles from "./page.module.css";
import Nav from "@/components/Navigation/Nav";
import Hero from "@/components/HeroSection/Hero";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
      <div className={styles.navStyle}>
          <Nav />
          <Hero />
          <Footer/>
      </div>
  );
}
