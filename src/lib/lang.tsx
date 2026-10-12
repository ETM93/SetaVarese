import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "it" | "en";
export type InterestKey = "laser" | "viso" | "corpo";
export type PromoKey =
  | "laser-total-donna"
  | "laser-total-uomo"
  | "laser-6zone"
  | "laser-4zone"
  | "body-experience";
export const PROMO_KEYS: PromoKey[] = [
  "laser-total-donna",
  "laser-total-uomo",
  "laser-6zone",
  "laser-4zone",
  "body-experience",
];

interface NavCopy {
  links: [string, string][];
  book: string;
  ariaNav: string;
  mobileMenu: string;
  mobileMenuOpen: string;
  mobileMenuClose: string;
}

interface HeroCopy {
  kicker: string;
  title: string;
  titleAccent: string;
  sub: string;
  reviews: string;
  offerLabel: string;
  consultTitle: string;
  consultSub: string;
  consultCta: string;
  laserTitle: string;
  laserSub: string;
  laserPrice: string;
  laserCta: string;
  laserMainTitle: string;
  laserMainSub: string;
  laserMainSubHighlight: string;
  priceBox1Label: string;
  priceBox1Price: string;
  priceBox1Sub: string;
  priceBox2Label: string;
  priceBox2Price: string;
  priceBox2Sub: string;
  discoverTreatments: string;
  discoverPromos: string;
}

interface AboutItem {
  title: string;
  text: string;
}

interface AboutCopy {
  kicker: string;
  title1: string;
  title2: string;
  text: string;
  listKicker: string;
  items: AboutItem[];
  imgAlt: string;
}

interface TreatmentPrice {
  label: string;
  price: string;
}

interface TreatmentCard {
  cat: string;
  tag: string;
  chips: string[];
  desc: string;
  highlight?: string;
  priceTitle?: string;
  prices?: TreatmentPrice[];
  items: string[];
  cta: string;
}

interface TreatmentsCopy {
  kicker: string;
  title: string;
  cards: TreatmentCard[];
}

interface PromoCard {
  kicker: string;
  title: string;
  highlight: string;
  sub: string;
  priceLabel: string;
  price: string;
  originalPrice: string;
  priceNote: string;
  note: string;
  savings: string;
  label: string;
}

interface BodyExperienceCopy {
  kicker: string;
  headline: string;
  sub: string;
  badge: string;
  priceLabel: string;
  price: string;
  originalPrice: string;
  priceNote: string;
  savings: string;
  note: string;
  techTitle: string;
  techs: string[];
  bonuses: { label: string; value: string; originalValue?: string }[];
  validity: string;
  cta: string;
}

interface PromosCopy {
  kicker: string;
  title: string;
  cta: string;
  cards: PromoCard[];
  bonusTitle: string;
  laserBonuses: { label: string; value: string; sub?: string }[];
  bodyExperience: BodyExperienceCopy;
}

interface BodyPageTreatment {
  name: string;
  desc: string;
}

interface BodyPageCopy {
  backLabel: string;
  kicker: string;
  title: string;
  sub: string;
  sectionKicker: string;
  offerLabel: string;
  cta: string;
  treatments: BodyPageTreatment[];
}

interface FacePageGroup {
  title: string;
  treatments: BodyPageTreatment[];
}

interface FacePageCopy {
  backLabel: string;
  kicker: string;
  title: string;
  sub: string;
  sectionKicker: string;
  offerLabel: string;
  cta: string;
  groups: FacePageGroup[];
}

interface LaserPageCopy {
  backLabel: string;
  kicker: string;
  title: string;
  sub: string;
  pricesTitle: string;
  promoTitle: string;
  experienceTitle: string;
  skinPromoTitle: string;
}

interface PromoFormCopy {
  title: string;
  sub: string;
  whatsappCta: string;
  submit: string;
  names: Record<PromoKey, string>;
}

interface Pillar {
  n: string;
  t: string;
  d: string;
}

interface WhyCopy {
  kicker: string;
  title: string;
  intro: string;
  pillars: Pillar[];
}

interface FormErrors {
  name: string;
  phone: string;
  email: string;
  privacy: string;
}

interface FormCopy {
  aria: string;
  title: string;
  sub: string;
  whatsappCta: string;
  name: string;
  phone: string;
  email: string;
  interestLabel: string;
  interests: Record<InterestKey, string>;
  daysLabel: string;
  slotsLabel: string;
  notesLabel: string;
  optional: string;
  days: string[];
  slots: string[];
  notesPlaceholder: string;
  submit: string;
  sending: string;
  submitError: string;
  privacyPre: string;
  privacyLink: string;
  errors: FormErrors;
}

interface BookingCopy {
  kicker: string;
  title1: string;
  title2: string;
  text: string;
  whatsapp: string;
  overlayTitle: string;
  overlayKicker: string;
  close: string;
}

interface VisitCopy {
  kicker: string;
  title: string;
  address: string;
  hours: string;
  hoursValue: string;
  phone: string;
  email: string;
  maps: string;
  mapTitle: string;
}

interface StickyCopy {
  aria: string;
  book: string;
  whatsapp: string;
}

interface FooterCopy {
  treatments: string;
  promo: string;
  book: string;
  privacy: string;
  cookie: string;
  cookieSettings: string;
  rights: string;
  langLabel: string;
}

export interface Copy {
  skip: string;
  nav: NavCopy;
  hero: HeroCopy;
  kpi: [string, string][];
  about: AboutCopy;
  treatments: TreatmentsCopy;
  bodyPage: BodyPageCopy;
  facePage: FacePageCopy;
  laserPage: LaserPageCopy;
  promos: PromosCopy;
  promoForm: PromoFormCopy;
  why: WhyCopy;
  form: FormCopy;
  booking: BookingCopy;
  visit: VisitCopy;
  sticky: StickyCopy;
  footer: FooterCopy;
}

export const COPY: Record<Lang, Copy> = {
  it: {
    skip: "Salta al contenuto",
    nav: {
      links: [
        ["Trattamenti", "#trattamenti"],
        ["Promo", "#promo"],
        ["Il centro", "#centro"],
        ["Perché Seta", "#perche"],
        ["Dove siamo", "#dove"],
      ],
      book: "Richiedi Consulenza (gratis)",
      ariaNav: "Navigazione principale",
      mobileMenu: "Menu",
      mobileMenuOpen: "Apri menu",
      mobileMenuClose: "Chiudi menu",
    },
    hero: {
      kicker: "SETA BEAUTY VARESE",
      title: "Epilazione Laser\n& Estetica Avanzata",
      titleAccent: "",
      sub: "Scopri la tecnologia, la sicurezza e la personalizzazione dei nostri percorsi di bellezza.",
      reviews: "215 recensioni Google",
      offerLabel: "SKIN PROMO",
      consultTitle: "Prima consulenza gratuita",
      consultSub: "Check-up personalizzato della pelle, senza impegno.",
      consultCta: "Mi interessa",
      laserTitle: "Epilazione laser",
      laserSub: "Tecnologia laser a diodo, sicura e personalizzata.",
      laserPrice: "prima seduta 9,90 €",
      laserCta: "Mi interessa",
      laserMainTitle: "EPILAZIONE LASER",
      laserMainSub: "Consulenza e check-up digitale GRATUITI con skincamera 200x",
      laserMainSubHighlight: "GRATUITI",
      priceBox1Label: "PRIMA SEDUTA",
      priceBox1Price: "9,90€",
      priceBox1Sub: "A ZONA",
      priceBox2Label: "PRIMA SEDUTA",
      priceBox2Price: "89€",
      priceBox2Sub: "TOTAL BODY",
      discoverTreatments: "Scopri i nostri trattamenti",
      discoverPromos: "Scopri le promo del mese",
    },
    kpi: [
      ["+20", "Anni di esperienza"],
      ["+100", "Centri in Italia"],
      ["+500k", "Clienti soddisfatte"],
      ["+30k", "Recensioni verificate"],
    ],
    about: {
      kicker: "IL CENTRO DI VARESE",
      title1: "In pieno centro città,",
      title2: "in Via Cavour.",
      text: "Da Seta Beauty Clinic crediamo che non esista un metodo uguale per tutti. Ogni nostra azione parte da un Check-up gratuito: un’analisi accurata della pelle e delle esigenze specifiche per costruire un percorso di estetica avanzata personalizzato. La nostra forza è l’unione tra tecnologie all'avanguardia, protocolli esclusivi e operatrici altamente qualificate.",
      listKicker: "I NOSTRI CLIENTI CI APPREZZANO PER",
      items: [
        { title: "Risultati visibili e rapidi", text: "L'efficacia del nostro metodo laser è confermata dai risultati tangibili già dopo le prime sedute." },
        { title: "Professionalità e gentilezza", text: "Il nostro staff non è solo altamente qualificato, ma attento a farti sentire sempre ascoltata e a tuo agio." },
        { title: "Ambiente curato", text: "Un centro moderno, impeccabile nell'igiene e pensato per il tuo massimo comfort." },
        { title: "Trattamenti personalizzati", text: "Spiegazioni chiare, protocolli studiati su misura e sedute rapide che rispettano i tuoi ritmi." },
      ],
      imgAlt: "Trattamento Biolift Seta",
    },
    treatments: {
      kicker: "TRATTAMENTI",
      title: "I nostri protocolli di estetica avanzata.",
      cards: [
        {
          cat: "Epilazione Laser",
          tag: "Laser Plus",
          chips: ["Uomo", "Donna"],
          desc: "Dì addio a lamette e cerette. Con la nostra tecnologia Laser a Diodo, agiamo direttamente sul follicolo pilifero in modo sicuro, rapido e indolore. Adatto a ogni fototipo, per una pelle liscia tutto l'anno.",
          highlight: "Più richiesto",
          priceTitle: "Listino epilazione laser",
          prices: [
            { label: "Zone piccole", price: "19,90 €" },
            { label: "Zone medie", price: "29,90 €" },
            { label: "Zone grandi", price: "39,90 €" },
            { label: "4 zone in 1 seduta", price: "149,00 €" },
            { label: "6 zone in 1 seduta", price: "219,00 €" },
            { label: "Total body donna", price: "249,00 €" },
            { label: "Total body uomo", price: "269,00 €" },
          ],
          items: [],
          cta: "Prezzi e Promo",
        },
        {
          cat: "Trattamenti Viso",
          tag: "Hi-tech skin care",
          chips: ["Donna", "Uomo"],
          desc: "Rigenera, illumina e distendi la pelle del tuo viso.",
          items: ["Pulizia profonda", "Anti-Age", "Trattamenti idratanti e rigeneranti"],
          cta: "Scopri i trattamenti viso",
        },
        {
          cat: "Trattamenti Corpo",
          tag: "Estetica avanzata",
          chips: ["Donna", "Uomo"],
          desc: "Il tuo corpo merita un progetto su misura.",
          items: ["Rimodellamento silhouette", "Radiofrequenza", "Protocolli drenanti e tonificanti"],
          cta: "Scopri i trattamenti corpo",
        },
      ],
    },
    promos: {
      kicker: "PROMO",
      title: "Le promozioni attive del centro di Varese.",
      cta: "Blocca la promo",
      bonusTitle: "Inclusi nella promo",
      cards: [
        {
          kicker: "PROMO",
          title: "LASER EPIL EXPERIENCE",
          highlight: "TOTAL BODY",
          sub: "DONNA · 12 SEDUTE",
          priceLabel: "A SOLI",
          price: "199€",
          originalPrice: "249€",
          priceNote: "A SEDUTA",
          note: "Valida fino al 31 ottobre",
          savings: "Risparmi €900",
          label: "",
        },
        {
          kicker: "PROMO",
          title: "LASER EPIL EXPERIENCE",
          highlight: "TOTAL BODY",
          sub: "UOMO · 12 SEDUTE",
          priceLabel: "A SOLI",
          price: "215€",
          originalPrice: "269€",
          priceNote: "A SEDUTA",
          note: "Valida fino al 31 ottobre",
          savings: "Risparmi €975",
          label: "",
        },
        {
          kicker: "PROMO",
          title: "LASER EPIL EXPERIENCE",
          highlight: "6X1",
          sub: "6 ZONE A SCELTA · 12 SEDUTE",
          priceLabel: "A SOLI",
          price: "175€",
          originalPrice: "239€",
          priceNote: "A SEDUTA",
          note: "Valida fino al 31 ottobre",
          savings: "Risparmi €1150",
          label: "",
        },
        {
          kicker: "PROMO",
          title: "LASER EPIL EXPERIENCE",
          highlight: "4X1",
          sub: "4 ZONE A SCELTA · 12 SEDUTE",
          priceLabel: "A SOLI",
          price: "119€",
          originalPrice: "159€",
          priceNote: "A SEDUTA",
          note: "Valida fino al 31 ottobre",
          savings: "Risparmi €720",
          label: "",
        },
      ],
      laserBonuses: [
        { label: "Epil check-up digitale con skincamera 200x", value: "GRATUITO", sub: "invece di 59€" },
        { label: "Prima seduta completa (su tutte le zone che vuoi)", value: "GRATUITA" },
      ],
      bodyExperience: {
        kicker: "PROMO SETA BODY EXPERIENCE",
        headline: "Inizia ora la tua prossima prova costume",
        sub: "Modella e scolpisci il tuo corpo tutto l'anno con i percorsi Open Gold.",
        badge: "20 SEDUTE ALL-INCLUSIVE",
        priceLabel: "A SOLI",
        price: "89€",
        originalPrice: "159€",
        priceNote: "A SEDUTA",
        savings: "Risparmi fino a €1400",
        note: "Valido su tutte le esclusive Biotecnologie Seta Beauty Clinic",
        techTitle: "TECNOLOGIE INCLUSE",
        techs: ["Body Sculpt Laser", "BodyShape 360", "BodyTone", "BodyPress Infrared", "BodyTherm"],
        bonuses: [
          { label: "Body check-up digitale con BIA e termocamera", value: "GRATUITO", originalValue: "89€" },
          { label: "Prima seduta completa", value: "GRATUITA" },
        ],
        validity: "Promo valida fino al 31 ottobre",
        cta: "Blocca la promo",
      },
    },
    bodyPage: {
      backLabel: "Torna alla home",
      kicker: "ESTETICA AVANZATA",
      title: "Modella, tonifica e ridisegna la tua silhouette con l'Estetica Avanzata Corpo",
      sub: "Scopri i nostri percorsi di rimodellamento hi-tech, progettati per combattere gli inestetismi cutanei, migliorare la tonicità dei tessuti e regalarti un benessere profondo e duraturo.",
      sectionKicker: "ESTETICA AVANZATA",
      offerLabel: "Check-up digitale gratuito + prima seduta a soli 39,00€",
      cta: "Prenota ora",
      treatments: [
        {
          name: "Bodypress Infrared",
          desc: "Un protocollo rivitalizzante e disintossicante di drenaggio linfatico che unisce l'efficacia del pressomassaggio meccanico all'azione degli infrarossi. Ideale per migliorare la circolazione sanguigna e linfatica, favorire l'eliminazione delle tossine, ridurre visibilmente la ritenzione idrica, la cellulite e la sensazione di gonfiore alle gambe.",
        },
        {
          name: "Bodytherm",
          desc: "Trattamento termico profondo ideale per stimolare la sudorazione, accelerare il metabolismo e potenziare l'azione snellente.",
        },
        {
          name: "Bodytone",
          desc: "Specifico per stimolare la tonicità muscolare e cutanea, aiutando a ridefinire e rassodare le aree chiave del corpo.",
        },
        {
          name: "Bodyshape 360",
          desc: "Un approccio completo e sinergico per il rimodellamento della silhouette a 360 gradi, agendo su adiposità e tonicità.",
        },
        {
          name: "Body Sculpt Laser",
          desc: "Tecnologia avanzata per il trattamento mirato delle adiposità localizzate e il rimodellamento delle forme corporee.",
        },
      ],
    },
    facePage: {
      backLabel: "Torna alla home",
      kicker: "SKINCARE AVANZATA",
      title: "Rigenera, illumina e distendi la pelle con la Skincare Avanzata Viso",
      sub: "Scopri i nostri percorsi di skincare hi-tech, pensati per contrastare i segni del tempo, illuminare l'incarnato e ridonare compattezza e vitalità alla tua pelle.",
      sectionKicker: "SKINCARE AVANZATA",
      offerLabel: "Check-up digitale gratuito + prima seduta a soli 39,00€",
      cta: "Prenota ora",
      groups: [
        {
          title: "Trattamenti di Skincare Avanzata",
          treatments: [
            { name: "Ultraskin", desc: "Trattamento avanzato ideale per migliorare la struttura cutanea e donare compattezza." },
            { name: "Hydraface", desc: "Pulizia profonda, esfoliazione e profonda idratazione in un'unica seduta per una pelle subito luminosa." },
            { name: "Cryoclean", desc: "Azione purificante e levigante basata sulla crioterapia per liberare i pori e affinare la grana della pelle." },
            { name: "Skin Peel", desc: "Esfoliazione chimica controllata per stimolare il turnover cellulare e cancellare le imperfezioni." },
            { name: "Radiofrequenza Viso", desc: "Sfrutta il calore per stimolare la produzione naturale di collagene, distendendo i tessuti e donando tono." },
          ],
        },
        {
          title: "Trattamenti Anti-Age Hi-Tech",
          treatments: [
            { name: "Hydraface & Cryotone/Oxyultra", desc: "Combinazione di pulizia profonda e ossigenazione cellulare per rivitalizzare i tessuti spenti e stressati." },
            { name: "Virtual Lifting", desc: "Trattamento rassodante non invasivo per ridefinire i contorni del viso e contrastare il rilassamento cutaneo." },
            { name: "Virtual BTX", desc: "Azione mirata per distendere i segni d'espressione e donare un aspetto disteso e riposato." },
            { name: "Virtual Biorev", desc: "Biorivitalizzazione senza aghi per nutrire in profondità e ripristinare il turgore cutaneo." },
            { name: "Virtual Lips Filler", desc: "Trattamento rimpolpante per valorizzare e idratare le labbra in modo naturale e senza iniezioni." },
          ],
        },
      ],
    },
    laserPage: {
      backLabel: "Torna alla home",
      kicker: "LASER PLUS",
      title: "Listino e Promozioni Epilazione Laser",
      sub: "Tecnologia laser a diodo, sicura e personalizzata per uomo e donna. Scopri i prezzi e tutte le promozioni attive del centro di Varese.",
      pricesTitle: "Listino epilazione laser",
      promoTitle: "Le Promo di ottobre",
      experienceTitle: "Prova costume",
      skinPromoTitle: "Skin Promo",
    },
    promoForm: {
      title: "Blocca la promo",
      sub: "Oppure lascia i tuoi dati: ti ricontattiamo entro 24h per confermare la tua promo. Nessun impegno.",
      whatsappCta: "Scrivi su WhatsApp",
      submit: "Blocca la promo",
      names: {
        "laser-total-donna": "Promo Laser Epil Experience — Total Body Donna",
        "laser-total-uomo": "Promo Laser Epil Experience — Total Body Uomo",
        "laser-6zone": "Promo Laser Epil Experience — 6 zone a scelta",
        "laser-4zone": "Promo Laser Epil Experience — 4 zone a scelta",
        "body-experience": "Promo Seta Body Experience — 20 sedute all-inclusive",
      },
    },
    why: {
      kicker: "PERCHÉ SETA",
      title: "Quattro motivi per scegliere il nostro metodo.",
      intro: "Affidarsi a Seta Beauty Varese significa scegliere un percorso di estetica avanzata dove la scienza incontra la cura della persona.\n\nEcco perché chi ci sceglie ottiene risultati reali:",
      pillars: [
        { n: "01", t: "Diagnosi e Metodo Seta", d: "Non crediamo nei trattamenti standard. Ogni percorso inizia con un check-up professionale gratuito per analizzare le tue esigenze specifiche e costruire un protocollo d'azione personalizzato, unico come te." },
        { n: "02", t: "Tecnologie d'Avanguardia", d: "Utilizziamo esclusivamente strumentazioni di ultima generazione e protocolli scientifici testati, per garantirti sedute sicure, efficaci e massimamente performanti in ogni fase del trattamento." },
        { n: "03", t: "Operatrici altamente qualificate", d: "Il nostro team è costantemente formato sui protocolli esclusivi Seta Beauty. La nostra competenza è la tua sicurezza: ogni trattamento viene eseguito con massima precisione e attenzione al dettaglio." },
        { n: "04", t: "Risultati Misurabili", d: "Il nostro obiettivo è il tuo benessere. Monitoriamo i tuoi progressi seduta dopo seduta, lavorando insieme per raggiungere gli obiettivi definiti e garantirti il massimo risultato possibile, in modo duraturo." },
      ],
    },
    form: {
      aria: "Modulo prenotazione consulenza",
      title: "Entriamo in contatto",
      sub: "Oppure lascia i tuoi dati: ti richiamiamo entro 24h per organizzare l'appuntamento. Nessun impegno.",
      whatsappCta: "Scrivi su WhatsApp",
      name: "Nome e cognome",
      phone: "Telefono",
      email: "Email",
      interestLabel: "MI INTERESSA",
      interests: {
        laser: "Epilazione Laser (Donna - Uomo)",
        viso: "Protocolli Viso",
        corpo: "Protocolli Corpo",
      },
      daysLabel: "GIORNI DISPONIBILI",
      slotsLabel: "FASCE ORARIE",
      notesLabel: "NOTE",
      optional: "(opzionale)",
      days: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      slots: ["Mattina (9–13)", "Pomeriggio (13–18)", "Sera (18–20)"],
      notesPlaceholder: "Es. richiamatemi solo dopo le 17, preferenza operatrice…",
      submit: "Contattami",
      sending: "Invio in corso…",
      submitError: "Errore nell'invio. Riprova o chiamaci direttamente.",
      privacyPre: "Ho letto e accetto la",
      privacyLink: "privacy policy",
      errors: {
        name: "Inserisci il tuo nome",
        phone: "Telefono non valido",
        email: "Email non valida",
        privacy: "Devi accettare la privacy policy",
      },
    },
    booking: {
      kicker: "PRENOTA",
      title1: "Consulenza",
      title2: "gratuita.",
      text: "Diagnosi della pelle, valutazione del percorso e preventivo personalizzato. Senza impegno.",
      whatsapp: "WhatsApp · risposta in giornata",
      overlayTitle: "Prenota ora",
      overlayKicker: "CONSULENZA GRATUITA",
      close: "Chiudi",
    },
    visit: {
      kicker: "DOVE SIAMO",
      title: "Vieni a trovarci in centro a Varese.",
      address: "Indirizzo",
      hours: "Orari",
      hoursValue: "Lun – Mer · 09:00 – 20:00\nGio – Ven · 08:00 – 20:00\nSab · 08:00 – 19:00 · Dom chiuso",
      phone: "Telefono",
      email: "Email",
      maps: "Apri in Google Maps →",
      mapTitle: "Mappa Seta Beauty Varese",
    },
    sticky: {
      aria: "Azioni rapide",
      book: "Richiedi consulenza (gratis)",
      whatsapp: "Scrivici",
    },
    footer: {
      treatments: "Trattamenti",
      promo: "Promo",
      book: "Prenota",
      privacy: "Privacy policy",
      cookie: "Cookie policy",
      cookieSettings: "Impostazioni cookie",
      rights: "Tutti i diritti riservati",
      langLabel: "Lingua",
    },
  },
  en: {
    skip: "Skip to content",
    nav: {
      links: [
        ["Treatments", "#trattamenti"],
        ["Offers", "#promo"],
        ["The clinic", "#centro"],
        ["Why Seta", "#perche"],
        ["Find us", "#dove"],
      ],
      book: "Consultation (free)",
      ariaNav: "Main navigation",
      mobileMenu: "Menu",
      mobileMenuOpen: "Open menu",
      mobileMenuClose: "Close menu",
    },
    hero: {
      kicker: "SETA BEAUTY VARESE",
      title: "The Seta method for your skin",
      titleAccent: "",
      sub: "Laser hair removal, face and body in central Varese.",
      reviews: "215 Google reviews",
      offerLabel: "SKIN PROMO",
      consultTitle: "First consultation free",
      consultSub: "Personalised skin check-up, no obligation.",
      consultCta: "I'm interested",
      laserTitle: "Laser hair removal",
      laserSub: "Diode laser technology, safe and personalised.",
      laserPrice: "first session 9,90 €",
      laserCta: "I'm interested",
      laserMainTitle: "LASER HAIR REMOVAL",
      laserMainSub: "Free consultation and digital check-up with 200x skincamera",
      laserMainSubHighlight: "Free",
      priceBox1Label: "FIRST SESSION",
      priceBox1Price: "9,90€",
      priceBox1Sub: "PER AREA",
      priceBox2Label: "FIRST SESSION",
      priceBox2Price: "89€",
      priceBox2Sub: "TOTAL BODY",
      discoverTreatments: "Discover our treatments",
      discoverPromos: "Discover this month's offers",
    },
    kpi: [
      ["+20", "Years of experience"],
      ["+100", "Clinics in Italy"],
      ["+500k", "Happy clients"],
      ["+30k", "Verified reviews"],
    ],
    about: {
      kicker: "THE VARESE CLINIC",
      title1: "Right in the city centre,",
      title2: "on Via Cavour.",
      text: "At Seta Beauty Clinic we believe there is no one-size-fits-all method. Everything starts with a free check-up: a careful analysis of your skin and specific needs, to build a personalised advanced aesthetics programme. Our strength is the combination of cutting-edge technology, exclusive protocols and highly qualified therapists.",
      listKicker: "WHAT OUR CLIENTS LOVE ABOUT US",
      items: [
        { title: "Visible, fast results", text: "The effectiveness of our laser method is confirmed by tangible results from the very first sessions." },
        { title: "Professional and welcoming", text: "Our staff is not only highly qualified, but also attentive to make you feel heard and at ease." },
        { title: "Immaculate environment", text: "A modern clinic, impeccable in hygiene and designed for your maximum comfort." },
        { title: "Tailored treatments", text: "Clear explanations, bespoke protocols and quick sessions that respect your schedule." },
      ],
      imgAlt: "Seta Biolift treatment",
    },
    treatments: {
      kicker: "TREATMENTS",
      title: "Our advanced aesthetics protocols.",
      cards: [
        {
          cat: "Laser Hair Removal",
          tag: "Laser Plus",
          chips: ["Men", "Women"],
          desc: "Say goodbye to razors and waxing. With our Diode Laser technology we act directly on the hair follicle, safely, quickly and painlessly. Suitable for every skin type, for smooth skin all year round.",
          highlight: "Most requested",
          priceTitle: "Laser hair removal price list",
          prices: [
            { label: "Small areas", price: "19,90 €" },
            { label: "Medium areas", price: "29,90 €" },
            { label: "Large areas", price: "39,90 €" },
            { label: "4 areas in 1 session", price: "149,00 €" },
            { label: "6 areas in 1 session", price: "219,00 €" },
            { label: "Full body woman", price: "249,00 €" },
            { label: "Full body man", price: "269,00 €" },
          ],
          items: [],
          cta: "Prices & Offers",
        },
        {
          cat: "Face Treatments",
          tag: "Hi-tech skin care",
          chips: ["Women", "Men"],
          desc: "Regenerate, brighten and smooth the skin of your face.",
          items: ["Deep cleansing", "Anti-ageing", "Hydrating and regenerating treatments"],
          cta: "Discover face treatments",
        },
        {
          cat: "Body Treatments",
          tag: "Advanced aesthetics",
          chips: ["Women", "Men"],
          desc: "Your body deserves a tailored plan.",
          items: ["Silhouette reshaping", "Radiofrequency", "Draining and toning protocols"],
          cta: "Discover body treatments",
        },
      ],
    },
    promos: {
      kicker: "OFFERS",
      title: "Current offers at our Varese clinic.",
      cta: "Lock in this offer",
      bonusTitle: "Included in this offer",
      cards: [
        {
          kicker: "OFFER",
          title: "LASER EPIL EXPERIENCE",
          highlight: "TOTAL BODY",
          sub: "WOMEN · 12 SESSIONS",
          priceLabel: "ONLY",
          price: "199€",
          originalPrice: "249€",
          priceNote: "PER SESSION",
          note: "Valid until 31 October",
          savings: "Save €900",
          label: "",
        },
        {
          kicker: "OFFER",
          title: "LASER EPIL EXPERIENCE",
          highlight: "TOTAL BODY",
          sub: "MEN · 12 SESSIONS",
          priceLabel: "ONLY",
          price: "215€",
          originalPrice: "269€",
          priceNote: "PER SESSION",
          note: "Valid until 31 October",
          savings: "Save €975",
          label: "",
        },
        {
          kicker: "OFFER",
          title: "LASER EPIL EXPERIENCE",
          highlight: "6X1",
          sub: "6 AREAS OF YOUR CHOICE · 12 SESSIONS",
          priceLabel: "ONLY",
          price: "175€",
          originalPrice: "239€",
          priceNote: "PER SESSION",
          note: "Valid until 31 October",
          savings: "Save €1150",
          label: "",
        },
        {
          kicker: "OFFER",
          title: "LASER EPIL EXPERIENCE",
          highlight: "4X1",
          sub: "4 AREAS OF YOUR CHOICE · 12 SESSIONS",
          priceLabel: "ONLY",
          price: "119€",
          originalPrice: "159€",
          priceNote: "PER SESSION",
          note: "Valid until 31 October",
          savings: "Save €720",
          label: "",
        },
      ],
      laserBonuses: [
        { label: "Epil digital check-up with 200x skincamera", value: "FREE", sub: "instead of €59" },
        { label: "First full session (on any areas you like)", value: "FREE" },
      ],
      bodyExperience: {
        kicker: "SETA BODY EXPERIENCE OFFER",
        headline: "Start now your next swimsuit test",
        sub: "Shape and sculpt your body all year round with the Open Gold paths.",
        badge: "20 ALL-INCLUSIVE SESSIONS",
        priceLabel: "ONLY",
        price: "89€",
        originalPrice: "159€",
        priceNote: "PER SESSION",
        savings: "Save up to €1400",
        note: "Valid on all exclusive Seta Beauty Clinic biotechnologies",
        techTitle: "INCLUDED TECHNOLOGIES",
        techs: ["Body Sculpt Laser", "BodyShape 360", "BodyTone", "BodyPress Infrared", "BodyTherm"],
        bonuses: [
          { label: "Digital body check-up with BIA and thermography", value: "FREE", originalValue: "€89" },
          { label: "First complete session", value: "FREE" },
        ],
        validity: "Offer valid until 31 October",
        cta: "Lock in this offer",
      },
    },
    bodyPage: {
      backLabel: "Back to home",
      kicker: "ADVANCED AESTHETICS",
      title: "Shape, tone and redesign your silhouette with Advanced Body Aesthetics",
      sub: "Discover our hi-tech reshaping treatments, designed to fight skin imperfections, improve tissue firmness and give you deep, lasting wellbeing.",
      sectionKicker: "ADVANCED AESTHETICS",
      offerLabel: "Free digital check-up + first session for only €39.00",
      cta: "Book now",
      treatments: [
        {
          name: "Bodypress Infrared",
          desc: "A revitalising, detoxifying lymphatic drainage protocol that combines the effectiveness of mechanical pressotherapy with infrared action. Ideal for improving blood and lymphatic circulation, promoting toxin elimination, and visibly reducing water retention, cellulite and leg swelling.",
        },
        {
          name: "Bodytherm",
          desc: "A deep thermal treatment ideal for stimulating perspiration, speeding up metabolism and boosting the slimming effect.",
        },
        {
          name: "Bodytone",
          desc: "Specifically designed to stimulate muscle and skin firmness, helping to redefine and tone key areas of the body.",
        },
        {
          name: "Bodyshape 360",
          desc: "A complete, synergistic approach to 360-degree silhouette reshaping, acting on both fat deposits and firmness.",
        },
        {
          name: "Body Sculpt Laser",
          desc: "Advanced technology for the targeted treatment of localised fat and body reshaping.",
        },
      ],
    },
    facePage: {
      backLabel: "Back to home",
      kicker: "ADVANCED SKINCARE",
      title: "Regenerate, brighten and smooth your skin with Advanced Face Skincare",
      sub: "Discover our hi-tech skincare treatments, designed to counter the signs of time, brighten your complexion and restore firmness and vitality to your skin.",
      sectionKicker: "ADVANCED SKINCARE",
      offerLabel: "Free digital check-up + first session for only €39.00",
      cta: "Book now",
      groups: [
        {
          title: "Advanced Skincare Treatments",
          treatments: [
            { name: "Ultraskin", desc: "Advanced treatment ideal for improving skin structure and restoring firmness." },
            { name: "Hydraface", desc: "Deep cleansing, exfoliation and intense hydration in a single session for instantly radiant skin." },
            { name: "Cryoclean", desc: "Purifying, smoothing action based on cryotherapy to clear pores and refine skin texture." },
            { name: "Skin Peel", desc: "Controlled chemical exfoliation to stimulate cell turnover and fade imperfections." },
            { name: "Face Radiofrequency", desc: "Uses heat to stimulate natural collagen production, smoothing tissue and restoring tone." },
          ],
        },
        {
          title: "Hi-Tech Anti-Ageing Treatments",
          treatments: [
            { name: "Hydraface & Cryotone/Oxyultra", desc: "A combination of deep cleansing and cellular oxygenation to revitalise dull, stressed skin." },
            { name: "Virtual Lifting", desc: "A non-invasive firming treatment to redefine facial contours and counter skin sagging." },
            { name: "Virtual BTX", desc: "Targeted action to smooth expression lines for a relaxed, rested look." },
            { name: "Virtual Biorev", desc: "Needle-free bio-revitalisation to deeply nourish and restore skin firmness." },
            { name: "Virtual Lips Filler", desc: "A plumping treatment to enhance and hydrate lips naturally, without injections." },
          ],
        },
      ],
    },
    laserPage: {
      backLabel: "Back to home",
      kicker: "LASER PLUS",
      title: "Laser Hair Removal Prices & Offers",
      sub: "Safe, personalised diode laser technology for women and men. Discover the prices and all active offers at our Varese clinic.",
      pricesTitle: "Laser hair removal price list",
      promoTitle: "October Offers",
      experienceTitle: "Swimsuit ready",
      skinPromoTitle: "Skin Promo",
    },
    promoForm: {
      title: "Lock in this offer",
      sub: "Or leave your details: we'll call you back within 24h to confirm your offer. No obligation.",
      whatsappCta: "Message us on WhatsApp",
      submit: "Lock in this offer",
      names: {
        "laser-total-donna": "Laser Epil Experience Offer — Total Body Women",
        "laser-total-uomo": "Laser Epil Experience Offer — Total Body Men",
        "laser-6zone": "Laser Epil Experience Offer — 6 areas of your choice",
        "laser-4zone": "Laser Epil Experience Offer — 4 areas of your choice",
        "body-experience": "Seta Body Experience Offer — 20 all-inclusive sessions",
      },
    },
    why: {
      kicker: "WHY SETA",
      title: "Four reasons to choose our method.",
      intro: "Choosing Seta Beauty Varese means choosing an advanced aesthetics journey where science meets personal care.\n\nHere is why our clients get real results:",
      pillars: [
        { n: "01", t: "Diagnosis and the Seta Method", d: "We don't believe in standard treatments. Every journey starts with a free professional check-up to analyse your specific needs and build a personalised action protocol, as unique as you are." },
        { n: "02", t: "Cutting-edge technology", d: "We only use latest-generation devices and tested scientific protocols, to guarantee safe, effective and high-performing sessions at every stage." },
        { n: "03", t: "Highly qualified therapists", d: "Our team is continuously trained on exclusive Seta Beauty protocols. Our expertise is your safety: every treatment is performed with precision and attention to detail." },
        { n: "04", t: "Measurable results", d: "Your wellbeing is our goal. We track your progress session after session, working together to reach the defined objectives and deliver lasting results." },
      ],
    },
    form: {
      aria: "Consultation booking form",
      title: "Let's get in touch",
      sub: "Or leave your details: we'll call you back within 24h to arrange your appointment. No obligation.",
      whatsappCta: "Message us on WhatsApp",
      name: "Full name",
      phone: "Phone",
      email: "Email",
      interestLabel: "I'M INTERESTED IN",
      interests: {
        laser: "Laser Hair Removal (Women - Men)",
        viso: "Face Protocols",
        corpo: "Body Protocols",
      },
      daysLabel: "AVAILABLE DAYS",
      slotsLabel: "TIME SLOTS",
      notesLabel: "NOTES",
      optional: "(optional)",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      slots: ["Morning (9–13)", "Afternoon (13–18)", "Evening (18–20)"],
      notesPlaceholder: "E.g. call me after 5pm, preferred therapist…",
      submit: "Contact me",
      sending: "Sending…",
      submitError: "Sending failed. Please try again or call us directly.",
      privacyPre: "I have read and accept the",
      privacyLink: "privacy policy",
      errors: {
        name: "Please enter your name",
        phone: "Invalid phone number",
        email: "Invalid email",
        privacy: "You must accept the privacy policy",
      },
    },
    booking: {
      kicker: "BOOK",
      title1: "Free",
      title2: "consultation.",
      text: "Skin diagnosis, programme assessment and a personalised quote. No obligation.",
      whatsapp: "WhatsApp · same-day reply",
      overlayTitle: "Book now",
      overlayKicker: "FREE CONSULTATION",
      close: "Close",
    },
    visit: {
      kicker: "FIND US",
      title: "Come and visit us in central Varese.",
      address: "Address",
      hours: "Opening hours",
      hoursValue: "Mon – Wed · 09:00 – 20:00\nThu – Fri · 08:00 – 20:00\nSat · 08:00 – 19:00 · Sun closed",
      phone: "Phone",
      email: "Email",
      maps: "Open in Google Maps →",
      mapTitle: "Seta Beauty Varese map",
    },
    sticky: {
      aria: "Quick actions",
      book: "Request a consultation (free)",
      whatsapp: "Message us",
    },
    footer: {
      treatments: "Treatments",
      promo: "Offers",
      book: "Book now",
      privacy: "Privacy policy",
      cookie: "Cookie policy",
      cookieSettings: "Cookie settings",
      rights: "All rights reserved",
      langLabel: "Language",
    },
  },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Copy }>({
  lang: "it",
  setLang: () => {},
  t: COPY.it,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("it");
  useEffect(() => {
    const stored = window.localStorage.getItem("seta-lang");
    if (stored === "en" || stored === "it") setLangState(stored);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("seta-lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };
  return (
    <LangContext.Provider value={{ lang, setLang, t: COPY[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
