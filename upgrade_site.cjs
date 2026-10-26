const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'extracted_source');
const outDir = path.resolve(__dirname, 'upgraded_site');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const BRAND_NAME = "SMCyvera by Shahanur Mollah";
const SHORT_BRAND = "SMCyvera";
const CANONICAL_BASE = "https://smcyvera.vercel.app";

const LOGO_HTML = `<a class="logo" href="/index.html" aria-label="SMCyvera by Shahanur Mollah home"><span class="logo-mark">SM</span><div class="logo-text-group"><span class="logo-brand">Cyvera</span><span class="logo-author">by Shahanur Mollah</span></div></a>`;

const FOOTER_HTML = `<footer><div class="container">
<div class="footer-top"><div class="footer-author-box"><img src="/author.jpg" alt="Shahanur Mollah" class="footer-author-avatar" width="52" height="52"><div><div class="footer-brand"><span class="logo-mark">SM</span><div class="logo-text-group"><span class="logo-brand">Cyvera</span><span class="logo-author">by Shahanur Mollah</span></div></div><p class="footer-note">Practical, unbiased technology explainers and browser calculators created by Shahanur Mollah to help you understand tech problems before buying hardware or altering device settings.</p></div></div>
<div><div class="footer-links"><a href="/about.html">About</a><a href="/guides.html">Guides</a><a href="/tools.html">Tools</a><a href="/contact.html">Contact</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></div></div></div>
<div class="footer-bottom"><p>© 2026 SMCyvera by Shahanur Mollah. All rights reserved. Educational information; verify device-specific instructions and manufacturer specifications.</p><a href="/SMCyvera-updated.zip" class="download-package-link" download>Download Complete Vercel Package (.zip)</a></div>
</div></footer>`;

const files = fs.readdirSync(srcDir);

files.forEach(file => {
  if (file.endsWith('.html')) {
    let content = fs.readFileSync(path.join(srcDir, file), 'utf-8');

    // Replace Header Logo
    content = content.replace(/<a[^>]*class="logo"[^>]*>[\s\S]*?<\/a>/i, LOGO_HTML);

    // Replace Footer
    content = content.replace(/<footer>[\s\S]*?<\/footer>/i, FOOTER_HTML);

    if (file === 'index.html') {
      // 1. Homepage Upgrade
      // Update Title
      content = content.replace(/<title>[\s\S]*?<\/title>/i, `<title>SMCyvera by Shahanur Mollah — Technology Guides, Tools &amp; Explainers</title>`);
      
      // Update or replace meta description
      const newDesc = "Practical technology guides, troubleshooting explainers, and browser-based calculators by Shahanur Mollah. Clear, step-by-step solutions for everyday tech problems.";
      content = content.replace(/<meta\s+name="description"\s+content="[^"]*"/i, `<meta name="description" content="${newDesc}"`);

      // Add OpenGraph & Twitter tags + Schema.org WebSite structured data + Schema.org FAQPage structured data
      const seoTags = `
<meta property="og:type" content="website">
<meta property="og:site_name" content="SMCyvera by Shahanur Mollah">
<meta property="og:title" content="SMCyvera by Shahanur Mollah — Technology Guides, Tools &amp; Explainers">
<meta property="og:description" content="${newDesc}">
<meta property="og:url" content="https://smcyvera.vercel.app/">
<meta property="og:image" content="https://smcyvera.vercel.app/author.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="SMCyvera by Shahanur Mollah — Technology Guides, Tools &amp; Explainers">
<meta name="twitter:description" content="${newDesc}">
<meta name="twitter:image" content="https://smcyvera.vercel.app/author.jpg">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SMCyvera by Shahanur Mollah",
  "alternateName": "SMCyvera",
  "url": "https://smcyvera.vercel.app/"
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate how long a battery will run an appliance or inverter load?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Theoretical battery runtime is calculated by multiplying battery voltage (V) by rated capacity (Ah), multiplying by depth-of-discharge and inverter efficiency (typically 85–90%), and dividing by continuous load wattage (W). For example, a 12V 100Ah battery at 85% usable efficiency running a 150W load provides approximately 6.8 hours of power."
      }
    },
    {
      "@type": "Question",
      "name": "Why is Android storage still full after deleting photos and apps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deleted files often remain in the 'Trash' or 'Recently Deleted' albums for 30 days before storage is reclaimed. App cache accumulations, messaging app media backups (e.g., WhatsApp databases), and temporary system download logs also occupy invisible space until cleared in device storage settings."
      }
    },
    {
      "@type": "Question",
      "name": "How can I improve home Wi-Fi coverage across dead zones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Begin by elevating your primary router to a central, open location away from concrete walls and large metal appliances. Separate network bands: connect nearby devices to 5 GHz for maximum speed, and distant devices to 2.4 GHz for superior wall penetration. If dead zones persist, installing a wired access point provides lower latency and higher stability than repeaters."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between MPPT and PWM solar charge controllers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PWM controllers force solar panel voltage down to battery voltage, clipping off excess voltage and losing that potential energy. MPPT (Maximum Power Point Tracking) controllers electronically convert excess panel voltage into additional charging current, delivering 15% to 30% more energy into your battery bank, especially during cold or overcast conditions."
      }
    },
    {
      "@type": "Question",
      "name": "Should I upgrade my computer to an SSD or continue using an HDD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upgrading from an HDD to a Solid State Drive (SSD) is the single most impactful performance upgrade for a PC. SSDs deliver 4× to 30× faster read/write speeds, near-instant operating system boot times, and silent durability without moving mechanical parts. HDDs are now only recommended for bulk archival storage."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between battery Amp-hours (Ah) and Watt-hours (Wh)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Amp-hours (Ah) measure electrical charge capacity at a specific nominal voltage, while Watt-hours (Wh) measure total stored electrical energy regardless of voltage (Wh = Ah × V). Comparing batteries using Watt-hours enables direct, apples-to-apples comparisons across different system voltages."
      }
    }
  ]
}
</script>`;

      // Insert SEO tags before </head>
      content = content.replace('</head>', `${seoTags}\n</head>`);

      // Update Hero text and Eyebrow
      content = content.replace(/<div class="eyebrow">[^<]*<\/div>/i, `<div class="eyebrow">SMCyvera by Shahanur Mollah · Practical Technology</div>`);
      content = content.replace(/<p>SMCyvera publishes practical guides for everyday technology questions—from Android and PCs to Wi-Fi, electronics, batteries, and solar power\.<\/p>/i, `<p>SMCyvera by Shahanur Mollah publishes practical, step-by-step guides for everyday technology questions—from Android and PCs to Wi-Fi, electronics, batteries, and solar power.</p>`);
      content = content.replace(/<a class="btn" href="\/guides\.html">Browse all guides<\/a>/i, `<a class="btn" href="/guides.html">Browse all 28 guides</a>`);
      content = content.replace(/<a class="btn secondary" href="\/tools\.html">Use free tools<\/a>/i, `<a class="btn secondary" href="/tools.html">Use free calculators</a>`);

      // Add Visible FAQ Section
      const faqSectionHtml = `
<section class="section" id="faq"><div class="container">
<div class="section-head"><div><div class="eyebrow">Direct Answers to Common Tech Questions</div><h2>Frequently Asked Questions</h2><p class="section-intro">Concise, practical answers to everyday questions about batteries, inverters, solar systems, Wi-Fi networking, Android phones, and PC hardware.</p></div><a class="read-link" href="/guides.html">View all 28 guides →</a></div>
<div class="faq-accordion-grid">
  <div class="faq-card">
    <h3>How do I calculate how long a battery will run an appliance?</h3>
    <p>Theoretical battery runtime is calculated by multiplying battery voltage (V) by rated capacity (Ah), multiplying by depth-of-discharge and inverter efficiency (typically 85–90%), and dividing by continuous load wattage (W). For example, a 12V 100Ah battery at 85% usable efficiency running a 150W load provides approximately 6.8 hours of power.</p>
    <a class="read-link" href="/solar-battery-backup.html">Read solar battery backup guide →</a>
  </div>
  <div class="faq-card">
    <h3>Why is Android storage still full after deleting photos and apps?</h3>
    <p>Deleted files often remain in the "Trash" or "Recently Deleted" albums for 30 days before storage is reclaimed. App cache accumulations, messaging app media backups (e.g., WhatsApp databases), and temporary system download logs also occupy invisible space until cleared in device storage settings.</p>
    <a class="read-link" href="/android-storage-full.html">Read Android storage guide →</a>
  </div>
  <div class="faq-card">
    <h3>How can I improve home Wi-Fi coverage across dead zones?</h3>
    <p>Begin by elevating your primary router to a central, open location away from concrete walls and large metal appliances. Separate network bands: connect nearby devices to 5 GHz for maximum speed, and distant devices to 2.4 GHz for superior wall penetration. If dead zones persist, installing a wired access point provides lower latency than repeaters.</p>
    <a class="read-link" href="/wifi-coverage.html">Read Wi-Fi coverage guide →</a>
  </div>
  <div class="faq-card">
    <h3>What is the difference between MPPT and PWM solar charge controllers?</h3>
    <p>PWM controllers force solar panel voltage down to battery voltage, clipping off excess voltage and losing that potential energy. MPPT controllers electronically convert excess panel voltage into additional charging current, delivering 15% to 30% more energy into your battery bank, especially during cold or overcast conditions.</p>
    <a class="read-link" href="/mppt-vs-pwm.html">Read MPPT vs PWM guide →</a>
  </div>
  <div class="faq-card">
    <h3>Should I upgrade my computer to an SSD or continue using an HDD?</h3>
    <p>Upgrading from an HDD to a Solid State Drive (SSD) is the single most impactful performance upgrade for a PC. SSDs deliver 4× to 30× faster read/write speeds, near-instant operating system boot times, and silent durability without moving mechanical parts. HDDs are now only recommended for bulk archival storage.</p>
    <a class="read-link" href="/ssd-vs-hdd.html">Read SSD vs HDD guide →</a>
  </div>
  <div class="faq-card">
    <h3>What is the difference between battery Amp-hours (Ah) and Watt-hours (Wh)?</h3>
    <p>Amp-hours (Ah) measure electrical charge capacity at a specific nominal voltage, while Watt-hours (Wh) measure total stored electrical energy regardless of voltage (Wh = Ah × V). Comparing batteries using Watt-hours enables direct, apples-to-apples comparisons across different system voltages.</p>
    <a class="read-link" href="/battery-ah-wh.html">Read Battery Ah vs Wh guide →</a>
  </div>
</div>
</div></section>`;

      // Insert FAQ section before editorial approach section
      content = content.replace(/(<section class="section"><div class="container"><div class="grid"><div class="card"><span class="tag">Editorial approach<\/span>)/i, `${faqSectionHtml}\n$1`);

      // Add Creator Spotlight to Homepage
      const creatorSpotlight = `
<div class="creator-spotlight">
  <img src="/author.jpg" alt="Shahanur Mollah — Founder &amp; Author of SMCyvera" class="creator-avatar" width="100" height="100">
  <div class="creator-text">
    <div class="eyebrow">Created by Shahanur Mollah</div>
    <h2>Original explainers built on firsthand technical experience</h2>
    <p>SMCyvera is independently researched, written, and maintained by <strong>Shahanur Mollah</strong>. Every guide is crafted to explain the underlying logic—from battery chemistry and solar voltage drops to Wi-Fi channel contention and Android storage quirks—so you have the knowledge to fix problems permanently.</p>
    <a class="read-link" href="/about.html">Learn more about Shahanur &amp; SMCyvera’s editorial approach →</a>
  </div>
</div>`;
      content = content.replace(/<div style="margin-top:24px"><a class="btn secondary" href="\/about\.html">Read about SMCyvera’s editorial approach<\/a><\/div>/i, `${creatorSpotlight}`);

    } else if (file === 'about.html') {
      // 2. About Page Upgrade
      content = content.replace(/<title>[\s\S]*?<\/title>/i, `<title>About SMCyvera by Shahanur Mollah | Practical Tech Guides &amp; Mission</title>`);
      const aboutDesc = "Learn about SMCyvera, founded by Shahanur Mollah, its editorial principles, practical approach to technology guides, and reader corrections.";
      content = content.replace(/<meta\s+content="[^"]*"\s+name="description"\s*\/?>/i, `<meta name="description" content="${aboutDesc}">`);
      content = content.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${aboutDesc}">`);

      const seoTags = `
<meta property="og:type" content="website">
<meta property="og:site_name" content="SMCyvera by Shahanur Mollah">
<meta property="og:title" content="About SMCyvera by Shahanur Mollah | Practical Tech Guides &amp; Mission">
<meta property="og:description" content="${aboutDesc}">
<meta property="og:url" content="https://smcyvera.vercel.app/about.html">
<meta property="og:image" content="https://smcyvera.vercel.app/author.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://smcyvera.vercel.app/author.jpg">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About SMCyvera by Shahanur Mollah",
  "url": "https://smcyvera.vercel.app/about.html",
  "mainEntity": {
    "@type": "Person",
    "name": "Shahanur Mollah",
    "jobTitle": "Technology Writer & Creator",
    "image": "https://smcyvera.vercel.app/author.jpg",
    "url": "https://smcyvera.vercel.app/about.html",
    "sameAs": []
  }
}
</script>`;
      content = content.replace('</head>', `${seoTags}\n</head>`);

      // Author Profile Card
      const authorCard = `
<div class="author-profile-card">
  <img src="/author.jpg" alt="Shahanur Mollah — Founder &amp; Lead Writer of SMCyvera" class="author-photo" width="140" height="140">
  <div class="author-info">
    <h2>Shahanur Mollah</h2>
    <div class="author-role">Founder, Lead Writer &amp; Technical Editor</div>
    <p>Shahanur Mollah is the creator and editor of SMCyvera. He specializes in practical technical diagnostics, computing hardware, consumer electronics, and renewable power systems. His mission with SMCyvera is to provide readers with direct, tested solutions and the technical principles behind everyday digital problems.</p>
    <div class="author-actions">
      <a href="/contact.html" class="btn">Get in touch with Shahanur</a>
      <a href="/guides.html" class="btn secondary">Browse all 28 guides</a>
    </div>
  </div>
</div>`;

      // Update about body text to introduce Shahanur Mollah and author profile card
      content = content.replace(/<h1>About SMCyvera<\/h1>\s*<p>SMCyvera is a practical technology information site[^<]*<\/p>/i, `<h1>About SMCyvera by Shahanur Mollah</h1>${authorCard}<p>SMCyvera was founded by <strong>Shahanur Mollah</strong> to provide practical, reliable, and accessible explanations for everyday technology challenges. Rather than publishing generic checklists or AI-generated fluff, SMCyvera focuses on explaining the underlying mechanics—helping you understand what is happening, what diagnostic checks to perform first, and where generic advice stops being reliable.</p>`);

    } else if (file === 'contact.html') {
      content = content.replace(/<title>[\s\S]*?<\/title>/i, `<title>Contact SMCyvera by Shahanur Mollah | Corrections &amp; Feedback</title>`);
      const contactDesc = "Contact Shahanur Mollah and the SMCyvera editorial team regarding article corrections, technical feedback, suggestions, and inquiries.";
      content = content.replace(/<meta\s+name="description"\s+content="[^"]*"/i, `<meta name="description" content="${contactDesc}"`);
      const seoTags = `
<meta property="og:type" content="website">
<meta property="og:site_name" content="SMCyvera by Shahanur Mollah">
<meta property="og:title" content="Contact SMCyvera by Shahanur Mollah | Corrections &amp; Feedback">
<meta property="og:description" content="${contactDesc}">
<meta property="og:url" content="https://smcyvera.vercel.app/contact.html">
<meta name="twitter:card" content="summary_large_image">`;
      content = content.replace('</head>', `${seoTags}\n</head>`);
      content = content.replace(/<h1>Contact SMCyvera<\/h1>/i, `<h1>Contact SMCyvera by Shahanur Mollah</h1>`);

    } else if (file === 'privacy.html') {
      content = content.replace(/<title>[\s\S]*?<\/title>/i, `<title>Privacy Policy | SMCyvera by Shahanur Mollah</title>`);
      const privDesc = "Privacy policy for SMCyvera by Shahanur Mollah, covering information collection, cookies, advertising, and third-party services.";
      content = content.replace(/<meta\s+name="description"\s+content="[^"]*"/i, `<meta name="description" content="${privDesc}"`);
      const seoTags = `
<meta property="og:type" content="website">
<meta property="og:site_name" content="SMCyvera by Shahanur Mollah">
<meta property="og:title" content="Privacy Policy | SMCyvera by Shahanur Mollah">
<meta property="og:description" content="${privDesc}">
<meta property="og:url" content="https://smcyvera.vercel.app/privacy.html">
<meta name="twitter:card" content="summary_large_image">`;
      content = content.replace('</head>', `${seoTags}\n</head>`);
      content = content.replace(/<h1>Privacy Policy<\/h1>/i, `<h1>Privacy Policy — SMCyvera by Shahanur Mollah</h1>`);

    } else if (file === 'terms.html') {
      content = content.replace(/<title>[\s\S]*?<\/title>/i, `<title>Terms of Use | SMCyvera by Shahanur Mollah</title>`);
      const termsDesc = "Terms of use and educational disclaimer for SMCyvera by Shahanur Mollah.";
      content = content.replace(/<meta\s+name="description"\s+content="[^"]*"/i, `<meta name="description" content="${termsDesc}"`);
      const seoTags = `
<meta property="og:type" content="website">
<meta property="og:site_name" content="SMCyvera by Shahanur Mollah">
<meta property="og:title" content="Terms of Use | SMCyvera by Shahanur Mollah">
<meta property="og:description" content="${termsDesc}">
<meta property="og:url" content="https://smcyvera.vercel.app/terms.html">
<meta name="twitter:card" content="summary_large_image">`;
      content = content.replace('</head>', `${seoTags}\n</head>`);
      content = content.replace(/<h1>Terms of Use<\/h1>/i, `<h1>Terms of Use — SMCyvera by Shahanur Mollah</h1>`);

    } else if (file === 'guides.html') {
      content = content.replace(/<title>[\s\S]*?<\/title>/i, `<title>Technology Guides | SMCyvera by Shahanur Mollah</title>`);
      const guidesDesc = "Browse 28 original, practical technology explainers by Shahanur Mollah covering Android, PCs, Wi-Fi networking, electronics, batteries, and solar power.";
      content = content.replace(/<meta\s+name="description"\s+content="[^"]*"/i, `<meta name="description" content="${guidesDesc}"`);
      const seoTags = `
<meta property="og:type" content="website">
<meta property="og:site_name" content="SMCyvera by Shahanur Mollah">
<meta property="og:title" content="Technology Guides | SMCyvera by Shahanur Mollah">
<meta property="og:description" content="${guidesDesc}">
<meta property="og:url" content="https://smcyvera.vercel.app/guides.html">
<meta name="twitter:card" content="summary_large_image">`;
      content = content.replace('</head>', `${seoTags}\n</head>`);
      content = content.replace(/<h1>Technology Guides<\/h1>/i, `<h1>Technology Guides by Shahanur Mollah</h1>`);

    } else if (file === 'tools.html') {
      content = content.replace(/<title>[\s\S]*?<\/title>/i, `<title>Free Technology Tools &amp; Calculators | SMCyvera by Shahanur Mollah</title>`);
      const toolsDesc = "Free browser-based calculators by Shahanur Mollah for battery runtime, solar energy generation, inverter load sizing, data unit conversion, and power usage.";
      content = content.replace(/<meta\s+name="description"\s+content="[^"]*"/i, `<meta name="description" content="${toolsDesc}"`);
      const seoTags = `
<meta property="og:type" content="website">
<meta property="og:site_name" content="SMCyvera by Shahanur Mollah">
<meta property="og:title" content="Free Technology Tools &amp; Calculators | SMCyvera by Shahanur Mollah">
<meta property="og:description" content="${toolsDesc}">
<meta property="og:url" content="https://smcyvera.vercel.app/tools.html">
<meta name="twitter:card" content="summary_large_image">`;
      content = content.replace('</head>', `${seoTags}\n</head>`);
      content = content.replace(/<h1>Free Technology Tools<\/h1>/i, `<h1>Free Technology Tools &amp; Calculators</h1>`);

      // Add tool-card class to the cards in tools.html for better responsive layout
      content = content.replace(/class="card"/g, 'class="card tool-card"');
      content = content.replace(/class="card" id="/g, 'class="card tool-card" id="');

      // Add inputmode="decimal" to number inputs for mobile numeric keyboards
      content = content.replace(/type="number"/g, 'type="number" inputmode="decimal"');

    } else {
      // 28 Guide Pages
      // Update Title: ensure it ends with | SMCyvera by Shahanur Mollah
      content = content.replace(/<title>(.*?)(?: \| SMCyvera)?<\/title>/i, (match, p1) => {
        const cleanTitle = p1.replace(/\s*\|\s*SMCyvera.*$/, '').trim();
        return `<title>${cleanTitle} | SMCyvera by Shahanur Mollah</title>`;
      });

      // Update meta description to ensure clean attribution
      content = content.replace(/<meta\s+content="([^"]*)"\s+name="description"\s*\/?>/i, (match, p1) => {
        return `<meta name="description" content="${p1}">`;
      });
      content = content.replace(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i, (match, p1) => {
        return `<meta name="description" content="${p1}">`;
      });

      // Extract headline and description for Open Graph & Article JSON-LD
      const titleMatch = content.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : '';
      const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
      const desc = descMatch ? descMatch[1] : '';
      const canonicalMatch = content.match(/<link\s+(?:href="([^"]*)"\s+rel="canonical"|rel="canonical"\s+href="([^"]*)")/i);
      const canonicalUrl = canonicalMatch ? (canonicalMatch[1] || canonicalMatch[2]) : `${CANONICAL_BASE}/${file}`;

      // Open Graph Tags
      const ogTags = `
<meta property="og:type" content="article">
<meta property="og:site_name" content="SMCyvera by Shahanur Mollah">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canonicalUrl}">
<meta name="twitter:card" content="summary_large_image">`;

      // Update or replace existing Article structured data with Person author (Shahanur Mollah)
      const articleJsonLd = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${title.replace(/ \| SMCyvera by Shahanur Mollah/g, '').replace(/"/g, '\\"')}",
  "description": "${desc.replace(/"/g, '\\"')}",
  "author": {
    "@type": "Person",
    "name": "Shahanur Mollah",
    "image": "https://smcyvera.vercel.app/author.jpg",
    "url": "https://smcyvera.vercel.app/about.html"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SMCyvera by Shahanur Mollah",
    "url": "https://smcyvera.vercel.app/"
  },
  "datePublished": "2026-09-18",
  "dateModified": "2026-10-26",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${canonicalUrl}"
  }
}
</script>`;

      // Remove existing JSON-LD if present, then add new
      content = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, '');
      content = content.replace('</head>', `${ogTags}\n${articleJsonLd}\n</head>`);

      // Update meta text in article body to include author avatar
      const bylineHtml = `<div class="meta author-byline"><img src="/author.jpg" alt="Shahanur Mollah" class="byline-avatar" width="44" height="44"><div class="byline-info"><span>By <strong>Shahanur Mollah</strong></span> · <span>Published September 2026</span> · <span>Updated October 2026</span></div></div>`;
      content = content.replace(/<div class="meta">[\s\S]*?<\/div>/i, bylineHtml);
    }

    fs.writeFileSync(path.join(outDir, file), content, 'utf-8');
  } else {
    // Copy other files (README, robots.txt, sitemap.xml)
    fs.copyFileSync(path.join(srcDir, file), path.join(outDir, file));
  }
});

console.log('Successfully upgraded all files in', outDir);
