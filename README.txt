YT MP3 Downloader - Simple Local App
-------------------------------------
What you got: a small Node.js project that serves a webpage and provides an API
endpoint to stream and download YouTube audio.

Files included:
- server.js            -> Express server and download endpoint
- public/index.html    -> Simple UI to paste URL and download
- README.txt           -> these instructions

How to run (copy & paste into your terminal):
1) Open a terminal and go to the folder where you extracted the project.
2) Run:
   npm init -y
   npm i express ytdl-core
3) Start the server:
   node server.js
4) Open in browser:
   http://localhost:4000
5) Paste a YouTube URL and click "Download MP3".

Important notes:
- This streams audio from YouTube. Do NOT use to infringe copyright.
- Some videos (age-restricted / private / region-blocked) may not stream.
- If you deploy to a public server, ensure you understand legal and bandwidth implications.

If you want, tell me and I can:
- Add MP4 (video) download endpoint.
- Add a ZIP or batch download option.
- Provide a ready-to-run Dockerfile.
