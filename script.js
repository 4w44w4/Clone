/* ============================================
   MARCIA'S DIVINITY – CLONE SCRIPT
   ============================================ */

'use strict';

// ============ PRODUCT DATA ============
const products = {
  framedPrints: [
    {
      id: 'fp-1',
      title: 'Liberation',
      price: 480,
      compare: 800,
      artClass: 'art-1',
      sale: true,
      category: 'framed',
      sizes: ['18"×24"', '24"×32"', '30"×40"', '36"×48"'],
      desc: 'A luminous figure breaking free from cosmic chains — a meditation on freedom, self-liberation, and the power of the human spirit to transcend. Printed on archival canvas and set in a handcrafted gallery-grade frame.',
      meta: 'Archival canvas print · Float-mounted frame · Certificate of authenticity included · Free worldwide shipping'
    },
    {
      id: 'fp-2',
      title: 'Unity',
      price: 420,
      compare: 700,
      artClass: 'art-2',
      sale: true,
      category: 'framed',
      sizes: ['18"×24"', '24"×32"', '30"×40"', '36"×48"'],
      desc: 'Two figures entwined in golden light, reaching toward each other across a cosmic void — exploring the invisible threads that connect us all beyond time and space.',
      meta: 'Archival canvas print · Float-mounted frame · Certificate of authenticity included · Free worldwide shipping'
    },
    {
      id: 'fp-3',
      title: 'Ascension',
      price: 380,
      compare: 634,
      artClass: 'art-3',
      sale: true,
      category: 'framed',
      sizes: ['18"×24"', '24"×32"', '30"×40"', '36"×48"'],
      desc: 'A radiant figure rising through a stellar field — a celebration of growth, elevation, and the boundless nature of the human soul when it chooses to rise.',
      meta: 'Archival canvas print · Float-mounted frame · Certificate of authenticity included · Free worldwide shipping'
    },
    {
      id: 'fp-4',
      title: 'Stellar Connection',
      price: 350,
      compare: 583,
      artClass: 'art-4',
      sale: true,
      category: 'framed',
      sizes: ['18"×24"', '24"×32"', '30"×40"', '36"×48"'],
      desc: 'A lone cosmic figure surrounded by planetary bodies and starfields — exploring our place in the universe and the profound connection between human consciousness and the cosmos.',
      meta: 'Archival canvas print · Float-mounted frame · Certificate of authenticity included · Free worldwide shipping'
    },
    {
      id: 'fp-5',
      title: 'Radiance',
      price: 440,
      compare: 733,
      artClass: 'art-5',
      sale: true,
      category: 'framed',
      sizes: ['18"×24"', '24"×32"', '30"×40"', '36"×48"'],
      desc: 'A figure emanating pure golden light — representing the divine spark within each of us, the radiance that emerges when we fully embrace our own humanity.',
      meta: 'Archival canvas print · Float-mounted frame · Certificate of authenticity included · Free worldwide shipping'
    },
    {
      id: 'fp-6',
      title: 'Oneness',
      price: 395,
      compare: 659,
      artClass: 'art-6',
      sale: true,
      category: 'framed',
      sizes: ['18"×24"', '24"×32"', '30"×40"', '36"×48"'],
      desc: 'Multiple luminous forms merging at their edges — a visual prayer for unity, oneness, and the understanding that what separates us is far less than what connects us.',
      meta: 'Archival canvas print · Float-mounted frame · Certificate of authenticity included · Free worldwide shipping'
    }
  ],
  originalPaintings: [
    {
      id: 'op-1',
      title: 'The Divine Thread',
      price: 1200,
      compare: 2000,
      artClass: 'art-2',
      sale: true,
      category: 'original',
      sizes: ['24"×32" original', '30"×40" original'],
      desc: 'An original one-of-a-kind acrylic and digital mixed-media work on stretched canvas. Two connected figures rendered in Marcia\'s signature luminous style — each carrying a thread of golden light that binds them to one another.',
      meta: 'Original mixed media painting · Signed and dated by the artist · Certificate of authenticity · Protective packaging · Free worldwide shipping'
    },
    {
      id: 'op-2',
      title: 'Radiant Humanity',
      price: 1100,
      compare: 1834,
      artClass: 'art-5',
      sale: true,
      category: 'original',
      sizes: ['24"×32" original', '30"×40" original'],
      desc: 'An original large-scale painting exploring what it means to be fully present in one\'s own body, to radiate warmth and compassion outward into a universe that is always listening.',
      meta: 'Original mixed media painting · Signed and dated by the artist · Certificate of authenticity · Protective packaging · Free worldwide shipping'
    },
    {
      id: 'op-3',
      title: 'Cosmos Within',
      price: 900,
      compare: 1500,
      artClass: 'art-3',
      sale: true,
      category: 'original',
      sizes: ['20"×28" original', '24"×32" original'],
      desc: 'The universe made visible inside the human form — a meditation on how we carry entire worlds within us. Luminous whites and deep blacks with bursts of gold detail.',
      meta: 'Original mixed media painting · Signed and dated by the artist · Certificate of authenticity · Protective packaging · Free worldwide shipping'
    },
    {
      id: 'op-4',
      title: 'Light Bearer',
      price: 1350,
      compare: 2250,
      artClass: 'art-7',
      sale: true,
      category: 'original',
      sizes: ['30"×40" original', '36"×48" original'],
      desc: 'A towering figure of light standing amidst a field of cosmic dust and stars — created to remind us that even in our darkest moments, we are the source of our own light.',
      meta: 'Original mixed media painting · Signed and dated by the artist · Certificate of authenticity · Protective packaging · Free worldwide shipping'
    }
  ]
};

// Bestsellers = first 4 framed prints
const bestsellers = products.framedPrints.slice(0, 4);

// Cart state
let cart = JSON.parse(localStorage.getItem('md_cart') || '[]');
let currentProduct = null;
let currentQty = 1;
let selectedSize = null;

// ============ DOM REFERENCES ============
const mainContent    = document.getElementById('main-content');
const allPages       = document.querySelectorAll('.page');
const allNavLinks    = document.querySelectorAll('.nav-link');
const cartCount      = document.getElementById('cart-count');
const cartToggle     = document.getElementById('cart-toggle');
const cartSidebar    = document.getElementById('cart-sidebar');
const cartOverlay    = document.getElementById('cart-overlay');
const cartClose      = document.getElementById('cart-close');
const cartItems      = document.getElementById('cart-items');
const cartEmpty      = document.getElementById('cart-empty');
const cartFooter     = document.getElementById('cart-footer');
const cartTotal      = document.getElementById('cart-total');
const cartShopBtn    = document.getElementById('cart-shop-btn');
const cartContinue   = document.getElementById('cart-continue');
const checkoutBtn    = document.getElementById('checkout-btn');
const modalOverlay   = document.getElementById('modal-overlay');
const productModal   = document.getElementById('product-modal');
const modalClose     = document.getElementById('modal-close');
const modalTitle     = document.getElementById('modal-title');
const modalPrice     = document.getElementById('modal-price');
const modalCompare   = document.getElementById('modal-compare');
const modalDesc      = document.getElementById('modal-desc');
const modalSizes     = document.getElementById('modal-sizes');
const modalImage     = document.getElementById('modal-image');
const modalMeta      = document.getElementById('modal-meta');
const modalSaleBadge = document.getElementById('modal-sale-badge');
const modalAddCart   = document.getElementById('modal-add-cart');
const qtyMinus       = document.getElementById('qty-minus');
const qtyPlus        = document.getElementById('qty-plus');
const qtyValue       = document.getElementById('qty-value');
const toast          = document.getElementById('toast');
const contactForm    = document.getElementById('contact-form');
const formSuccess    = document.getElementById('form-success');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterSuccess = document.getElementById('newsletter-success');
const mobileMenuBtn  = document.getElementById('mobile-menu-btn');
const mobileNav      = document.getElementById('mobile-nav');
const reviewsTabBtn  = document.getElementById('reviews-tab-btn');
const reviewsModal   = document.getElementById('reviews-modal');
const reviewsOverlay = document.getElementById('reviews-modal-overlay');
const reviewsClose   = document.getElementById('reviews-modal-close');

// ============ ROUTING / NAVIGATION ============
function navigateTo(pageId) {
  // Update pages
  allPages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
  }

  // Update nav links
  allNavLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile nav
  mobileNav.classList.remove('open');

  // Close cart if open
  closeCart();
}

// Delegated click handler for all [data-page] elements
document.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (el) {
    e.preventDefault();
    const page = el.dataset.page;
    if (page) navigateTo(page);
  }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// ============ PRODUCT CARD FACTORY ============
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card ' + product.artClass;
  card.innerHTML = `
    <div class="product-img">
      ${getArtworkSVG(product.artClass)}
    </div>
    ${product.sale ? '<span class="sale-badge">SALE</span>' : ''}
    <div class="product-info">
      <h3 class="product-title">${product.title}</h3>
      <div class="product-prices">
        <span class="price-sale">$${product.price.toLocaleString()}</span>
        ${product.compare ? `<span class="price-compare">$${product.compare.toLocaleString()}</span>` : ''}
      </div>
    </div>
  `;
  card.addEventListener('click', () => openProductModal(product));
  return card;
}

// Unique SVG artwork for each art class
function getArtworkSVG(artClass) {
  const artworks = {
    'art-1': `
      <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g1" cx="50%" cy="55%" r="45%">
            <stop offset="0%" stop-color="#c9861a" stop-opacity="0.8"/>
            <stop offset="30%" stop-color="#8a5500" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
          <filter id="blur1"><feGaussianBlur stdDeviation="2"/></filter>
        </defs>
        <rect width="200" height="250" fill="#050308"/>
        <ellipse cx="100" cy="200" rx="70" ry="30" fill="#c9861a" opacity="0.2" filter="url(#blur1)"/>
        <ellipse cx="100" cy="125" rx="35" ry="55" fill="url(#g1)" filter="url(#blur1)"/>
        <!-- Figure -->
        <g opacity="0.9" filter="url(#blur1)">
          <ellipse cx="100" cy="70" rx="14" ry="16" fill="#c9861a"/>
          <rect x="88" y="85" width="24" height="50" rx="4" fill="#c9861a"/>
          <line x1="88" y1="98" x2="65" y2="115" stroke="#c9861a" stroke-width="8" stroke-linecap="round"/>
          <line x1="112" y1="98" x2="135" y2="115" stroke="#c9861a" stroke-width="8" stroke-linecap="round"/>
          <line x1="93" y1="135" x2="87" y2="175" stroke="#c9861a" stroke-width="8" stroke-linecap="round"/>
          <line x1="107" y1="135" x2="113" y2="175" stroke="#c9861a" stroke-width="8" stroke-linecap="round"/>
        </g>
        <!-- Stars -->
        <circle cx="25" cy="30" r="1.2" fill="white" opacity="0.9"/>
        <circle cx="60" cy="18" r="0.8" fill="white" opacity="0.7"/>
        <circle cx="150" cy="40" r="1.5" fill="white" opacity="0.8"/>
        <circle cx="170" cy="22" r="0.7" fill="white" opacity="0.6"/>
        <circle cx="35" cy="180" r="1" fill="white" opacity="0.6"/>
        <circle cx="165" cy="160" r="1.2" fill="white" opacity="0.7"/>
        <circle cx="180" cy="80" r="0.8" fill="white" opacity="0.5"/>
        <circle cx="15" cy="100" r="1.1" fill="white" opacity="0.8"/>
        <!-- Light rays -->
        <line x1="100" y1="70" x2="40" y2="20" stroke="rgba(201,134,26,0.25)" stroke-width="1"/>
        <line x1="100" y1="70" x2="160" y2="10" stroke="rgba(201,134,26,0.25)" stroke-width="1"/>
        <line x1="65" y1="115" x2="20" y2="150" stroke="rgba(201,134,26,0.2)" stroke-width="1"/>
        <line x1="135" y1="115" x2="180" y2="150" stroke="rgba(201,134,26,0.2)" stroke-width="1"/>
      </svg>`,

    'art-2': `
      <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g2a" cx="38%" cy="50%" r="30%">
            <stop offset="0%" stop-color="#ddb430" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="g2b" cx="62%" cy="50%" r="30%">
            <stop offset="0%" stop-color="#ddb430" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
          <filter id="blur2"><feGaussianBlur stdDeviation="2.5"/></filter>
        </defs>
        <rect width="200" height="250" fill="#030205"/>
        <ellipse cx="75" cy="125" rx="30" ry="50" fill="url(#g2a)" filter="url(#blur2)"/>
        <ellipse cx="125" cy="125" rx="30" ry="50" fill="url(#g2b)" filter="url(#blur2)"/>
        <!-- Left figure -->
        <g opacity="0.9">
          <ellipse cx="72" cy="65" rx="11" ry="13" fill="#ddb430" opacity="0.8" filter="url(#blur2)"/>
          <rect x="63" y="77" width="18" height="40" rx="3" fill="#ddb430" opacity="0.7" filter="url(#blur2)"/>
          <line x1="72" y1="117" x2="66" y2="150" stroke="#ddb430" stroke-width="6" stroke-linecap="round" opacity="0.7" filter="url(#blur2)"/>
          <line x1="72" y1="117" x2="78" y2="150" stroke="#ddb430" stroke-width="6" stroke-linecap="round" opacity="0.7" filter="url(#blur2)"/>
          <!-- Reaching arm -->
          <line x1="81" y1="90" x2="100" y2="105" stroke="#ddb430" stroke-width="7" stroke-linecap="round" opacity="0.8" filter="url(#blur2)"/>
        </g>
        <!-- Right figure -->
        <g opacity="0.9">
          <ellipse cx="128" cy="65" rx="11" ry="13" fill="#ddb430" opacity="0.8" filter="url(#blur2)"/>
          <rect x="119" y="77" width="18" height="40" rx="3" fill="#ddb430" opacity="0.7" filter="url(#blur2)"/>
          <line x1="128" y1="117" x2="122" y2="150" stroke="#ddb430" stroke-width="6" stroke-linecap="round" opacity="0.7" filter="url(#blur2)"/>
          <line x1="128" y1="117" x2="134" y2="150" stroke="#ddb430" stroke-width="6" stroke-linecap="round" opacity="0.7" filter="url(#blur2)"/>
          <!-- Reaching arm -->
          <line x1="119" y1="90" x2="100" y2="105" stroke="#ddb430" stroke-width="7" stroke-linecap="round" opacity="0.8" filter="url(#blur2)"/>
        </g>
        <!-- Connection glow at center -->
        <circle cx="100" cy="105" r="10" fill="#ddb430" opacity="0.6" filter="url(#blur2)"/>
        <!-- Stars -->
        <circle cx="20" cy="20" r="1" fill="white" opacity="0.8"/>
        <circle cx="180" cy="30" r="1.3" fill="white" opacity="0.7"/>
        <circle cx="10" cy="150" r="0.8" fill="white" opacity="0.6"/>
        <circle cx="190" cy="200" r="1" fill="white" opacity="0.7"/>
        <circle cx="100" cy="15" r="1.5" fill="white" opacity="0.9"/>
        <circle cx="50" cy="220" r="0.7" fill="white" opacity="0.5"/>
      </svg>`,

    'art-3': `
      <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g3" cx="50%" cy="40%" r="45%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
            <stop offset="15%" stop-color="#c9861a" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
          <filter id="blur3"><feGaussianBlur stdDeviation="3"/></filter>
        </defs>
        <rect width="200" height="250" fill="#020108"/>
        <ellipse cx="100" cy="100" rx="60" ry="70" fill="url(#g3)" filter="url(#blur3)"/>
        <!-- Figure ascending -->
        <g opacity="0.85">
          <ellipse cx="100" cy="60" rx="13" ry="15" fill="white" filter="url(#blur3)"/>
          <rect x="89" y="74" width="22" height="45" rx="4" fill="white" opacity="0.85" filter="url(#blur3)"/>
          <!-- Arms raised -->
          <line x1="89" y1="85" x2="58" y2="60" stroke="white" stroke-width="8" stroke-linecap="round" opacity="0.8" filter="url(#blur3)"/>
          <line x1="111" y1="85" x2="142" y2="60" stroke="white" stroke-width="8" stroke-linecap="round" opacity="0.8" filter="url(#blur3)"/>
          <!-- Legs -->
          <line x1="95" y1="119" x2="88" y2="155" stroke="white" stroke-width="7" stroke-linecap="round" opacity="0.8" filter="url(#blur3)"/>
          <line x1="105" y1="119" x2="112" y2="155" stroke="white" stroke-width="7" stroke-linecap="round" opacity="0.8" filter="url(#blur3)"/>
        </g>
        <!-- Cosmic particles rising -->
        <circle cx="55" cy="70" r="2" fill="#c9861a" opacity="0.7" filter="url(#blur3)"/>
        <circle cx="145" cy="55" r="1.5" fill="#c9861a" opacity="0.6" filter="url(#blur3)"/>
        <circle cx="40" cy="40" r="1" fill="white" opacity="0.8"/>
        <circle cx="160" cy="35" r="1.2" fill="white" opacity="0.7"/>
        <circle cx="170" cy="100" r="0.8" fill="white" opacity="0.6"/>
        <circle cx="22" cy="120" r="1" fill="white" opacity="0.6"/>
        <circle cx="185" cy="180" r="1.1" fill="white" opacity="0.5"/>
        <circle cx="15" cy="200" r="0.8" fill="white" opacity="0.7"/>
        <circle cx="100" cy="8" r="1.5" fill="white" opacity="0.9"/>
      </svg>`,

    'art-4': `
      <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g4" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stop-color="#c9861a" stop-opacity="0.6"/>
            <stop offset="25%" stop-color="#8a5500" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
          <filter id="blur4"><feGaussianBlur stdDeviation="2"/></filter>
          <filter id="blur4b"><feGaussianBlur stdDeviation="4"/></filter>
        </defs>
        <rect width="200" height="250" fill="#030208"/>
        <!-- Planet -->
        <circle cx="140" cy="55" r="30" fill="#1a1220" stroke="#c9861a" stroke-width="0.5" opacity="0.8"/>
        <ellipse cx="140" cy="55" rx="42" ry="8" fill="none" stroke="#c9861a" stroke-width="1" opacity="0.5"/>
        <!-- Smaller planets -->
        <circle cx="40" cy="80" r="10" fill="#120d1a" stroke="#c9861a" stroke-width="0.5" opacity="0.5"/>
        <circle cx="60" cy="200" r="16" fill="#0d1220" stroke="#c9861a" stroke-width="0.5" opacity="0.4"/>
        <!-- Figure -->
        <ellipse cx="100" cy="140" rx="45" ry="60" fill="url(#g4)" filter="url(#blur4b)"/>
        <g opacity="0.85">
          <ellipse cx="100" cy="100" rx="12" ry="14" fill="#c9861a" filter="url(#blur4)"/>
          <rect x="90" y="113" width="20" height="42" rx="3" fill="#c9861a" opacity="0.8" filter="url(#blur4)"/>
          <line x1="90" y1="122" x2="68" y2="138" stroke="#c9861a" stroke-width="7" stroke-linecap="round" filter="url(#blur4)"/>
          <line x1="110" y1="122" x2="132" y2="138" stroke="#c9861a" stroke-width="7" stroke-linecap="round" filter="url(#blur4)"/>
          <line x1="95" y1="155" x2="88" y2="190" stroke="#c9861a" stroke-width="7" stroke-linecap="round" filter="url(#blur4)"/>
          <line x1="105" y1="155" x2="112" y2="190" stroke="#c9861a" stroke-width="7" stroke-linecap="round" filter="url(#blur4)"/>
        </g>
        <!-- Stars -->
        <circle cx="18" cy="18" r="1" fill="white" opacity="0.9"/>
        <circle cx="85" cy="12" r="0.8" fill="white" opacity="0.7"/>
        <circle cx="175" cy="120" r="1.2" fill="white" opacity="0.6"/>
        <circle cx="12" cy="160" r="0.9" fill="white" opacity="0.7"/>
        <circle cx="188" cy="220" r="1" fill="white" opacity="0.5"/>
      </svg>`,

    'art-5': `
      <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g5a" cx="50%" cy="50%" r="40%">
            <stop offset="0%" stop-color="#f0c832" stop-opacity="0.85"/>
            <stop offset="20%" stop-color="#c9861a" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
          <filter id="blur5"><feGaussianBlur stdDeviation="2.5"/></filter>
        </defs>
        <rect width="200" height="250" fill="#020108"/>
        <ellipse cx="100" cy="120" rx="55" ry="65" fill="url(#g5a)" filter="url(#blur5)"/>
        <!-- Two figures side by side -->
        <g opacity="0.85">
          <!-- Left figure -->
          <ellipse cx="78" cy="75" rx="10" ry="12" fill="#f0c832" filter="url(#blur5)"/>
          <rect x="70" y="86" width="16" height="35" rx="3" fill="#f0c832" opacity="0.8" filter="url(#blur5)"/>
          <line x1="78" y1="121" x2="72" y2="152" stroke="#f0c832" stroke-width="6" stroke-linecap="round" filter="url(#blur5)"/>
          <line x1="78" y1="121" x2="84" y2="152" stroke="#f0c832" stroke-width="6" stroke-linecap="round" filter="url(#blur5)"/>
          <!-- Right figure -->
          <ellipse cx="122" cy="75" rx="10" ry="12" fill="#f0c832" filter="url(#blur5)"/>
          <rect x="114" y="86" width="16" height="35" rx="3" fill="#f0c832" opacity="0.8" filter="url(#blur5)"/>
          <line x1="122" y1="121" x2="116" y2="152" stroke="#f0c832" stroke-width="6" stroke-linecap="round" filter="url(#blur5)"/>
          <line x1="122" y1="121" x2="128" y2="152" stroke="#f0c832" stroke-width="6" stroke-linecap="round" filter="url(#blur5)"/>
          <!-- Connected hands -->
          <line x1="86" y1="95" x2="114" y2="95" stroke="#f0c832" stroke-width="5" stroke-linecap="round" filter="url(#blur5)"/>
        </g>
        <!-- Light rays emanating outward -->
        <line x1="100" y1="60" x2="100" y2="10" stroke="rgba(240,200,50,0.3)" stroke-width="1.5"/>
        <line x1="100" y1="60" x2="30" y2="20" stroke="rgba(240,200,50,0.2)" stroke-width="1"/>
        <line x1="100" y1="60" x2="170" y2="20" stroke="rgba(240,200,50,0.2)" stroke-width="1"/>
        <line x1="78" y1="120" x2="20" y2="160" stroke="rgba(240,200,50,0.2)" stroke-width="1"/>
        <line x1="122" y1="120" x2="180" y2="160" stroke="rgba(240,200,50,0.2)" stroke-width="1"/>
        <!-- Stars -->
        <circle cx="22" cy="18" r="1.1" fill="white" opacity="0.8"/>
        <circle cx="178" cy="22" r="0.9" fill="white" opacity="0.7"/>
        <circle cx="12" cy="100" r="1" fill="white" opacity="0.6"/>
        <circle cx="188" cy="130" r="1.3" fill="white" opacity="0.8"/>
        <circle cx="100" cy="240" r="0.8" fill="white" opacity="0.5"/>
        <circle cx="50" cy="210" r="1" fill="white" opacity="0.6"/>
        <circle cx="155" cy="200" r="0.8" fill="white" opacity="0.6"/>
      </svg>`,

    'art-6': `
      <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g6" cx="50%" cy="45%" r="45%">
            <stop offset="0%" stop-color="#ffc830" stop-opacity="0.9"/>
            <stop offset="20%" stop-color="#c9861a" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
          <filter id="blur6"><feGaussianBlur stdDeviation="2"/></filter>
          <filter id="blur6b"><feGaussianBlur stdDeviation="6"/></filter>
        </defs>
        <rect width="200" height="250" fill="#030108"/>
        <!-- Core glow -->
        <ellipse cx="100" cy="115" rx="55" ry="65" fill="url(#g6)" filter="url(#blur6b)"/>
        <!-- Multiple figures merging -->
        <g opacity="0.8">
          <!-- Central figure -->
          <ellipse cx="100" cy="72" rx="13" ry="15" fill="#ffc830" filter="url(#blur6)"/>
          <rect x="89" y="86" width="22" height="44" rx="4" fill="#ffc830" opacity="0.9" filter="url(#blur6)"/>
          <line x1="89" y1="97" x2="62" y2="115" stroke="#ffc830" stroke-width="8" stroke-linecap="round" filter="url(#blur6)"/>
          <line x1="111" y1="97" x2="138" y2="115" stroke="#ffc830" stroke-width="8" stroke-linecap="round" filter="url(#blur6)"/>
          <line x1="95" y1="130" x2="87" y2="165" stroke="#ffc830" stroke-width="7" stroke-linecap="round" filter="url(#blur6)"/>
          <line x1="105" y1="130" x2="113" y2="165" stroke="#ffc830" stroke-width="7" stroke-linecap="round" filter="url(#blur6)"/>
        </g>
        <!-- Radiating light lines -->
        <line x1="100" y1="72" x2="100" y2="8" stroke="rgba(255,200,48,0.4)" stroke-width="2"/>
        <line x1="100" y1="72" x2="20" y2="18" stroke="rgba(255,200,48,0.25)" stroke-width="1.5"/>
        <line x1="100" y1="72" x2="180" y2="18" stroke="rgba(255,200,48,0.25)" stroke-width="1.5"/>
        <line x1="62" y1="115" x2="10" y2="155" stroke="rgba(255,200,48,0.2)" stroke-width="1.5"/>
        <line x1="138" y1="115" x2="190" y2="155" stroke="rgba(255,200,48,0.2)" stroke-width="1.5"/>
        <line x1="87" y1="165" x2="60" y2="220" stroke="rgba(255,200,48,0.2)" stroke-width="1.5"/>
        <line x1="113" y1="165" x2="140" y2="220" stroke="rgba(255,200,48,0.2)" stroke-width="1.5"/>
        <!-- Stars -->
        <circle cx="15" cy="12" r="1.5" fill="white" opacity="0.9"/>
        <circle cx="185" cy="8" r="1" fill="white" opacity="0.8"/>
        <circle cx="195" cy="90" r="0.8" fill="white" opacity="0.6"/>
        <circle cx="5" cy="80" r="1.2" fill="white" opacity="0.7"/>
        <circle cx="5" cy="230" r="0.9" fill="white" opacity="0.5"/>
        <circle cx="195" cy="240" r="1.1" fill="white" opacity="0.6"/>
      </svg>`,

    'art-7': `
      <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g7" cx="50%" cy="42%" r="45%">
            <stop offset="0%" stop-color="#b8e0ff" stop-opacity="0.7"/>
            <stop offset="15%" stop-color="#c9861a" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
          <filter id="blur7"><feGaussianBlur stdDeviation="2"/></filter>
          <filter id="blur7b"><feGaussianBlur stdDeviation="5"/></filter>
        </defs>
        <rect width="200" height="250" fill="#010208"/>
        <ellipse cx="100" cy="110" rx="50" ry="65" fill="url(#g7)" filter="url(#blur7b)"/>
        <!-- Tall standing figure of light -->
        <g opacity="0.88">
          <ellipse cx="100" cy="55" rx="14" ry="16" fill="#b8e0ff" filter="url(#blur7)"/>
          <rect x="88" y="70" width="24" height="55" rx="4" fill="#b8e0ff" opacity="0.85" filter="url(#blur7)"/>
          <!-- Arms slightly raised -->
          <line x1="88" y1="84" x2="60" y2="100" stroke="#b8e0ff" stroke-width="9" stroke-linecap="round" filter="url(#blur7)"/>
          <line x1="112" y1="84" x2="140" y2="100" stroke="#b8e0ff" stroke-width="9" stroke-linecap="round" filter="url(#blur7)"/>
          <!-- Legs -->
          <line x1="95" y1="125" x2="87" y2="168" stroke="#b8e0ff" stroke-width="8" stroke-linecap="round" filter="url(#blur7)"/>
          <line x1="105" y1="125" x2="113" y2="168" stroke="#b8e0ff" stroke-width="8" stroke-linecap="round" filter="url(#blur7)"/>
        </g>
        <!-- Cosmic dust around figure -->
        <circle cx="55" cy="95" r="3" fill="#c9861a" opacity="0.5" filter="url(#blur7)"/>
        <circle cx="145" cy="90" r="2" fill="#c9861a" opacity="0.4" filter="url(#blur7)"/>
        <circle cx="60" cy="140" r="1.5" fill="#b8e0ff" opacity="0.4" filter="url(#blur7)"/>
        <circle cx="142" cy="145" r="2" fill="#b8e0ff" opacity="0.4" filter="url(#blur7)"/>
        <!-- Stars -->
        <circle cx="20" cy="15" r="1.2" fill="white" opacity="0.9"/>
        <circle cx="50" cy="5" r="0.8" fill="white" opacity="0.7"/>
        <circle cx="150" cy="10" r="1.5" fill="white" opacity="0.8"/>
        <circle cx="185" cy="30" r="0.9" fill="white" opacity="0.6"/>
        <circle cx="10" cy="180" r="1" fill="white" opacity="0.7"/>
        <circle cx="190" cy="200" r="0.8" fill="white" opacity="0.5"/>
        <circle cx="100" cy="3" r="1.8" fill="white" opacity="0.9"/>
      </svg>`
  };

  return artworks[artClass] || artworks['art-1'];
}

// ============ RENDER PRODUCT GRIDS ============
function renderGrid(containerId, productList, cols) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  productList.forEach(p => container.appendChild(createProductCard(p)));
}

function initGrids() {
  renderGrid('bestsellers-grid', bestsellers);
  renderGrid('framed-grid', products.framedPrints);
  renderGrid('original-grid', products.originalPaintings);
}

// ============ PRODUCT MODAL ============
function openProductModal(product) {
  currentProduct = product;
  currentQty = 1;
  selectedSize = product.sizes ? product.sizes[0] : null;
  qtyValue.textContent = '1';

  // Image
  modalImage.innerHTML = `<div class="product-img ${product.artClass}" style="width:100%;height:100%">${getArtworkSVG(product.artClass)}</div>`;

  // Details
  modalSaleBadge.style.display = product.sale ? 'inline-block' : 'none';
  modalTitle.textContent = product.title;
  modalPrice.textContent = '$' + product.price.toLocaleString();
  if (product.compare) {
    modalCompare.textContent = '$' + product.compare.toLocaleString();
    modalCompare.style.display = 'inline';
  } else {
    modalCompare.style.display = 'none';
  }
  modalDesc.textContent = product.desc;
  modalMeta.textContent = product.meta || '';

  // Sizes
  if (product.sizes && product.sizes.length) {
    document.getElementById('modal-size-wrap').style.display = 'block';
    modalSizes.innerHTML = '';
    product.sizes.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'size-option' + (i === 0 ? ' selected' : '');
      btn.textContent = s;
      btn.addEventListener('click', () => {
        modalSizes.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedSize = s;
      });
      modalSizes.appendChild(btn);
    });
  } else {
    document.getElementById('modal-size-wrap').style.display = 'none';
  }

  // Open modal
  modalOverlay.classList.add('open');
  productModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  modalOverlay.classList.remove('open');
  productModal.classList.remove('open');
  document.body.style.overflow = '';
  currentProduct = null;
}

modalClose.addEventListener('click', closeProductModal);
modalOverlay.addEventListener('click', closeProductModal);

// Qty controls
qtyMinus.addEventListener('click', () => {
  if (currentQty > 1) {
    currentQty--;
    qtyValue.textContent = currentQty;
  }
});

qtyPlus.addEventListener('click', () => {
  currentQty++;
  qtyValue.textContent = currentQty;
});

// Add to cart from modal
modalAddCart.addEventListener('click', () => {
  if (!currentProduct) return;

  const variant = selectedSize || '';
  const existingIdx = cart.findIndex(i => i.id === currentProduct.id && i.variant === variant);

  if (existingIdx > -1) {
    cart[existingIdx].qty += currentQty;
  } else {
    cart.push({
      id: currentProduct.id,
      title: currentProduct.title,
      price: currentProduct.price,
      artClass: currentProduct.artClass,
      variant,
      qty: currentQty
    });
  }

  saveCart();
  updateCartUI();
  closeProductModal();
  showToast(`"${currentProduct.title}" added to cart`);
  openCart();
});

// ============ CART ============
function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  if (!productModal.classList.contains('open') && !reviewsModal.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

cartShopBtn.addEventListener('click', () => {
  closeCart();
  navigateTo('framed-prints');
});

cartContinue.addEventListener('click', (e) => {
  e.preventDefault();
  closeCart();
});

checkoutBtn.addEventListener('click', () => {
  showToast('Redirecting to checkout...');
  setTimeout(() => {
    alert('This is a demo site — no real checkout. Visit marciasdivinity.com to purchase.');
  }, 800);
});

function saveCart() {
  localStorage.setItem('md_cart', JSON.stringify(cart));
}

function updateCartUI() {
  // Count
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  cartCount.textContent = totalQty;

  // Bump animation
  cartCount.classList.add('bump');
  setTimeout(() => cartCount.classList.remove('bump'), 200);

  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartFooter.style.display = 'none';
    cartItems.innerHTML = '';
    cartItems.appendChild(cartEmpty);
    return;
  }

  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'block';

  // Render items
  const list = cart.map((item, idx) => {
    return `
      <div class="cart-item" data-idx="${idx}">
        <div class="cart-item-img ${item.artClass}">
          ${getArtworkSVG(item.artClass)}
        </div>
        <div class="cart-item-info">
          <p class="cart-item-title">${item.title}</p>
          ${item.variant ? `<p class="cart-item-variant">${item.variant}</p>` : ''}
          <div class="cart-item-bottom">
            <div class="cart-item-qty">
              <button class="cart-qty-btn" data-idx="${idx}" data-action="minus">−</button>
              <span>${item.qty}</span>
              <button class="cart-qty-btn" data-idx="${idx}" data-action="plus">+</button>
            </div>
            <span class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</span>
          </div>
          <button class="cart-item-remove" data-idx="${idx}">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  cartItems.innerHTML = list;

  // Total
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartTotal.textContent = '$' + total.toLocaleString();

  // Event delegation for cart actions
  cartItems.addEventListener('click', handleCartAction, { once: true });
}

function handleCartAction(e) {
  // Handle qty buttons
  const qtyBtn = e.target.closest('.cart-qty-btn');
  if (qtyBtn) {
    const idx = parseInt(qtyBtn.dataset.idx);
    const action = qtyBtn.dataset.action;
    if (action === 'plus') {
      cart[idx].qty++;
    } else {
      cart[idx].qty--;
      if (cart[idx].qty <= 0) cart.splice(idx, 1);
    }
    saveCart();
    updateCartUI();
    return;
  }

  // Handle remove
  const removeBtn = e.target.closest('.cart-item-remove');
  if (removeBtn) {
    const idx = parseInt(removeBtn.dataset.idx);
    cart.splice(idx, 1);
    saveCart();
    updateCartUI();
    return;
  }

  // Re-add listener
  cartItems.addEventListener('click', handleCartAction, { once: true });
}

// ============ CONTACT FORM ============
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      formSuccess.style.display = 'block';
      contactForm.reset();
      btn.textContent = 'Send';
      btn.disabled = false;
    }, 1200);
  });
}

// ============ NEWSLETTER FORM ============
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    newsletterSuccess.style.display = 'block';
    newsletterForm.reset();
    setTimeout(() => {
      newsletterSuccess.style.display = 'none';
    }, 5000);
  });
}

// ============ REVIEWS MODAL ============
reviewsTabBtn.addEventListener('click', () => {
  reviewsModal.classList.add('open');
  reviewsOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

reviewsClose.addEventListener('click', () => {
  reviewsModal.classList.remove('open');
  reviewsOverlay.classList.remove('open');
  document.body.style.overflow = '';
});

reviewsOverlay.addEventListener('click', () => {
  reviewsModal.classList.remove('open');
  reviewsOverlay.classList.remove('open');
  document.body.style.overflow = '';
});

// ============ TOAST ============
let toastTimeout;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============ STICKY HEADER SHADOW ============
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
  } else {
    header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
  }
}, { passive: true });

// ============ ESC KEY ============
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (productModal.classList.contains('open')) closeProductModal();
    else if (reviewsModal.classList.contains('open')) {
      reviewsModal.classList.remove('open');
      reviewsOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    else if (cartSidebar.classList.contains('open')) closeCart();
  }
});

// ============ INIT ============
function init() {
  initGrids();
  updateCartUI();
  // Set initial page from hash if provided
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home', 'framed-prints', 'original-paintings', 'custom-artwork', 'contact', 'about'];
  if (hash && validPages.includes(hash)) {
    navigateTo(hash);
  }
}

document.addEventListener('DOMContentLoaded', init);
