import { useState, useEffect } from 'react'
import logoImage from '../assets/logo.png'

interface HeaderProps {
  onAboutClick: () => void
  onContactClick: () => void
}

const Header = ({ onAboutClick, onContactClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo">
            <img src={logoImage} alt="CSAI-Digest Logo" className="logo-image" />
          </a>
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <a href="#" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={(e) => {
                  e.preventDefault()
                  onAboutClick()
                }}>About</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={(e) => {
                  e.preventDefault()
                  onContactClick()
                }}>Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
