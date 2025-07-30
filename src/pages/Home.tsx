import HomeCrops from "@/features/Crops/HomeCrops"
import HomeRecentCrops from "@/features/Crops/HomeRecentCrops"
import About from "@/UI/About"
import LandingCarousel from "@/UI/LandingCarousel"

export default function Home() {
  return (
    <div className="bg-background">
      <section id="home">
        <LandingCarousel></LandingCarousel>
      </section>
      <section id="about">
        <About></About>
      </section>
      <section id="crops">
        <HomeCrops></HomeCrops>
        <HomeRecentCrops></HomeRecentCrops>
      </section>
    </div>
  )
}
