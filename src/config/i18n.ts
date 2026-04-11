export type Locale = 'fr' | 'en';
export const locales: Locale[] = ['fr', 'en'];
export const defaultLocale: Locale = 'fr';

export interface Dictionary {
  /* Header */
  langToggleLabel: string;
  langToggleText: string;

  /* Skip link */
  skipLinkLabel: string;

  /* Hero */
  heroEyebrow: string;
  heroSlogan: string;
  heroDiocese: string;
  frequenciesLabel: string;

  /* Section Listen */
  listenTitle: string;
  listenCta: string;
  listenDescription: string;
  listenBtnLabel: string;

  /* Section Download */
  downloadTitle: string;
  downloadDescription: string;
  downloadCta: string;
  downloadOnLabel: string;
  downloadGetOnLabel: string;
  downloadAppStoreLabel: string;
  downloadPlayStoreLabel: string;

  /* Section About */
  aboutTitle: string;
  aboutDescription: string;
  missionCard2Title: string;
  missionCard2Desc: string;
  missionCard3Title: string;
  missionCard3Desc: string;
  missionCard4Title: string;
  missionCard4Desc: string;

  /* Section Contact */
  contactTitle: string;
  contactDescription: string;
  contactWhatsapp: string;
  contactFacebook: string;
  contactEmail: string;
  contactAddress: string;

  /* Scroll dots aria labels */
  dotLabelHero: string;
  dotLabelAbout: string;
  dotLabelListen: string;
  dotLabelDownload: string;
  dotLabelContact: string;

  /* Sticky bar */
  supportCta: string;
  stickyBarAriaLabel: string;

  /* Footer */
  footerCopyrightPrefix: string;
  footerPrivacy: string;
  footerTerms: string;

  /* Support page */
  supportPageTitle: string;
  supportPageDescription: string;
  supportTitle: string;
  supportSubtitle: string;
  supportInstruction: string;
  supportMtnName: string;
  supportMtnCta: string;
  supportMtnAriaLabel: string;
  supportOrangeName: string;
  supportOrangeCta: string;
  supportOrangeAriaLabel: string;
  supportTrustTitle: string;
  supportTrustNote: string;
  toastCopied: string;

  /* Shared legal UI labels */
  legalNavLabel: string;
  tocAriaLabel: string;
  tocHeading: string;
  emailAriaLabel: string;

  /* Privacy page */
  privacyPageTitle: string;
  privacyPageDescription: string;
  privacyTitle: string;
  privacyDate: string;
  privacySec1Title: string;
  privacySec1Body: string;
  privacySec1Items: string[];
  privacySec2Title: string;
  privacySec2Body: string;
  privacySec3Title: string;
  privacySec3Body: string;
  privacySec3Items: string[];
  privacySec4Title: string;
  privacySec4Body: string;

  /* Terms page */
  termsPageTitle: string;
  termsTitle: string;
  termsDate: string;
  termsSec1Title: string;
  termsSec1Body: string;
  termsSec2Title: string;
  termsSec2Body: string;
  termsSec3Title: string;
  termsSec3Body: string;
  termsSec4Title: string;
  termsSec4Body: string;
  termsSec5Title: string;
  termsSec5Body: string;
  termsPageDescription: string;

  /* Consent banner */
  consentMessage: string;
  consentPrivacyLink: string;
  consentDismiss: string;
}

export type Dictionaries = Record<Locale, Dictionary>;

const dictionaries: Dictionaries = {
  fr: {
    /* Header */
    langToggleLabel: 'Passer en anglais',
    langToggleText:  'EN',

    /* Skip link */
    skipLinkLabel: 'Passer au contenu principal',

    /* Hero */
    heroEyebrow:      'Radio Catholique RVE',
    heroSlogan:       "La voix de l'Église",
    heroDiocese:      'Diocèse de Bafoussam, Cameroun',
    frequenciesLabel: 'Fréquences FM',

    /* Listen */
    listenTitle:       'Écouter en ligne',
    listenCta:         'Ouvrir le lecteur',
    listenDescription: 'Écoutez Radio Vox Ecclesiae en direct depuis votre navigateur.',
    listenBtnLabel:    'Ouvrir le lecteur Radio Vox Ecclesiae dans un nouvel onglet',

    /* Download */
    downloadTitle:         "Télécharger l'application",
    downloadDescription:   'Disponible sur iOS et Android.',
    downloadCta:           'Télécharger',
    downloadOnLabel:       'Télécharger sur',
    downloadGetOnLabel:    'Disponible sur',
    downloadAppStoreLabel: "Télécharger sur l'App Store",
    downloadPlayStoreLabel:'Télécharger sur Google Play',

    /* About */
    aboutTitle:       'À propos',
    aboutDescription: 'RVE est la radio catholique du Diocèse de Bafoussam — un instrument au service de la foi, de la communauté et de la Parole de Dieu.',
    missionCard2Title:'Couverture régionale',
    missionCard2Desc: 'Nous émettons depuis le cœur de la Province de l\'Ouest, reliant les fidèles à travers les ondes hertziennes de toute la région.',
    missionCard3Title:'Notre mission',
    missionCard3Desc: 'Porter la Parole de Dieu dans chaque foyer, avec un engagement ferme pour le développement social et l\'éducation de nos auditeurs.',
    missionCard4Title:'Nos programmes',
    missionCard4Desc: 'Spirituels, informatifs et culturels, nos programmes créent un pont entre la tradition de l\'Église et les défis du monde moderne.',

    /* Contact */
    contactTitle:    'Nous contacter',
    contactDescription: 'Rejoignez-nous sur nos réseaux ou écrivez-nous directement.',
    contactWhatsapp: 'WhatsApp',
    contactFacebook: 'Facebook',
    contactEmail:    'Email',
    contactAddress:  'Adresse',

    /* Scroll dots aria labels */
    dotLabelHero:     'La voix de l\'Église',
    dotLabelAbout:    'À propos',
    dotLabelListen:   'Écouter en ligne',
    dotLabelDownload: 'Télécharger l\'application',
    dotLabelContact:  'Nous contacter',

    /* Sticky bar */
    supportCta: 'Nous soutenir',
    stickyBarAriaLabel: 'Actions rapides',

    /* Footer */
    footerCopyrightPrefix: 'Radio Vox Ecclesiae. Tous droits réservés.',
    footerPrivacy:         'Politique de confidentialité',
    footerTerms:           "Conditions d'utilisation",

    /* Support page */
    supportPageTitle:       'Nous soutenir — Radio Vox Ecclesiae',
    supportPageDescription: 'Soutenez Radio Vox Ecclesiae — la radio catholique du Diocèse de Bafoussam. Vos dons nous permettent de continuer à diffuser la Parole de Dieu.',
    supportTitle:           'Aidez-nous à continuer',
    supportSubtitle:        'Chaque don, petit ou grand, permet à Radio Vox Ecclesiae de rester sur les ondes et de porter la Parole de Dieu dans chaque foyer du Diocèse de Bafoussam.',
    supportInstruction:     'Appuyez sur un bouton pour copier le numéro, puis effectuez le transfert depuis votre application Mobile Money.',
    supportMtnName:         'MTN Mobile Money',
    supportMtnCta:          'Appuyer pour copier',
    supportMtnAriaLabel:    'Copier le numéro MTN Mobile Money : 6 53 17 12 11',
    supportOrangeName:      'Orange Money',
    supportOrangeCta:       'Appuyer pour copier',
    supportOrangeAriaLabel: 'Copier le numéro Orange Money : 6 90 06 03 01',
    supportTrustTitle:      'Paiement direct & sécurisé',
    supportTrustNote:       'Vos dons vont directement au financement de la radio, sans intermédiaire.',
    toastCopied:            'Numéro copié !',

    /* Shared legal UI labels */
    legalNavLabel: 'Liens légaux',
    tocAriaLabel:  'Table des matières',
    tocHeading:    'Sommaire',
    emailAriaLabel: 'Envoyer un e-mail à',

    /* Privacy page */
    privacyPageTitle:       'Politique de confidentialité — Radio Vox Ecclesiae',
    privacyPageDescription: 'Consultez la politique de confidentialité de Radio Vox Ecclesiae : données collectées, utilisation, services tiers et vos droits. Radio catholique du Diocèse de Bafoussam.',
    privacyTitle:      'Politique de confidentialité',
    privacyDate:       'Dernière mise à jour : Avril 2026',
    privacySec1Title:  'Données collectées',
    privacySec1Body:   "Lors de votre utilisation de notre application mobile et de notre site web, nous pouvons collecter les données suivantes :",
    privacySec1Items:  [
      "Données d'utilisation anonymisées (pages visitées, durée d'écoute)",
      "Informations techniques (type d'appareil, version du système d'exploitation)",
      "Adresse e-mail si vous nous contactez volontairement",
    ],
    privacySec2Title:  "Utilisation des données",
    privacySec2Body:   "Les données collectées sont utilisées exclusivement pour améliorer nos services, analyser l'audience de la radio et répondre à vos demandes. Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins commerciales.",
    privacySec3Title:  'Services tiers',
    privacySec3Body:   'Notre application et notre site web peuvent intégrer les services tiers suivants, chacun disposant de sa propre politique de confidentialité :',
    privacySec3Items:  [
      'Google Play (Android) — politique disponible sur policies.google.com',
      'Apple App Store (iOS) — politique disponible sur apple.com/legal/privacy',
      'Google Fonts — chargement des polices via fonts.googleapis.com',
    ],
    privacySec4Title:  'Demandes relatives à vos données',
    privacySec4Body:   "Pour toute question relative à vos données personnelles, pour exercer votre droit d'accès, de rectification ou de suppression, contactez-nous à :",

    /* Terms page */
    termsPageTitle:       "Conditions d'utilisation — Radio Vox Ecclesiae",
    termsPageDescription: "Lisez les conditions d'utilisation de Radio Vox Ecclesiae : accès au service, propriété intellectuelle, responsabilité et droit applicable. Radio catholique du Diocèse de Bafoussam.",
    termsTitle:      "Conditions d'utilisation",
    termsDate:       'Dernière mise à jour : Avril 2026',
    termsSec1Title:  'Acceptation des conditions',
    termsSec1Body:   "En accédant à notre site web ou en utilisant notre application mobile, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.",
    termsSec2Title:  'Description du service',
    termsSec2Body:   'Radio Vox Ecclesiae est une station de radio catholique du Diocèse de Bafoussam (Cameroun) diffusant sur les fréquences FM 97.3, 103.7 et 105.8. Nous proposons une écoute en direct via notre application mobile et notre site web, ainsi que du contenu éducatif et religieux.',
    termsSec3Title:  'Propriété intellectuelle',
    termsSec3Body:   "Tous les contenus diffusés par Radio Vox Ecclesiae — émissions, musiques, textes, logos et enregistrements — sont la propriété de Radio Vox Ecclesiae ou de ses concédants de licence. Toute reproduction, distribution ou utilisation non autorisée est strictement interdite sans accord écrit préalable.",
    termsSec4Title:  'Limitation de responsabilité',
    termsSec4Body:   'Radio Vox Ecclesiae s\'efforce d\'assurer la disponibilité continue de ses services, mais ne saurait être tenue responsable des interruptions de service, des erreurs techniques ou des dommages indirects résultant de l\'utilisation de ses services. Le service est fourni "en l\'état", sans garantie d\'aucune sorte.',
    termsSec5Title:  'Droit applicable et contact',
    termsSec5Body:   'Les présentes conditions sont régies par le droit camerounais. Tout litige sera soumis à la juridiction compétente de Bafoussam, Cameroun. Pour toute question, contactez-nous à :',

    /* Consent banner */
    consentMessage:     'Ce site utilise des cookies analytiques pour mesurer son audience.',
    consentPrivacyLink: 'Politique de confidentialité',
    consentDismiss:     'J\'ai compris',
  },

  en: {
    /* Header */
    langToggleLabel: 'Switch to French',
    langToggleText:  'FR',

    /* Skip link */
    skipLinkLabel: 'Skip to main content',

    /* Hero */
    heroEyebrow:      'RVE Catholic Radio',
    heroSlogan:       'The Voice of the Church',
    heroDiocese:      'Diocese of Bafoussam, Cameroon',
    frequenciesLabel: 'FM Frequencies',

    /* Listen */
    listenTitle:       'Listen Online',
    listenCta:         'Open Player',
    listenDescription: 'Listen to Radio Vox Ecclesiae live from your browser.',
    listenBtnLabel:    'Open Radio Vox Ecclesiae player in a new tab',

    /* Download */
    downloadTitle:         'Download the App',
    downloadDescription:   'Available on iOS and Android.',
    downloadCta:           'Download',
    downloadOnLabel:       'Download on the',
    downloadGetOnLabel:    'Get it on',
    downloadAppStoreLabel: 'Download on the App Store',
    downloadPlayStoreLabel:'Get it on Google Play',

    /* About */
    aboutTitle:       'About',
    aboutDescription: 'RVE is the Catholic radio of the Diocese of Bafoussam — an instrument at the service of faith, community and the Word of God.',
    missionCard2Title:'Regional Coverage',
    missionCard2Desc: 'We broadcast from the heart of the Western Province, connecting the faithful through radio waves across the entire region.',
    missionCard3Title:'Our Mission',
    missionCard3Desc: 'Bringing the Word of God into every home, with a firm commitment to the social development and education of our listeners.',
    missionCard4Title:'Our Programmes',
    missionCard4Desc: 'Spiritual, informative and cultural, our programmes build a bridge between Church tradition and the challenges of the modern world.',

    /* Contact */
    contactTitle:    'Contact Us',
    contactDescription: 'Find us on our channels or write to us directly.',
    contactWhatsapp: 'WhatsApp',
    contactFacebook: 'Facebook',
    contactEmail:    'Email',
    contactAddress:  'Address',

    /* Scroll dots aria labels */
    dotLabelHero:     'The Voice of the Church',
    dotLabelAbout:    'About',
    dotLabelListen:   'Listen Online',
    dotLabelDownload: 'Download the App',
    dotLabelContact:  'Contact Us',

    /* Sticky bar */
    supportCta: 'Support Us',
    stickyBarAriaLabel: 'Quick actions',

    /* Footer */
    footerCopyrightPrefix: 'Radio Vox Ecclesiae. All rights reserved.',
    footerPrivacy:         'Privacy Policy',
    footerTerms:           'Terms of Service',

    /* Support page */
    supportPageTitle:       'Support Us — Radio Vox Ecclesiae',
    supportPageDescription: 'Support Radio Vox Ecclesiae — the Catholic radio of the Diocese of Bafoussam. Your donations allow us to continue broadcasting the Word of God.',
    supportTitle:           'Help us keep broadcasting',
    supportSubtitle:        'Every donation, large or small, keeps Radio Vox Ecclesiae on air and brings the Word of God into every home across the Diocese of Bafoussam.',
    supportInstruction:     'Tap a button to copy the number, then complete the transfer in your Mobile Money app.',
    supportMtnName:         'MTN Mobile Money',
    supportMtnCta:          'Tap to copy',
    supportMtnAriaLabel:    'Copy MTN Mobile Money number: 6 53 17 12 11',
    supportOrangeName:      'Orange Money',
    supportOrangeCta:       'Tap to copy',
    supportOrangeAriaLabel: 'Copy Orange Money number: 6 90 06 03 01',
    supportTrustTitle:      'Direct & secure payment',
    supportTrustNote:       'Your donation goes directly to the radio, with no intermediary.',
    toastCopied:            'Number copied!',

    /* Shared legal UI labels */
    legalNavLabel: 'Legal links',
    tocAriaLabel:  'Table of contents',
    tocHeading:    'Contents',
    emailAriaLabel: 'Send an email to',

    /* Privacy page */
    privacyPageTitle:       'Privacy Policy — Radio Vox Ecclesiae',
    privacyPageDescription: 'Read the privacy policy of Radio Vox Ecclesiae: data collected, usage, third-party services and your rights. Catholic radio of the Diocese of Bafoussam.',
    privacyTitle:      'Privacy Policy',
    privacyDate:       'Last updated: April 2026',
    privacySec1Title:  'Data Collected',
    privacySec1Body:   'When you use our mobile application and website, we may collect the following data:',
    privacySec1Items:  [
      'Anonymised usage data (pages visited, listening duration)',
      'Technical information (device type, operating system version)',
      'Email address if you contact us voluntarily',
    ],
    privacySec2Title:  'Use of Data',
    privacySec2Body:   'Collected data is used solely to improve our services, analyse radio audience, and respond to your requests. We do not sell, rent or share your personal data with third parties for commercial purposes.',
    privacySec3Title:  'Third-Party Services',
    privacySec3Body:   'Our application and website may integrate the following third-party services, each with their own privacy policy:',
    privacySec3Items:  [
      'Google Play (Android) — policy available at policies.google.com',
      'Apple App Store (iOS) — policy available at apple.com/legal/privacy',
      'Google Fonts — fonts loaded via fonts.googleapis.com',
    ],
    privacySec4Title:  'Data Requests',
    privacySec4Body:   'For any questions regarding your personal data, or to exercise your rights of access, rectification or deletion, contact us at:',

    /* Terms page */
    termsPageTitle:       'Terms of Service — Radio Vox Ecclesiae',
    termsPageDescription: 'Read the Terms of Service of Radio Vox Ecclesiae: service access, intellectual property, liability and governing law. Catholic radio of the Diocese of Bafoussam.',
    termsTitle:      'Terms of Service',
    termsDate:       'Last updated: April 2026',
    termsSec1Title:  'Acceptance of Terms',
    termsSec1Body:   'By accessing our website or using our mobile application, you agree to be bound by these Terms of Service. If you do not accept these terms, please do not use our services.',
    termsSec2Title:  'Service Description',
    termsSec2Body:   'Radio Vox Ecclesiae is a Catholic radio station of the Diocese of Bafoussam (Cameroon) broadcasting on FM frequencies 97.3, 103.7 and 105.8. We offer live streaming via our mobile app and website, along with educational and religious content.',
    termsSec3Title:  'Intellectual Property',
    termsSec3Body:   'All content broadcast by Radio Vox Ecclesiae — programmes, music, texts, logos and recordings — is the property of Radio Vox Ecclesiae or its licensors. Any unauthorised reproduction, distribution or use is strictly prohibited without prior written consent.',
    termsSec4Title:  'Limitation of Liability',
    termsSec4Body:   'Radio Vox Ecclesiae strives to ensure the continuous availability of its services, but cannot be held liable for service interruptions, technical errors, or indirect damages arising from the use of its services. The service is provided "as is", without warranty of any kind.',
    termsSec5Title:  'Governing Law and Contact',
    termsSec5Body:   'These terms are governed by Cameroonian law. Any dispute shall be submitted to the competent jurisdiction of Bafoussam, Cameroon. For any questions, contact us at:',

    /* Consent banner */
    consentMessage:     'This site uses analytics cookies to measure its audience.',
    consentPrivacyLink: 'Privacy Policy',
    consentDismiss:     'I understand',
  },
};

export default dictionaries;
