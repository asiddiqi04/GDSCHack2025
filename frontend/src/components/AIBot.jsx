import { useState } from 'react';
import axios from 'axios';

function AIBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:8002/chat/chat_recommend',
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botReply = { from: 'bot', text: res.data.message };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Error getting response';
      setMessages((prev) => [...prev, { from: 'bot', text: `❌ ${errorMsg}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white shadow-xl rounded-2xl border border-green-200 z-50">
      <div className="p-4 border-b font-semibold bg-gradient-to-r from-green-200 to-green-100 rounded-t-2xl text-green-900">
        💬 Ask GreenBot
      </div>
      <div className="p-4 h-72 overflow-y-auto space-y-3 bg-green-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-xl shadow text-sm ${
                msg.from === 'user'
                  ? 'bg-green-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <div className="inline-block px-4 py-2 rounded-xl bg-gray-100 text-gray-600 italic animate-pulse shadow">
              Typing...
            </div>
          </div>
        )}
      </div>
      <div className="flex border-t border-green-100 bg-white rounded-b-2xl">
        <input
          className="flex-grow p-3 text-sm border-none focus:outline-none rounded-bl-2xl"
          type="text"
          placeholder="Ask about your favourite products..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`transition px-5 text-sm rounded-br-2xl ${
            loading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AIBot;
