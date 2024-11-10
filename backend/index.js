const express = require("express")
const Stream = require("node-rtsp-stream")
const cors = require("cors")

const app = express()
const port = 3002
let stream = null

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.get("/stream", async (req, res) => {
  const newRtspStreamUrl = req.query.rtsp;
  let currentRtspStreamUrl = "rtsp://enes:123@10.33.235.82:8080/h264_ulaw.sdp";

  if (newRtspStreamUrl === "stop") {
    if (stream) {
      stream.stop();
      stream = null; // Clear the stream reference to avoid reuse
    }
    return res.status(200).json({ message: "Stream stopped" }); // Send the response and return
  }

  if (!stream || currentRtspStreamUrl !== newRtspStreamUrl) {
    if (stream) {
      stream.stop(); // Stop the existing stream if the URL has changed
    }
    stream = new Stream({
      name: "Camera Stream",
      streamUrl: newRtspStreamUrl,
      wsPort: 9999,
    });
    currentRtspStreamUrl = newRtspStreamUrl;
  }

  return res.status(200).json({ url: `ws://127.0.0.1:9999` }); // Send the response and return
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
