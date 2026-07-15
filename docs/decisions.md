# ADR-001

Card updates with unknown IDs are ignored.

Reason:

The UI should never crash because of stale state.

Development builds may later emit warnings.

---

# ADR-002

Relay is offline-first.

Cloud synchronization is optional.

Offline functionality is never dependent on an account.
