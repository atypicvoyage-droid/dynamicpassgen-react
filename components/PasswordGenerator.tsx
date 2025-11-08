'use client'

import { useState, useEffect } from 'react'
import { generateSecurePassword, calculateStrength } from '@/lib/passwordUtils'

export default function PasswordGenerator() {
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
      
      // Add to history
      setPasswordHistory(prev => [newPassword, ...prev].slice(0, 5))

      // Track in Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_password', {
          'event_category': 'password_tool',
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
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'copy_password', {
          'event_category': 'password_tool',
          'event_label': 'copy_button_click',
          'value': 1
        })
      }

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

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const slider = document.getElementById('length-slider')
      if (slider) {
        slider.addEventListener('change', (e: any) => {
          (window as any).gtag('event', 'password_length_change', {
            'event_category': 'password_options',
            'event_label': 'length_slider',
            'value': parseInt(e.target.value)
          })
        })
      }
    }
  }, [])

  return (
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
        <h2 className="section-title">Password Options</h2>
        
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
  )
}