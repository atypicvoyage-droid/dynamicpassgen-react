import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dynamic Password Generator - Secure, Advanced & Free Tool',
  description: 'Generate strong, random passwords with advanced algorithms. Real-time strength meter, 100% secure client-side generation. Free, NIST 2025 compliant password tool.',
  keywords: 'password generator, strong password, random password, dynamic password generator, secure password, free password generator, advanced password tool, cryptographically secure password',
  authors: [{ name: 'DynamicPassGen' }],
  openGraph: {
    type: 'website',
    url: 'https://dynamicpassgen.com',
    title: 'Dynamic Password Generator - Modern, Secure, Fast',
    description: 'Generate powerful, random passwords with advanced algorithms. Real-time strength analysis. 100% secure, client-side only.',
    images: [{
      url: 'https://dynamicpassgen.com/images/og-image.jpeg',
      width: 1200,
      height: 630,
      alt: 'Dynamic Password Generator - Advanced Security Tool',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dynamic Password Generator',
    description: 'Advanced password generation with real-time strength meter',
    images: ['https://dynamicpassgen.com/images/twitter-card.jpeg'],
  },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="https://dynamicpassgen.com/images/og-image.jpeg" fetchPriority="low" />
        <link rel="preload" as="image" href="https://dynamicpassgen.com/images/twitter-card.jpeg" fetchPriority="low" />
        <link rel="canonical" href="https://dynamicpassgen.com" />
      </head>
      <body>
        {children}
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3BCWKZX0ZM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3BCWKZX0ZM');
          `}
        </Script>

        {/* Google AdSense - Delayed Load */}
        <Script
          id="adsense-loader"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                setTimeout(function() {
                  var script = document.createElement('script');
                  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3480380251842662';
                  script.async = true;
                  script.crossOrigin = 'anonymous';
                  document.head.appendChild(script);
                }, 3000);
              });
            `
          }}
        />

        {/* Structured Data - WebApplication */}
        <Script
          id="structured-data-webapp"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Dynamic Password Generator",
              "description": "Advanced password generator with real-time strength analysis and cryptographic security. NIST 2025 compliant tool for creating strong, random passwords using Web Crypto API.",
              "url": "https://dynamicpassgen.com",
              "applicationCategory": "SecurityApplication",
              "operatingSystem": "Any (Web-based)",
              "browserRequirements": "Requires JavaScript and modern browser with Web Crypto API support",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Cryptographically secure random password generation using Web Crypto API",
                "Real-time password strength meter with entropy calculation",
                "Crack time estimation based on 10 billion guesses per second",
                "Password history tracking (last 5 passwords, temporary session storage only)",
                "Customizable character sets (uppercase, lowercase, numbers, symbols)",
                "Exclude ambiguous characters option (0, O, 1, l, I)",
                "One-click clipboard copy functionality",
                "100% client-side processing (zero server transmission)",
                "NIST SP 800-63B 2025 compliant security standards",
                "Password length range: 8-64 characters"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "3247",
                "bestRating": "5",
                "worstRating": "1"
              },
              "author": {
                "@type": "Organization",
                "name": "DynamicPassGen",
                "url": "https://dynamicpassgen.com"
              },
              "dateModified": "2025-10-28",
              "inLanguage": "en-US"
            })
          }}
        />

        {/* Structured Data - FAQPage */}
        <Script
          id="structured-data-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is this password generator safe to use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Every password you generate stays on your device. We use your browser's built-in crypto.getRandomValues() function—the same cryptographic system that secures online banking. Nothing gets sent to our servers, nothing gets logged, and we literally can't see what you create. All password generation happens locally using JavaScript with the Web Crypto API."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long should my password be?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "At least 16 characters. An 8-character password might be cracked in hours with modern hacking tools. A 16-character password with mixed character types would take centuries to crack. NIST (National Institute of Standards and Technology) now recommends 15-16 characters as the minimum. Our password generator supports up to 64 characters for maximum security."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What makes this generator 'dynamic'?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We provide real-time feedback showing entropy (mathematical randomness), estimated crack time, and security level—not just 'strong' or 'weak.' Everything adapts to your needs with customizable character types, length options, and the ability to exclude ambiguous characters. You control everything and see exactly how each choice affects your security."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use special characters and symbols?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Including symbols (!@#$%^&*) dramatically boosts password strength by adding 32 more possible characters per position, which multiplies total combinations exponentially. Some older websites may reject certain symbols, so you can disable the symbols option and compensate with a longer password if needed."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What if I forget my generated password?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Use a password manager like 1Password, NordPass, LastPass, or Bitwarden. Generate a secure password with our tool, immediately copy it to your password manager, and let it autofill whenever you need to log in. You only need to remember one master password instead of dozens. Our 'Recent Passwords' history shows your last 5 passwords temporarily, but they disappear when you close the page."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are password generators better than creating my own?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, every time. Humans are terrible at randomness and fall into predictable patterns that hackers exploit—keyboard patterns (qwerty123), repeated characters, or sequences. A proper random password generator using cryptographic functions creates genuinely unpredictable combinations that even the smartest hacker can't guess, while automatically ensuring the right complexity."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Should I change my passwords regularly?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Only change passwords when necessary. NIST now says forced regular changes actually decrease security because people make weak patterns (Password1, Password2, Password3). Instead, use strong unique passwords everywhere, enable two-factor authentication, and only change passwords if there's been a data breach affecting that service. Use 'Have I Been Pwned' to check if your accounts appear in known breaches."
                  }
                }
              ]
            })
          }}
        />

        {/* Structured Data - HowTo */}
        <Script
          id="structured-data-howto"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Create a Strong Password",
              "description": "Step-by-step guide to generating a cryptographically secure password using advanced algorithms and best practices for 2025.",
              "totalTime": "PT2M",
              "tool": [{
                "@type": "HowToTool",
                "name": "Dynamic Password Generator"
              }],
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Choose password length",
                  "text": "Select a password length of at least 16 characters using the length slider. Longer passwords (20-64 characters) provide exponentially more security against brute-force attacks.",
                  "url": "https://dynamicpassgen.com#length-slider"
                },
                {
                  "@type": "HowToStep",
                  "name": "Select character types",
                  "text": "Enable all character types: uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and symbols (!@#$%^&*). This maximizes entropy and password strength by increasing the pool of possible characters.",
                  "url": "https://dynamicpassgen.com#character-options"
                },
                {
                  "@type": "HowToStep",
                  "name": "Optional: Exclude ambiguous characters",
                  "text": "If the website or service doesn't clearly distinguish between similar-looking characters, enable 'Exclude Ambiguous Characters' to avoid confusion between 0/O, 1/l/I, and similar characters.",
                  "url": "https://dynamicpassgen.com#advanced-options"
                },
                {
                  "@type": "HowToStep",
                  "name": "Generate your password",
                  "text": "Click the 'Generate Password' button. The tool uses your browser's Web Crypto API (crypto.getRandomValues()) to create a cryptographically secure random password. View the real-time strength meter showing entropy and estimated crack time.",
                  "url": "https://dynamicpassgen.com#generate-btn"
                },
                {
                  "@type": "HowToStep",
                  "name": "Copy and store securely",
                  "text": "Click the 'Copy' button to copy your password to clipboard. Immediately paste it into a password manager (1Password, NordPass, LastPass, Bitwarden) for secure storage. Never store passwords in plain text files or unsecured notes.",
                  "url": "https://dynamicpassgen.com#copy-btn"
                }
              ]
            })
          }}
        />

        {/* Structured Data - BreadcrumbList */}
        <Script
          id="structured-data-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://dynamicpassgen.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Password Generator",
                  "item": "https://dynamicpassgen.com#password-generator"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Security Tips",
                  "item": "https://dynamicpassgen.com#security-tips"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "FAQ",
                  "item": "https://dynamicpassgen.com#faq-section"
                }
              ]
            })
          }}
        />
      </body>
    </html>
  )
}