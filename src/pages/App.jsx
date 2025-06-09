import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    setVideo(null);
    try {
      const res = await axios.post("https://your-backend-url/download", { link: url });
      setVideo(res.data);
    } catch (err) {
      setError("❌ Failed to download video. Try another link.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">🎬 Video Downloader</h1>
      <input
        className="w-full max-w-md p-2 border rounded mb-2"
        placeholder="Paste YouTube, Instagram or X link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? "Processing..." : "Download"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {video && (
        <div className="mt-6 p-4 border rounded bg-white dark:bg-gray-800 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
          <p className="text-sm text-gray-500 mb-2">Size: {video.size}</p>
          <a
            href={video.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            📥 Download
          </a>
        </div>
      )}
    </div>
  );
}
