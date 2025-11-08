'use client'

import { useState } from 'react'
import { generateSecurePassword, calculateStrength } from '@/lib/passwordUtils'
import Link from 'next/link'

export default function FreePasswordGenerator() {
  const [password, setPassword] = useState<string>("Click 'Generate Password' to start")
  const [length, setLength] = useState<number>(16)
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
          'event_category': 'free_password_generator',
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
        <h1 className="title">🆓 Free Password Generator</h1>
        <div className="subtitle">
          <p>
            Generate <strong>secure passwords</strong> for free—<strong>no signup, no payment, no tracking</strong>. Create unlimited passwords forever. Completely free tool powered by your browser's Web Crypto API.
          </p>
        </div>
      </header>

      <div className="quick-answer">
        <h2>Generate a Free Password</h2>
        <p>
          Click "Generate Password" to create a <strong>free secure password</strong> instantly. No signup required, no payment needed, unlimited usage. Forever free.
        </p>
      </div>

      <main className="card">
        <div className="free-notice">
          <h3>✅ Completely Free</h3>
          <ul>
            <li>✓ <strong>No signup required:</strong> Use immediately</li>
            <li>✓ <strong>No payment needed:</strong> Forever free</li>
            <li>✓ <strong>Unlimited passwords:</strong> No limits</li>
            <li>✓ <strong>No tracking:</strong> We don't collect data</li>
            <li>✓ <strong>No upsells:</strong> All features available</li>
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
          <h2 className="section-title">Free Password Options</h2>

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
        <h2>Why We're Free (And Always Will Be)</h2>

        <div className="quick-answer">
          <h3>Quick Answer</h3>
          <p>
            We believe <strong>password security should be free</strong>. This tool is <strong>100% free</strong>: no signup, no payment, no limits, no tracking. Generate unlimited passwords forever.
          </p>
        </div>

        <p>
          Let's be honest: too many "free" tools aren't really free. They offer 3 passwords per day, then upsell you. We're doing something different: <strong>actually free</strong>.
        </p>

        <h3>What "Free" Really Means Here</h3>
        <ul>
          <li><strong>No signup:</strong> Use immediately. No email, no account.</li>
          <li><strong>No payment:</strong> Never pay a cent. No trials requiring credit cards.</li>
          <li><strong>Unlimited:</strong> Generate 1 or 1,000 passwords. No caps.</li>
          <li><strong>No tracking:</strong> We don't collect your data.</li>
          <li><strong>Forever free:</strong> This isn't temporary. Password security is a right.</li>
        </ul>
      </section>

      <section className="content-section faq-section">
        <h2>Free Password FAQ</h2>

        <h3>Is this really free?</h3>
        <p>
          <strong>Yes, 100% free.</strong> No signup, no payment, no hidden fees. Generate unlimited passwords forever. Free now, free always.
        </p>

        <h3>Do I need an account?</h3>
        <p>
          <strong>No account required.</strong> Just visit and start generating. No email signup, no login. You're anonymous by default.
        </p>

        <h3>Are there usage limits?</h3>
        <p>
          <strong>No limits.</strong> Generate as many passwords as you want, as often as you want. No daily caps, no monthly limits.
        </p>
      </section>

      <section className="content-section">
        <h2>More Password Tools</h2>
        <ul>
          <li><Link href="/">Dynamic Password Generator</Link> — Full-featured tool</li>
          <li><Link href="/random-password-generator">Random Password Generator</Link> — CSPRNG-based</li>
          <li><Link href="/strong-password-generator">Strong Password Generator</Link> — 24 characters</li>
          <li><Link href="/secure-password-generator">Secure Password Generator</Link> — Privacy-focused</li>
        </ul>
      </section>

      <footer className="footer">
        <p>© 2025 DynamicPassGen.com | <Link href="/privacy">Privacy Policy</Link> | All passwords generated client-side</p>
        <p className="footer-security">100% Free | No Signup | No Limits | <Link href="/">Dynamic Password Generator</Link></p>
        <p className="last-updated"><strong>Last Updated: October 29, 2025</strong></p>
      </footer>
    </div>
  )
}