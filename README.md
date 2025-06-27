# Amurex

Amurex is a multi-component application that provides real-time meeting assistance through AI. The project consists of:

- **backend/** – A Python server built with [Robyn](https://github.com/dashwav/robyn). It processes meeting transcripts, stores data in Supabase and generates notes or suggestions on the fly.
- **extension/** – A browser extension for Google Meet and Microsoft Teams that captures live captions and sends them to the backend.
- **web/** – A Next.js site for reviewing meetings, uploading materials and managing settings.

Each subdirectory contains its own README with detailed setup instructions. To get started quickly:

1. Configure and run the **backend** (see `backend/README.md`).
2. Install the **extension** in your browser (see `extension/README.md`).
3. Launch the **web** app for viewing notes and settings (see `web/README.md`).
4. Use the `/record` page to capture audio directly from a supported browser.
5. Set your proactive meeting prompt under the settings page.

Both the backend and extension are licensed under the AGPLv3. If you host a modified version, you must provide the complete corresponding source code to your users.
