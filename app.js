// =========================================================================
// CASHLESS AFRICA — CASH APP STYLE INTERACTIVE ENGINE
// =========================================================================

function switchView(viewId, subKey) {
  document.querySelectorAll('.view-section').forEach(el => {
    el.classList.remove('active');
  });
  const target = document.getElementById('view-' + viewId);
  if (target) target.classList.add('active');

  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-nav') === viewId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewId === 'tutos' && subKey) {
    loadTutorial(subKey);
  }
  if (viewId === 'blog' && subKey) {
    openBlogArticle(subKey);
  } else if (viewId === 'blog' && !subKey) {
    closeBlogArticle(false);
  }
}

// LANGUAGE SWITCH (FR / EN)
let currentLang = 'fr';
function toggleLanguage() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  const btn = document.getElementById('lang-toggle-btn');
  const title = document.getElementById('hero-main-title');
  const lead = document.getElementById('hero-main-lead');
  const dlBtn = document.getElementById('nav-dl-label');

  if (currentLang === 'en') {
    if (btn) btn.textContent = '🇬🇧 EN';
    if (title) title.innerHTML = 'YOUR MONEY.<br/>NO BORDERS.<br/>ZERO FEES.';
    if (lead) lead.textContent = 'Hold XOF, create instant USD VISA/Mastercard virtual cards in 2 minutes, and send money across Africa & the diaspora at 0 F.';
    if (dlBtn) dlBtn.textContent = 'Get the app';
  } else {
    if (btn) btn.textContent = '🇧🇯 FR';
    if (title) title.innerHTML = 'VOTRE ARGENT.<br/>SANS FRONTIÈRES.<br/>ZÉRO FRAIS.';
    if (lead) lead.textContent = 'Gérez vos FCFA, créez vos cartes virtuelles VISA/Mastercard en USD en 2 minutes et transférez partout en Afrique à 0 F.';
    if (dlBtn) dlBtn.textContent = "Télécharger l'app";
  }
}

// LIVE SIMULATOR IN THE FLOATING BLACK PHONE
const RATES = {
  USD: { factor: 1 / 615, rateText: '1 USD = 615 FCFA', feeText: '0 FCFA • Instantané' },
  NGN: { factor: 2.62, rateText: '1 FCFA = 2,62 NGN', feeText: '0 FCFA • Corridor Lagos' },
  EUR: { factor: 1 / 655.957, rateText: '1 EUR = 655,96 FCFA', feeText: '0 FCFA • Parité fixe' }
};

function setPhoneTab(mode, btn) {
  document.querySelectorAll('.phone-mode-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const currSelect = document.getElementById('sim-target-curr');
  if (mode === 'card' && currSelect) {
    currSelect.value = 'USD';
  }
  updateSimulator();
}

function setPresetXof(val, curr) {
  const input = document.getElementById('sim-xof-input');
  const sel = document.getElementById('sim-target-curr');
  if (input) input.value = val;
  if (sel && curr) sel.value = curr;
  updateSimulator();
}

function updateSimulator() {
  const input = document.getElementById('sim-xof-input');
  const sel = document.getElementById('sim-target-curr');
  const out = document.getElementById('sim-result-text');
  const rateLbl = document.getElementById('sim-rate-pill');

  if (!input || !sel || !out) return;
  const xof = parseFloat(input.value) || 0;
  const curr = sel.value;
  const cfg = RATES[curr] || RATES.USD;
  const result = xof * cfg.factor;

  if (curr === 'NGN') {
    out.textContent = '₦ ' + Math.round(result).toLocaleString('fr-FR');
  } else if (curr === 'USD') {
    out.textContent = '$ ' + result.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    out.textContent = '€ ' + result.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  if (rateLbl) rateLbl.textContent = `${cfg.rateText} • ${cfg.feeText}`;
}

// CASH CARD 3D SKIN CUSTOMIZER
function setCardSkin(skin, btnEl) {
  const card = document.getElementById('cash-3d-card');
  if (!card) return;
  card.classList.remove('skin-neon', 'skin-obsidian', 'skin-chrome');
  card.classList.add('skin-' + skin);

  document.querySelectorAll('.skin-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
}

// P2P COUNTER IN BENTO
let p2pAmount = 10000;
function changeP2p(delta) {
  p2pAmount = Math.max(1000, p2pAmount + delta);
  const el = document.getElementById('p2p-live-amount');
  if (el) el.textContent = p2pAmount.toLocaleString('fr-FR');
}

// FAQ TOGGLE
function toggleCashFaq(btn) {
  const item = btn.closest('.cash-faq-item');
  if (!item) return;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.cash-faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

// =========================================================================
// CENTRE DE TUTOS (5 CATÉGORIES + ÉCRANS ANNOTÉS CASH APP STYLE)
// =========================================================================
const TUTOS = {
  'carte-usd': {
    badge: '3. CARTES VIRTUELLES & PHYSIQUES',
    title: 'Créer sa première carte virtuelle USD et éviter les frais de rejet',
    time: '2 min de lecture',
    keywords: 'carte virtuelle usd visa mastercard amazon alibaba facebook tiktok ads rejet geler 3000f 10$',
    intro: 'Payez vos pubs Facebook/TikTok, vos commandes Alibaba ou Netflix sans blocage bancaire grâce aux cartes VISA & Mastercard USD illimitées.',
    steps: [
      {
        step: 'ÉTAPE 01',
        title: 'Ouvrez l’onglet Cartes et appuyez sur « + Créer »',
        desc: 'Depuis le menu du bas, touchez l’icône Cartes puis le bouton + en haut à droite. Coût unique de création : 3 000 FCFA (0 F de frais mensuels).',
        tip: 'Vous pouvez créer autant de cartes virtuelles que vous le souhaitez (une pour vos pubs, une pour vos abonnements).',
        header: 'MES CARTES CASHLESS',
        screen: `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <span style="font-size:12px;color:#9CA3AF;">Cartes actives (2)</span>
            <span class="annot-box-red" style="background:#00E013;color:#000;padding:6px 12px;border-radius:99px;font-size:11.5px;font-weight:900;">
              <span class="annot-tag">1. Cliquez ici</span>
              + Nouvelle Carte
            </span>
          </div>
          <div style="background:linear-gradient(135deg,#00E013,#008F0C);color:#000;padding:16px;border-radius:16px;font-weight:800;">
            <div style="display:flex;justify-content:space-between;font-size:12px;"><span>CASHLESS VISA USD</span><span>$48.00</span></div>
            <div style="font-family:var(--font-mono);font-size:14px;margin-top:12px;">4580 •••• •••• 9214</div>
          </div>
        `
      },
      {
        step: 'ÉTAPE 02',
        title: 'Rechargez au moins 10 $ USD depuis votre solde FCFA',
        desc: 'Choisissez le montant initial à créditer sur la carte (minimum 10 $). Le taux du dollar du jour et le montant net en FCFA sont affichés immédiatement.',
        tip: '0 FCFA de commission sur la recharge de votre carte.',
        header: 'CHARGEMENT CARTE USD',
        screen: `
          <div class="annot-box-red" style="background:#1A201D;padding:14px;border-radius:14px;margin-bottom:12px;">
            <span class="annot-tag">2. Min. $10</span>
            <div style="font-size:11px;color:#9CA3AF;">Crédit initial carte</div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:4px;">
              <span style="font-size:24px;font-weight:900;color:#00E013;">$25.00</span>
              <span style="font-size:12px;color:#fff;">= 15 375 FCFA</span>
            </div>
          </div>
          <div style="font-size:11.5px;color:#A1A8A3;display:flex;justify-content:space-between;">
            <span>Entretien mensuel :</span>
            <strong style="color:#00E013;">0 FCFA (GRATUIT)</strong>
          </div>
        `
      },
      {
        step: 'ÉTAPE 03',
        title: 'Copiez votre CVV ou gelez la carte en 1 clic (Anti-rejet)',
        desc: 'Votre carte est prête ! Copiez le numéro à 16 chiffres et le CVV pour payer en ligne. Utilisez le bouton « Geler ❄️ » entre deux achats.',
        tip: 'Règle anti-rejet : laissez toujours 1 $ à 2 $ de marge sur votre carte avant un prélèvement automatique Meta Ads ou Netflix.',
        header: 'CONTRÔLE & SÉCURITÉ',
        screen: `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
            <div style="background:#1A201D;padding:10px;border-radius:12px;text-align:center;font-size:12px;font-weight:800;">👁️ Voir CVV</div>
            <div class="annot-box-green" style="background:#00E013;color:#000;padding:10px;border-radius:12px;text-align:center;font-size:12px;font-weight:900;">❄️ Geler 1-clic</div>
          </div>
          <div style="font-size:11px;color:#FCA5A5;background:rgba(239,68,68,0.15);padding:8px 10px;border-radius:10px;">
            ⚡ Gelez votre carte quand vous mettez un abonnement en pause.
          </div>
        `
      }
    ]
  },

  'kyc-compte': {
    badge: '1. PREMIERS PAS',
    title: 'Créer son compte et valider son KYC (CIP, CNI, Passeport) en 2 minutes',
    time: '2 min de lecture',
    keywords: 'kyc compte créer identité cip cni passeport 2fa sécurité bénin côte ivoire sénégal',
    intro: 'Débloquez tous vos plafonds et la création illimitée de cartes USD grâce à la vérification KYC automatisée.',
    steps: [
      {
        step: 'ÉTAPE 01',
        title: 'Validez votre numéro de téléphone par SMS OTP',
        desc: 'Sélectionnez votre indicatif (+229 Bénin, +225 Côte d’Ivoire, +221 Sénégal, +228 Togo, +33 Diaspora) et entrez le code reçu.',
        tip: 'Utilisez de préférence le numéro lié à votre compte Mobile Money.',
        header: 'INSCRIPTION EXPRESS',
        screen: `
          <div style="background:#1A201D;padding:12px;border-radius:12px;margin-bottom:12px;font-weight:800;font-size:14px;">
            🇧🇯 +229 01 97 45 82 10
          </div>
          <div class="annot-box-red" style="background:#00E013;color:#000;padding:12px;border-radius:12px;text-align:center;font-weight:900;font-size:13px;">
            <span class="annot-tag">1. Valider</span>
            Recevoir le code SMS →
          </div>
        `
      },
      {
        step: 'ÉTAPE 02',
        title: 'Scannez votre Carte CIP, CNI ou Passeport + Selfie',
        desc: 'Prenez une photo nette de votre pièce d’identité officielle puis effectuez un selfie rapide pour activer votre compte Vérifié et la protection 2FA.',
        tip: 'Validation automatique en moins de 2 minutes.',
        header: 'STATUT KYC VÉRIFIÉ',
        screen: `
          <div class="annot-box-green" style="background:#1A201D;padding:14px;border-radius:14px;text-align:center;">
            <div style="color:#00E013;font-size:22px;font-weight:900;">✓ KYC VÉRIFIÉ</div>
            <div style="font-size:11.5px;color:#9CA3AF;margin-top:4px;">Plafond débloqué • 2FA Actif</div>
          </div>
        `
      }
    ]
  },

  'recharge-momo': {
    badge: '2. RECHARGES & RETRAITS',
    title: 'Recharger par MTN MoMo, Moov Money, Celtiis Cash ou Wave à 0 F',
    time: '2 min de lecture',
    keywords: 'mtn momo moov celtiis wave orange recharge dépot retrait mobile money ussd',
    intro: 'Alimentez votre portefeuille FCFA en temps réel depuis votre compte Mobile Money local sans frais cachés.',
    steps: [
      {
        step: 'ÉTAPE 01',
        title: 'Appuyez sur « + Dépôt » et choisissez votre opérateur',
        desc: 'Depuis votre solde XOF, choisissez MTN MoMo, Moov Money, Celtiis Cash ou Wave et saisissez le montant souhaité.',
        tip: 'Le montant affiché est crédité intégralement sur votre portefeuille.',
        header: 'RECHARGE MOBILE MONEY',
        screen: `
          <div class="annot-box-red" style="background:#1A201D;padding:12px;border-radius:12px;display:flex;justify-content:space-between;margin-bottom:8px;">
            <span class="annot-tag">1. Opérateur</span>
            <span style="font-weight:800;">🟡 MTN Mobile Money</span>
            <span style="color:#00E013;font-weight:800;">0 F frais</span>
          </div>
          <div style="background:#1A201D;padding:10px;border-radius:12px;font-size:12px;color:#9CA3AF;">🔵 Moov Money / 🟢 Celtiis Cash</div>
        `
      },
      {
        step: 'ÉTAPE 02',
        title: 'Confirmez le push USSD avec votre code PIN Mobile Money',
        desc: 'Validez la fenêtre USSD qui apparaît sur votre téléphone (ou composez *880# / *855#). Votre solde Cashless est crédité dans la seconde.',
        tip: 'Vous pouvez retirer vos fonds vers Mobile Money à tout moment selon le même principe.',
        header: 'VALIDATION USSD',
        screen: `
          <div class="annot-box-green" style="background:#00E013;color:#000;padding:14px;border-radius:14px;text-align:center;font-weight:900;">
            ✓ +25 000 FCFA CRÉDITÉS
          </div>
        `
      }
    ]
  },

  'transferts-devises': {
    badge: '4. TRANSFERTS & DEVISES',
    title: 'Envoyer de l’argent à 0 F et convertir FCFA ↔ Naira (NGN) ou USD',
    time: '2 min de lecture',
    keywords: 'transfert p2p 0f gratuit naira ngn nigeria lagos usd euro conversion reçu pdf',
    intro: 'Envoyez instantanément à vos proches ou réglez vos fournisseurs au Nigéria avec reçu PDF officiel.',
    steps: [
      {
        step: 'ÉTAPE 01',
        title: 'Saisissez le montant et choisissez le contact ou la devise',
        desc: 'Entre utilisateurs Cashless, le transfert est instantané à 0 FCFA. Pour une conversion XOF → NGN ou USD, le taux en direct s’affiche avant confirmation.',
        tip: 'Un reçu PDF certifié est généré automatiquement pour chaque opération.',
        header: 'TRANSFERT 0 F & CHANGE',
        screen: `
          <div class="annot-box-red" style="background:#1A201D;padding:14px;border-radius:14px;margin-bottom:10px;">
            <span class="annot-tag">0 F de frais</span>
            <div style="font-size:20px;font-weight:900;color:#00E013;">50 000 FCFA → 131 000 NGN</div>
            <div style="font-size:11px;color:#9CA3AF;margin-top:4px;">📄 Reçu PDF WhatsApp inclus</div>
          </div>
        `
      }
    ]
  },

  'securite-plafonds': {
    badge: '5. SÉCURITÉ & LIMITES',
    title: 'Plafonds de compte et procédure d’urgence en cas de perte du téléphone',
    time: '2 min de lecture',
    keywords: 'plafond limite sécurité perte téléphone vol bloquer 256-bit',
    intro: 'Vos fonds sont protégés par un chiffrement militaire 256-bit, votre code PIN et l’authentification biométrique 2FA.',
    steps: [
      {
        step: 'ÉTAPE 01',
        title: 'Verrouillez vos cartes et sessions à distance en 60 secondes',
        desc: 'En cas de perte de votre téléphone, connectez-vous sur un autre appareil ou contactez notre support WhatsApp 24/7 pour geler instantanément vos cartes virtuelles.',
        tip: 'Aucune donnée sensible de carte n’est stockée en clair sur votre téléphone.',
        header: 'PROTECTION 24/7',
        screen: `
          <div class="annot-box-red" style="background:rgba(255,59,48,0.18);padding:14px;border-radius:14px;">
            <span class="annot-tag">Urgence</span>
            <div style="font-weight:900;color:#FCA5A5;">🔒 Verrouiller toutes mes cartes</div>
            <div style="font-size:11px;color:#9CA3AF;margin-top:4px;">Chiffrement 256-bit • 2FA actif</div>
          </div>
        `
      }
    ]
  }
};

function loadTutorial(key) {
  const t = TUTOS[key] || TUTOS['carte-usd'];
  document.querySelectorAll('.tuto-nav-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-tuto') === key);
  });

  const panel = document.getElementById('tuto-content-target');
  if (!panel) return;

  const stepsHtml = t.steps.map(s => `
    <div class="tuto-step-row">
      <div>
        <span style="display:inline-block;background:#000;color:#00E013;font-family:var(--font-mono);font-size:11.5px;font-weight:700;padding:4px 12px;border-radius:99px;margin-bottom:12px;">
          ${s.step}
        </span>
        <h3 style="font-family:var(--font-display);font-size:23px;font-weight:800;line-height:1.15;margin-bottom:12px;">
          ${s.title}
        </h3>
        <p style="font-size:15px;color:#4B5563;line-height:1.65;margin-bottom:16px;">
          ${s.desc}
        </p>
        <div style="background:#E8FBE8;border-left:4px solid #00D632;padding:12px 16px;border-radius:0 12px 12px 0;font-size:13.5px;font-weight:600;">
          💡 ${s.tip}
        </div>
      </div>

      <div>
        <div class="annot-phone-frame">
          <div style="display:flex;justify-content:space-between;font-size:10px;color:#6B7280;padding:0 6px 8px;">
            <span>9:41</span>
            <span style="color:#00E013;font-weight:800;">CASHLESS APP</span>
            <span>5G 🔋</span>
          </div>
          <div class="annot-phone-inner">
            <div>
              <div style="font-family:var(--font-mono);font-size:11px;color:#9CA3AF;margin-bottom:12px;border-bottom:1px solid #222;padding-bottom:8px;">
                ${s.header}
              </div>
              ${s.screen}
            </div>
            <div style="font-size:10px;color:#6B7280;display:flex;justify-content:space-between;padding-top:10px;border-top:1px dashed #222;">
              <span>Capture annotée</span>
              <span style="color:#00E013;font-weight:700;">Cashless Help</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px;">
      <span style="background:#00E013;color:#000;font-weight:900;font-size:11.5px;padding:5px 14px;border-radius:99px;">
        ${t.badge}
      </span>
      <span style="font-size:13px;font-weight:700;color:#4B5563;">⏱️ ${t.time}</span>
    </div>
    <h2 style="font-family:var(--font-display);font-size:clamp(26px,3.2vw,38px);font-weight:800;line-height:1.08;letter-spacing:-0.03em;margin-bottom:14px;">
      ${t.title}
    </h2>
    <p style="font-size:16.5px;color:#4B5563;line-height:1.6;margin-bottom:32px;padding-bottom:24px;border-bottom:2px solid #E5E7EB;">
      ${t.intro}
    </p>
    ${stepsHtml}
  `;
}

function searchTutos(query) {
  const q = (query || '').toLowerCase().trim();
  let first = null;
  document.querySelectorAll('.tuto-nav-btn').forEach(btn => {
    const key = btn.getAttribute('data-tuto');
    const item = TUTOS[key];
    if (!item) return;
    const match = !q || (item.title + ' ' + item.keywords + ' ' + item.intro).toLowerCase().includes(q);
    btn.style.display = match ? 'flex' : 'none';
    if (match && !first) first = key;
  });
  if (q && first) loadTutorial(first);
}

// =========================================================================
// BLOG "CASH'ASTUCES"
// =========================================================================
function filterBlogCards(cat, btn) {
  document.querySelectorAll('.blog-filter-btn').forEach(b => {
    b.style.background = 'transparent';
    b.style.color = '#000';
  });
  if (btn) {
    btn.style.background = '#000';
    btn.style.color = '#00E013';
  }
  document.querySelectorAll('.cash-blog-card').forEach(c => {
    const cardCat = c.getAttribute('data-cat');
    c.style.display = (cat === 'all' || cardCat === cat) ? 'flex' : 'none';
  });
}

function openBlogArticle(slug) {
  const list = document.getElementById('blog-list-container');
  const reader = document.getElementById('blog-reader-container');
  if (list) list.style.display = 'none';
  if (reader) reader.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeBlogArticle(scroll = true) {
  const list = document.getElementById('blog-list-container');
  const reader = document.getElementById('blog-reader-container');
  if (list) list.style.display = 'block';
  if (reader) reader.style.display = 'none';
  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}

// QR MODAL
function openQrModal() {
  const m = document.getElementById('qr-modal');
  if (m) m.classList.add('open');
}
function closeQrModal() {
  const m = document.getElementById('qr-modal');
  if (m) m.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  updateSimulator();
  loadTutorial('carte-usd');
});
