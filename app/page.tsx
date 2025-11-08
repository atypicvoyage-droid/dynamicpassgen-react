'use client'

import PasswordGenerator from '@/components/PasswordGenerator'
import ContentSections from '@/components/ContentSections'

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">🔐 Dynamic Password Generator</h1>

        <div className="intro-section subtitle">
          <p>
            Need a <strong>strong password</strong>? You're in the right place. Our <strong>free password generator</strong> creates genuinely <strong>secure passwords</strong> using the same cryptographic technology that banks and governments rely on. You'll see exactly how strong your <strong>random password</strong> is in real-time, plus get insights on how long it would take hackers to crack it. No technical knowledge required—just click, generate, and you're protected.
          </p>
        </div>
      </header>

      <div className="quick-answer">
        <h2>What is a Strong Password?</h2>
        <p>
          A strong password is at least 16 characters long, combines uppercase and lowercase letters with numbers and symbols, and is completely random (not based on personal information). Our generator creates cryptographically secure passwords using your browser's Web Crypto API—the same technology banks use—ensuring genuine randomness that hackers cannot predict or crack within any reasonable timeframe.
        </p>
      </div>

      <div className="update-stamp">
        <strong>🔄 Last Updated: October 28, 2025</strong> — Added NIST SP 800-63B 2025 compliance details, enhanced entropy calculations, updated crack time estimates for modern computing power (10 billion guesses/second), improved Web Crypto API security documentation.
      </div>

      <PasswordGenerator />
      
      <ContentSections />

      <footer className="footer">
        <p>© 2025 DynamicPassGen.com | <a href="/privacy.html" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a> | All passwords generated client-side | No data stored</p>
        <p className="footer-security">
          NIST SP 800-63B 2025 Compliant | Web Crypto API | Cryptographically Secure | 
          <a href="https://dynamicpassgen.com" style={{ color: 'inherit', textDecoration: 'underline' }}> Dynamic Password Generator</a>
        </p>
        <p className="last-updated"><strong>Last Updated: October 28, 2025</strong> — Enhanced security documentation, updated NIST compliance details</p>
      </footer>
    </div>
  )
}