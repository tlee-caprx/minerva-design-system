export type TapClinicalCriterionStatus = 'met' | 'review' | 'not-met'

export interface TapClinicalCriterion {
  status: TapClinicalCriterionStatus
  title: string
  evidence: string
  source?: string
  citations?: number[]
  aiReview?: string
}

export type TapCase = {
  id: string
  recommendation: 'approval' | 'denial'
  recommendationSummary: string
  clinicalCriteriaSummary: string
  member: {
    name: string
    status: string
    role: string
    dateOfBirthAndAge: string
    gender: string
    phone: string
    memberId: string
    address: string
    plan: string
    formulary: string
    planBenefit: string
  }
  requestedDrug: {
    name: string
    quantityDaysSupply: string
    ndc: string
    gpi: string
    msc: string
    instructions: string
  }
  diagnosis: string
  clinicalCriteriaName: string
  clinicalCriteria: TapClinicalCriterion[]
}

export const TAP_CASES: TapCase[] = [
  {
    id: '1763579',
    recommendation: 'denial',
    recommendationSummary: 'Lenny Smith requested phendimetrazine 35 mg for obesity. Six of eight clinical criteria are met, including age, BMI, and quantity. The submitted chart notes document symptomatic cardiovascular disease, which conflicts with the no-contraindications criterion.',
    clinicalCriteriaSummary: 'Six of eight criteria are met. Coronary artery disease is flagged for review under the severe weight-related complication criterion. The chart notes also document symptomatic cardiovascular disease under the contraindication criterion, which is the deciding issue behind the denial recommendation.',
    member: {
      name: 'Lenny Smith', status: 'Active', role: 'Card Holder', dateOfBirthAndAge: '11/11/1990 | 35', gender: 'Male', phone: '(555) 867-5309', memberId: '339988', address: '1001 Rockville Pike, Clarksburg, MD 20871', plan: 'JD66 District Council 37', formulary: 'Liberty', planBenefit: 'JD66 District Council 37',
    },
    requestedDrug: {
      name: 'Phendimetrazine 35 mg tablet 90/30', quantityDaysSupply: 'Qty/DS: 90/30', ndc: '00093-8675-74', gpi: '61200050100305', msc: '100 tablets / Y', instructions: 'Take 1 tablet by mouth 3 times daily, 1 hour before meals',
    },
    diagnosis: 'E66.9 · Obesity, unspecified',
    clinicalCriteriaName: 'Phendimetrazine 35 mg Prior Authorization with Quantity Limit',
    clinicalCriteria: [
      { status: 'met', title: 'Patient is ≥17 years old', evidence: 'Patient is 35 years old', source: 'Member Profile', citations: [1, 2] },
      { status: 'met', title: 'Patient has BMI ≥27 kg/m²', evidence: 'BMI: 28.4 kg/m²', source: 'Chart Notes', citations: [1, 2] },
      { status: 'review', title: 'Patient has ≥1 severe weight-related comorbidity, risk factor, or complication', evidence: 'Coronary artery disease is reported; the prescriber identifies it as a severe weight-related complication', source: 'Chart Notes', citations: [1, 2], aiReview: 'Assess whether the reported coronary artery disease satisfies the severe weight-related complication requirement. This does not resolve the separate contraindications criterion below.' },
      { status: 'met', title: 'Patient will initiate or continue a low-calorie diet, increased physical activity, and behavioral modifications with therapy', evidence: 'Prescriber confirms patient will participate', source: 'Prescriber Notes', citations: [1, 2] },
      { status: 'met', title: 'Patient will not use another weight-loss agent concurrently', evidence: 'None reported' },
      { status: 'not-met', title: 'Patient has no FDA-labeled contraindications to phendimetrazine', evidence: 'Symptomatic cardiovascular disease is documented in the submitted chart notes', source: 'Chart Notes', citations: [1, 2], aiReview: 'The chart notes document symptomatic cardiovascular disease, which is listed as a contraindication for phendimetrazine. Verify the source before confirming the denial recommendation; satisfying the comorbidity requirement above would not change this finding.' },
      { status: 'met', title: 'Prior weight-loss prior authorization requirement is satisfied', evidence: 'No prior weight-loss authorization in the past 12 months', source: 'Member Profile', citations: [1, 2] },
      { status: 'met', title: 'Requested quantity is ≤6 tablets/day for phendimetrazine 35 mg', evidence: '3 tablets/day', source: 'PA Request', citations: [1, 2] },
    ],
  },
  {
    id: '1763580',
    recommendation: 'denial',
    recommendationSummary: 'Jordan Lee requested the Humira starter pack for pediatric Crohn’s disease. The diagnosis and age criteria are met, but the submitted starter regimen exceeds the plan’s quantity limit for 28 days.',
    clinicalCriteriaSummary: 'Three of four criteria are met. The requested starter-pack quantity exceeds the plan allowance for the submitted 28-day supply, so the quantity criterion is not met.',
    member: {
      name: 'Jordan Lee', status: 'Active', role: 'Card Holder', dateOfBirthAndAge: '04/08/2012 | 14', gender: 'Female', phone: '(555) 014-6482', memberId: '2891046782', address: '355 Maple Avenue, Baltimore, MD 21201', plan: 'JD66 District Council 37', formulary: 'Liberty', planBenefit: 'JD66 District Council 37',
    },
    requestedDrug: {
      name: 'Humira Pediatric Crohn’s Disease Starter Pack', quantityDaysSupply: 'Qty/DS: 2/28', ndc: '00074-0124-02', gpi: '66270015002040', msc: '2 kits / N', instructions: 'Inject as directed for pediatric Crohn’s disease induction',
    },
    diagnosis: 'K50.80 · Crohn’s disease of small and large intestine without complications',
    clinicalCriteriaName: 'Biologic Immunomodulators Initial Review',
    clinicalCriteria: [
      { status: 'met', title: 'Requested use is for a covered indication', evidence: 'Crohn’s disease diagnosis is documented', source: 'PA Request', citations: [1] },
      { status: 'met', title: 'Patient meets the age requirement for the requested indication', evidence: 'Patient is 14 years old', source: 'Member Profile', citations: [1] },
      { status: 'not-met', title: 'Requested quantity is within the plan allowance', evidence: 'Submitted quantity exceeds the 28-day starter-pack limit', source: 'PA Request', citations: [1, 2], aiReview: 'The requested starter-pack quantity is above the plan limit for a 28-day supply. Review the submitted quantity and day supply against the applicable quantity rule before confirming the recommendation.' },
      { status: 'met', title: 'No concurrent biologic therapy is reported', evidence: 'No concurrent biologic therapy found', source: 'Claims History', citations: [1] },
    ],
  },
  {
    id: '1763581',
    recommendation: 'approval',
    recommendationSummary: 'Maya Rodriguez requested Nurtec ODT 75 mg for migraine. The documented indication, treatment history, and requested quantity meet the plan criteria, and no duplicate CGRP therapy is reported.',
    clinicalCriteriaSummary: 'All four criteria are met. The documented migraine diagnosis, treatment history, requested quantity, and therapy history support the approval recommendation.',
    member: {
      name: 'Maya Rodriguez', status: 'Active', role: 'Card Holder', dateOfBirthAndAge: '09/23/1985 | 40', gender: 'Female', phone: '(555) 510-2938', memberId: '1509387462', address: '212 Harbor Street, Annapolis, MD 21401', plan: 'JD66 District Council 37', formulary: 'Liberty', planBenefit: 'JD66 District Council 37',
    },
    requestedDrug: {
      name: 'Nurtec ODT 75 mg orally disintegrating tablet', quantityDaysSupply: 'Qty/DS: 8/30', ndc: '72618-3000-02', gpi: '67701060707220', msc: '8 tablets / Y', instructions: 'Dissolve 1 tablet on or under the tongue as needed for migraine',
    },
    diagnosis: 'G43.009 · Migraine without aura, not intractable, without status migrainosus',
    clinicalCriteriaName: 'Acute Migraine Agents Initial Review',
    clinicalCriteria: [
      { status: 'met', title: 'Requested use is for a covered migraine indication', evidence: 'Episodic migraine diagnosis is documented', source: 'PA Request', citations: [1] },
      { status: 'met', title: 'Required acute migraine treatment history is documented', evidence: 'Prior treatment history meets plan requirements', source: 'Claims History', citations: [1, 2] },
      { status: 'met', title: 'Requested quantity is within the plan allowance', evidence: '8 tablets per 30 days requested', source: 'PA Request', citations: [1] },
      { status: 'met', title: 'No duplicate CGRP therapy is reported', evidence: 'No conflicting therapy found', source: 'Claims History', citations: [1] },
    ],
  },
  {
    id: '1763582',
    recommendation: 'denial',
    recommendationSummary: 'Thomas Nguyen requested Skyrizi 150 mg/mL for plaque psoriasis. Continuation criteria are documented, but the requested two pens for 84 days exceed the plan’s one-pen maintenance allowance.',
    clinicalCriteriaSummary: 'Three of four criteria are met. The requested two pens for an 84-day maintenance supply exceed the one-pen plan allowance, so the quantity criterion is not met.',
    member: {
      name: 'Thomas Nguyen', status: 'Active', role: 'Card Holder', dateOfBirthAndAge: '01/16/1974 | 52', gender: 'Male', phone: '(555) 763-4109', memberId: '6452109873', address: '81 Kingsley Road, Silver Spring, MD 20910', plan: 'JD66 District Council 37', formulary: 'Liberty', planBenefit: 'JD66 District Council 37',
    },
    requestedDrug: {
      name: 'Skyrizi 150 mg/mL prefilled pen', quantityDaysSupply: 'Qty/DS: 2/84', ndc: '00074-2100-02', gpi: '00000000000000', msc: '2 pens / N', instructions: 'Inject under the skin as directed for plaque psoriasis',
    },
    diagnosis: 'L40.0 · Psoriasis vulgaris',
    clinicalCriteriaName: 'Biologic Immunomodulators Renewal',
    clinicalCriteria: [
      { status: 'met', title: 'Requested use is for a covered indication', evidence: 'Plaque psoriasis diagnosis is documented', source: 'PA Request', citations: [1] },
      { status: 'met', title: 'Continuation criteria are documented', evidence: 'Prescriber attests to clinical response', source: 'Prescriber Notes', citations: [1] },
      { status: 'not-met', title: 'Requested quantity is within the plan allowance', evidence: 'Two pens requested for an 84-day maintenance supply; one pen is allowed', source: 'PA Request', citations: [1, 2], aiReview: 'The request is for two pens over 84 days, while the plan allows one pen for that maintenance period. Review the submitted quantity and day supply against the plan limit before confirming the recommendation.' },
      { status: 'met', title: 'No duplicate biologic therapy is reported', evidence: 'No concurrent biologic therapy found', source: 'Claims History', citations: [1] },
    ],
  },
]
