import { ArrowLeft, ArrowRight } from "lucide-react"; 
import { useState } from "react";

interface ThoughtModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  endpoint: string;
}

export default function ThoughtModal({ isOpen, onClose, username, endpoint }: ThoughtModalProps) {
  const [thought, setThought] = useState("");
  const [restrictions] = useState({
    repliesAllowed: true,
    postToCommunity: false,
    logVisible: true,
  });

  const handleSubmit = async () => {
    if (!thought.trim()) return;

    try {
      const response = await fetch(`${endpoint}/addlogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          message: thought,
          restrictions,
        }),
      });

      if (!response.ok) throw new Error("Failed to store log");

      setThought("");
      onClose();
    } catch (error) {
      console.error("Error storing log:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50">
      {/* Top Navbar with Home/Box button */}
      <div className="flex items-center justify-between px-6 py-4 shadow-md">
        <button onClick={onClose} className="hover:opacity-75 transition-opacity">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-emerald-600">THE BOX</h1>
        <div className="w-6" /> {/* Empty space to balance UI */}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow justify-center items-center px-6">
        <h1 className="text-4xl font-semibold text-center mb-12 leading-tight">
          Share your thoughts,
          <br />
          find your community
        </h1>

        <div className="relative w-full max-w-xl">
          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="Write your thought (only text)"
            className="w-full min-h-[100px] p-4 bg-[#FAF6F0] text-base placeholder:text-gray-500 border-none rounded-lg focus:outline-none focus:ring-0"
          />
          <button
            onClick={handleSubmit}
            disabled={!thought.trim()}
            className={`absolute bottom-3 right-3 p-2 h-auto rounded-full transition-colors ${
              thought.trim() ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-gray-400 text-gray-200"
            }`}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

