# ADR-001

> If the project grows beyond about 10 architecture decisions, consider replacing a single decisions.md file with a dedicated docs/decisions/ folder, where each Architecture Decision Record (ADR) is stored as its own document. This keeps decisions short, easy to reference, and easier to maintain over time.

Card updates with unknown IDs are ignored.

Reason:

The UI should never crash because of stale state.

Development builds may later emit warnings.

---

# ADR-002

Relay is offline-first.

Cloud synchronization is optional.

Offline functionality is never dependent on an account.
