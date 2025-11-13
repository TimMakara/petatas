'use client';

import { useState } from 'react';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Halo! Saya Chatbot Pacu Jalur. Silakan tanya apa saja tentang sejarah Pacu Jalur.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setLoading(true);
    setInput('');
    // Dummy response
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { role: 'bot', text: getDummyAnswer(input) }
      ]);
      setLoading(false);
    }, 1200);
  };

  function getDummyAnswer(q) {
    // Jawaban dummy relevan
    if (/belanda|wilhelmina/i.test(q)) {
      return 'Pada masa penjajahan Belanda, Pacu Jalur diadakan untuk memperingati hari lahir Ratu Wilhelmina.';
    }
    if (/asal|sejarah|awal/i.test(q)) {
      return 'Pacu Jalur berasal dari tradisi masyarakat Kuantan Singingi, awalnya sebagai sarana transportasi sungai.';
    }
    if (/perahu|jalur/i.test(q)) {
      return 'Perahu Pacu Jalur berbentuk panjang, dihias ornamen kepala buaya atau ular, dan didayung bersama.';
    }
    if (/festival|modern|sekarang/i.test(q)) {
      return 'Sekarang, Pacu Jalur menjadi festival budaya yang mendunia dan kebanggaan masyarakat Riau.';
    }
    return 'Maaf, saya hanya bisa menjawab seputar sejarah Pacu Jalur. Silakan tanya hal lain tentang Pacu Jalur!';
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4" style={{background: '#F8F5F2'}}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col" style={{minHeight: 500}}>
        <h1 className="text-2xl font-bold mb-4 text-center" style={{color: '#473C8B'}}>Chatbot Pacu Jalur</h1>
        <div className="flex-1 overflow-y-auto mb-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'bot' ? 'text-left' : 'text-right'}>
              <span className={
                msg.role === 'bot'
                  ? 'inline-block bg-[#D4A373] text-white px-4 py-2 rounded-2xl'
                  : 'inline-block bg-[#473C8B] text-white px-4 py-2 rounded-2xl'
              }>
                {msg.text}
              </span>
            </div>
          ))}
          {loading && <div className="text-left"><span className="inline-block bg-[#D4A373] text-white px-4 py-2 rounded-2xl">Mengetik...</span></div>}
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            className="flex-1 border border-[#D4A373] rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Tulis pertanyaan..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="bg-[#FFC857] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60"
            disabled={loading || !input.trim()}
          >Kirim</button>
        </form>
      </div>
    </div>
  );
}
