# Contributing

Setup
- Copy the environment template from .env.example to .env.local (do not commit the real credentials).
- Populate the Firebase config values in the environment. For local development with Vite, use the VITE_FIREBASE_* keys in your .env.local:
  - VITE_FIREBASE_API_KEY
  - VITE_FIREBASE_AUTH_DOMAIN
  - VITE_FIREBASE_PROJECT_ID
  - VITE_FIREBASE_STORAGE_BUCKET
  - VITE_FIREBASE_MESSAGING_SENDER_ID
  - VITE_FIREBASE_APP_ID
  - VITE_FIREBASE_MEASUREMENT_ID
- Run locally: npm install, then npm run dev

CI
- This project uses GitHub Actions. A CI workflow is included at .github/workflows/ci.yml.
- Secrets: For deployments or tests that require credentials, configure repository secrets in GitHub (Settings > Secrets and variables) and reference them via environment variables in your CI as needed.

What to work on next
- [ ] Add tests for core hooks/components
- [ ] Improve README with local setup examples and CI notes
- [ ] Add optional TypeScript types to data models (TOPICS, NOTES)
- [ ] Consider adding a small seed script to bootstrap Firestore data for new repos
