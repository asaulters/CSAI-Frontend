import { useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Subscribe from './components/Subscribe'
import Footer from './components/Footer'

function App() {
  const aboutRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header 
        onAboutClick={() => scrollToSection(aboutRef)} 
        onContactClick={() => scrollToSection(contactRef)} 
      />
      <main>
        <Hero />
        <About ref={aboutRef} />
        <Subscribe ref={contactRef} />
      </main>
      <Footer 
        onAboutClick={() => scrollToSection(aboutRef)} 
        onContactClick={() => scrollToSection(contactRef)} 
      />
    </>
  )
}

export default App
