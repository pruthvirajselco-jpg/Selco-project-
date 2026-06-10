'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function ApplyPage() {
  useEffect(() => {
    window.location.replace('https://forms.gle/zkvwtg4UHmk4prRV9');
  }, []);

  return (
    <div className="min-h-screen bg-off-white flex flex-col justify-center items-center p-6 text-center">
      <div className="flex flex-col items-center gap-4 max-w-sm bg-cream p-8 rounded-2xl border border-grey-border shadow">
        <Loader2 className="w-10 h-10 text-green-primary animate-spin" />
        <h1 className="font-fraunces font-bold text-2xl text-charcoal">Redirecting...</h1>
        <p className="font-dmsans text-sm text-grey-dark leading-relaxed">
          We are redirecting you to the official Google Form application for the Bamboo NEXT Design Residency.
        </p>
        <p className="font-dmsans text-xs text-grey-mid">
          If you are not redirected automatically,{' '}
          <a href="https://forms.gle/zkvwtg4UHmk4prRV9" className="text-green-primary font-bold underline hover:text-green-mid">
            click here
          </a>.
        </p>
        <Link 
          href="/" 
          className="mt-4 text-grey-dark hover:text-green-primary transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-2 group border border-grey-mid/50 px-4 py-2 rounded-md hover:bg-off-white"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Brief
        </Link>
      </div>
    </div>
  );
}
