const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            20 articles × 20 minutes
          </h1>
          <p className="hero-subtitle">
            Your weekly brief on Customer Success & AI.
          </p>
          <div className="hero-cta">
            <a href="#subscribe" className="button" onClick={(e) => {
              e.preventDefault()
              document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Subscribe Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
