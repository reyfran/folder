# Amurex

Amurex is a multi-component web application that provides real-time meeting assistance through AI. The project consists of:

- **backend/** – A Python server built with [Robyn](https://github.com/dashwav/robyn). It processes meeting transcripts, stores data in Supabase and generates notes or suggestions on the fly.
- **extension/** – A browser extension for Google Meet and Microsoft Teams that captures live captions and forwards them to the backend. Using the extension is optional if you record audio directly through the web app.
- **web/** – A Next.js site for recording meetings, uploading materials and managing settings.

Each subdirectory contains its own README with detailed setup instructions. To get started quickly:

1. Configure and run the **backend** (see `backend/README.md`).
2. Install the optional **extension** if you want automatic caption capture (see `extension/README.md`).
3. Launch the **web** app for recording meetings and adjusting settings (see `web/README.md`).
4. Use the `/record` page to capture audio directly from your browser.
5. Set your proactive meeting prompt under the settings page.

The backend, extension and web folders are licensed under the AGPLv3. If you host a modified version, you must provide the complete corresponding source code to your users.

### Running in GitHub Codespaces

The repository ships with a `.devcontainer` configuration so you can spin up a working environment with a single click. When you open a Codespace, dependencies for the backend and web app will be installed automatically. Simply run the backend and start the Next.js dev server:

```bash
python backend/index.py
npm run dev --prefix web
```
