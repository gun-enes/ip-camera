import React, { useEffect, useState } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import axios from "axios";

const StreamPlayer = () => {
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [uri, setUri] = useState("");
  

  useEffect(() => {
    const url = 'ws://127.0.0.1:9999';
    const canvas = document.getElementById("video-canvas");
    new JSMpeg.Player(url, { canvas: canvas });
  }, []);

  const httpRequest = (url) => {
    axios.get(`http://127.0.0.1:3002/stream?rtsp=${url}`);
  };

  const startRTSPFeed = () => {
    httpRequest("rtsp://" + user + ":" + password + "@" + ip + ":" + port + "/" + uri);
  };

  const stopRTSPFeed = () => {
    httpRequest("stop");
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP address"
          style={{ marginBottom: "10px", width: "100%" }}
        />
      </div>
      <div>
        <input
          type="text"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder="Enter Port Number"
          style={{ marginBottom: "10px", width: "100%" }}
        />
      </div>
      <div>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter User"
          style={{ marginBottom: "10px", width: "100%" }}
        />
      </div>
      <div>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          style={{ marginBottom: "10px", width: "100%" }}
        />
      </div>
      <div>
        <input
          type="text"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
          placeholder="Enter Uri"
          style={{ marginBottom: "10px", width: "100%" }}
        />
      </div>
      <div>
        <canvas
          id="video-canvas"
          style={{
            width: "960px",  // Set desired width
            height: "540px", // Set desired height
            border: "1px solid #ccc",
          }}
        ></canvas>
      </div>
      <div>
        <button onClick={startRTSPFeed}>Start RTSP Feed</button>
        <button onClick={stopRTSPFeed}>Stop RTSP Feed</button>
      </div>
    </div>
  );
};

export default StreamPlayer;
