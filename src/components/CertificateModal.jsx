import React, { useState, useRef } from 'react'
import { useLang } from '../i18n.jsx'
import { getCurrentUser } from '../progress.js'

export default function CertificateModal({ certificate, onClose }) {
  const { pick } = useLang()
  const user = getCurrentUser()
  const [candidateName, setCandidateName] = useState(
    certificate?.candidateName || user?.displayName || 'Citizen Scholar'
  )
  const [isEditingName, setIsEditingName] = useState(false)
  const [copiedNotice, setCopiedNotice] = useState('')
  const certRef = useRef(null)

  if (!certificate) return null

  const certId = certificate.id || `LS-CONST-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
  const issueDate = certificate.issueDate
    ? new Date(certificate.issueDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

  const certTitle = pick(certificate.title) || 'Certified Constitutional Architect'
  const certDescription = pick(certificate.description) || 
    'Demonstrated exemplary mastery of the Indian Constitution by assembling the core constitutional pillars, tripartite organs of government, federal division of powers, and autonomous watchdogs of the Republic of India.'

  // Social sharing helpers
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://legal-sahayak.netlify.app'
  const postText = `🎖️ Proud to share that I have earned the "${certTitle}" on Legal Sahayak! I successfully mastered constitutional principles, governmental organs, and civic rights under the Indian Constitution. Check out Legal Sahayak: ${shareUrl} #IndianConstitution #CivicEducation #LegalSahayak #ConstitutionOfIndia`

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer')
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postText)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
  }

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postText)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }

  const handleCopyText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(postText)
      setCopiedNotice(pick({ en: 'Copied to clipboard!', hi: 'क्लिपबोर्ड पर कॉपी किया गया!' }))
      setTimeout(() => setCopiedNotice(''), 3000)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="modal-backdrop certificate-modal-backdrop" onClick={onClose}>
      <div
        className="modal-card certificate-modal-dialog"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Toolbar */}
        <div className="cert-modal-header no-print">
          <div className="cert-modal-title-group">
            <span className="cert-header-badge">🎓 OFFICIAL RECOGNITION</span>
            <h3>{pick({ en: 'Your Constitutional E-Certificate', hi: 'आपका संवैधानिक ई-प्रमाणपत्र' })}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        {/* Printable Official Certificate Canvas */}
        <div className="cert-scroll-area">
          <div className="certificate-frame" ref={certRef} id="printable-certificate">
            {/* Guilloche Corner Accents */}
            <div className="cert-corner top-left" />
            <div className="cert-corner top-right" />
            <div className="cert-corner bottom-left" />
            <div className="cert-corner bottom-right" />

            {/* Inner Border & Ashoka Chakra Watermark */}
            <div className="cert-inner-border">
              <div className="cert-watermark" aria-hidden="true">☸</div>

              {/* Certificate Top Header */}
              <div className="cert-top-header">
                <div className="cert-emblem-wrap">
                  <span className="cert-national-emblem" aria-hidden="true">🏛️</span>
                </div>
                <div className="cert-authority">
                  <span className="cert-org-sup">LEGAL SAHAYAK CIVIC ACADEMY OF INDIA</span>
                  <span className="cert-org-sub">संवैधानिक साक्षरता एवं नागरिक शिक्षा मंच</span>
                </div>
              </div>

              {/* Title Section */}
              <div className="cert-title-section">
                <div className="cert-kicker">CERTIFICATE OF RECOGNITION</div>
                <h1 className="cert-title">{certTitle}</h1>
                <div className="cert-subtitle">PROUDLY PRESENTED TO</div>
              </div>

              {/* Recipient Name */}
              <div className="cert-recipient-box">
                {isEditingName ? (
                  <div className="cert-name-input-group no-print">
                    <input
                      type="text"
                      className="cert-name-input"
                      value={candidateName}
                      onChange={e => setCandidateName(e.target.value)}
                      placeholder="Enter your full name"
                      autoFocus
                    />
                    <button
                      className="btn primary small"
                      onClick={() => setIsEditingName(false)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="cert-recipient-name-wrap">
                    <span className="cert-recipient-name">{candidateName}</span>
                    <button
                      className="cert-edit-name-btn no-print"
                      onClick={() => setIsEditingName(true)}
                      title="Edit name on certificate"
                    >
                      ✏️
                    </button>
                  </div>
                )}
                <div className="cert-recipient-underline" />
              </div>

              {/* Citation Body */}
              <p className="cert-citation">
                {certDescription}
              </p>

              {/* Certificate Footer: Signatures & Verification Seal */}
              <div className="cert-footer">
                <div className="cert-meta-item">
                  <span className="cert-meta-label">DATE OF ISSUANCE</span>
                  <span className="cert-meta-val">{issueDate}</span>
                </div>

                <div className="cert-seal-box">
                  <div className="cert-seal-outer">
                    <div className="cert-seal-inner">
                      <span className="cert-seal-icon">☸</span>
                      <span className="cert-seal-text">VERIFIED</span>
                    </div>
                  </div>
                </div>

                <div className="cert-meta-item right">
                  <span className="cert-meta-label">VERIFICATION ID</span>
                  <span className="cert-meta-val cert-id-code">{certId}</span>
                </div>
              </div>

              <div className="cert-legitimacy-bar">
                <span>Verified by Legal Sahayak • Dedicated to Article 51A Constitutional Values</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel: Share to LinkedIn, WhatsApp, X, Print */}
        <div className="cert-actions-card no-print">
          <div className="cert-actions-intro">
            <h4>{pick({ en: 'Share Your Achievement & Boost Your Reputation', hi: 'अपनी उपलब्धि साझा करें और अपनी प्रतिष्ठा बढ़ाएं' })}</h4>
            <p>
              {pick({
                en: 'Add this verified constitutional credential to your LinkedIn profile or share with educators and peers.',
                hi: 'इस सत्यापित संवैधानिक उपलब्धि को अपने लिंक्डइन प्रोफाइल पर जोड़ें या साथियों के साथ साझा करें।'
              })}
            </p>
          </div>

          <div className="cert-share-buttons">
            <button
              className="cert-btn linkedin-btn"
              onClick={handleLinkedInShare}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.66 1.66 0 0 0 0 3.3m1.4 9.74v-8.37H5.06v8.37z" />
              </svg>
              <span>{pick({ en: 'Share on LinkedIn', hi: 'LinkedIn पर शेयर करें' })}</span>
            </button>

            <button
              className="cert-btn whatsapp-btn"
              onClick={handleWhatsAppShare}
            >
              <span className="btn-social-icon">💬</span>
              <span>{pick({ en: 'WhatsApp', hi: 'WhatsApp' })}</span>
            </button>

            <button
              className="cert-btn twitter-btn"
              onClick={handleTwitterShare}
            >
              <span className="btn-social-icon">𝕏</span>
              <span>{pick({ en: 'Post on X', hi: 'X पर पोस्ट करें' })}</span>
            </button>

            <button
              className="cert-btn print-btn"
              onClick={handlePrint}
            >
              <span className="btn-social-icon">🖨️</span>
              <span>{pick({ en: 'Print / Save PDF', hi: 'प्रिंट / PDF सेव करें' })}</span>
            </button>

            <button
              className="cert-btn copy-btn"
              onClick={handleCopyText}
            >
              <span className="btn-social-icon">📋</span>
              <span>{copiedNotice || pick({ en: 'Copy Post Text', hi: 'पोस्ट टेक्स्ट कॉपी करें' })}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
