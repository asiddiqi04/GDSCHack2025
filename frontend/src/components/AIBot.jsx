import { useState } from 'react';

function AIBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { from: 'user', text: input },
        { from: 'bot', text: 'This is a mock reply for now.' }
      ]);
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-lg rounded-xl border border-gray-300 z-50">
      <div className="p-4 border-b font-semibold bg-green-100 rounded-t-xl">💬 Ask GreenBot</div>
      <div className="p-4 h-64 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.from === 'user' ? 'text-right' : 'text-left'}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.from === 'user' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex border-t">
        <input
          className="flex-grow p-2 border-none focus:outline-none rounded-bl-xl"
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-br-xl">
          Send
        </button>
      </div>
    </div>
  );
}

export default AIBot;
