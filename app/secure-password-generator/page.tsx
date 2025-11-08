'use client'

import { useState } from 'react'
import { generateSecurePassword, calculateStrength } from '@/lib/passwordUtils'
import Link from 'next/link'

export default function SecurePasswordGenerator() {
  const [password, setPassword] = useState<string>("Click 'Generate Password' to start")
  const [length, setLength] = useState<number>(18)
  const [useUppercase, setUseUppercase] = useState<boolean>(true)
  const [useLowercase, setUseLowercase] = useState<boolean>(true)
  const [useNumbers, setUseNumbers] = useState<boolean>(true)
  const [useSymbols, setUseSymbols] = useState<boolean>(true)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false)
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true)
  const [strengthInfo, setStrengthInfo] = useState<any>(null)
  const [passwordHistory, setPasswordHistory] = useState<string[]>([])
  const [copyText, setCopyText] = useState<string>('Copy')

  const handleGenerate = () => {
    const newPassword = generateSecurePassword({
      length,
      useUppercase,
      useLowercase,
      useNumbers,
      useSymbols,
      excludeAmbiguous
    })

    if (newPassword) {
      setPassword(newPassword)
      setPasswordVisible(true)
      const strength = calculateStrength(newPassword)
      setStrengthInfo(strength)
      setPasswordHistory(prev => [newPassword, ...prev].slice(0, 5))

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_password', {
          'event_category': 'secure_password_generator',
          'event_label': 'generate_button_click'
        })
      }
    }
  }

  const handleCopy = async () => {
    if (password === "Click 'Generate Password' to start") {
      alert('No password to copy! Generate a password first.')
      return
    }

    try {
      await navigator.clipboard.writeText(password)
      setCopyText('✓ Copied!')
      setTimeout(() => setCopyText('Copy'), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      alert('Failed to copy to clipboard. Please copy manually.')
    }
  }

  const handleCopyHistory = async (pwd: string) => {
    try {
      await navigator.clipboard.writeText(pwd)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const displayPassword = passwordVisible ? password : '•'.repeat(password.length)

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">🔒 Secure Password Generator</h1>
        <div className="subtitle">
          <p>
            Generate <strong>secure passwords</strong> with complete privacy. <strong>100% client-side processing</strong>—nothing sent to our servers, nothing logged. Your passwords never leave your device.
          </p>
        </div>
      </header>

      <div className="quick-answer">
        <h2>Generate a Secure Password</h2>
        <p>
          Click "Generate Password" to create a <strong>secure password</strong> entirely on your device. Want proof? Open your browser's network inspector (F12 → Network tab)—no requests to our servers.
        </p>
      </div>

      <main className="card">
        <div className="security-notice">
          <h3>🔐 Your Privacy Guaranteed</h3>
          <ul>
            <li>✓ <strong>100% client-side:</strong> All processing happens in your browser</li>
            <li>✓ <strong>Zero server transmission:</strong> Passwords never sent to servers</li>
            <li>✓ <strong>No logging:</strong> We can't see what you generate</li>
            <li>✓ <strong>Open methodology:</strong> Verify in browser DevTools</li>
          </ul>
        </div>

        <section className="password-section" id="password-generator">
          <div className="password-display-wrapper">
            <div id="password-display" className="password-display">
              {displayPassword}
            </div>
            {password !== "Click 'Generate Password' to start" && (
              <button 
                id="toggle-visibility" 
                className="visibility-toggle" 
                onClick={toggleVisibility}
                title="Toggle password visibility"
              >
                <span id="eye-icon">{passwordVisible ? '👁️' : '👁️‍🗨️'}</span>
              </button>
            )}
          </div>
        </section>

        {strengthInfo && (
          <section id="strength-section" className="strength-section">
            <div className="strength-info">
              <span className="strength-label">
                Strength: <span id="strength-text" className="strength-value" style={{ color: strengthInfo.color }}>
                  {strengthInfo.label}
                </span>
              </span>
              <span className="strength-details">
                <span id="entropy-text">{strengthInfo.entropy}</span> bits | ~<span id="crack-time-text">{strengthInfo.crackTime}</span> to crack
              </span>
            </div>
            <div className="strength-bar-container">
              <div 
                id="strength-bar" 
                className="strength-bar" 
                style={{ 
                  width: `${strengthInfo.score}%`,
                  backgroundColor: strengthInfo.color 
                }}
              ></div>
            </div>
          </section>
        )}

        <section className="action-buttons">
          <button id="generate-btn" className="btn btn-primary" onClick={handleGenerate}>
            <span className="btn-icon">⚡</span> Generate Password
          </button>
          <button id="copy-btn" className="btn btn-secondary" onClick={handleCopy}>
            <span className="btn-icon">📋</span> <span id="copy-text">{copyText}</span>
          </button>
          <button id="regenerate-btn" className="btn btn-tertiary" onClick={handleGenerate}>
            <span className="btn-icon">🔄</span> Regenerate
          </button>
        </section>

        <section className="options-section">
          <h2 className="section-title">Secure Password Options</h2>

          <div className="option-group">
            <div className="slider-header">
              <label htmlFor="length-slider" className="option-label">Password Length</label>
              <span id="length-value" className="length-display">{length}</span>
            </div>
            <input 
              type="range" 
              id="length-slider" 
              className="slider" 
              min="8" 
              max="64" 
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <div className="slider-labels">
              <span>8</span>
              <span>64</span>
            </div>
          </div>

          <div className="checkbox-grid">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                id="uppercase" 
                className="checkbox" 
                checked={useUppercase}
                onChange={(e) => setUseUppercase(e.target.checked)}
              />
              <span>Uppercase (A-Z)</span>
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                id="lowercase" 
                className="checkbox" 
                checked={useLowercase}
                onChange={(e) => setUseLowercase(e.target.checked)}
              />
              <span>Lowercase (a-z)</span>
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                id="numbers" 
                className="checkbox" 
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
              />
              <span>Numbers (0-9)</span>
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                id="symbols" 
                className="checkbox" 
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
              />
              <span>Symbols (!@#$...)</span>
            </label>
          </div>

          <div className="advanced-options">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                id="exclude-ambiguous" 
                className="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
              />
              <span>Exclude Ambiguous Characters (0, O, 1, l, I)</span>
            </label>
          </div>
        </section>

        {passwordHistory.length > 0 && (
          <section id="history-section" className="history-section">
            <h3 className="section-subtitle">Recent Passwords</h3>
            <p className="history-note"><small>Stored temporarily in browser memory. Cleared on page close.</small></p>
            <div id="history-list" className="history-list">
              {passwordHistory.map((pwd, index) => (
                <div key={index} className="history-item">
                  <span className="history-password">{pwd}</span>
                  <button 
                    className="history-copy-btn"
                    onClick={() => handleCopyHistory(pwd)}
                  >
                    📋 Copy
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <section className="content-section">
        <h2>Why Client-Side Is the Most Secure</h2>

        <div className="quick-answer">
          <h3>Quick Answer</h3>
          <p>
            <strong>Client-side generation</strong> means all password creation happens in your browser. Zero data transmits over the internet. We can't see your password or log it. It's the gold standard for password security.
          </p>
        </div>

        <p>
          Here's the thing about <strong>secure password generators</strong>: you need to trust them completely. That's why we designed our tool with a simple principle: <em>what we can't access, we can't compromise</em>.
        </p>

        <h3>Proof: Verify It Yourself</h3>
        <p>Don't take our word for it. Here's how to prove we're telling the truth:</p>
        <ol>
          <li>Open your browser's Developer Tools (press F12)</li>
          <li>Click the "Network" tab</li>
          <li>Generate a password on our tool</li>
          <li>Watch—you'll see <strong>zero outbound requests</strong></li>
        </ol>
      </section>

      <section className="content-section faq-section">
        <h2>Secure Password FAQ</h2>

        <h3>Is this password generator secure?</h3>
        <p>
          <strong>Yes, completely secure.</strong> All password generation happens client-side. Nothing is sent to servers, nothing logged. Open your network inspector—zero requests when generating.
        </p>

        <h3>How do I know my password isn't being logged?</h3>
        <p>
          <strong>Verify it yourself.</strong> Open Developer Tools (F12) → Network tab → Generate password. Zero network requests to our servers. We literally can't access your passwords.
        </p>

        <h3>What is client-side password generation?</h3>
        <p>
          <strong>All computation happens in your browser.</strong> JavaScript uses crypto.getRandomValues() to create passwords locally. No data transmits over the internet.
        </p>
      </section>

      <section className="content-section">
        <h2>More Password Tools</h2>
        <ul>
          <li><Link href="/">Dynamic Password Generator</Link> — Full-featured tool</li>
          <li><Link href="/random-password-generator">Random Password Generator</Link> — CSPRNG-based</li>
          <li><Link href="/strong-password-generator">Strong Password Generator</Link> — 24 characters</li>
          <li><Link href="/free-password-generator">Free Password Generator</Link> — No signup</li>
        </ul>
      </section>

      <footer className="footer">
        <p>© 2025 DynamicPassGen.com | <Link href="/privacy">Privacy Policy</Link> | All passwords generated client-side</p>
        <p className="footer-security">100% Client-Side | Zero Server Transmission | <Link href="/">Dynamic Password Generator</Link></p>
        <p className="last-updated"><strong>Last Updated: October 29, 2025</strong></p>
      </footer>
    </div>
  )
}