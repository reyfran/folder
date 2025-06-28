# Amurex

Amurex is a multi-component web application that provides real-time meeting assistance through AI. The project consists of:

- **backend/** – A Python server built with [Robyn](https://github.com/dashwav/robyn). It processes meeting transcripts, stores data in Supabase and generates notes or suggestions on the fly.


Each subdirectory contains its own README with detailed setup instructions. To get started quickly:

1. Configure and run the **backend** (see `backend/README.md`).


### Running in GitHub Codespaces

The repository ships with a `.devcontainer` configuration so you can spin up a working environment with a single click. When you open a Codespace, dependencies for the backend and web app will be installed automatically. Simply run the backend and start the Next.js dev server:

```bash
python backend/index.py
npm run dev --prefix web
```
