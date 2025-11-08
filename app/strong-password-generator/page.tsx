'use client'

import { useState } from 'react'
import { generateSecurePassword, calculateStrength } from '@/lib/passwordUtils'
import Link from 'next/link'

export default function StrongPasswordGenerator() {
  const [password, setPassword] = useState<string>("Click 'Generate Password' to start")
  const [length, setLength] = useState<number>(24)
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
          'event_category': 'strong_password_generator',
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
        <h1 className="title">💪 Strong Password Generator</h1>
        <div className="subtitle">
          <p>
            Generate the <strong>strongest possible passwords</strong> with our pre-configured tool. Default 24-character length, all character types enabled, maximum entropy. Watch the real-time strength meter show you exactly how uncrackable your password is.
          </p>
        </div>
      </header>

      <div className="quick-answer">
        <h2>Generate a Strong Password</h2>
        <p>
          Click "Generate Password" for a <strong>24-character strong password</strong> with all character types enabled by default. Our strength meter shows entropy, crack time estimates, and security level in real-time.
        </p>
      </div>

      <main className="card">
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
          <h2 className="section-title">Strong Password Options</h2>
          <p className="options-note">Pre-configured for maximum strength: 24 characters, all types enabled.</p>

          <div className="option-group">
            <div className="slider-header">
              <label htmlFor="length-slider" className="option-label">Password Length</label>
              <span id="length-value" className="length-display">{length}</span>
            </div>
            <input 
              type="range" 
              id="length-slider" 
              className="slider" 
              min="16" 
              max="64" 
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <div className="slider-labels">
              <span>16</span>
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
        <h2>What Makes a Password Strong?</h2>

        <div className="quick-answer">
          <h3>Quick Answer</h3>
          <p>
            A <strong>strong password</strong> is at least 16 characters long (24+ is even better), uses all character types, and is completely random. <strong>Length matters most:</strong> every extra character multiplies crack time exponentially. Our tool defaults to 24 characters for maximum security.
          </p>
        </div>

        <p>
          Let's cut through the confusion: a <strong>strong password</strong> isn't about throwing in weird symbols. It's about <em>length</em> and <em>randomness</em>. Those are the only two things that matter.
        </p>

        <h3>Length Beats Complexity (Every Single Time)</h3>
        <p>
          Most people think "P@ssw0rd!" is strong because it has symbols. Nope. It's still terrible. Why? Because it's short (9 characters) and based on a dictionary word with predictable substitutions.
        </p>
        <p>
          Compare that to a 24-character random password. An attacker testing 10 billion passwords per second would need trillions of years to crack it. That's not an exaggeration—that's math.
        </p>
      </section>

      <section className="content-section faq-section">
        <h2>Strong Password FAQ</h2>

        <h3>What makes a password strong?</h3>
        <p>
          <strong>Length and randomness.</strong> A strong password is at least 16 characters long (24+ is better), uses all character types, and is completely random. Our generator defaults to 24 characters for maximum protection.
        </p>

        <h3>How long should a strong password be?</h3>
        <p>
          <strong>16 minimum, 24+ recommended.</strong> NIST recommends 15-16 characters as the baseline. We default to 24 characters because it's essentially uncrackable.
        </p>

        <h3>Can I remember a 24-character password?</h3>
        <p>
          <strong>You don't need to.</strong> That's what password managers are for. Generate it with our tool, save it to your password manager, and let it autofill.
        </p>
      </section>

      <section className="content-section">
        <h2>More Password Tools</h2>
        <ul>
          <li><Link href="/">Dynamic Password Generator</Link> — Full-featured tool</li>
          <li><Link href="/random-password-generator">Random Password Generator</Link> — CSPRNG-based</li>
          <li><Link href="/secure-password-generator">Secure Password Generator</Link> — Privacy-focused</li>
          <li><Link href="/free-password-generator">Free Password Generator</Link> — No signup</li>
        </ul>
      </section>

      <footer className="footer">
        <p>© 2025 DynamicPassGen.com | <Link href="/privacy">Privacy Policy</Link> | All passwords generated client-side</p>
        <p className="footer-security">NIST 2025 Compliant | 24-Character Default | <Link href="/">Dynamic Password Generator</Link></p>
        <p className="last-updated"><strong>Last Updated: October 29, 2025</strong></p>
      </footer>
    </div>
  )
}