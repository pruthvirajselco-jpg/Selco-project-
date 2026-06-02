'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Menu,
  X,
  Check,
  Sparkles,
  AlertTriangle,
  Compass,
  BookOpen,
  Cpu,
  Users,
  FolderGit,
  Network,
  Award,
  MapPin,
  FileText
} from 'lucide-react';
import Timeline from './Timeline';
import Faq from './Faq';

export default function LandingPageClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle active section tracking and reveal-on-scroll animations
  useEffect(() => {
    // 1. Reveal animations IntersectionObserver
    const revealCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      threshold: 0.08,
      rootMargin: '0px 0px -50px 0px',
    });

    const revealElements = document.querySelectorAll('.reveal-element');
    revealElements.forEach((el) => revealObserver.observe(el));

    // 2. Active section highlights in Navbar
    const navCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const navObserver = new IntersectionObserver(navCallback, {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px',
    });

    const sections = ['why', 'what', 'who', 'timeline', 'faq'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) navObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
      navObserver.disconnect();
    };
  }, []);

  return (
    <div id="home" className="flex flex-col min-h-screen">

      {/* 1. ANNOUNCEMENT BAR (top of page, sticky) */}
      <div className="sticky top-0 z-50 bg-green-primary text-off-white text-[11px] md:text-xs tracking-[0.15em] font-semibold py-3 text-center uppercase border-b border-green-light px-4">
        <span>Applications Open · Deadline: </span>
        <span className="text-beige-light font-bold">June 30, 2026</span>
        <span> · Residency begins August 2026</span>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky top-[42px] z-40 bg-off-white/95 backdrop-blur-md border-b border-grey-border h-16 flex items-center justify-between px-6 md:px-12 transition-all">
        {/* Logo left */}
        <Link href="#home" className="flex flex-col text-left group">
          <span className="font-fraunces font-bold text-xl md:text-2xl text-green-primary tracking-tight leading-none">
            Bamboo NEXT
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-grey-dark mt-1">
            Design Residency · Meghalaya
          </span>
        </Link>

        {/* Center Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 font-dmsans text-sm font-medium">
          <Link
            href="#why"
            className={`hover:text-green-primary transition-colors py-2 ${activeSection === 'why' ? 'text-green-primary font-semibold border-b-2 border-green-primary' : 'text-grey-dark'}`}
          >
            Why This Exists
          </Link>
          <Link
            href="#what"
            className={`hover:text-green-primary transition-colors py-2 ${activeSection === 'what' ? 'text-green-primary font-semibold border-b-2 border-green-primary' : 'text-grey-dark'}`}
          >
            What You'll Do
          </Link>
          <Link
            href="#who"
            className={`hover:text-green-primary transition-colors py-2 ${activeSection === 'who' ? 'text-green-primary font-semibold border-b-2 border-green-primary' : 'text-grey-dark'}`}
          >
            Who Should Apply
          </Link>
          <Link
            href="#timeline"
            className={`hover:text-green-primary transition-colors py-2 ${activeSection === 'timeline' ? 'text-green-primary font-semibold border-b-2 border-green-primary' : 'text-grey-dark'}`}
          >
            Timeline
          </Link>
          <Link
            href="#faq"
            className={`hover:text-green-primary transition-colors py-2 ${activeSection === 'faq' ? 'text-green-primary font-semibold border-b-2 border-green-primary' : 'text-grey-dark'}`}
          >
            FAQ
          </Link>
        </nav>

        {/* Right CTA Button (Desktop) */}
        <div className="hidden lg:block">
          <a
            href="https://forms.gle/pJrUAV2KGf1F4MDeA"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-primary hover:bg-green-mid text-off-white text-xs font-semibold px-6 py-3 rounded-md transition-all tracking-wider uppercase inline-flex items-center gap-2 border border-green-light shadow-sm"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-charcoal hover:text-green-primary focus:outline-none transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[106px] bg-off-white z-35 flex flex-col p-8 border-t border-grey-border lg:hidden animate-fade-in">
          <nav className="flex flex-col gap-6 font-dmsans text-lg font-semibold mb-8">
            <Link
              href="#why"
              onClick={() => setMobileMenuOpen(false)}
              className="text-grey-dark hover:text-green-primary transition-colors"
            >
              Why This Exists
            </Link>
            <Link
              href="#what"
              onClick={() => setMobileMenuOpen(false)}
              className="text-grey-dark hover:text-green-primary transition-colors"
            >
              What You'll Do
            </Link>
            <Link
              href="#who"
              onClick={() => setMobileMenuOpen(false)}
              className="text-grey-dark hover:text-green-primary transition-colors"
            >
              Who Should Apply
            </Link>
            <Link
              href="#timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="text-grey-dark hover:text-green-primary transition-colors"
            >
              Timeline
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-grey-dark hover:text-green-primary transition-colors"
            >
              FAQ
            </Link>
          </nav>
          <a
            href="https://forms.gle/pJrUAV2KGf1F4MDeA"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full bg-green-primary text-off-white font-semibold py-4 rounded-md text-center tracking-wider uppercase border border-green-light shadow"
          >
            Apply Now
          </a>
        </div>
      )}

      {/* 3. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-106px)] flex items-center py-16 bg-off-white overflow-hidden border-b border-grey-border">
        {/* Layout container */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">

          {/* Left Column (60%) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left reveal-element animate-fade-up">

            {/* Pulsing Tag */}
            <div className="inline-flex items-center gap-2 border border-green-light px-3 py-1 rounded-full text-xs font-semibold text-green-primary bg-sage-pale/40 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-light animate-ping" />
              <span>Applications Open — 15 Cohort Seats</span>
            </div>

            {/* Immersive Badge Pill */}
            <div className="inline-block border border-green-primary px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest text-green-primary bg-transparent mb-6 uppercase">
              • Full-time Residential Immersion • Meghalaya • 6 Months • Indian Nationals Only
            </div>

            {/* Main Headline */}
            <h1 className="font-fraunces font-bold text-4xl sm:text-5xl md:text-[68px] leading-[1.08] tracking-tight text-charcoal mb-6">
              Meghalaya has <br className="hidden md:inline" />
              the <span className="text-green-primary italic font-normal">bamboo.</span> <br />
              Now we need <br className="hidden md:inline" />
              the <span className="text-green-primary italic font-normal">designs.</span>
            </h1>

            {/* Subtitle */}
            <p className="font-dmsans text-base md:text-lg text-grey-dark max-w-xl mb-8 leading-relaxed">
              A 6-month immersive residency where designers, architects, engineers, and makers work alongside bamboo artisans and enterprises in Meghalaya. 15 residents. Real work. Real impact.
            </p>

            {/* Warning Callout Box */}
            <div className="flex gap-4 p-5 bg-green-primary text-off-white rounded-xl mb-8 border border-green-light shadow-sm max-w-xl">
              <AlertTriangle className="w-5 h-5 text-beige-light shrink-0 mt-0.5" />
              <div className="text-sm font-dmsans">
                <span className="font-bold text-beige-light block mb-1">This is not a remote fellowship.</span>
                Selected residents will live and work full-time in Meghalaya from August 2026 to February 2027. Shared accommodation, local travel, and material support provided.
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a
                href="https://forms.gle/pJrUAV2KGf1F4MDeA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-green-primary hover:bg-green-mid text-off-white font-semibold px-8 py-4 rounded-md transition-all tracking-wider uppercase text-center inline-flex items-center justify-center gap-2 border border-green-light shadow-md"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="#why"
                className="w-full sm:w-auto border border-grey-mid hover:border-green-primary text-charcoal hover:bg-cream/40 font-semibold px-8 py-4 rounded-md transition-all tracking-wider uppercase text-center"
              >
                See the Programme
              </Link>
            </div>
          </div>

          {/* Right Column (40%) - Premium graphic pavilion render */}
          <div className="lg:col-span-5 relative w-full h-[400px] md:h-[520px] rounded-2xl overflow-hidden border border-grey-border shadow-lg bg-green-primary flex flex-col justify-between p-8 reveal-element">

            {/* SVG decorative grid lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F7F4EF" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Immersive generated Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/bamboo-structure.png"
                alt="Organic bamboo structure in a misty Meghalaya jungle"
                fill
                priority
                className="object-cover object-center opacity-85 hover:scale-105 transition-transform duration-1000"
              />
              {/* Gradient layer for text overlay readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            </div>

            {/* Stat Pill Glass Overlay */}
            <div className="relative z-10 flex justify-end">
              <span className="text-[10px] uppercase font-bold tracking-[0.15em] px-3 py-1 rounded bg-black/45 backdrop-blur-md text-beige-light border border-white/10">
                Design Focus: Structural Systems
              </span>
            </div>

            {/* Group of Stat Pills (glass style) */}
            <div className="relative z-10 grid grid-cols-3 gap-2">
              <div className="bg-black/40 backdrop-blur-md border border-white/15 p-4 rounded-xl text-center">
                <div className="font-fraunces font-bold text-2xl md:text-3xl text-beige-light">15</div>
                <div className="text-[9px] uppercase tracking-wider text-off-white/80 mt-1">Design residents selected nationally</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/15 p-4 rounded-xl text-center">
                <div className="font-fraunces font-bold text-2xl md:text-3xl text-beige-light">6</div>
                <div className="text-[9px] uppercase tracking-wider text-off-white/80 mt-1">Months of full-time field immersion in Meghalaya</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/15 p-4 rounded-xl text-center">
                <div className="font-fraunces font-bold text-xl md:text-2xl text-beige-light">40+</div>
                <div className="text-[9px] uppercase tracking-wider text-off-white/80 mt-1">Bamboo species native to Meghalaya</div>
              </div>
            </div>

            {/* Bottom context citation */}
            <div className="relative z-10 flex flex-col text-left">
              <span className="text-[10px] text-off-white/70 uppercase tracking-widest font-semibold">COHORT CYCLE 2026–2027</span>
              <span className="text-xs font-fraunces italic text-beige-light mt-1">
                A programme of Meghalaya Bamboo Mission · Prime Meghalaya · Government of Meghalaya
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATS STRIP (full-width dark bar) */}
      <section className="bg-charcoal text-off-white border-b border-green-light py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-grey-dark/40">
            <div className="pt-4 md:pt-0">
              <span className="text-xs uppercase tracking-widest text-grey-mid block font-semibold mb-1">Starts</span>
              <div className="font-fraunces font-bold text-2xl md:text-3xl text-beige-light">Aug</div>
              <p className="font-dmsans text-[11px] text-grey-mid mt-1">2026 — Foundation Lab begins in Meghalaya</p>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="text-xs uppercase tracking-widest text-grey-mid block font-semibold mb-1">Seats</span>
              <div className="font-fraunces font-bold text-2xl md:text-3xl text-beige-light">15</div>
              <p className="font-dmsans text-[11px] text-grey-mid mt-1">Designers, architects & engineers selected</p>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="text-xs uppercase tracking-widest text-grey-mid block font-semibold mb-1">Duration</span>
              <div className="font-fraunces font-bold text-2xl md:text-3xl text-beige-light">6</div>
              <p className="font-dmsans text-[11px] text-grey-mid mt-1">Months of residential field immersion</p>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="text-xs uppercase tracking-widest text-grey-mid block font-semibold mb-1">Deadline</span>
              <div className="font-fraunces font-bold text-2xl md:text-3xl text-beige-light">Jun 30</div>
              <p className="font-dmsans text-[11px] text-grey-mid mt-1">2026 — Application closes</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY THIS EXISTS */}
      <section id="why" className="py-24 bg-cream border-b border-grey-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col text-left items-start reveal-element">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage bg-sage-pale px-3 py-1 rounded-full mb-4">
              Why this exists
            </span>
            <h2 className="font-fraunces font-bold text-3xl md:text-5xl text-charcoal mt-2 mb-6 leading-tight">
              The material is here. <br />
              The design <span className="text-green-primary italic font-normal">hasn't arrived yet.</span>
            </h2>
            <div className="font-dmsans text-base text-grey-dark space-y-6 leading-relaxed mb-8">
              <p>
                Meghalaya is one of India's richest bamboo landscapes — over 40 species, deep artisanal knowledge, an existing construction culture. Yet the products, markets, and margins have stayed largely unchanged for years.
              </p>
              <p>
                The challenge is not a lack of skill or material. It is the absence of sustained access to design thinking, innovation, and market-oriented product development.
              </p>
            </div>

            {/* Large Stat Pill */}
            <div className="bg-off-white/80 p-6 rounded-2xl border border-grey-border shadow-sm flex items-center gap-6 mb-8 w-full max-w-md">
              <span className="font-fraunces font-black text-4xl md:text-5xl text-green-primary">84.5%</span>
              <div className="font-dmsans text-xs text-grey-dark leading-tight uppercase tracking-wider">
                <span className="font-bold text-charcoal block text-sm mb-1">Used in Construction</span>
                of harvested bamboo is used in construction — but mostly untreated, low-engineered, temporary structures.
              </div>
            </div>

            {/* Quote block */}
            <div className="p-6 bg-off-white rounded-xl border-l-4 border-green-primary shadow-sm w-full">
              <p className="font-fraunces italic text-base md:text-lg text-charcoal leading-relaxed">
                "One good design can increase household income across an entire district — with no intermediary."
              </p>
              <span className="font-dmsans text-xs font-semibold text-grey-dark block mt-3 uppercase tracking-wider">
                — Bamboo NEXT Concept Note
              </span>
            </div>
          </div>

          {/* Right Column (2x3 grid of cards + workspace image) */}
          <div className="lg:col-span-6 flex flex-col gap-8 reveal-element">

            {/* 6 grid cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-off-white p-6 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
                <span className="text-2xl mb-3" role="img" aria-label="pencil">✏️</span>
                <h3 className="font-fraunces font-bold text-lg text-charcoal mb-2">Design Access</h3>
                <p className="font-dmsans text-xs text-grey-dark leading-relaxed">
                  Bamboo makers have strong production skills but limited access to designers, architects, and engineers for contemporary product development.
                </p>
              </div>
              <div className="bg-off-white p-6 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
                <span className="text-2xl mb-3" role="img" aria-label="leaf">🌿</span>
                <h3 className="font-fraunces font-bold text-lg text-charcoal mb-2">Climate-Smart Markets</h3>
                <p className="font-dmsans text-xs text-grey-dark leading-relaxed">
                  Design-led innovation can unlock high-value markets in sustainable construction, hospitality, and retail.
                </p>
              </div>
              <div className="bg-off-white p-6 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
                <span className="text-2xl mb-3" role="img" aria-label="scroll">📜</span>
                <h3 className="font-fraunces font-bold text-lg text-charcoal mb-2">Preservation of Knowledge</h3>
                <p className="font-dmsans text-xs text-grey-dark leading-relaxed">
                  Generational bamboo craft knowledge remains largely undocumented and risks being lost forever.
                </p>
              </div>
              <div className="bg-off-white p-6 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
                <span className="text-2xl mb-3" role="img" aria-label="construction crane">🏗️</span>
                <h3 className="font-fraunces font-bold text-lg text-charcoal mb-2">Resilient Construction</h3>
                <p className="font-dmsans text-xs text-grey-dark leading-relaxed">
                  Bamboo systems offer low-carbon alternatives to steel and cement — enabling localised, adaptable construction ecosystems.
                </p>
              </div>
              <div className="bg-off-white p-6 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
                <span className="text-2xl mb-3" role="img" aria-label="sprout">🌱</span>
                <h3 className="font-fraunces font-bold text-lg text-charcoal mb-2">Green Livelihoods</h3>
                <p className="font-dmsans text-xs text-grey-dark leading-relaxed">
                  The bamboo economy can generate livelihoods across harvesting, treatment, fabrication, construction, and design.
                </p>
              </div>
              <div className="bg-off-white p-6 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
                <span className="text-2xl mb-3" role="img" aria-label="mountain">🏔️</span>
                <h3 className="font-fraunces font-bold text-lg text-charcoal mb-2">Place-Based Development</h3>
                <p className="font-dmsans text-xs text-grey-dark leading-relaxed">
                  Design rooted in Meghalaya's identity and ecology — locally sourced materials, regional craftsmanship, cultural context.
                </p>
              </div>
            </div>

            {/* Immersive Making Workspace Image */}
            <div className="relative w-full h-[240px] rounded-2xl overflow-hidden border border-grey-border shadow">
              <Image
                src="/images/bamboo-workspace.png"
                alt="Workspace with technical bamboo details and drawings"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
              <div className="absolute bottom-6 left-6 text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-beige-light block mb-1">
                  TACTILE EXPERIMENTATION
                </span>
                <span className="font-fraunces italic text-sm text-off-white">
                  Bridging traditional material science with architectural drafting
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="py-24 bg-off-white border-b border-grey-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">

          <div className="mb-16 reveal-element">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage bg-sage-pale px-3 py-1 rounded-full">
              How the residency works
            </span>
            <h2 className="font-fraunces font-bold text-3xl md:text-5xl text-charcoal mt-4 mb-6 leading-tight">
              Four pillars. <span className="text-green-primary italic font-normal">One shared ambition.</span>
            </h2>
            <p className="font-dmsans text-grey-dark max-w-2xl mx-auto text-base">
              Every element of the programme is built around making, not classroom lecturing. Real enterprises. Real materials. Real outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">

            {/* Card 1 */}
            <div className="bg-off-white p-8 rounded-2xl border border-grey-border shadow-sm flex flex-col relative overflow-hidden group hover:border-green-primary transition-all border-l-4 border-l-green-primary">
              <span className="absolute top-6 right-8 font-fraunces font-bold text-5xl text-sage-pale/40 group-hover:text-sage-pale transition-colors duration-300 pointer-events-none">
                01
              </span>
              <h3 className="font-fraunces font-bold text-xl text-charcoal mb-4 flex items-center gap-3">
                <Compass className="w-5 h-5 text-green-primary" />
                Field Immersion
              </h3>
              <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
                Residents work directly with bamboo enterprises, artisan clusters, and practitioners across Meghalaya through the Meghalaya Bamboo Mission network. <strong>You will spend significant time in remote field locations and rural bamboo clusters.</strong>
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-off-white p-8 rounded-2xl border border-grey-border shadow-sm flex flex-col relative overflow-hidden group hover:border-green-primary transition-all border-l-4 border-l-green-primary">
              <span className="absolute top-6 right-8 font-fraunces font-bold text-5xl text-sage-pale/40 group-hover:text-sage-pale transition-colors duration-300 pointer-events-none">
                02
              </span>
              <h3 className="font-fraunces font-bold text-xl text-charcoal mb-4 flex items-center gap-3">
                <Users className="w-5 h-5 text-green-primary" />
                Collaborative Prototyping & Mentorship
              </h3>
              <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
                Ideas are collectively built, tested, and refined through hands-on experimentation — supported by foundational mentorship and ongoing guidance from practitioners, led by Mr Sanjeev Karpe and anchored by SELCO Foundation.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-off-white p-8 rounded-2xl border border-grey-border shadow-sm flex flex-col relative overflow-hidden group hover:border-green-primary transition-all border-l-4 border-l-green-primary">
              <span className="absolute top-6 right-8 font-fraunces font-bold text-5xl text-sage-pale/40 group-hover:text-sage-pale transition-colors duration-300 pointer-events-none">
                03
              </span>
              <h3 className="font-fraunces font-bold text-xl text-charcoal mb-4 flex items-center gap-3">
                <Cpu className="w-5 h-5 text-green-primary" />
                Context-Based Learning
              </h3>
              <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
                Residents engage directly with local material systems, production practices, and cultural knowledge embedded within Meghalaya's bamboo ecosystem. This is not a classroom simulation.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-off-white p-8 rounded-2xl border border-grey-border shadow-sm flex flex-col relative overflow-hidden group hover:border-green-primary transition-all border-l-4 border-l-green-primary">
              <span className="absolute top-6 right-8 font-fraunces font-bold text-5xl text-sage-pale/40 group-hover:text-sage-pale transition-colors duration-300 pointer-events-none">
                04
              </span>
              <h3 className="font-fraunces font-bold text-xl text-charcoal mb-4 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-green-primary" />
                Open Knowledge & Shared Outcomes
              </h3>
              <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
                All prototypes, processes, and learnings contribute to an open-source design catalogue — drawings, making guides, material specs, cost estimates — accessible to makers, craftspeople, and communities everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHAT YOU'LL DO */}
      <section id="what" className="py-24 bg-green-primary text-off-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">

          <div className="mb-16 reveal-element">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-light bg-green-light border border-sage-light/20 px-3 py-1 rounded-full">
              What you'll actually do
            </span>
            <h2 className="font-fraunces font-bold text-3xl md:text-5xl text-off-white mt-4 mb-6 leading-tight">
              Not a classroom simulation. <br />
              Real systems. <span className="text-beige-light italic font-normal">Real enterprises.</span>
            </h2>
            <p className="font-dmsans text-off-white/80 max-w-2xl text-base">
              From sketches to structures. You'll build things that actually get used.
            </p>

            {/* Warning Callout Box */}
            <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-xl mt-8 max-w-3xl">
              <span className="text-xl shrink-0 mt-0.5" role="img" aria-label="flag">⚑</span>
              <p className="text-sm font-dmsans text-off-white/90">
                This is a full-time, physically demanding residency. You will work on real systems with real enterprises — prototyping, building, documenting, and collaborating on-ground in Meghalaya for 6 months.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-beige-light/40 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-beige-light block mb-3">WEEK 1–4</span>
                <h3 className="font-fraunces font-bold text-xl text-off-white mb-3">Foundation Lab</h3>
                <p className="font-dmsans text-xs text-off-white/70 leading-relaxed">
                  Residential orientation in Meghalaya. Bamboo as material system. Species, treatment, fabrication basics. Forming teams. Meeting the ecosystem.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-beige-light/40 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-beige-light block mb-3">MONTH 2–5</span>
                <h3 className="font-fraunces font-bold text-xl text-off-white mb-3">Field Immersion & Cluster Work</h3>
                <p className="font-dmsans text-xs text-off-white/70 leading-relaxed">
                  Embedded with bamboo enterprises and artisan clusters. Designing alongside makers. Working with real production constraints, real clients, real markets.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-beige-light/40 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-beige-light block mb-3">THROUGHOUT</span>
                <h3 className="font-fraunces font-bold text-xl text-off-white mb-3">Hands-on Prototyping</h3>
                <p className="font-dmsans text-xs text-off-white/70 leading-relaxed">
                  Build furniture, structures, products, and craft applications. Iterate fast. Fabricate with bamboo artisans. Test in real conditions.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-beige-light/40 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-beige-light block mb-3">DELIVERABLES</span>
                <h3 className="font-fraunces font-bold text-xl text-off-white mb-3">Real Design Outputs</h3>
                <p className="font-dmsans text-xs text-off-white/70 leading-relaxed">
                  Livelihood units, furniture prototypes, interior applications, craft designs. Not speculative renders — things that can be built and replicated across India.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-beige-light/40 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-beige-light block mb-3">ONGOING</span>
                <h3 className="font-fraunces font-bold text-xl text-off-white mb-3">Mentorship & Reviews</h3>
                <p className="font-dmsans text-xs text-off-white/70 leading-relaxed">
                  Regular sessions with practitioners, technical experts, and industry partners. A mid-review in December. A public design showcase in February 2027.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-beige-light/40 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-beige-light block mb-3">LEGACY</span>
                <h3 className="font-fraunces font-bold text-xl text-off-white mb-3">Open-Source Documentation</h3>
                <p className="font-dmsans text-xs text-off-white/70 leading-relaxed">
                  Production drawings, making guides, Bill of Materials, photography. Published openly. Bamboo makers anywhere can find a design and build it.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. WHO SHOULD APPLY */}
      <section id="who" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">

          <div className="mb-16 reveal-element">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage bg-sage-pale px-3 py-1 rounded-full">
              Who this is for
            </span>
            <h2 className="font-fraunces font-bold text-3xl md:text-5xl text-charcoal mt-4 mb-6 leading-tight">
              Designers, architects, engineers — <br />
              <span className="text-green-primary italic font-normal">working alongside Meghalaya's makers.</span>
            </h2>
            <p className="font-dmsans text-grey-dark max-w-2xl text-base mb-6">
              Prior bamboo or making experience is required. We look for creative or technical depth, a genuine curiosity about materials, and the resilience to thrive in a demanding field environment.
            </p>

            {/* Note box */}
            <div className="inline-flex items-center gap-3 border border-green-primary/30 p-3 rounded-lg text-xs font-semibold text-green-primary bg-off-white max-w-2xl">
              <span className="text-base" role="img" aria-label="warning icon">⚑</span>
              <span>We are specifically looking for candidates willing to relocate to and work from Meghalaya for the full duration of the residency. Prior hands-on experience in design, architecture, engineering, or making is required.</span>
            </div>
          </div>

          {/* 6 Discipline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 reveal-element">

            {/* Card 1 */}
            <div className="bg-off-white p-8 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
              <div className="text-3xl mb-4" role="img" aria-label="set square">📐</div>
              <h3 className="font-fraunces font-bold text-xl text-charcoal mb-1">Architects</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage mb-3">Built Work</span>
              <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
                Spatial thinkers who want to design and build structures that are actually constructed — in bamboo, in the field, with local builders.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-off-white p-8 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
              <div className="text-3xl mb-4" role="img" aria-label="chair">🪑</div>
              <h3 className="font-fraunces font-bold text-xl text-charcoal mb-1">Product & Furniture Designers</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage mb-3">Market-Ready</span>
              <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
                Designers ready to develop furniture and products that are market-ready, replicable, and made by hand alongside Meghalaya's artisans.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-off-white p-8 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
              <div className="text-3xl mb-4" role="img" aria-label="gear">⚙️</div>
              <h3 className="font-fraunces font-bold text-xl text-charcoal mb-1">Civil & Structural Engineers</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage mb-3">Technical Depth</span>
              <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
                Engineers who want to apply technical skills to real-world bamboo construction — joints, structures, standards, load-bearing systems.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-off-white p-8 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
              <div className="text-3xl mb-4" role="img" aria-label="hammer">🔨</div>
              <h3 className="font-fraunces font-bold text-xl text-charcoal mb-1">Makers & Builders</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage mb-3">Hands-On</span>
              <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
                People who love to build things with their hands — fabricators, craft practitioners, material experimenters who are comfortable in workshop settings.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-off-white p-8 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
              <div className="text-3xl mb-4" role="img" aria-label="recycle">♻️</div>
              <h3 className="font-fraunces font-bold text-xl text-charcoal mb-1">Sustainability Practitioners</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage mb-3">Climate Focus</span>
              <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
                Those working at the intersection of materials, climate, and community — ready to embed design in the real economy of a place.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-off-white p-8 rounded-2xl border border-grey-border shadow-sm flex flex-col text-left hover:border-green-primary transition-all">
              <div className="text-3xl mb-4" role="img" aria-label="graduation cap">🎓</div>
              <h3 className="font-fraunces font-bold text-xl text-charcoal mb-1">Advanced Students</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage mb-3">Emerging Talent</span>
              <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
                Final-year or recently graduated students from design, architecture, and engineering disciplines across India — with strong portfolio and creative ambition.
              </p>
            </div>

          </div>

          {/* Dark requirements block */}
          <div className="bg-charcoal text-off-white rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal-element">
            <div className="lg:col-span-5 text-left">
              <h3 className="font-fraunces font-bold text-2xl md:text-3xl text-beige-light leading-snug">
                The one non-negotiable <br />
                <span className="italic font-normal text-off-white">requirement</span>
              </h3>
              <p className="font-dmsans text-xs text-grey-mid mt-4 max-w-sm">
                This programme demands full commitment. It is not a remote experience, a short workshop, or a side project. It is a life-changing 6 months.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <ul className="space-y-3 font-dmsans text-xs md:text-sm text-off-white/95">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-beige-accent shrink-0 mt-0.5" />
                  <span>Willing to live in Meghalaya for approximately 6 months</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-beige-accent shrink-0 mt-0.5" />
                  <span>Comfortable working in remote locations and bamboo clusters</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-beige-accent shrink-0 mt-0.5" />
                  <span>Ready for physically demanding prototyping and build work</span>
                </li>
              </ul>
              <ul className="space-y-3 font-dmsans text-xs md:text-sm text-off-white/95">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-beige-accent shrink-0 mt-0.5" />
                  <span>Open to learning from artisans, fabricators, and enterprise ecosystems</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-beige-accent shrink-0 mt-0.5" />
                  <span>Committed to open-source documentation and collective outcomes</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 9. WHAT PARTICIPANTS GAIN (Bento Grid) */}
      <section className="py-24 bg-off-white border-b border-grey-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">

          <div className="mb-16 reveal-element">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage bg-sage-pale px-3 py-1 rounded-full">
              What participants gain
            </span>
            <h2 className="font-fraunces font-bold text-3xl md:text-5xl text-charcoal mt-4 mb-6 leading-tight">
              Not another speculative <br />
              <span className="text-green-primary italic font-normal">studio project. From sketches to structures.</span>
            </h2>
          </div>

          {/* Bento grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 reveal-element">

            {/* 1. Real Field Experience (spans 4 columns, green bg) */}
            <div className="bg-green-primary text-off-white p-8 rounded-3xl md:col-span-4 flex flex-col justify-between border border-green-light shadow-md min-h-[280px] relative overflow-hidden group">
              <Sparkles className="w-24 h-24 text-green-light/20 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[10px] font-bold tracking-widest text-beige-light uppercase bg-white/10 px-2.5 py-1 rounded">
                  🌏 Real Field Experience
                </span>
                <h3 className="font-fraunces font-bold text-2xl md:text-3xl text-off-white mt-6 mb-4 max-w-lg leading-tight">
                  Six months of embedded, on-ground work with bamboo enterprises and artisans across Meghalaya.
                </h3>
              </div>
              <p className="text-xs text-off-white/80 max-w-md relative z-10 leading-relaxed mb-4">
                This is the portfolio-defining work that studio time cannot replicate. You will work on real systems with real enterprises — and everything you build will be documented and published openly.
              </p>
              <div className="relative z-10 border-t border-white/15 pt-4 text-[11px] font-semibold text-beige-light flex flex-wrap gap-2 items-center">
                <span>Also includes:</span>
                <span className="bg-white/10 px-2 py-0.5 rounded">Shared accommodation</span>
                <span className="bg-white/10 px-2 py-0.5 rounded">Material access</span>
                <span className="bg-white/10 px-2 py-0.5 rounded">Tool ecosystem</span>
                <span className="bg-white/10 px-2 py-0.5 rounded">Enterprise exposure</span>
                <span className="bg-white/10 px-2 py-0.5 rounded">Mentorship</span>
              </div>
            </div>

            {/* 2. Climate Design Learning */}
            <div className="bg-cream p-6 rounded-3xl md:col-span-2 flex flex-col justify-between border border-grey-border shadow-sm min-h-[280px]">
              <span className="text-3xl mb-4" role="img" aria-label="books">📚</span>
              <div>
                <h4 className="font-fraunces font-bold text-lg text-charcoal mb-2">Climate Design Learning</h4>
                <p className="font-dmsans text-xs text-grey-dark leading-relaxed">
                  Understand bamboo as a full material system — species, harvesting, treatment, fabrication, joinery, construction, and lifecycle. Skills you cannot learn in a classroom.
                </p>
              </div>
            </div>

            {/* 3. Collaborative Ecosystem */}
            <div className="bg-cream p-6 rounded-3xl md:col-span-2 flex flex-col justify-between border border-grey-border shadow-sm min-h-[220px]">
              <span className="text-3xl mb-4" role="img" aria-label="handshake">🤝</span>
              <div>
                <h4 className="font-fraunces font-bold text-lg text-charcoal mb-2">Collaborative Ecosystem</h4>
                <p className="font-dmsans text-xs text-grey-dark leading-relaxed">
                  Work with 14 other designers, architects, and engineers from across India — plus artisans, enterprise owners, and national mentors. A network that lasts.
                </p>
              </div>
            </div>

            {/* 4. Built Work in Your Portfolio */}
            <div className="bg-cream p-6 rounded-3xl md:col-span-2 flex flex-col justify-between border border-grey-border shadow-sm min-h-[220px]">
              <span className="text-3xl mb-4" role="img" aria-label="construction crane">🏗️</span>
              <div>
                <h4 className="font-fraunces font-bold text-lg text-charcoal mb-2">Built Work in Your Portfolio</h4>
                <p className="font-dmsans text-xs text-grey-dark leading-relaxed">
                  Designs that are fabricated, documented, and published. Not renders. Not concepts. Things you can say you actually built.
                </p>
              </div>
            </div>

            {/* 5. What Comes After */}
            <div className="bg-cream p-6 rounded-3xl md:col-span-2 flex flex-col justify-between border border-grey-border shadow-sm min-h-[220px]">
              <span className="text-3xl mb-4" role="img" aria-label="rocket">🚀</span>
              <div>
                <h4 className="font-fraunces font-bold text-lg text-charcoal mb-2">What Comes After</h4>
                <p className="font-dmsans text-xs text-grey-dark leading-relaxed">
                  Alumni may launch practices, co-found enterprises, collaborate with institutional partners, or contribute to bamboo construction projects across India and beyond.
                </p>
              </div>
            </div>

            {/* 6. Artisan Quote Card (Spans full width) */}
            <div className="bg-charcoal text-off-white p-8 rounded-3xl md:col-span-6 flex flex-col md:flex-row gap-8 items-center justify-between border border-grey-dark/20 shadow-md">
              <div className="max-w-2xl text-left">
                <blockquote className="font-fraunces italic text-lg md:text-xl text-beige-light leading-relaxed">
                  "A furniture maker in Ri Bhoi finds a joinery developed during the residency, follows the step-by-step guide, and produces it at 4x her previous price point. That's one good design increasing household income across an entire district — with no intermediary."
                </blockquote>
                <cite className="font-dmsans text-xs text-grey-mid block mt-3 uppercase tracking-wider not-italic font-bold">
                  — From the Bamboo NEXT Concept Note
                </cite>
              </div>
              <div className="shrink-0 flex items-center justify-center w-20 h-20 bg-green-primary rounded-full text-off-white text-3xl shadow">
                🎋
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. TIMELINE SECTION */}
      <Timeline />

      {/* 11. FAQ SECTION */}
      <Faq />

      {/* 12. FINAL CTA SECTION */}
      <section className="bg-green-primary text-off-white py-24 text-center border-t border-green-light relative overflow-hidden">

        {/* SVG Decorative Bamboo Graphic */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-center items-center">
          <svg width="600" height="600" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,0 Q60,50 50,100 M20,0 Q30,50 20,100 M80,0 Q90,50 80,100" stroke="#F7F4EF" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-beige-light block mb-4">
            APPLICATIONS OPEN — JUNE 30 DEADLINE
          </span>
          <h2 className="font-fraunces font-bold text-4xl md:text-7xl text-off-white mb-6 leading-tight">
            Design the future <br />
            of <span className="text-beige-light italic font-normal">bamboo.</span>
          </h2>
          <p className="font-dmsans text-off-white/85 max-w-xl mx-auto text-base md:text-lg mb-10 leading-relaxed">
            15 seats. 6 months. One of India's most extraordinary material landscapes. Shared Cohort Accommodation + Production Support provided. This is not a remote fellowship.
          </p>

          <div className="inline-block bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold tracking-wider text-beige-light mb-10 uppercase">
            ⚑ Full-time Residential Immersion · Meghalaya · August 2026
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://forms.gle/pJrUAV2KGf1F4MDeA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-beige-accent hover:bg-beige-light text-charcoal font-semibold px-8 py-4 rounded-md transition-all tracking-wider uppercase shadow-md text-center inline-flex items-center justify-center gap-2 border border-beige-light/20"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="#timeline"
              className="w-full sm:w-auto border border-white/30 hover:border-white text-off-white hover:bg-white/5 font-semibold px-8 py-4 rounded-md transition-all tracking-wider uppercase text-center"
            >
              See the Timeline
            </Link>
          </div>

          <p className="font-dmsans text-xs text-off-white/70 mt-6 tracking-wide">
            Application deadline: June 30, 2026 · Residency begins: August 2026
          </p>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-charcoal text-off-white pt-20 pb-10 border-t border-grey-dark/20 font-dmsans">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-16">

          {/* Brand Column */}
          <div className="md:col-span-1 flex flex-col items-start">
            <span className="font-fraunces font-bold text-2xl text-beige-light tracking-tight leading-none">
              Bamboo NEXT
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-grey-mid mt-1 block">
              Design Residency · Meghalaya
            </span>
            <p className="text-xs text-grey-mid mt-4 leading-relaxed max-w-xs">
              Reimagining climate design systems and artisan production pathways in the heart of Meghalaya.
            </p>
            <span className="text-[10px] font-fraunces italic text-beige-light/80 mt-6 leading-relaxed block">
              A programme of Meghalaya Bamboo Mission · Prime Meghalaya · Government of Meghalaya · Anchored by SELCO Foundation
            </span>
          </div>

          {/* Programme Links */}
          <div className="md:col-span-1">
            <h4 className="font-fraunces font-bold text-lg text-off-white mb-6">Programme</h4>
            <ul className="space-y-3 text-xs md:text-sm text-grey-mid">
              <li><Link href="#why" className="hover:text-beige-light transition-colors">Why This Exists</Link></li>
              <li><Link href="#what" className="hover:text-beige-light transition-colors">What You'll Do</Link></li>
              <li><Link href="#who" className="hover:text-beige-light transition-colors">Who Should Apply</Link></li>
              <li><Link href="#timeline" className="hover:text-beige-light transition-colors">Timeline</Link></li>
              <li><Link href="#faq" className="hover:text-beige-light transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Apply Links */}
          <div className="md:col-span-1">
            <h4 className="font-fraunces font-bold text-lg text-off-white mb-6">Application</h4>
            <ul className="space-y-3 text-xs md:text-sm text-grey-mid">
              <li><a href="https://forms.gle/pJrUAV2KGf1F4MDeA" target="_blank" rel="noopener noreferrer" className="hover:text-beige-light transition-colors font-semibold text-beige-light flex items-center gap-1.5"><FileText className="w-4 h-4" /> Application Form</a></li>
              <li><a href="#" className="hover:text-beige-light transition-colors">Download Residency Brief (PDF)</a></li>
              <li><a href="#" className="hover:text-beige-light transition-colors">Contact Selection Team</a></li>
            </ul>
          </div>

          {/* Admin Dash link */}
          <div className="md:col-span-1">
            <h4 className="font-fraunces font-bold text-lg text-off-white mb-6">Portals</h4>
            <ul className="space-y-3 text-xs md:text-sm text-grey-mid">
              <li><Link href="/admin" className="hover:text-beige-light transition-colors flex items-center gap-1.5">🔑 Admin Dashboard Gate</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-grey-dark/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-grey-mid">
          <span>
            © 2026 Bamboo NEXT Design Residency – Meghalaya Chapter. All Rights Reserved.
          </span>
          <span className="tracking-wide">
            Deadline: June 30, 2026 · Starts: August 2026
          </span>
        </div>
      </footer>

    </div>
  );
}
