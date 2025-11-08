import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">🔒 Privacy Policy</h1>
        <div className="intro-section subtitle">
          <p>
            Your privacy matters. Learn how we protect your data and ensure your <strong>passwords</strong> stay completely private with 100% client-side generation.
          </p>
        </div>
      </header>

      <main className="card">
        <p><strong>Last Updated:</strong> October 25, 2025</p>
        <p><strong>Effective Date:</strong> October 25, 2025</p>
        
        <section className="content-section">
          <h2>Our Privacy Commitment</h2>
          <p>
            At <strong>DynamicPassGen.com</strong>, we take your privacy seriously. This page explains what data we collect (spoiler: almost nothing), how we use it, and why you can trust our <strong>password generator</strong> tool. The short version: we never see your passwords, we don't sell your data, and everything happens in your browser.
          </p>
        </section>

        <section className="content-section">
          <h2>1. What We Do NOT Collect</h2>
          <p>Let's start with what matters most:</p>
          <ul>
            <li><strong>❌ We NEVER collect, store, or transmit your passwords</strong> - Every <strong>password</strong> you generate stays on your device only. Period.</li>
            <li><strong>❌ We don't require accounts, registration, or login</strong> - Use our tool anonymously, no strings attached.</li>
            <li><strong>❌ We don't collect personal information</strong> - No names, emails, addresses, or phone numbers.</li>
            <li><strong>❌ We don't track individual users</strong> - We see aggregate traffic patterns, not individual behavior.</li>
            <li><strong>❌ We don't sell your data</strong> - Not now, not ever.</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>2. What We DO Collect (Anonymous Analytics Only)</h2>
          <p>To improve our <strong>password generator</strong> and understand how people use it, we collect limited, anonymous data through Google Analytics:</p>
          <ul>
            <li><strong>Browser & Device Information:</strong> Your browser type, operating system, and device (mobile/desktop/tablet).</li>
            <li><strong>Anonymized IP Address:</strong> Your approximate location (country/city level), with the full IP address anonymized.</li>
            <li><strong>Pages Visited:</strong> Which pages you view on our site (homepage, privacy policy, etc.).</li>
            <li><strong>Time on Site:</strong> How long you spend on each page.</li>
            <li><strong>Referral Source:</strong> Where you came from (Google search, social media, direct visit, etc.).</li>
            <li><strong>Button Clicks:</strong> Whether you clicked "Generate Password," "Copy," or affiliate links (but not what the passwords were).</li>
          </ul>
          <p>
            <strong>Important:</strong> This data is aggregated and anonymized. We can't identify individual users or connect specific actions to specific people.
          </p>
        </section>

        <section className="content-section">
          <h2>3. How We Use Cookies</h2>
          <p>Cookies are small text files stored by your browser. We use them for:</p>
          
          <h3>Essential Cookies (Required for Site Function):</h3>
          <ul>
            <li><strong>Google Analytics:</strong> Tracks anonymous usage statistics (described above).</li>
            <li><strong>Google AdSense (when approved):</strong> Displays relevant ads based on browsing behavior across the web (not specific to our site).</li>
          </ul>
          
          <h3>How to Disable Cookies:</h3>
          <p>
            You can disable cookies in your browser settings at any time. Note that doing so may affect site functionality:
          </p>
          <ul>
            <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and site data</li>
            <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
          </ul>
          <p>
            <strong>Our password generator will still work with cookies disabled</strong> - but we won't be able to improve the site based on usage patterns.
          </p>
        </section>

        <section className="content-section">
          <h2>4. Third-Party Services We Use</h2>
          <p>We work with the following trusted third-party services:</p>
          
          <h3>Google Analytics (Analytics & Tracking)</h3>
          <ul>
            <li><strong>Purpose:</strong> Understand site traffic and user behavior.</li>
            <li><strong>What They Collect:</strong> Anonymous browsing data (described in Section 2).</li>
            <li><strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a></li>
            <li><strong>Opt-Out:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out Browser Add-on</a></li>
          </ul>
          
          <h3>Google AdSense (Advertising)</h3>
            <ul>
                <li><strong>Purpose:</strong> Display contextual ads to help keep our tool free.</li>
                <li><strong>What They Collect:</strong> Browsing behavior across Google's ad network (not specific to our site).</li>
                <li><strong>Privacy Policy:</strong> <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">policies.google.com/technologies/ads</a></li>
                <li><strong>Opt-Out:</strong> <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ad Settings</a></li>
            </ul>
    <h3>Affiliate Links (Password Managers)</h3>
      <ul>
        <li><strong>Services:</strong> 1Password, NordPass, LastPass</li>
        <li><strong>Purpose:</strong> Recommend trusted <strong>password managers</strong> where you can store generated passwords.</li>
        <li><strong>What Happens:</strong> If you click our affiliate links and make a purchase, we may earn a commission at no extra cost to you.</li>
        <li><strong>Your Privacy:</strong> We only know that someone clicked the link, not who you are or what you purchased.</li>
      </ul>
    </section>

    <section className="content-section">
      <h2>5. How Your Passwords Stay Private (100% Client-Side)</h2>
      <p>This is the most important part:</p>
      <ul>
        <li><strong>All password generation happens in your browser</strong> - We use JavaScript and the Web Cryptography API (<code>crypto.getRandomValues()</code>).</li>
        <li><strong>Nothing is sent to our servers</strong> - Your passwords never leave your device, even for a millisecond.</li>
        <li><strong>No server-side processing</strong> - We can't see, log, or access your passwords because they're never transmitted.</li>
        <li><strong>No password storage</strong> - We don't have a database. There's nowhere to store passwords even if we wanted to.</li>
        <li><strong>Password history is temporary</strong> - The "Recent Passwords" feature stores your last 5 passwords in your browser's temporary memory (RAM). Close the tab, and they're gone forever.</li>
      </ul>
      <p>
        <strong>Want proof?</strong> Open your browser's Developer Tools (F12), go to the Network tab, and generate a password. You'll see zero network requests to external servers. Everything happens locally.
      </p>
    </section>

    <section className="content-section">
      <h2>6. Your Rights Under GDPR (EU Users)</h2>
      <p>If you're in the European Union, you have these rights under the General Data Protection Regulation (GDPR):</p>
      <ul>
        <li><strong>Right to Access:</strong> Request what data we have about you (which is virtually nothing, since we don't collect personal info).</li>
        <li><strong>Right to Deletion:</strong> Request that we delete any data we have (again, we have almost nothing).</li>
        <li><strong>Right to Object:</strong> Opt out of data collection by disabling cookies or using an ad blocker.</li>
        <li><strong>Right to Data Portability:</strong> Request a copy of your data in a machine-readable format.</li>
        <li><strong>Right to Withdraw Consent:</strong> Change your cookie preferences at any time.</li>
      </ul>
      <p>
        To exercise these rights, contact us at <strong>contact@dynamicpassgen.com</strong>. We'll respond within 30 days.
      </p>
    </section>

    <section className="content-section">
      <h2>7. Your Rights Under CCPA (California Users)</h2>
      <p>If you're in California, the California Consumer Privacy Act (CCPA) gives you these rights:</p>
      <ul>
        <li><strong>Right to Know:</strong> What personal information we collect (described in Section 2).</li>
        <li><strong>Right to Delete:</strong> Request deletion of your data.</li>
        <li><strong>Right to Opt-Out:</strong> Opt out of data "sales" (we don't sell data, so this doesn't apply).</li>
        <li><strong>Right to Non-Discrimination:</strong> We won't treat you differently for exercising your privacy rights.</li>
      </ul>
      <p>
        To exercise these rights, contact us at <strong>contact@dynamicpassgen.com</strong>.
      </p>
    </section>

    <section className="content-section">
      <h2>8. Data Security</h2>
      <p>Here's how we protect the limited data we do collect:</p>
      <ul>
        <li><strong>HTTPS Encryption:</strong> Our entire site uses HTTPS (SSL/TLS) to encrypt all communications between your browser and our servers.</li>
        <li><strong>No Password Storage:</strong> Since we never receive your passwords, they can't be hacked from us.</li>
        <li><strong>Trusted Third Parties:</strong> We only work with industry-leading services (Google) that maintain enterprise-grade security.</li>
        <li><strong>Regular Updates:</strong> We keep our site software and dependencies up to date to patch security vulnerabilities.</li>
      </ul>
      <p>
        <strong>Remember:</strong> The biggest security feature is that your <strong>passwords never leave your device</strong>. Even if our servers were compromised, your passwords would be safe.
      </p>
    </section>

    <section className="content-section">
      <h2>9. Children's Privacy</h2>
      <p>
        Our <strong>password generator</strong> is suitable for all ages. We don't knowingly collect personal information from anyone, including children under 13. If you're a parent and believe we've accidentally collected data from your child, contact us at <strong>contact@dynamicpassgen.com</strong> and we'll promptly delete it.
      </p>
    </section>

    <section className="content-section">
      <h2>10. Changes to This Privacy Policy</h2>
      <p>
        We may update this policy occasionally to reflect changes in our practices or legal requirements. When we do:
      </p>
      <ul>
        <li>We'll update the "Last Updated" date at the top.</li>
        <li>Major changes will be announced on our homepage.</li>
        <li>Your continued use of our site means you accept the updated policy.</li>
      </ul>
      <p>
        We recommend reviewing this page periodically to stay informed.
      </p>
    </section>

    <section className="content-section">
      <h2>11. International Users</h2>
      <p>
        Our <strong>password generator</strong> is available worldwide. If you're accessing from outside the United States:
      </p>
      <ul>
        <li>Your data may be processed on servers in the U.S. or other countries.</li>
        <li>We comply with GDPR (EU), CCPA (California), and other major privacy regulations.</li>
        <li>Your passwords still never leave your device, regardless of your location.</li>
      </ul>
    </section>

    <section className="content-section">
      <h2>12. Do Not Track (DNT) Signals</h2>
      <p>
        Some browsers support "Do Not Track" (DNT) signals. Currently, there's no industry standard for how to respond to DNT. We honor your browser's cookie settings, but we don't specifically respond to DNT signals. To opt out of tracking, disable cookies (see Section 3) or use browser extensions like Privacy Badger or uBlock Origin.
      </p>
    </section>

    <section className="content-section">
      <h2>13. Contact Us</h2>
      <p>
        Have questions about this Privacy Policy or how we handle your data? We're here to help:
      </p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:contact@dynamicpassgen.com">contact@dynamicpassgen.com</a></li>
        <li><strong>Website:</strong> <a href="https://dynamicpassgen.com">dynamicpassgen.com</a></li>
        <li><strong>Response Time:</strong> We typically respond within 48 hours (weekdays).</li>
      </ul>
      <p>
        For privacy rights requests (GDPR, CCPA), please include "Privacy Request" in your subject line and specify which rights you'd like to exercise.
      </p>
    </section>

    <section className="content-section">
      <h2>14. Summary (TL;DR)</h2>
      <p>
        If you read nothing else, remember this:
      </p>
      <ul>
        <li>✅ <strong>Your passwords never leave your device</strong> - 100% client-side generation.</li>
        <li>✅ <strong>We collect minimal, anonymous analytics</strong> - Just traffic patterns, not personal info.</li>
        <li>✅ <strong>We use cookies for analytics and ads</strong> - You can disable them anytime.</li>
        <li>✅ <strong>We work with Google (Analytics, AdSense)</strong> - Industry-standard, trusted partners.</li>
        <li>✅ <strong>We have affiliate links</strong> - We earn commissions but don't track your purchases.</li>
        <li>✅ <strong>We comply with GDPR, CCPA, and international privacy laws</strong> - Your rights are protected.</li>
        <li>✅ <strong>You can contact us anytime</strong> - We're transparent and responsive.</li>
      </ul>
      <p>
        <strong>Bottom line:</strong> We built this tool to be as private as possible while still providing a great user experience. Your security is our priority.
      </p>
    </section>

    <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '2px solid var(--border-color)', textAlign: 'center' }}>
      <p style={{ marginBottom: '15px' }}>
        <Link href="/" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '16px 32px' }}>
          ← Back to Password Generator
        </Link>
      </p>
      <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>
        Generate <strong>secure passwords</strong> with confidence. Your privacy is protected.
      </p>
    </div>
  </main>

  <footer className="footer">
    <p>© 2025 DynamicPassGen.com | 
       <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</Link> | 
       All passwords generated client-side | No data stored</p>
    <p className="footer-security">
      NIST 2025 Compliant | Cryptographically Secure | 
      <Link href="/" style={{ color: 'inherit', textDecoration: 'underline' }}>Dynamic Password Generator</Link>
    </p>
    <p className="last-updated">Last Updated: October 25, 2025</p>
  </footer>
</div>
 )
}       