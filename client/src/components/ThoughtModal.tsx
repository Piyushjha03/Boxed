import React, { useState } from 'react';
import axios from 'axios';

const ThoughtModal = ({ isOpen, onClose, username, endpoint }) => {
  const [thought, setThought] = useState("");
  const [restrictions, setRestrictions] = useState({
    repliesAllowed: true,
    postToCommunity: false,
    logVisible: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thought.trim()) {
      alert('Please enter a message.');
      return;
    }

    try {
      const response = await axios.post(`${endpoint}/addlogs`, {
        userName: username,
        message: thought,
        restrictions,
      });

      console.log('Log stored successfully:', response.data);
      setThought('');
      onClose();
    } catch (error) {
      console.error('Error storing log:', error.response?.data || error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Log Your Thought</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-emerald-300"
            rows={3}
            placeholder="Share your thoughts..."
            value={thought}
            onChange={(e) => setThought(e.target.value)}
          />
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={restrictions.repliesAllowed}
                onChange={(e) =>
                  setRestrictions((prev) => ({
                    ...prev,
                    repliesAllowed: e.target.checked,
                  }))
                }
              />
              <span className="ml-2">Allow replies</span>
            </label>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={restrictions.postToCommunity}
                onChange={(e) =>
                  setRestrictions((prev) => ({
                    ...prev,
                    postToCommunity: e.target.checked,
                  }))
                }
              />
              <span className="ml-2">Post to Community</span>
            </label>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={restrictions.logVisible}
                onChange={(e) =>
                  setRestrictions((prev) => ({
                    ...prev,
                    logVisible: e.target.checked,
                  }))
                }
              />
              <span className="ml-2">Visible in Log</span>
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
          >
            Submit
          </button>
        </form>
        <button
          className="mt-4 text-red-500 hover:underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ThoughtModal;