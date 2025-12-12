# Texas EFSP Certification – Readiness Checklist

> Internal planning document for Legal-Mails. TX-only, test/non-production environments.

## Registration & Environment

- EFSP registration with Texas (Tyler)
- Use **test / certification** environment only (no production endpoints)
- Confirm Tyler-provided tenant / environment identifiers (placeholders)
- Document any IP allowlisting requirements (if applicable)

## Required Message Types

- `SubmitFiling`
- `GetFilingStatus`
- `CancelFiling` (if required by TX certification scope)

## Envelope & Payload Validation

- Envelope structure conforms to ECF5 / EFM 2025.2 schemas (Tyler artifacts)
- Required filing metadata present (case type, filing type, court/location, filer info, etc.)
- Documents:
  - At least one primary document
  - Allowed MIME types only
  - Size limits respected (per Tyler spec)
- Consistent correlationId generation per submission

## Court / Location Codes (Placeholders)

- Maintain a TX-specific mapping of:
  - Court codes
  - Location / venue codes
  - Case category / type mappings
- Source of truth: Tyler-provided reference docs (TBD)

## Error Handling Expectations

- Distinguish between:
  - Client/validation errors (e.g., schema violations, missing required fields)
  - Business rule errors (e.g., invalid court code, filing type not allowed)
  - System errors (e.g., timeout, downstream unavailability)
- Provide clear error messages and consistent error codes
- Correlate errors with correlationId for auditability

## Retry & Idempotency

- Define when retries are allowed (e.g., transient system errors only)
- Ensure duplicate submissions (same correlationId / payload hash) do not create duplicate filings
- Capture and log idempotency keys / correlationIds for certification traces

## Test Coverage for Certification

- Positive flows for each required message type
- Negative/edge cases for validation and business rules
- Deterministic mock behavior in TX_CERT_MODE for local and pre-cert testing
