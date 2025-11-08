'use client'

import { useState } from 'react'
import { generateSecurePassword, calculateStrength } from '@/lib/passwordUtils'
import Link from 'next/link'

export default function RandomPasswordGenerator() {
  const [password, setPassword] = useState<string>("Click 'Generate Password' to start")
  const [length, setLength] = useState<number>(20)
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
          'event_category': 'random_password_generator',
          'event_label': 'generate_button_click',
          'value': 1
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
        <h1 className="title">🎲 Random Password Generator</h1>
        <div className="subtitle">
          <p>
            Need a <strong>genuinely random password</strong>? You're in the right place. Our generator uses your browser's <strong>Web Crypto API</strong> to create passwords with true cryptographic randomness—no patterns, no predictability, just the same military-grade randomness that protects your banking data.
          </p>
        </div>
      </header>

      <div className="quick-answer">
        <h2>Generate a Random Password</h2>
        <p>
          Click "Generate Password" below to create a truly random password using <strong>crypto.getRandomValues()</strong>—a fancy name for "mathematically impossible to predict." Every character is chosen independently from the full set. No patterns, no shortcuts, no BS. Just genuine randomness.
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
          <h2 className="section-title">Random Password Options</h2>
          <p className="options-note">We've set this up for maximum randomness—all character types enabled, 20 characters by default. You can tweak it, but honestly? These defaults are perfect.</p>

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
        <h2>What Makes a Password Truly Random?</h2>

        <div className="quick-answer">
          <h3>Quick Answer</h3>
          <p>
            A <strong>truly random password</strong> comes from a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG)—not basic functions like <code>Math.random()</code>. We use your browser's <strong>Web Crypto API</strong> (<code>crypto.getRandomValues()</code>), which pulls randomness from actual physical processes: hardware noise, mouse jiggles, network timing, CPU temperature fluctuations. The result? Passwords that are genuinely unpredictable—no patterns, no shortcuts for hackers.
          </p>
        </div>

        <p>
          Here's the thing: not all "random" is created equal. You might think any scrambled mix of characters qualifies as random, but in the security world, <strong>random</strong> means something specific: <em>unpredictable</em>. If an attacker can guess even one character with better odds than pure chance, your password isn't truly random—and you're at risk.
        </p>

        <h3>The Problem with "Random Enough"</h3>
        <p>
          Let's talk about <code>Math.random()</code>—the function most websites use for random numbers. It's fine for picking lottery numbers in a game or shuffling a playlist. For passwords? Terrible choice. Here's why:
        </p>
        <ul>
          <li>
            <strong>It's predictable:</strong> <code>Math.random()</code> uses an algorithm. Give it the same starting point (called a "seed"), and it produces the same sequence every time. An attacker who observes a few passwords can reverse-engineer the seed and predict all future passwords.
          </li>
          <li>
            <strong>Small state space:</strong> Many implementations use 32-bit seeds—only 4 billion possible starting points. Sounds like a lot? A modern GPU can test all 4 billion in minutes.
          </li>
          <li>
            <strong>Timestamp seeding:</strong> Worse, some generators seed <code>Math.random()</code> with the current time. If an attacker knows you created a password on October 29, 2025, they only need to test seeds from that day—maybe 86,400 possibilities. Child's play for a computer.
          </li>
        </ul>

        <h3>Enter CSPRNG: Actually Random</h3>
        <p>
          A <strong>Cryptographically Secure Pseudo-Random Number Generator</strong> (CSPRNG) is built from the ground up for security. Our tool uses <code>crypto.getRandomValues()</code>, which your browser implements using operating-system-level CSPRNGs. Here's what makes it uncrackable:
        </p>
        <ul>
          <li>
            <strong>True entropy sources:</strong> Instead of using the clock, CSPRNGs pull randomness from physical chaos—keyboard timings, mouse movement, disk drive jitter, thermal noise in your CPU, network packet arrival times. These aren't predictable because they're rooted in quantum-level physics.
          </li>
          <li>
            <strong>Huge state space:</strong> Modern CSPRNGs maintain 128-bit or 256-bit internal states. That's 2<sup>128</sup> possible states—more than the number of atoms in the known universe. Good luck brute-forcing that.
          </li>
          <li>
            <strong>Forward secrecy:</strong> Even if an attacker somehow learned the CSPRNG's state right now, they can't predict past outputs. It's a one-way street.
          </li>
        </ul>
      </section>

      <section className="content-section faq-section">
        <h2>Random Password Generator FAQ</h2>

        <h3>What makes a password truly random?</h3>
        <p>
          <strong>Simple answer: unpredictability.</strong> A truly random password uses a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) that pulls entropy from chaotic physical processes—not algorithms you can reverse-engineer. Our tool uses <code>crypto.getRandomValues()</code>, which sources randomness from hardware noise, timing jitter, and system events. The result? Each character is genuinely independent and unpredictable. No patterns, no shortcuts for attackers.
        </p>

        <h3>How is this different from Math.random()?</h3>
        <p>
          <strong>Night and day difference.</strong> <code>Math.random()</code> is a basic algorithm designed for games—not security. Given the same starting seed, it produces the same sequence every time. An attacker who sees a few outputs can reverse-engineer the seed and predict every future password. <code>crypto.getRandomValues()</code> is cryptographically secure: even with infinite computing power and knowledge of past outputs, you can't predict the next one. One's a lockable door; the other's a bank vault.
        </p>

        <h3>Can patterns emerge in random passwords?</h3>
        <p>
          <strong>No, not with proper CSPRNGs.</strong> When using <code>crypto.getRandomValues()</code>, each character is chosen independently with uniform probability from the full character set. There are no sequential biases, no repeated character tendencies, and no predictable structures. If you're seeing patterns, it's coincidence—not a flaw.
        </p>

        <h3>Is it safe to generate passwords on my device?</h3>
        <p>
          <strong>100% safe.</strong> Everything happens in your browser using JavaScript and the Web Crypto API. Nothing gets sent to our servers, nothing gets logged, and we literally cannot see what you generate even if we wanted to. Want proof? Open your browser's Developer Tools (press F12), go to the Network tab, and generate a password—you'll see zero outbound requests. Your passwords never leave your device.
        </p>

        <h3>Should I use a random password for every account?</h3>
        <p>
          <strong>Absolutely, yes.</strong> Reusing passwords is security mistake #1. When a site gets breached (happens constantly), attackers immediately try those credentials everywhere—banking, email, social media, everything. Generate a unique random password for each account and store them in a password manager (1Password, NordPass, Bitwarden). You'll only need to remember one master password.
        </p>
      </section>

      <section className="content-section">
        <h2>More Password Tools</h2>
        <p>Looking for something specific? Check out our other specialized generators:</p>
        <ul>
          <li><Link href="/">Dynamic Password Generator</Link> — Our main tool with all the bells and whistles</li>
          <li><Link href="/strong-password-generator">Strong Password Generator</Link> — Pre-configured for maximum strength</li>
          <li><Link href="/secure-password-generator">Secure Password Generator</Link> — Privacy-first with enhanced security</li>
          <li><Link href="/free-password-generator">Free Password Generator</Link> — No signup, no tracking, forever free</li>
        </ul>
      </section>

      <footer className="footer">
        <p>© 2025 DynamicPassGen.com | <Link href="/privacy">Privacy Policy</Link> | All passwords generated client-side | No data stored</p>
        <p className="footer-security">
          CSPRNG Random Generation | Web Crypto API | Zero Server Transmission | 
          <Link href="/">Dynamic Password Generator</Link>
        </p>
        <p className="last-updated"><strong>Last Updated: October 29, 2025</strong> — Specialized random password generator with CSPRNG deep-dive and entropy education</p>
      </footer>
    </div>
  )
}