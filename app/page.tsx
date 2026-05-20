import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Experiences from '@/components/sections/Experiences'
import Membership from '@/components/sections/Membership'
import Partners from '@/components/sections/Partners'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experiences">
          <Experiences />
        </section>
        <section id="membership">
          <Membership />
        </section>
        <Partners />
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}
