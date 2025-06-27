"use client";

import { useEffect, useRef, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function LiveTranscriber() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recorderRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    const wsUrl = BACKEND_URL.replace(/^http/, "ws") + "/ws?meeting_id=mobile-demo&user_id=mobile-user";
    const socket = new WebSocket(wsUrl);
    wsRef.current = socket;
    return () => socket.close();
  }, []);

  const startListening = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorderRef.current = recorder;

    recorder.ondataavailable = async (e) => {
      if (e.data.size > 0) {
        const res = await fetch(`${BACKEND_URL}/transcribe_audio`, {
          method: "POST",
          body: await e.data.arrayBuffer(),
        });
        const json = await res.json();
        if (json.transcript) {
          setTranscript((prev) => prev + json.transcript + " ");
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(
              JSON.stringify({ type: "transcript_update", data: json.transcript })
            );
            wsRef.current.send(
              JSON.stringify({
                type: "check_suggestion",
                data: {
                  transcript: json.transcript,
                  user_id: "mobile-user",
                  isFileUploaded: false,
                  custom_prompt: localStorage.getItem("proactivePrompt") || "",
                },
              })
            );
          }
        }
      }
    };

    recorder.start(3000); // send chunks every 3s
    setListening(true);
  };

  const stopListening = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
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
