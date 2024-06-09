import 'react-image-crop/dist/ReactCrop.css'
import Hero from "@/components/HomeComponents/HeroSection/Hero";
import Footer from "@/components/HomeComponents/Footer/Footer";
import Nav from "@/components/HomeComponents/Navigation/Nav";

export default function Home() {
    return (
        <div>
            <Nav/>
            <Hero/>
            <Footer/>
        </div>
    );
}
