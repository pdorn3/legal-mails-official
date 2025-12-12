# Texas ECF5 Message Contracts (High-Level)

> Internal reference only – no generated clients, no WSDL/XSD parsing in this phase.

## Core Operations (TX)

Tyler ECF5 expectations for Texas center around the following operations:

- `SubmitFiling`
- `GetFilingStatus`
- `CancelFiling` (if required by certification scope)

## SubmitFiling – Conceptual Contract

**Input (from Legal-Mails to Tyler):**

- Jurisdiction: `"TX"`
- Case information:
  - Case type / category
  - Existing case number or new-case indicators
- Filing information:
  - Filing type
  - Filing code(s)
  - Requested fees (if present)
- Filer information:
  - Name, email, phone
  - Role (e.g., attorney, self-represented)
- Documents:
  - List of documents with name, MIME type, and content (base64)
  - Flags (lead/supporting, sealed, sensitive, etc.)
- Metadata:
  - Free-form attributes for routing, audit, and testing

**Output (from Tyler to Legal-Mails):**

- Status: submitted / accepted / rejected / error
- Filing identifiers:
  - Filing reference / tracking ID
  - Court-assigned identifiers when available
- Message text / codes indicating success or failure
- Optional fee / payment information

Determinism requirements:

- Given the same input (including timestamps where applicable) in TX_CERT_MODE, the response shape and key fields should be deterministic and repeatable for certification scenarios.

## GetFilingStatus – Conceptual Contract

**Input:**

- Jurisdiction: `"TX"`
- Filing identifier(s): correlationId or Tyler-specific IDs

**Output:**

- Current status: submitted / processing / accepted / rejected / error
- Timestamps (submitted, processed, completed)
- Any additional error / warning codes

## CancelFiling – Conceptual Contract (If Required)

**Input:**

- Jurisdiction: `"TX"`
- Filing identifier(s) to cancel
- Reason / justification text

**Output:**

- Result: cancelled / not-cancellable / error
- Message text / codes

## Tyler vs. Legal-Mails Responsibilities

**Tyler validates (examples):**

- ECF5 / EFM schema compliance
- Court / location codes
- Filing type / code compatibility with courts
- Envelope and message-level constraints

**Legal-Mails must ensure (examples):**

- Required fields are present and correctly typed
- Jurisdiction is set to `"TX"` for TX flows
- Deterministic generation of correlationId and any idempotency keys
- Proper logging of correlationId, jurisdiction, filingType, and payload hash (especially in TX_CERT_MODE)

**Tyler may ignore (or treat as opaque):**

- Internal metadata used only by Legal-Mails routing
- Non-standard debug/test flags used in TX_CERT_MODE

## Determinism for Certification

For certification, Tyler will expect:

- Repeatable behavior for the same test cases
- Stable mapping from inputs to outputs (status, codes, key IDs)
- Clear separation between validation failures (client-side) and system errors

TX_CERT_MODE is responsible for providing deterministic mock responses without making any real SOAP or network calls.
