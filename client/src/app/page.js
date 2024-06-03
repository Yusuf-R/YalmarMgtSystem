import 'react-image-crop/dist/ReactCrop.css'
import Hero from "@/components/HeroSection/Hero";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Navigation/Nav";

export default function Home() {
    return (
        <div>
            <Nav/>
            <Hero/>
            <Footer/>
        </div>
    );
}
