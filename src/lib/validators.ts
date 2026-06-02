import { z } from 'zod';

export const section1Schema = z.object({
  fullName: z.string().min(2, 'Full name is required (min 2 characters)'),
  preferredName: z.string().optional().or(z.literal('')),
  pronouns: z.string().optional().or(z.literal('')),
  age: z.coerce.number().int().min(18, 'Must be at least 18 years old').max(60, 'Must be 60 years old or under'),
  nationality: z.string().refine(
    (val) => val.trim().toLowerCase() === 'indian' || val.trim().toLowerCase() === 'india',
    { message: 'This residency is exclusively open to Indian nationals.' }
  ),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number (min 10 digits)'),
  cityState: z.string().min(2, 'City and State are required'),
  country: z.string().min(2, 'Country is required'),
  linkedinUrl: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  portfolioUrl: z.string().url('Please enter a valid portfolio URL (Behance, website, etc.)'),
  currentOrg: z.string().min(2, 'Current organization/studio/university is required'),
  yearsExperience: z.string().min(1, 'Please select your years of experience'),
  primaryDiscipline: z.string().min(1, 'Please select your primary discipline'),
  howHeard: z.string().optional().or(z.literal('')),
});

export const section2Schema = z.object({
  currentPractice: z.string().min(10, 'Please describe your current practice (minimum 10 characters)'),
  cvPortfolioUrl: z.string().min(1, 'CV or portfolio PDF is required. Please upload the file.'),
  notableProjects: z.string().min(10, 'Please list and describe 2-3 of your proudest projects'),
  naturalMaterialExp: z.string().min(1, 'Please select your natural material experience'),
  naturalMaterialDesc: z.string().optional().or(z.literal('')),
  fieldWorkExp: z.string().min(1, 'Please select your field work experience level'),
  makingChangedMind: z.string().min(10, 'Please describe a moment making changed your mind'),
});

export const section3Schema = z.object({
  whyApplying: z.string().refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length >= 200;
    },
    { message: 'Why applying essay must be at least 200 words.' }
  ),
  whatExcites: z.string().min(1, 'Please select what excites you most'),
  uniqueLearning: z.string().min(10, 'Please describe what you want to learn here'),
  bambooFuture: z.string().min(10, 'Please describe the future you think bamboo can enable'),
  whatToBuild: z.string().min(10, 'Please share what you want to build if selected'),
});

export const section4Schema = z.object({
  canRelocate: z.string().min(1, 'Please select your relocation status'),
  remoteComfort: z.string().min(1, 'Please select your remote work comfort level'),
  physicalComfort: z.string().min(1, 'Please select your physical work comfort level'),
  teamExperience: z.string().min(1, 'Please select your team collaboration experience'),
  anticipatedChallenges: z.string().min(10, 'Please share the challenges you anticipate'),
  supportSystems: z.string().min(10, 'Please share the support systems that help you'),
  ongroundCollab: z.string().min(10, 'Please describe what meaningful collaboration means to you'),
});

export const section5Schema = z.object({
  thinkingExample: z.string().min(10, 'Please describe something you made that reflects your thinking'),
  creativeUploadUrl: z.string().optional().or(z.literal('')),
  badlyDesigned: z.string().min(10, 'Please identify something badly designed today'),
  bamboo2050: z.string().min(10, 'Please describe what changes if bamboo becomes primary'),
  goodDesignDef: z.string().min(10, 'Please define good design in a climate-constrained future'),
});

export const section6Schema = z.object({
  ref1Name: z.string().min(2, 'Reference 1 name is required'),
  ref1Relationship: z.string().min(2, 'Reference 1 relationship is required'),
  ref1Email: z.string().email('Please enter a valid email for Reference 1'),
  ref1Phone: z.string().optional().or(z.literal('')),
  ref1Context: z.string().min(5, 'Please provide context for how Reference 1 knows your work'),
  ref2Name: z.string().optional().or(z.literal('')),
  ref2Relationship: z.string().optional().or(z.literal('')),
  ref2Email: z.string().email('Please enter a valid email for Reference 2').optional().or(z.literal('')),
  ref2Phone: z.string().optional().or(z.literal('')),
});

export const section7Schema = z.object({
  decFullTime: z.boolean().refine((val) => val === true, 'You must agree to this commitment'),
  decAvailability: z.boolean().refine((val) => val === true, 'You must agree to the program dates'),
  decMediaConsent: z.boolean().refine((val) => val === true, 'You must agree to the media consent'),
  decOpenSource: z.boolean().refine((val) => val === true, 'You must agree to the open-source attribution'),
  decAccuracy: z.boolean().refine((val) => val === true, 'You must declare that the info is accurate'),
  additionalNotes: z.string().optional().or(z.literal('')),
});

export const applicationSchema = z.object({
  ...section1Schema.shape,
  ...section2Schema.shape,
  ...section3Schema.shape,
  ...section4Schema.shape,
  ...section5Schema.shape,
  ...section6Schema.shape,
  ...section7Schema.shape,
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
