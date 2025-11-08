interface PasswordOptions {
  length: number
  useUppercase: boolean
  useLowercase: boolean
  useNumbers: boolean
  useSymbols: boolean
  excludeAmbiguous: boolean
}

interface StrengthResult {
  score: number
  label: string
  entropy: number
  crackTime: string
  color: string
}

const charSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  ambiguous: '0O1lI'
}

export function generateSecurePassword(options: PasswordOptions): string | null {
  const { length, useUppercase, useLowercase, useNumbers, useSymbols, excludeAmbiguous } = options

  let charset = ''
  if (useLowercase) charset += charSets.lowercase
  if (useUppercase) charset += charSets.uppercase
  if (useNumbers) charset += charSets.numbers
  if (useSymbols) charset += charSets.symbols

  if (charset.length === 0) {
    alert('Please select at least one character type!')
    return null
  }

  if (excludeAmbiguous) {
    charset = charset.split('').filter(char => !charSets.ambiguous.includes(char)).join('')
  }

  let password = ''
  let isValid = false
  let attempts = 0
  const maxAttempts = 10

  while (!isValid && attempts < maxAttempts) {
    password = ''
    
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const array = new Uint32Array(length)
      window.crypto.getRandomValues(array)
      
      for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length]
      }
    } else {
      return null
    }

    isValid = true
    if (useUppercase && !/[A-Z]/.test(password)) isValid = false
    if (useLowercase && !/[a-z]/.test(password)) isValid = false
    if (useNumbers && !/[0-9]/.test(password)) isValid = false
    if (useSymbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) isValid = false

    attempts++
  }

  if (!isValid) {
    console.error('Failed to generate valid password after ' + maxAttempts + ' attempts')
    alert('Failed to generate password. Please try again.')
    return null
  }

  return password
}

export function calculateStrength(password: string): StrengthResult {
  if (!password) {
    return {
      score: 0,
      label: 'No Password',
      entropy: 0,
      crackTime: '-',
      color: '#cccccc'
    }
  }

  let score = 0
  const length = password.length

  // Length scoring (up to 45 points)
  if (length >= 20) {
    score += 45
  } else if (length >= 16) {
    score += 40
  } else if (length >= 12) {
    score += 30
  } else if (length >= 10) {
    score += 25
  } else if (length >= 8) {
    score += 20
  } else {
    score += 10
  }

  // Character variety scoring (up to 45 points)
  const hasLowercase = /[a-z]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)

  const varietyCount = [hasLowercase, hasUppercase, hasNumbers, hasSymbols].filter(Boolean).length
  score += varietyCount * 11
  if (varietyCount === 4) score += 1

  // Entropy calculation
  let charsetSize = 0
  if (hasLowercase) charsetSize += 26
  if (hasUppercase) charsetSize += 26
  if (hasNumbers) charsetSize += 10
  if (hasSymbols) charsetSize += 20

  const entropy = length * Math.log2(charsetSize)

  // Entropy bonus scoring (up to 20 points)
  if (entropy >= 128) {
    score += 20
  } else if (entropy >= 100) {
    score += 15
  } else if (entropy >= 80) {
    score += 10
  } else if (entropy >= 60) {
    score += 5
  }

  // Pattern detection (deductions)
  if (/(.)\1{2,}/.test(password)) score -= 10
  if (/^[0-9]+$/.test(password)) score -= 15
  if (/^[a-zA-Z]+$/.test(password)) score -= 10
  if (/abc|bcd|cde|def|123|234|345|456|567|678|789/.test(password.toLowerCase())) score -= 5
  if (/qwerty|asdf|zxcv|1qaz|2wsx/.test(password.toLowerCase())) score -= 10

  score = Math.max(0, Math.min(100, score))

  // Determine strength label and color
  let label = ''
  let color = ''

  if (score >= 90) {
    label = 'Excellent'
    color = '#00c851'
  } else if (score >= 75) {
    label = 'Very Strong'
    color = '#7cb342'
  } else if (score >= 60) {
    label = 'Strong'
    color = '#ffbb33'
  } else if (score >= 40) {
    label = 'Medium'
    color = '#ff8800'
  } else {
    label = 'Weak'
    color = '#ff4444'
  }

  const crackTime = calculateCrackTime(charsetSize, length)

  return {
    score,
    label,
    entropy: Math.round(entropy),
    crackTime,
    color
  }
}

function calculateCrackTime(charsetSize: number, length: number): string {
  const combinations = Math.pow(charsetSize, length)
  const guessesPerSecond = 10000000000
  const seconds = combinations / guessesPerSecond / 2

  if (seconds < 1) {
    return 'instantly'
  } else if (seconds < 60) {
    return 'seconds'
  } else if (seconds < 3600) {
    return 'minutes'
  } else if (seconds < 86400) {
    return 'hours'
  } else if (seconds < 2592000) {
    return 'days'
  } else if (seconds < 31536000) {
    return 'months'
  } else if (seconds < 3153600000) {
    return 'years'
  } else if (seconds < 31536000000) {
    return 'centuries'
  } else {
    return 'millennia'
  }
}