/**
 * NEXORA API — MASTER JAVASCRIPT SYSTEM
 * Theme Switcher, Scroll Animations, Code Snippet Manager,
 * Interactive Flow Simulator, Documentation Search & Toast Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initNavbarBehavior();
  initMobileMenu();
  initScrollAnimations();
  initNumberCounters();
  initCodeTabSwitcher();
  initCopyCodeButtons();
  initApiFlowSimulator();
  initDocSearchAndTester();
  initPricingCalculator();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initThemeEngine() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn:not(#mobileMenuToggle):not(#mobileMenuClose)');
  const savedTheme = localStorage.getItem('synapx-theme') || localStorage.getItem('nexora-theme') || 'dark';

  // Apply initial theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('synapx-theme', newTheme);
      updateThemeIcons(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  });
}

function updateThemeIcons(theme) {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn:not(#mobileMenuToggle):not(#mobileMenuClose)');
  themeToggleBtns.forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'bi bi-sun-fill';
      } else {
        icon.className = 'bi bi-moon-stars-fill';
      }
    }
  });
}

/* ==========================================================================
   2. Navbar Scroll & Active State
   ========================================================================== */
function initNavbarBehavior() {
  const navbar = document.querySelector('.navbar-nexora') || document.querySelector('.navbar-synapx');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Set active link based on window location
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-custom, .mobile-nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   3. Mobile Navigation Menu Overlay
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileMenuClose');
  const overlay = document.getElementById('mobileNavOverlay');

  if (!toggleBtn || !overlay) return;

  toggleBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close overlay when clicking any nav link inside it
  const mobileLinks = overlay.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   4. Scroll Animations (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-zoom-in, .animate-flip-x');
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. Metric Counter Animation
   ========================================================================== */
function initNumberCounters() {
  const counterElements = document.querySelectorAll('.counter-number');
  if (counterElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        let start = 0;
        const duration = 1500; // ms
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentValue = start + (targetValue - start) * easeProgress;
          
          el.textContent = currentValue.toFixed(decimals) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = targetValue.toFixed(decimals) + suffix;
          }
        };

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   6. Content Showcase Tab Switcher & Media Kit Specs
   ========================================================================== */
const codeSnippets = {
  js: `// Instagram Campaign Deliverable Specification
const campaign = {
  creator: "Influencer Official",
  reach_per_reel: "1.2M+ Views",
  deliverables: [
    { type: "Instagram 4K Reel", audio: "Trending Sound", hook: "First 3s" },
    { type: "Interactive Stories (x3)", stickers: ["Link", "Poll", "Q&A"] }
  ],
  demographics: { age: "21-36 (74%)", top_locations: ["US", "UK", "EU"] },
  ftc_compliant: true
};
console.log(campaign);`,

  python: `# YouTube Video Integration Specification
campaign_data = {
    "channel": "Influencer Official Vlogs",
    "subscribers": "250,000+",
    "integration_type": "60s Dedicated Mid-Roll / Sponsor Spot",
    "video_resolution": "4K HDR 60fps",
    "average_watch_time": "78.4%",
    "description_links": ["https://brand.com/special-offer", "Exclusive Code"]
}
print(campaign_data)`,

  curl: `# TikTok Viral Strategy Specs
POST /v1/campaigns/tiktok-viral
{
  "content_pillar": "Lifestyle & Fashion Essentials",
  "expected_impressions": 850000,
  "hashtag_challenge": "#LuxeLifestyleDaily",
  "link_in_bio_duration": "14 Days",
  "audience_retention_target": "85%"
}`,

  node: `// Multi-Platform Brand Partnership Schema
import { InfluencerMediaKit } from '@influencer/brand-kit';

const partnerKit = new InfluencerMediaKit({
  influencerId: "inf_live_9924a",
  monthlyReach: "8.4M Impressions",
  engagementRate: "9.5% Verified"
});

const stats = await partnerKit.getAudienceInsights();
console.log(stats);`,

  go: `// Campaign Deliverable & Usage License
package main

import "fmt"

type BrandCampaign struct {
	BrandName    string
	Deliverables string
	UsageRights  string
	Impressions  int
}

func main() {
	collab := BrandCampaign{
		BrandName:    "Luxury Global Lifestyle Brand",
		Deliverables: "1x 4K Reel + 1x YouTube Short + 3x Stories",
		UsageRights:  "60 Days Digital Ad Whitelisting",
		Impressions:  1250000,
	}
	fmt.Printf("%+v\\n", collab)
}`
};

function initCodeTabSwitcher() {
  const tabContainer = document.querySelector('.code-editor-tabs');
  const codeBlock = document.getElementById('codeDisplayBlock');

  if (!tabContainer || !codeBlock) return;

  const tabs = tabContainer.querySelectorAll('.code-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const lang = tab.getAttribute('data-lang');
      if (codeSnippets[lang]) {
        codeBlock.textContent = codeSnippets[lang];
      }
    });
  });
}

/* ==========================================================================
   7. Copy Code Button
   ========================================================================== */
function initCopyCodeButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      let textToCopy = '';

      if (targetId) {
        const el = document.getElementById(targetId);
        textToCopy = el ? el.textContent : '';
      } else {
        const codeEl = btn.closest('.code-container')?.querySelector('code') || btn.closest('.hero-visual-card')?.querySelector('.code-container');
        textToCopy = codeEl ? codeEl.textContent : '';
      }

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = `<i class="bi bi-check2"></i> Copied!`;
          btn.classList.add('border-success');
          showToast('Campaign specifications copied to clipboard');

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('border-success');
          }, 2000);
        });
      }
    });
  });
}

/* ==========================================================================
   8. Content Creation Workflow Simulator
   ========================================================================== */
function initApiFlowSimulator() {
  const flowNodes = document.querySelectorAll('.flow-node');
  const inspectorTitle = document.getElementById('flowInspectorTitle');
  const inspectorDesc = document.getElementById('flowInspectorDesc');
  const inspectorMeta = document.getElementById('flowInspectorMeta');

  if (flowNodes.length === 0 || !inspectorTitle) return;

  const nodeDetails = {
    client: {
      title: "CREATIVE CONCEPT & MOODBOARD",
      desc: "Brainstorms aesthetic visual themes, viral hooks, lifestyle storytelling angles, and strategic target audience alignment.",
      meta: "Deliverable: Strategy Deck | Creative Direction: High Chic"
    },
    gateway: {
      title: "CINEMATIC PRODUCTION",
      desc: "4K UHD cinematography, professional softbox lighting, location scouting, wardrobe curation, and creative prop styling.",
      meta: "Gear: Sony Cinema & Gimbal | Resolution: 4K HDR 60fps"
    },
    auth: {
      title: "BRAND VOICE & INTEGRATION",
      desc: "Ensures natural brand messaging, FTC compliance, dedicated promotional codes, and authentic narrative tone.",
      meta: "FTC: #ad #partner | Tone: Organic & Authentic"
    },
    logic: {
      title: "EDITORIAL POST-PRODUCTION",
      desc: "Precision color grading, cinematic sound design, engaging dynamic typography, and platform-specific vertical framing.",
      meta: "Color Grade: Warm Luxe | Sound: Master Audio 48kHz"
    },
    db: {
      title: "MULTI-CHANNEL SYNDICATION",
      desc: "Simultaneous cross-platform publishing across Instagram Reels, YouTube Shorts, TikTok, and Blog channels.",
      meta: "Platforms: IG, YT, TT | Prime Time Posting Schedule"
    },
    response: {
      title: "AUDIENCE ENGAGEMENT & CONVERSION",
      desc: "Instant community conversations, swipe-up click-throughs, verified impressions, and transparent ROI reporting.",
      meta: "Avg Engagement: 9.5% | Organic Reach: 1.2M+"
    }
  };

  flowNodes.forEach(node => {
    node.addEventListener('click', () => {
      flowNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const key = node.getAttribute('data-node');
      if (nodeDetails[key]) {
        inspectorTitle.textContent = nodeDetails[key].title;
        inspectorDesc.textContent = nodeDetails[key].desc;
        inspectorMeta.textContent = nodeDetails[key].meta;
      }
    });
  });
}

/* ==========================================================================
   9. Media Kit Search & Campaign Proposal Tester
   ========================================================================== */
function initDocSearchAndTester() {
  const searchInput = document.getElementById('docSearchInput');
  const docSections = document.querySelectorAll('.doc-endpoint-section');

  if (searchInput && docSections.length > 0) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();

      docSections.forEach(sec => {
        const text = sec.textContent.toLowerCase();
        if (text.includes(term)) {
          sec.style.display = 'block';
        } else {
          sec.style.display = 'none';
        }
      });
    });
  }

  // Interactive Try Campaign Tester
  const testApiBtn = document.getElementById('testApiBtn');
  const testResponseDisplay = document.getElementById('testResponseDisplay');
  const testResponseStatus = document.getElementById('testResponseStatus');

  if (testApiBtn && testResponseDisplay) {
    testApiBtn.addEventListener('click', () => {
      testApiBtn.disabled = true;
      testApiBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Generating Estimate...`;

      setTimeout(() => {
        testApiBtn.disabled = false;
        testApiBtn.innerHTML = `<i class="bi bi-send-fill"></i> Calculate Campaign ROI`;
        
        testResponseStatus.className = 'status-badge text-success';
        testResponseStatus.innerHTML = `<span class="status-pulse"></span> 9.5% ENGAGEMENT ESTIMATE`;
        
        testResponseDisplay.textContent = JSON.stringify({
          "status": "success",
          "creator": "Influencer Official",
          "timestamp": new Date().toISOString(),
          "campaign_id": "camp_" + Math.random().toString(36).substring(2, 11),
          "projected_reach": {
            "instagram_impressions": 650000,
            "youtube_views": 180000,
            "tiktok_views": 420000,
            "total_estimated_reach": "1.25M+",
            "target_age_group": "21-36 (74%)",
            "top_regions": ["United States", "United Kingdom", "Canada"]
          }
        }, null, 2);

        showToast('Campaign Estimate Generated Successfully');
      }, 700);
    });
  }
}

/* ==========================================================================
   10. Pricing & Campaign Reach Calculator
   ========================================================================== */
function initPricingCalculator() {
  const rangeInput = document.getElementById('apiVolumeSlider');
  const volumeLabel = document.getElementById('apiVolumeLabel');
  const calcPriceLabel = document.getElementById('calcPriceLabel');
  const billingToggle = document.getElementById('billingToggle');

  if (!rangeInput || !volumeLabel || !calcPriceLabel) return;

  const updatePricing = () => {
    const val = parseInt(rangeInput.value, 10); // in thousands
    let formattedVolume = '';
    let monthlyCost = 0;

    if (val < 1000) {
      formattedVolume = `${val}K Projected Reach`;
      monthlyCost = Math.round(val * 1.8);
    } else {
      const millions = (val / 1000).toFixed(1);
      formattedVolume = `${millions}M Projected Reach`;
      monthlyCost = Math.round((val / 1000) * 1400);
    }

    // Apply 20% partnership discount if multi-month toggle checked
    if (billingToggle && billingToggle.checked) {
      monthlyCost = Math.round(monthlyCost * 0.8);
    }

    volumeLabel.textContent = formattedVolume;
    calcPriceLabel.textContent = `$${monthlyCost.toLocaleString()}`;
  };

  rangeInput.addEventListener('input', updatePricing);
  if (billingToggle) {
    billingToggle.addEventListener('change', updatePricing);
  }
}

/* ==========================================================================
   11. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('synapxContactForm') || document.getElementById('nexoraContactForm') || document.getElementById('influencerContactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Sending Inquiry...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="bi bi-check-circle-fill"></i> Inquiry Sent!`;
        contactForm.reset();
        showToast('Thank you! Our influencer management team will reach out within 2 hours.');

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 3000);
      }, 1000);
    }
  });
}

/* ==========================================================================
   Global Toast System
   ========================================================================== */
function showToast(message) {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-nexora show';
  toast.innerHTML = `<i class="bi bi-info-circle-fill text-cyan"></i> <span>${message}</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ==========================================================================
   Back To Top Button Functionality
   ========================================================================== */
function initBackToTop() {
  let backToTopBtn = document.getElementById('backToTopBtn');
  
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
  }

  const handleScroll = () => {
    if (window.scrollY > 250) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

