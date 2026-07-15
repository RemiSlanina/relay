# Infrastructure

## Metro / ENOSPC investigation (2026-07-15)

### Symptoms

Metro failed with:

```
ENOSPC: System limit for number of file watchers reached
```

Jest tests still passed.

### Observed recovery

The following combination restored Metro:

```bash
rm -rf node_modules
rm package-lock.json
npm install
reboot
```

Restarting alone did **not** resolve the issue.

### Environment

| Component | Version |
| --------- | ------- |
| Node      | 24.18.0 |
| npm       | 11.16.0 |
| Expo CLI  | 54.0.26 |

### Linux inotify

| Setting            | Value |
| ------------------ | ----: |
| max_user_watches   | 65536 |
| max_user_instances |   128 |
| max_queued_events  | 16384 |

Active inotify file descriptors after reboot:

```
70
```

### Observation

The root cause is still unknown.

The issue may be related to Linux inotify limits or Metro's watcher state.
