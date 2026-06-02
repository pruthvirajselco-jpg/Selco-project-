'use client';

import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Check, 
  Upload, 
  File, 
  Loader2, 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle,
  FileText,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { 
  applicationSchema, 
  section1Schema,
  section2Schema,
  section3Schema,
  section4Schema,
  section5Schema,
  section6Schema,
  section7Schema,
  ApplicationInput 
} from '@/lib/validators';

const STEPS = [
  { id: 1, name: 'Basic Details', schema: section1Schema },
  { id: 2, name: 'Experience', schema: section2Schema },
  { id: 3, name: 'Why This', schema: section3Schema },
  { id: 4, name: 'Field Readiness', schema: section4Schema },
  { id: 5, name: 'Creative Thinking', schema: section5Schema },
  { id: 6, name: 'References', schema: section6Schema },
  { id: 7, name: 'Declaration', schema: section7Schema },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // File upload states
  const [cvUploading, setCvUploading] = useState(false);
  const [cvFilename, setCvFilename] = useState<string | null>(null);
  const [creativeUploading, setCreativeUploading] = useState(false);
  const [creativeFilename, setCreativeFilename] = useState<string | null>(null);

  const fileInputCvRef = useRef<HTMLInputElement>(null);
  const fileInputCreativeRef = useRef<HTMLInputElement>(null);

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema) as any,
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      preferredName: '',
      pronouns: '',
      age: undefined,
      nationality: 'Indian',
      email: '',
      phone: '',
      cityState: '',
      country: 'India',
      linkedinUrl: '',
      portfolioUrl: '',
      currentOrg: '',
      yearsExperience: '',
      primaryDiscipline: '',
      howHeard: '',
      currentPractice: '',
      cvPortfolioUrl: '',
      notableProjects: '',
      naturalMaterialExp: '',
      naturalMaterialDesc: '',
      fieldWorkExp: '',
      makingChangedMind: '',
      whyApplying: '',
      whatExcites: '',
      uniqueLearning: '',
      bambooFuture: '',
      whatToBuild: '',
      canRelocate: '',
      remoteComfort: '',
      physicalComfort: '',
      teamExperience: '',
      anticipatedChallenges: '',
      supportSystems: '',
      ongroundCollab: '',
      thinkingExample: '',
      creativeUploadUrl: '',
      badlyDesigned: '',
      bamboo2050: '',
      goodDesignDef: '',
      ref1Name: '',
      ref1Relationship: '',
      ref1Email: '',
      ref1Phone: '',
      ref1Context: '',
      ref2Name: '',
      ref2Relationship: '',
      ref2Email: '',
      ref2Phone: '',
      decFullTime: false,
      decAvailability: false,
      decMediaConsent: false,
      decOpenSource: false,
      decAccuracy: false,
      additionalNotes: '',
    },
  });

  // Handle step navigation
  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    
    // Trigger validation for current step fields
    const isStepValid = await trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine list of fields belonging to the current step for validation
  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return [
          'fullName', 'preferredName', 'pronouns', 'age', 'nationality', 
          'email', 'phone', 'cityState', 'country', 'linkedinUrl', 
          'portfolioUrl', 'currentOrg', 'yearsExperience', 'primaryDiscipline', 'howHeard'
        ];
      case 2:
        return [
          'currentPractice', 'cvPortfolioUrl', 'notableProjects', 
          'naturalMaterialExp', 'naturalMaterialDesc', 'fieldWorkExp', 'makingChangedMind'
        ];
      case 3:
        return ['whyApplying', 'whatExcites', 'uniqueLearning', 'bambooFuture', 'whatToBuild'];
      case 4:
        return ['canRelocate', 'remoteComfort', 'physicalComfort', 'teamExperience', 'anticipatedChallenges', 'supportSystems', 'ongroundCollab'];
      case 5:
        return ['thinkingExample', 'creativeUploadUrl', 'badlyDesigned', 'bamboo2050', 'goodDesignDef'];
      case 6:
        return ['ref1Name', 'ref1Relationship', 'ref1Email', 'ref1Phone', 'ref1Context', 'ref2Name', 'ref2Relationship', 'ref2Email', 'ref2Phone'];
      case 7:
        return ['decFullTime', 'decAvailability', 'decMediaConsent', 'decOpenSource', 'decAccuracy', 'additionalNotes'];
      default:
        return [];
    }
  };

  // Handle local file uploads
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: 'cvPortfolioUrl' | 'creativeUploadUrl', type: 'cv' | 'creative') => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Client-side validations
    const limit = type === 'cv' ? 10 : 50; // MB
    if (file.size > limit * 1024 * 1024) {
      alert(`File size exceeds the limit of ${limit}MB.`);
      return;
    }

    if (type === 'cv' && !file.name.endsWith('.pdf')) {
      alert('Only .pdf files are accepted for CV/Portfolio.');
      return;
    }

    const setUploading = type === 'cv' ? setCvUploading : setCreativeUploading;
    const setFilename = type === 'cv' ? setCvFilename : setCreativeFilename;

    setUploading(true);
    setFilename(file.name);

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('type', type);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        setValue(fieldName, result.url, { shouldValidate: true });
      } else {
        alert(result.error || 'Failed to upload file');
        setFilename(null);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to upload file');
      setFilename(null);
    } finally {
      setUploading(false);
    }
  };

  // Submit complete application
  const onSubmit = async (data: ApplicationInput) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setIsSuccess(true);
      } else {
        if (result.error === 'duplicate_email') {
          setSubmitError(result.message);
        } else {
          setSubmitError(result.message || 'An error occurred during submission. Please try again.');
        }
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to connect to the server. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-6 text-center animate-fade-up">
        <div className="w-20 h-20 bg-sage-pale text-green-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <span className="text-4xl">🌿</span>
        </div>
        <h1 className="font-fraunces font-bold text-3xl md:text-5xl text-charcoal mb-4">
          Application received. Thank you.
        </h1>
        <p className="font-dmsans text-base md:text-lg text-grey-dark max-w-lg mx-auto mb-10 leading-relaxed">
          You're now part of a growing movement reimagining materials, livelihoods, and design futures. We've received your application and will review it carefully.
        </p>
        <div className="font-fraunces italic text-xl text-green-primary mb-12 tracking-wide">
          See you in Meghalaya.
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#"
            className="w-full sm:w-auto bg-green-primary hover:bg-green-mid text-off-white font-semibold px-6 py-4 rounded-md transition-all text-sm tracking-wider uppercase text-center inline-flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Download Residency Brief
          </a>
          <a
            href="/#faq"
            className="w-full sm:w-auto border border-grey-mid hover:border-green-primary text-charcoal font-semibold px-6 py-4 rounded-md transition-all text-sm tracking-wider uppercase text-center inline-flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4" /> Read the FAQ
          </a>
        </div>
      </div>
    );
  }

  // Word count helper for Essay
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-6">
      
      {/* 0. Form Warning banner */}
      <div className="flex gap-4 p-5 bg-green-primary text-off-white rounded-xl mb-8 border border-green-light shadow-sm">
        <AlertCircle className="w-5 h-5 text-beige-light shrink-0 mt-0.5" />
        <div className="text-sm font-dmsans text-left">
          <span className="font-bold text-beige-light block mb-1">Important Relocation Commitment</span>
          This residency requires full-time, active on-ground participation in Meghalaya for approximately 6 months (August 2026 to February 2027). You cannot participate remotely. Selected residents will live in shared accommodations and travel extensively. Please apply only if you are fully prepared to commit to this.
        </div>
      </div>

      <div className="bg-off-white rounded-3xl border border-grey-border shadow-md overflow-hidden">
        
        {/* PROGRESS HEADER */}
        <div className="bg-cream p-6 md:p-8 border-b border-grey-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-grey-dark">
                STEP {currentStep} OF 7
              </span>
              <h2 className="font-fraunces font-bold text-xl md:text-2xl text-charcoal mt-1">
                {STEPS[currentStep - 1].name}
              </h2>
            </div>
            <span className="text-xs text-grey-dark bg-sage-pale px-3 py-1 rounded-full font-medium">
              Estimated remaining: {Math.max(16 - currentStep * 2, 2)} mins
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-grey-border h-2 rounded-full overflow-hidden">
            <div 
              className="bg-green-primary h-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            />
          </div>

          {/* Step Pills Navigation row */}
          <div className="hidden md:flex justify-between mt-6 text-[10px] font-bold text-grey-mid tracking-wide uppercase">
            {STEPS.map((step) => (
              <div 
                key={step.id} 
                className={`flex items-center gap-1.5 ${
                  currentStep >= step.id ? 'text-green-primary' : ''
                }`}
              >
                <div 
                  className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] ${
                    currentStep === step.id 
                      ? 'border-green-primary bg-green-primary text-off-white' 
                      : currentStep > step.id 
                      ? 'border-green-primary bg-green-primary text-off-white' 
                      : 'border-grey-mid'
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-2.5 h-2.5" /> : step.id}
                </div>
                <span>{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FORM PANEL CONTAINER */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10">
          
          {submitError && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex gap-3 items-center">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 1 — BASIC DETAILS */}
          {/* ======================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6 text-left animate-fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input type="text" {...register('fullName')} className="form-input" placeholder="As per official documents" />
                  {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="form-label">Preferred Name / Nickname</label>
                  <input type="text" {...register('preferredName')} className="form-input" placeholder="How should we address you?" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="form-label">Pronouns</label>
                  <input type="text" {...register('pronouns')} className="form-input" placeholder="e.g. he/him, she/her, they/them" />
                </div>
                <div>
                  <label className="form-label">Age *</label>
                  <input type="number" {...register('age')} className="form-input" placeholder="e.g. 26" />
                  {errors.age && <p className="form-error">{errors.age.message}</p>}
                </div>
                <div>
                  <label className="form-label">Nationality *</label>
                  <input type="text" {...register('nationality')} className="form-input" placeholder="e.g. Indian" />
                  <span className="text-[10px] text-red-600 font-semibold mt-1 block">
                    ⚠️ Indian Nationals Only are eligible to apply.
                  </span>
                  {errors.nationality && <p className="form-error">{errors.nationality.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Email Address *</label>
                  <input type="email" {...register('email')} className="form-input" placeholder="e.g. name@design.com" />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input type="text" {...register('phone')} className="form-input" placeholder="e.g. +91 9876543210" />
                  {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Current City & State *</label>
                  <input type="text" {...register('cityState')} className="form-input" placeholder="e.g. Bangalore, Karnataka" />
                  {errors.cityState && <p className="form-error">{errors.cityState.message}</p>}
                </div>
                <div>
                  <label className="form-label">Country *</label>
                  <input type="text" {...register('country')} className="form-input" placeholder="e.g. India" />
                  {errors.country && <p className="form-error">{errors.country.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">LinkedIn Profile URL</label>
                  <input type="text" {...register('linkedinUrl')} className="form-input" placeholder="https://linkedin.com/in/username" />
                  {errors.linkedinUrl && <p className="form-error">{errors.linkedinUrl.message}</p>}
                </div>
                <div>
                  <label className="form-label">Portfolio / Studio Website URL *</label>
                  <input type="text" {...register('portfolioUrl')} className="form-input" placeholder="https://behance.net/work or website" />
                  {errors.portfolioUrl && <p className="form-error">{errors.portfolioUrl.message}</p>}
                </div>
              </div>

              <div>
                <label className="form-label">Current Organisation / Studio / University *</label>
                <input type="text" {...register('currentOrg')} className="form-input" placeholder="Where are you working or studying right now?" />
                {errors.currentOrg && <p className="form-error">{errors.currentOrg.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Years of Professional Experience *</label>
                  <select {...register('yearsExperience')} className="form-input">
                    <option value="">Select option</option>
                    <option value="0-1 years student/recent grad">0–1 years student / recent grad</option>
                    <option value="1-3 years">1–3 years</option>
                    <option value="3-6 years">3–6 years</option>
                    <option value="6-10 years">6–10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                  {errors.yearsExperience && <p className="form-error">{errors.yearsExperience.message}</p>}
                </div>
                <div>
                  <label className="form-label">Primary Discipline *</label>
                  <select {...register('primaryDiscipline')} className="form-input">
                    <option value="">Select discipline</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Furniture Design">Furniture Design</option>
                    <option value="Industrial Design">Industrial Design</option>
                    <option value="Craft / Making">Craft / Making</option>
                    <option value="Structural / Civil Engineering">Structural / Civil Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="Textile Design">Textile Design</option>
                    <option value="Graphic / Communication Design">Graphic / Communication Design</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.primaryDiscipline && <p className="form-error">{errors.primaryDiscipline.message}</p>}
                </div>
              </div>

              <div>
                <label className="form-label">How did you hear about this programme?</label>
                <select {...register('howHeard')} className="form-input">
                  <option value="">Select source</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Word of mouth">Word of mouth</option>
                  <option value="University notice board">University notice board</option>
                  <option value="Architecture / design publication">Architecture / design publication</option>
                  <option value="SELCO Foundation">SELCO Foundation</option>
                  <option value="Meghalaya Bamboo Mission">Meghalaya Bamboo Mission</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 2 — PROFESSIONAL EXPERIENCE */}
          {/* ======================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6 text-left animate-fade-up">
              <div>
                <label className="form-label">Describe your current practice or work in 3–5 sentences *</label>
                <textarea 
                  {...register('currentPractice')} 
                  rows={4} 
                  className="form-input" 
                  placeholder="What do you make? What kind of problems do you solve? What is your core philosophy?"
                />
                <p className="text-[11px] text-grey-dark mt-1">Hint: Focus on material engagement and project challenges.</p>
                {errors.currentPractice && <p className="form-error">{errors.currentPractice.message}</p>}
              </div>

              {/* CV FILE UPLOAD */}
              <div>
                <label className="form-label">Upload CV or Portfolio PDF (Max 10MB, .pdf only) *</label>
                <div 
                  onClick={() => fileInputCvRef.current?.click()}
                  className="border-2 border-dashed border-grey-border hover:border-green-primary rounded-xl p-8 text-center cursor-pointer transition-all bg-cream/10"
                >
                  <input 
                    type="file" 
                    ref={fileInputCvRef} 
                    className="hidden" 
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, 'cvPortfolioUrl', 'cv')}
                  />
                  {cvUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 text-green-primary animate-spin" />
                      <span className="text-sm font-semibold text-grey-dark">Uploading your CV...</span>
                    </div>
                  ) : getValues('cvPortfolioUrl') ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-sage-pale text-green-primary rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold text-green-primary">CV Uploaded Successfully!</span>
                      <span className="text-xs text-grey-dark truncate max-w-xs">{cvFilename}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-grey-mid" />
                      <span className="text-sm font-semibold text-charcoal">Drag and drop or click to upload PDF</span>
                      <span className="text-xs text-grey-mid">PDF documents up to 10MB accepted</span>
                    </div>
                  )}
                </div>
                {errors.cvPortfolioUrl && <p className="form-error">{errors.cvPortfolioUrl.message}</p>}
              </div>

              <div>
                <label className="form-label">List 2–3 projects you are most proud of — name, brief description, your role *</label>
                <textarea 
                  {...register('notableProjects')} 
                  rows={4} 
                  className="form-input" 
                  placeholder="Project A: Brief descriptive text · My Role: Lead details...&#10;Project B: Detail..."
                />
                <p className="text-[11px] text-grey-dark mt-1">Hint: Be specific about your physical prototyping or details.</p>
                {errors.notableProjects && <p className="form-error">{errors.notableProjects.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Have you worked with natural materials before? *</label>
                  <select {...register('naturalMaterialExp')} className="form-input">
                    <option value="">Select option</option>
                    <option value="Extensively">Extensively</option>
                    <option value="Some experience">Some experience</option>
                    <option value="Very little">Very little</option>
                    <option value="No, but I'm interested">No, but I'm interested</option>
                  </select>
                  {errors.naturalMaterialExp && <p className="form-error">{errors.naturalMaterialExp.message}</p>}
                </div>
                <div>
                  <label className="form-label">Have you done field-based/on-ground work? *</label>
                  <select {...register('fieldWorkExp')} className="form-input">
                    <option value="">Select option</option>
                    <option value="Yes, extensively">Yes, extensively</option>
                    <option value="Yes, some">Yes, some</option>
                    <option value="No, but I'm willing">No, but I'm willing</option>
                    <option value="No, and I have concerns">No, and I have concerns</option>
                  </select>
                  {errors.fieldWorkExp && <p className="form-error">{errors.fieldWorkExp.message}</p>}
                </div>
              </div>

              <div>
                <label className="form-label">If yes to natural materials, describe briefly</label>
                <textarea {...register('naturalMaterialDesc')} rows={2} className="form-input" placeholder="Specify species, treatment, or techniques you used..." />
              </div>

              <div>
                <label className="form-label">Describe one moment when making something changed how you thought about it. *</label>
                <textarea 
                  {...register('makingChangedMind')} 
                  rows={3} 
                  className="form-input" 
                  placeholder="Detail a physical making experiment, joinery mock, or structural test that failed or shifted your logic..."
                />
                {errors.makingChangedMind && <p className="form-error">{errors.makingChangedMind.message}</p>}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 3 — WHY THIS RESIDENCY */}
          {/* ======================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6 text-left animate-fade-up">
              
              <Controller
                name="whyApplying"
                control={control}
                render={({ field }) => {
                  const words = countWords(field.value || '');
                  return (
                    <div>
                      <label className="form-label">Why are you applying to Bamboo NEXT? (200 words minimum) *</label>
                      <textarea
                        {...field}
                        rows={6}
                        className="form-input"
                        placeholder="Explain why this residency in Meghalaya, at this moment in your practice, is the exact right path. What makes you fit?"
                      />
                      <div className="flex justify-between mt-1 text-[11px]">
                        <span className="text-grey-dark">Hint: Detail specific regional questions or career trajectory.</span>
                        <span className={`font-semibold ${words >= 200 ? 'text-green-primary' : 'text-red-500'}`}>
                          {words} / 200 words minimum
                        </span>
                      </div>
                      {errors.whyApplying && <p className="form-error">{errors.whyApplying.message}</p>}
                    </div>
                  );
                }}
              />

              <div>
                <label className="form-label">What excites you more? *</label>
                <select {...register('whatExcites')} className="form-input">
                  <option value="">Select core excitement</option>
                  <option value="Designing — spatial, formal, aesthetic">Designing — spatial, formal, aesthetic</option>
                  <option value="Building — fabricating, constructing, making">Building — fabricating, constructing, making</option>
                  <option value="Prototyping — fast iteration, testing, refining">Prototyping — fast iteration, testing, refining</option>
                  <option value="Systems thinking — enterprise, market, impact">Systems thinking — enterprise, market, impact</option>
                  <option value="Material experimentation — depth, science, craft">Material experimentation — depth, science, craft</option>
                  <option value="A genuine mix — I find it hard to separate these">A genuine mix — I find it hard to separate these</option>
                </select>
                {errors.whatExcites && <p className="form-error">{errors.whatExcites.message}</p>}
              </div>

              <div>
                <label className="form-label">What do you want to learn here that you cannot learn anywhere else? *</label>
                <textarea 
                  {...register('uniqueLearning')} 
                  rows={3} 
                  className="form-input" 
                  placeholder="Be specific. What gap does this fill in your practice, knowledge, or structural understanding?"
                />
                {errors.uniqueLearning && <p className="form-error">{errors.uniqueLearning.message}</p>}
              </div>

              <div>
                <label className="form-label">What kind of future do you think bamboo can enable? *</label>
                <textarea 
                  {...register('bambooFuture')} 
                  rows={3} 
                  className="form-input" 
                  placeholder="Think beyond products. Livelihoods, housing, climate engineering, local systems..."
                />
                {errors.bambooFuture && <p className="form-error">{errors.bambooFuture.message}</p>}
              </div>

              <div>
                <label className="form-label">If selected, what would you want to build during the residency? *</label>
                <textarea 
                  {...register('whatToBuild')} 
                  rows={3} 
                  className="form-input" 
                  placeholder="An idea, a question, a type of structural module or system. It doesn't need to be complete."
                />
                {errors.whatToBuild && <p className="form-error">{errors.whatToBuild.message}</p>}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 4 — FIELD IMMERSION READINESS */}
          {/* ======================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6 text-left animate-fade-up">
              <div className="p-4 bg-beige-pale/35 border border-beige-accent/30 text-charcoal rounded-xl text-xs flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-beige-accent shrink-0 mt-0.5" />
                <div className="font-dmsans">
                  <span className="font-bold text-green-primary block mb-1">Field Reality Context</span>
                  This residency is physically intense. Selected cohort members live in shared rural housing, travel in local utility vehicles on bumpy terrain, and perform hours of physical workshop making. Integrity and transparent answers here are deeply valued.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Are you able to relocate to Meghalaya for 6 months? *</label>
                  <select {...register('canRelocate')} className="form-input">
                    <option value="">Select status</option>
                    <option value="Yes — I am fully available and ready to commit">Yes — I am fully available and ready to commit</option>
                    <option value="Yes — with some arrangements to be made first">Yes — with some arrangements to be made first</option>
                    <option value="I'm unsure — I need more information first">I'm unsure — I need more information first</option>
                    <option value="No — I have significant constraints preventing this">No — I have significant constraints preventing this</option>
                  </select>
                  {errors.canRelocate && <p className="form-error">{errors.canRelocate.message}</p>}
                </div>
                <div>
                  <label className="form-label">Comfortable in remote bamboo clusters? *</label>
                  <select {...register('remoteComfort')} className="form-input">
                    <option value="">Select option</option>
                    <option value="Very comfortable — I've done this before">Very comfortable — I've done this before</option>
                    <option value="Comfortable — I'm open to it and adapt well">Comfortable — I'm open to it and adapt well</option>
                    <option value="Somewhat uncertain — it's new for me but willing">Somewhat uncertain — it's new for me but willing</option>
                    <option value="I have concerns I'd like to discuss">I have concerns I'd like to discuss</option>
                  </select>
                  {errors.remoteComfort && <p className="form-error">{errors.remoteComfort.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Comfortable with physically demanding build work? *</label>
                  <select {...register('physicalComfort')} className="form-input">
                    <option value="">Select option</option>
                    <option value="Yes — hands-on making is central to how I work">Yes — hands-on making is central to how I work</option>
                    <option value="Yes — comfortable and willing to learn">Yes — comfortable and willing to learn</option>
                    <option value="Somewhat — more conceptual but open">Somewhat — more conceptual but open</option>
                    <option value="No — I have physical limitations I should disclose">No — I have physical limitations I should disclose</option>
                  </select>
                  {errors.physicalComfort && <p className="form-error">{errors.physicalComfort.message}</p>}
                </div>
                <div>
                  <label className="form-label">Experience in collaborative teams? *</label>
                  <select {...register('teamExperience')} className="form-input">
                    <option value="">Select option</option>
                    <option value="Extensive — I thrive in team environments">Extensive — I thrive in team environments</option>
                    <option value="Moderate — I've worked in teams and enjoy it">Moderate — I've worked in teams and enjoy it</option>
                    <option value="Limited — I mostly work independently">Limited — I mostly work independently</option>
                    <option value="Mixed experiences — some positive, some difficult">Mixed experiences — some positive, some difficult</option>
                  </select>
                  {errors.teamExperience && <p className="form-error">{errors.teamExperience.message}</p>}
                </div>
              </div>

              <div>
                <label className="form-label">What challenges do you anticipate during the field immersion? *</label>
                <textarea 
                  {...register('anticipatedChallenges')} 
                  rows={3} 
                  className="form-input" 
                  placeholder="Be honest. Personal, logistical, creative, physical — what will be difficult for you?"
                />
                {errors.anticipatedChallenges && <p className="form-error">{errors.anticipatedChallenges.message}</p>}
              </div>

              <div>
                <label className="form-label">What support systems help you do your best work?</label>
                <textarea 
                  {...register('supportSystems')} 
                  rows={2} 
                  className="form-input" 
                  placeholder="Mentorship frequencies, quiet spacing, specific tools, structures..."
                />
                {errors.supportSystems && <p className="form-error">{errors.supportSystems.message}</p>}
              </div>

              <div>
                <label className="form-label">What does meaningful on-ground collaboration mean to you? *</label>
                <textarea 
                  {...register('ongroundCollab')} 
                  rows={3} 
                  className="form-input" 
                  placeholder="Reflecting on artisan dignity, working side-by-side, sharing learning..."
                />
                {errors.ongroundCollab && <p className="form-error">{errors.ongroundCollab.message}</p>}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 5 — CREATIVE THINKING */}
          {/* ======================================================== */}
          {currentStep === 5 && (
            <div className="space-y-6 text-left animate-fade-up">
              <div className="p-5 bg-cream/70 rounded-xl border border-grey-border text-charcoal">
                <blockquote className="font-fraunces italic text-base leading-relaxed text-charcoal">
                  "Good design is always a form of ethical practice. What you choose to make — and what you refuse to make — says more than any portfolio."
                </blockquote>
              </div>

              <div>
                <label className="form-label">Show us something you made that reflects your way of thinking *</label>
                <textarea 
                  {...register('thinkingExample')} 
                  rows={4} 
                  className="form-input" 
                  placeholder="Describe a piece of furniture, a sketch detail, an algorithm, a spatial plan, or an essay you authored. Why reflects it?"
                />
                {errors.thinkingExample && <p className="form-error">{errors.thinkingExample.message}</p>}
              </div>

              {/* CREATIVE UPLOAD */}
              <div>
                <label className="form-label">Upload a file illustrating this (Sketch, Image, PDF, Video — Optional, Max 50MB)</label>
                <div 
                  onClick={() => fileInputCreativeRef.current?.click()}
                  className="border-2 border-dashed border-grey-border hover:border-green-primary rounded-xl p-8 text-center cursor-pointer transition-all bg-cream/10"
                >
                  <input 
                    type="file" 
                    ref={fileInputCreativeRef} 
                    className="hidden" 
                    accept=".jpg,.png,.pdf,.mp4,.mov"
                    onChange={(e) => handleFileUpload(e, 'creativeUploadUrl', 'creative')}
                  />
                  {creativeUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 text-green-primary animate-spin" />
                      <span className="text-sm font-semibold text-grey-dark">Uploading media...</span>
                    </div>
                  ) : getValues('creativeUploadUrl') ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-sage-pale text-green-primary rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold text-green-primary">File Uploaded Successfully!</span>
                      <span className="text-xs text-grey-dark truncate max-w-xs">{creativeFilename}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-grey-mid" />
                      <span className="text-sm font-semibold text-charcoal">Drag and drop or click to upload PDF/Image/Video</span>
                      <span className="text-xs text-grey-mid">Accepts PDF, JPG, PNG, MP4, MOV up to 50MB</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="form-label">What is one material, system, or object that you think is badly designed today? *</label>
                <textarea 
                  {...register('badlyDesigned')} 
                  rows={3} 
                  className="form-input" 
                  placeholder="Detail it, explain precisely why it fails, and how you would design a better replacement..."
                />
                {errors.badlyDesigned && <p className="form-error">{errors.badlyDesigned.message}</p>}
              </div>

              <div>
                <label className="form-label">If bamboo became India's primary construction material by 2050, what changes? *</label>
                <textarea 
                  {...register('bamboo2050')} 
                  rows={4} 
                  className="form-input" 
                  placeholder="Reflect across sectors: housing models, supply routes, forest boundaries, urban microclimates, craft dignity..."
                />
                {errors.bamboo2050 && <p className="form-error">{errors.bamboo2050.message}</p>}
              </div>

              <div>
                <label className="form-label">What does "good design" mean to you in a climate-constrained future? *</label>
                <textarea 
                  {...register('goodDesignDef')} 
                  rows={3} 
                  className="form-input" 
                  placeholder="Summarize your design ethics relative to survival, resource flows, carbon, and local economies..."
                />
                {errors.goodDesignDef && <p className="form-error">{errors.goodDesignDef.message}</p>}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 6 — REFERENCES */}
          {/* ======================================================== */}
          {currentStep === 6 && (
            <div className="space-y-6 text-left animate-fade-up">
              <p className="text-sm text-grey-dark">
                Please provide details for one or two people who know your work and can speak to your readiness. A mentor, employer, principal, or professor.
              </p>

              {/* REFERENCE 1 */}
              <div className="bg-cream/40 p-6 rounded-2xl border border-grey-border space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-green-primary">REFERENCE 1 (Required)</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input type="text" {...register('ref1Name')} className="form-input" />
                    {errors.ref1Name && <p className="form-error">{errors.ref1Name.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">Relationship to You *</label>
                    <input type="text" {...register('ref1Relationship')} className="form-input" placeholder="e.g. Thesis Advisor, Studio Director" />
                    {errors.ref1Relationship && <p className="form-error">{errors.ref1Relationship.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input type="email" {...register('ref1Email')} className="form-input" />
                    {errors.ref1Email && <p className="form-error">{errors.ref1Email.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input type="text" {...register('ref1Phone')} className="form-input" />
                  </div>
                </div>
                <div>
                  <label className="form-label">How does this person know your work? *</label>
                  <textarea {...register('ref1Context')} rows={2} className="form-input" placeholder="e.g. Collaborated on XYZ project or taught me..." />
                  {errors.ref1Context && <p className="form-error">{errors.ref1Context.message}</p>}
                </div>
              </div>

              {/* REFERENCE 2 */}
              <div className="bg-cream/40 p-6 rounded-2xl border border-grey-border space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-grey-dark">REFERENCE 2 (Optional)</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full Name</label>
                    <input type="text" {...register('ref2Name')} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Relationship to You</label>
                    <input type="text" {...register('ref2Relationship')} className="form-input" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Email Address</label>
                    <input type="email" {...register('ref2Email')} className="form-input" />
                    {errors.ref2Email && <p className="form-error">{errors.ref2Email.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input type="text" {...register('ref2Phone')} className="form-input" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 7 — DECLARATION & COMMITMENT */}
          {/* ======================================================== */}
          {currentStep === 7 && (
            <div className="space-y-6 text-left animate-fade-up">
              <div className="p-4 bg-beige-pale/35 border border-beige-accent/30 text-charcoal rounded-xl text-xs flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-beige-accent shrink-0 mt-0.5" />
                <div className="font-dmsans">
                  <span className="font-bold text-green-primary block mb-1">Final Submission Warning</span>
                  Misrepresentation of your timeline availability, physical readiness, or credentials will disqualify you from the residency cycle. Check the following declarations as validation of intent.
                </div>
              </div>

              <div className="space-y-4">
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register('decFullTime')} className="mt-1 w-4 h-4 rounded text-green-primary focus:ring-green-primary" />
                  <span className="text-xs md:text-sm text-grey-dark leading-relaxed">
                    I understand that this is a full-time residential field residency in Meghalaya and requires active on-ground participation for approximately 6 months. I confirm that I am able and willing to commit to this. *
                  </span>
                </label>
                {errors.decFullTime && <p className="form-error">{errors.decFullTime.message}</p>}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register('decAvailability')} className="mt-1 w-4 h-4 rounded text-green-primary focus:ring-green-primary" />
                  <span className="text-xs md:text-sm text-grey-dark leading-relaxed">
                    I confirm that I am available from approximately August 2026 to February 2027 for the full duration of the residency. *
                  </span>
                </label>
                {errors.decAvailability && <p className="form-error">{errors.decAvailability.message}</p>}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register('decMediaConsent')} className="mt-1 w-4 h-4 rounded text-green-primary focus:ring-green-primary" />
                  <span className="text-xs md:text-sm text-grey-dark leading-relaxed">
                    I consent to documentation and media being created during the residency (photographs, videos, project drawings) for programme communication and open publication purposes. *
                  </span>
                </label>
                {errors.decMediaConsent && <p className="form-error">{errors.decMediaConsent.message}</p>}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register('decOpenSource')} className="mt-1 w-4 h-4 rounded text-green-primary focus:ring-green-primary" />
                  <span className="text-xs md:text-sm text-grey-dark leading-relaxed">
                    I acknowledge that all residency outputs will be documented and published as open-source materials accessible to makers across India. I retain proper attribution for my work. *
                  </span>
                </label>
                {errors.decOpenSource && <p className="form-error">{errors.decOpenSource.message}</p>}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register('decAccuracy')} className="mt-1 w-4 h-4 rounded text-green-primary focus:ring-green-primary" />
                  <span className="text-xs md:text-sm text-grey-dark leading-relaxed">
                    I confirm that the information in this application is accurate and honest to the best of my knowledge. *
                  </span>
                </label>
                {errors.decAccuracy && <p className="form-error">{errors.decAccuracy.message}</p>}

              </div>

              <div className="pt-4">
                <label className="form-label">Anything else to share with the selection team?</label>
                <textarea {...register('additionalNotes')} rows={3} className="form-input" placeholder="Optional notes, queries, or logistics context..." />
              </div>

              {/* What happens next box */}
              <div className="p-5 bg-cream rounded-xl text-xs md:text-sm text-charcoal border border-grey-border text-left">
                <span className="font-bold text-green-primary block mb-1">What happens next?</span>
                All applications are reviewed by the program selection team. Shortlisted applicants will be contacted by mid-July 2026 for a 30-minute interview. The final cohort of 15 will be confirmed by late July 2026.
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* NAVIGATION BUTTONS */}
          {/* ======================================================== */}
          <div className="mt-10 pt-6 border-t border-grey-border flex justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="bg-transparent border border-grey-mid hover:border-charcoal text-charcoal font-semibold px-6 py-3 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div /> // Spacer
            )}

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-green-primary hover:bg-green-mid text-off-white font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2 cursor-pointer shadow border border-green-light"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-primary hover:bg-green-mid disabled:bg-green-light/65 text-off-white font-semibold px-8 py-3 rounded-md transition-all flex items-center gap-2 cursor-pointer shadow border border-green-light"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit Application <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

        </form>

      </div>

    </div>
  );
}
