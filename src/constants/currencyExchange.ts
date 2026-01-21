// Exchange rates relative to USD (as of 2024) - for demonstration purposes
export const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.35,
  AUD: 1.53,
  JPY: 149.80,
  CHF: 0.88,
  NGN: 1620.00,
  INR: 83.50,
};

// Impact costs per currency (based on USD values)
export const IMPACT_COSTS = {
  USD: {
    educationalMaterials: 15,
    tutoringSession: 25,
    vocationalTraining: 75,
    healthcareSupport: 100,
  },
  EUR: {
    educationalMaterials: 13.80,
    tutoringSession: 23.00,
    vocationalTraining: 69.00,
    healthcareSupport: 92.00,
  },
  GBP: {
    educationalMaterials: 11.85,
    tutoringSession: 19.75,
    vocationalTraining: 59.25,
    healthcareSupport: 79.00,
  },
  CAD: {
    educationalMaterials: 20.25,
    tutoringSession: 33.75,
    vocationalTraining: 101.25,
    healthcareSupport: 135.00,
  },
  AUD: {
    educationalMaterials: 22.95,
    tutoringSession: 38.25,
    vocationalTraining: 114.75,
    healthcareSupport: 153.00,
  },
  JPY: {
    educationalMaterials: 2247,
    tutoringSession: 3745,
    vocationalTraining: 11235,
    healthcareSupport: 14980,
  },
  CHF: {
    educationalMaterials: 13.20,
    tutoringSession: 22.00,
    vocationalTraining: 66.00,
    healthcareSupport: 88.00,
  },
  NGN: {
    educationalMaterials: 24300,
    tutoringSession: 40500,
    vocationalTraining: 121500,
    healthcareSupport: 162000,
  },
  INR: {
    educationalMaterials: 1252.50,
    tutoringSession: 2087.50,
    vocationalTraining: 6262.50,
    healthcareSupport: 8350.00,
  },
};

// Preset donation amounts per currency
export const PRESET_AMOUNTS = {
  USD: ['25', '50', '100', '250', '500'],
  EUR: ['23', '46', '92', '230', '460'],
  GBP: ['20', '40', '80', '200', '400'],
  CAD: ['34', '68', '135', '338', '675'],
  AUD: ['38', '76', '153', '383', '765'],
  JPY: ['3745', '7490', '14980', '37450', '74900'],
  CHF: ['22', '44', '88', '220', '440'],
  NGN: ['40500', '81000', '162000', '405000', '810000'],
  INR: ['2087', '4175', '8350', '20875', '41750'],
};

// Impact levels per currency
export const IMPACT_LEVELS = {
  USD: [
    { amount: '25', impact: 'Provides school supplies for 1 child for a month', iconColor: 'bg-green-500' },
    { amount: '50', impact: 'Funds one week of after-school tutoring', iconColor: 'bg-blue-500' },
    { amount: '100', impact: 'Supports a student with full educational materials', iconColor: 'bg-purple-500' },
    { amount: '250', impact: 'Provides vocational training for one person', iconColor: 'bg-orange-500' },
    { amount: '500', impact: 'Sponsors a community learning center for a month', iconColor: 'bg-red-500' },
  ],
  EUR: [
    { amount: '23', impact: 'Provides school supplies for 1 child for a month', iconColor: 'bg-green-500' },
    { amount: '46', impact: 'Funds one week of after-school tutoring', iconColor: 'bg-blue-500' },
    { amount: '92', impact: 'Supports a student with full educational materials', iconColor: 'bg-purple-500' },
    { amount: '230', impact: 'Provides vocational training for one person', iconColor: 'bg-orange-500' },
    { amount: '460', impact: 'Sponsors a community learning center for a month', iconColor: 'bg-red-500' },
  ],
  GBP: [
    { amount: '20', impact: 'Provides school supplies for 1 child for a month', iconColor: 'bg-green-500' },
    { amount: '40', impact: 'Funds one week of after-school tutoring', iconColor: 'bg-blue-500' },
    { amount: '80', impact: 'Supports a student with full educational materials', iconColor: 'bg-purple-500' },
    { amount: '200', impact: 'Provides vocational training for one person', iconColor: 'bg-orange-500' },
    { amount: '400', impact: 'Sponsors a community learning center for a month', iconColor: 'bg-red-500' },
  ],
  CAD: [
    { amount: '34', impact: 'Provides school supplies for 1 child for a month', iconColor: 'bg-green-500' },
    { amount: '68', impact: 'Funds one week of after-school tutoring', iconColor: 'bg-blue-500' },
    { amount: '135', impact: 'Supports a student with full educational materials', iconColor: 'bg-purple-500' },
    { amount: '338', impact: 'Provides vocational training for one person', iconColor: 'bg-orange-500' },
    { amount: '675', impact: 'Sponsors a community learning center for a month', iconColor: 'bg-red-500' },
  ],
  AUD: [
    { amount: '38', impact: 'Provides school supplies for 1 child for a month', iconColor: 'bg-green-500' },
    { amount: '76', impact: 'Funds one week of after-school tutoring', iconColor: 'bg-blue-500' },
    { amount: '153', impact: 'Supports a student with full educational materials', iconColor: 'bg-purple-500' },
    { amount: '383', impact: 'Provides vocational training for one person', iconColor: 'bg-orange-500' },
    { amount: '765', impact: 'Sponsors a community learning center for a month', iconColor: 'bg-red-500' },
  ],
  JPY: [
    { amount: '3745', impact: 'Provides school supplies for 1 child for a month', iconColor: 'bg-green-500' },
    { amount: '7490', impact: 'Funds one week of after-school tutoring', iconColor: 'bg-blue-500' },
    { amount: '14980', impact: 'Supports a student with full educational materials', iconColor: 'bg-purple-500' },
    { amount: '37450', impact: 'Provides vocational training for one person', iconColor: 'bg-orange-500' },
    { amount: '74900', impact: 'Sponsors a community learning center for a month', iconColor: 'bg-red-500' },
  ],
  CHF: [
    { amount: '22', impact: 'Provides school supplies for 1 child for a month', iconColor: 'bg-green-500' },
    { amount: '44', impact: 'Funds one week of after-school tutoring', iconColor: 'bg-blue-500' },
    { amount: '88', impact: 'Supports a student with full educational materials', iconColor: 'bg-purple-500' },
    { amount: '220', impact: 'Provides vocational training for one person', iconColor: 'bg-orange-500' },
    { amount: '440', impact: 'Sponsors a community learning center for a month', iconColor: 'bg-red-500' },
  ],
  NGN: [
    { amount: '40500', impact: 'Provides school supplies for 1 child for a month', iconColor: 'bg-green-500' },
    { amount: '81000', impact: 'Funds one week of after-school tutoring', iconColor: 'bg-blue-500' },
    { amount: '162000', impact: 'Supports a student with full educational materials', iconColor: 'bg-purple-500' },
    { amount: '405000', impact: 'Provides vocational training for one person', iconColor: 'bg-orange-500' },
    { amount: '810000', impact: 'Sponsors a community learning center for a month', iconColor: 'bg-red-500' },
  ],
  INR: [
    { amount: '2087', impact: 'Provides school supplies for 1 child for a month', iconColor: 'bg-green-500' },
    { amount: '4175', impact: 'Funds one week of after-school tutoring', iconColor: 'bg-blue-500' },
    { amount: '8350', impact: 'Supports a student with full educational materials', iconColor: 'bg-purple-500' },
    { amount: '20875', impact: 'Provides vocational training for one person', iconColor: 'bg-orange-500' },
    { amount: '41750', impact: 'Sponsors a community learning center for a month', iconColor: 'bg-red-500' },
  ],
};
