'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

const timelineSteps = [
  {
    date: 'Jun 2026',
    phase: 'Applications Open',
    tag: 'Now open',
    desc: 'Design Residency applications open. Designers, architects, and engineers apply. The form closes June 30.',
    isImportant: true,
  },
  {
    date: 'Jun 30',
    phase: 'Application Deadline',
    tag: 'Deadline',
    desc: 'All applications close. No extensions.',
    isImportant: true,
  },
  {
    date: 'Jul 2026',
    phase: 'Conversations',
    tag: '30-minute conversations',
    desc: 'Shortlisted applicants have 30-minute conversations with the programme team. Not a formal interview — a discussion about what you want to make and why this is the year to do it.',
    isImportant: false,
  },
  {
    date: 'Late Jul 2026',
    phase: 'Cohort Confirmed',
    tag: '15 residents selected',
    desc: '15 residents selected. Offer letters sent. Field placements confirmed across Meghalaya\'s bamboo clusters.',
    isImportant: false,
  },
  {
    date: 'Aug 2026',
    phase: 'Foundation Lab Begins',
    tag: 'Residential start',
    desc: '4-week residential lab. All residents, one location in Meghalaya. Bamboo immersion. Team formation. Enterprise introductions. The residency starts here.',
    isImportant: true,
  },
  {
    date: 'Sep–Nov 2026',
    phase: 'Field Residency',
    tag: 'Core immersion',
    desc: 'Embedded in enterprise clusters across Meghalaya. Building new things. Working directly alongside local artisans, fabricators, and bamboo enterprises.',
    isImportant: false,
  },
  {
    date: 'Dec 2026',
    phase: 'Mid-Review',
    tag: 'Course correct',
    desc: 'Each team presents work in progress to the programme team and partners. Course correct, refine, go deeper.',
    isImportant: false,
  },
  {
    date: 'Jan 2027',
    phase: 'Documentation Sprint',
    tag: 'Final 4 weeks',
    desc: 'Final 4 weeks: production drawings, making guides, photography. Every output prepared for the open-source catalogue.',
    isImportant: false,
  },
  {
    date: 'Feb 2027',
    phase: 'Meghalaya Design Review',
    tag: 'Public showcase',
    desc: 'Public showcase. Bamboo NEXT Residency catalogue goes live. State and enterprise adoption begins. The work enters the world.',
    isImportant: true,
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20 reveal-element">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage bg-sage-pale/60 px-3 py-1 rounded-full">
            Residency timeline
          </span>
          <h2 className="font-fraunces font-bold text-3xl md:text-5xl text-charcoal mt-4 mb-6 leading-tight">
            Six months. <span className="italic font-normal text-green-primary">One shared ambition.</span>
          </h2>
          <p className="font-dmsans text-grey-dark max-w-2xl mx-auto text-base">
            From Foundation Lab to the Meghalaya Design Review — every phase is built around making, not studying.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central animated line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-grey-border">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-green-primary/50 to-transparent animate-pulse-slow"></div>
          </div>

          <div className="space-y-16">
            {timelineSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } reveal-element group`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {/* Outer circle dot on line */}
                  <div className={`absolute left-6 md:left-1/2 w-8 h-8 rounded-full bg-cream border-4 border-cream transform -translate-x-1/2 flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-125`}>
                    <div
                      className={`w-4 h-4 rounded-full ${
                        step.isImportant ? 'bg-beige-accent shadow-[0_0_10px_rgba(200,168,122,0.6)]' : 'bg-green-primary shadow-[0_0_10px_rgba(26,77,46,0.4)]'
                      }`}
                    />
                  </div>

                  {/* Left spacer / right content alignment */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12 pt-1 md:pt-0">
                    <div
                      className={`bg-off-white p-6 md:p-8 rounded-3xl border border-grey-border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                        step.isImportant ? 'border-beige-accent/40 bg-beige-pale/10 hover:border-beige-accent' : 'hover:border-green-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className={`w-4 h-4 ${step.isImportant ? 'text-beige-accent' : 'text-green-primary'}`} />
                        <span className="font-fraunces font-bold text-lg text-charcoal tracking-wide">
                          {step.date}
                        </span>
                      </div>

                      <h3 className="font-fraunces font-bold text-2xl text-green-primary mb-3 leading-tight">
                        {step.phase}
                      </h3>

                      {step.tag && (
                        <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-sage-pale/60 text-green-primary mb-4 border border-sage-pale">
                          {step.tag}
                        </span>
                      )}

                      <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Empty cell on the other side for desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
