'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-grey-border py-4 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left py-2 font-dmsans font-semibold text-charcoal hover:text-green-primary transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-grey-dark transition-transform duration-300 ${
            isOpen ? 'transform rotate-180 text-green-primary' : ''
          }`}
        />
      </button>
      <div
        className={`accordion-content ${isOpen ? 'open' : ''}`}
        style={{
          maxHeight: isOpen ? '500px' : '0px',
        }}
      >
        <div className="pt-2 pb-4 text-sm md:text-base text-grey-dark leading-relaxed font-dmsans">
          {answer}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-grey-border">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === idx}
          onToggle={() => handleToggle(idx)}
        />
      ))}
    </div>
  );
}
