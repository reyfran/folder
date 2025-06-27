"use client";

import { useEffect, useRef, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function LiveTranscriber() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    const wsUrl = BACKEND_URL.replace(/^http/, "ws") + "/ws?meeting_id=mobile-demo&user_id=mobile-user";
    const socket = new WebSocket(wsUrl);
    wsRef.current = socket;
    return () => socket.close();
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += text + " ";
        }
      }
      if (finalText) {
        setTranscript((prev) => prev + finalText);
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: "transcript_update",
            data: finalText,
          }));
          wsRef.current.send(JSON.stringify({
            type: "check_suggestion",
            data: {
              transcript: finalText,
              user_id: "mobile-user",
              isFileUploaded: false,
              custom_prompt: localStorage.getItem("proactivePrompt") || "",
            },
          }));
        }
      }
    };
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  };

  return (
    <div className="p-4 text-center">
      <button
        className="px-4 py-2 bg-purple-700 text-white rounded"
        onClick={listening ? stopListening : startListening}
      >
        {listening ? "Stop Recording" : "Start Recording"}
      </button>
      <pre className="mt-4 whitespace-pre-wrap text-left">{transcript}</pre>
    </div>
  );
}
