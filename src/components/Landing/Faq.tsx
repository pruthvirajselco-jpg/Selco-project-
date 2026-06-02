'use client';

import React from 'react';
import { Accordion } from '../ui/Accordion';

const faqItems = [
  {
    question: 'Is this residency residential? Can I participate remotely?',
    answer: 'No. Remote participation is not possible. This is a full-time residential programme. Selected residents will live in Meghalaya for approximately 6 months (August 2026 – February 2027), working directly with bamboo enterprises, artisan clusters, and fabricators. The entire value of the programme depends on physical presence.',
  },
  {
    question: 'Do I need prior bamboo experience?',
    answer: 'Prior practice experience is required. We are looking for designers, architects, and engineers who already have a strong foundation in their discipline. Specific bamboo knowledge is not needed, but a demonstrable practice and portfolio is essential.',
  },
  {
    question: 'Who can apply?',
    answer: 'Open exclusively to Indian nationals — practitioners and advanced students from across India, including recent graduates in design, architecture, engineering, craft, and related disciplines. International applicants are not eligible.',
  },
  {
    question: 'Is financial support provided? What about accommodation?',
    answer: 'Yes. A monthly stipend of ₹70,000, shared accommodation, and material access are provided for selected residents. Full details will be shared with shortlisted applicants.',
  },
  {
    question: 'What kind of field work is involved?',
    answer: 'Residents will work embedded in bamboo enterprise clusters across Meghalaya — travelling to rural locations, spending time in workshops and fabrication sites, collaborating directly with artisans and enterprise owners. Physically demanding and hands-on.',
  },
  {
    question: 'How intensive is the programme?',
    answer: 'Very. Full-time commitment for 6 months. You cannot maintain other employment or projects during the residency.',
  },
  {
    question: 'What happens to the designs created?',
    answer: 'All residency outputs are documented and published openly on the Bamboo NEXT open-source catalogue. Creators retain full attribution.',
  },
  {
    question: 'What opportunities emerge after the residency?',
    answer: 'Alumni may launch practices, co-found enterprises, work on bamboo-based construction projects, or collaborate with institutional and market partners. Designed to create long-term pathways.',
  },
  {
    question: 'How does mentorship work?',
    answer: 'Ongoing mentorship through regular reviews from designers, practitioners, and technical experts. Programme led by Mr Sanjeev Karpe and anchored by SELCO Foundation.',
  },
  {
    question: 'How is the cohort selected?',
    answer: 'The team reads every application for genuine design seriousness and creative ambition. Shortlisted applicants have a 30-minute conversation. Final cohort assembled with a mix of designers, architects, and engineers.',
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-24 bg-cream border-y border-grey-border">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 reveal-element">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage bg-sage-pale/60 px-3 py-1 rounded-full">
            Common Inquiries
          </span>
          <h2 className="font-fraunces font-bold text-3xl md:text-5xl text-charcoal mt-4 mb-6">
            Quick *FAQ*
          </h2>
          <p className="font-dmsans text-grey-dark max-w-2xl mx-auto">
            Everything you need to know about the cohort, stipend, logistics, and expectations.
          </p>
        </div>

        <div className="bg-off-white rounded-2xl p-6 md:p-10 border border-grey-border shadow-sm reveal-element">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
