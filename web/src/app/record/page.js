"use client";

import LiveTranscriber from "@/components/LiveTranscriber";

export default function RecordPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <LiveTranscriber />
    </div>
  );
}
