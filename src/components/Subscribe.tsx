import { useState, forwardRef, FormEvent } from 'react'

const Subscribe = forwardRef<HTMLElement>((_, ref) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' })
      return
    }
    
    setIsSubmitting(true)
    setMessage(null)
    
    try {
      const response = await fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          apiKey: import.meta.env.VITE_MC_API_KEY,
          dc: import.meta.env.VITE_MC_DC,
          audienceId: import.meta.env.VITE_MC_AUDIENCE_ID
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe')
      }
      
      setMessage({ text: 'Thank you for subscribing!', type: 'success' })
      setEmail('')
    } catch (error) {
      setMessage({ 
        text: error instanceof Error ? error.message : 'An error occurred. Please try again.', 
        type: 'error' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="subscribe" className="subscribe" ref={ref}>
      <div className="container">
        <div className="subscribe-content">
          <h2 className="section-title">Stay Updated</h2>
          <p className="subscribe-description">
            Subscribe to receive our weekly digest of Customer Success and AI insights.
          </p>
          
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="visually-hidden">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
                required
              />
            </div>
            <button 
              type="submit" 
              className="subscribe-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          
          {message && (
            <div className={`message ${message.type}-message`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </section>
  )
})

Subscribe.displayName = 'Subscribe'

export default Subscribe
