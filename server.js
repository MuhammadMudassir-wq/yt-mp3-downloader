const express = require("express");
const ytdl = require("ytdl-core");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, "public")));

// Home route (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API route for downloading audio (MP3)
app.get("/download", async (req, res) => {
  try {
    const videoURL = req.query.url;
    if (!videoURL) return res.status(400).send("Please provide a YouTube URL using ?url=");

    // Validate and get info
    const info = await ytdl.getInfo(videoURL);
    // Clean title for filename
    const rawTitle = info.videoDetails && info.videoDetails.title ? info.videoDetails.title : "audio";
    const title = rawTitle.replace(/[^\w\s\-().]/gi, "").trim().slice(0, 200) || "audio";

    res.header("Content-Disposition", `attachment; filename="${title}.mp3"`);
    res.header("Content-Type", "audio/mpeg");

    // Stream audio only (note: this streams in original audio format — browser may save as .mp3)
    const stream = ytdl(videoURL, {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: 1 << 25, // increase buffer for large streams
    });

    stream.on("error", err => {
      console.error("ytdl stream error:", err);
      if (!res.headersSent) res.status(500).send("Error streaming audio.");
    });

    stream.pipe(res);

  } catch (err) {
    console.error("Download error:", err && err.message ? err.message : err);
    res.status(500).send("Error downloading audio. Make sure the URL is correct and try again.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
