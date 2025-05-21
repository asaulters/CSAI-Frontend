import { forwardRef } from 'react'

const About = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="about-content">
          <h2 className="section-title">About CSAI-Digest</h2>
          <p className="about-description">
            CSAI-Digest is a curated weekly newsletter that brings you the most important 
            developments in Customer Success and Artificial Intelligence. We save you time 
            by filtering through hundreds of articles to deliver only the most relevant and 
            impactful content.
          </p>
          <div className="about-features">
            <div className="feature">
              <h3 className="feature-title">Curated Content</h3>
              <p className="feature-description">
                Carefully selected articles from trusted sources in the CS and AI space.
              </p>
            </div>
            <div className="feature">
              <h3 className="feature-title">Time-Saving</h3>
              <p className="feature-description">
                Read in just 20 minutes what would take hours to find and digest on your own.
              </p>
            </div>
            <div className="feature">
              <h3 className="feature-title">Industry Insights</h3>
              <p className="feature-description">
                Stay ahead of trends and gain valuable insights from industry experts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'

export default About
