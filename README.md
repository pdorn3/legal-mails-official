# Legal-Mails

Legal-Mails – EFSP infrastructure service for automated court filings .

## Quickstart

```bash
cd legal-mails
npm install
cp .env.example .env
npm run dev
```

The dev server will start on http://localhost:8081 by default.

> Note: This is Phase 0 scaffold only; EFSP integration and routing logic will be added in later phases.

## Phase 1 – EFSP scaffolding

Phase 1 adds the core EFSP scaffolding only:

- Contracts and helpers for filing operations
- Environment and routing config for EFSP backends
- Internal filing envelope builder (non-SOAP)
- SOAP client stub (no real Tyler integration yet)
- EFSP service layer and minimal API endpoints

### Endpoints

- `GET /api/efsp/status?jurisdiction=GA`
- `POST /api/efsp/submit`

### Examples

```bash
curl "http://localhost:8081/api/efsp/status?jurisdiction=GA"
```

```bash
curl -X POST "http://localhost:8081/api/efsp/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "jurisdiction": "GA",
    "caseType": "CIVIL",
    "filingType": "COMPLAINT",
    "filer": {
      "name": "Test Filer",
      "email": "filer@example.com",
      "phone": "555-555-5555"
    },
    "documents": [
      {
        "name": "complaint.pdf",
        "mimeType": "application/pdf",
        "contentBase64": "BASE64_PLACEHOLDER"
      }
    ],
    "metadata": {}
  }'
```
