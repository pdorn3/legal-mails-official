export const EFSP_CONFIG = {
  serviceName: 'legal-mails',
  version: '0.1.0',
  environments: {
    test: {
      baseUrl: 'TBD_TYLER_TEST_BASEURL',
      description: 'Tyler EFM test',
    },
    prod: {
      baseUrl: 'TBD_TYLER_PROD_BASEURL',
      description: 'Tyler EFM production',
    },
  },
  defaultEnv: process.env.EFSP_ENV || 'test',
  defaultJurisdiction: 'TX',
  supportedJurisdictions: ['TX'],
  routing: {
    jurisdictions: [
      { jurisdiction: 'TX', backend: 'TYLER_EFM', enabled: true },
      { jurisdiction: 'GA', backend: 'TYLER_EFM', enabled: false },
      { jurisdiction: 'FL', backend: 'FLORIDA_PORTAL', enabled: false },
    ],
  },
  timeouts: {
    requestMs: 30000,
  },
  notes: 'Phase 1 placeholder config. Do not use for production filings.',
};
