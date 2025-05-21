interface FooterProps {
  onAboutClick: () => void
  onContactClick: () => void
}

const Footer = ({ onAboutClick, onContactClick }: FooterProps) => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-copyright">
            &copy; {currentYear} CSAI-Digest. All rights reserved.
          </div>
          
          <nav className="footer-nav">
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">Home</a>
              </li>
              <li className="footer-nav-item">
                <a 
                  href="#" 
                  className="footer-nav-link"
                  onClick={(e) => {
                    e.preventDefault()
                    onAboutClick()
                  }}
                >
                  About
                </a>
              </li>
              <li className="footer-nav-item">
                <a 
                  href="#" 
                  className="footer-nav-link"
                  onClick={(e) => {
                    e.preventDefault()
                    onContactClick()
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="footer-credit">
            Made with ♥ by Adam Saulters
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
