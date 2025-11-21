'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Camera, Paperclip, Phone, X, Bot, User, Lightbulb } from 'lucide-react';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Halo! Saya Kaka AI, asisten virtual PETATAS. Ada yang bisa saya bantu? 😊',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    { id: 1, text: 'Cara scan QR QRIS?', icon: '📱' },
    { id: 2, text: 'Merchant terdekat', icon: '📍' },
    { id: 3, text: 'Cara dapat poin?', icon: '⭐' },
    { id: 4, text: 'Tutorial transaksi', icon: '🎓' },
    { id: 5, text: 'Bantuan teknis', icon: '🔧' },
  ];

  const suggestedTopics = [
    { id: 1, icon: '💰', title: 'Cara Transaksi', desc: 'Panduan lengkap QRIS' },
    { id: 2, icon: '🏆', title: 'Tantangan', desc: 'Info challenge & poin' },
    { id: 3, icon: '🎁', title: 'Tukar Hadiah', desc: 'Redeem poin kamu' },
    { id: 4, icon: '👥', title: 'Referral', desc: 'Ajak teman dapat bonus' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text = inputText) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: text,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInputText('');
    setShowQuickReplies(false);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userText) => {
    const text = userText.toLowerCase();

    if (text.includes('scan') || text.includes('qr')) {
      return 'Untuk scan QRIS:\n\n1. Buka aplikasi PETATAS\n2. Tekan tombol "Scan QR" di halaman utama\n3. Arahkan kamera ke QR Code merchant\n4. Masukkan nominal pembayaran\n5. Konfirmasi transaksi\n\nSudah paham? Ada yang masih bingung? 😊';
    }

    if (text.includes('merchant') || text.includes('terdekat')) {
      return 'Saya menemukan 12 merchant QRIS terdekat dari lokasi kamu:\n\n📍 Warung Makan Mama Yuli (50m)\n📍 Kopi Papua Kakak John (120m)\n📍 Toko Sembako Keluarga Wenda (200m)\n\nMau lihat semua merchant? Atau butuh info spesifik? 🗺️';
    }

    if (text.includes('poin') || text.includes('point')) {
      return 'Cara dapat poin di PETATAS:\n\n✅ Setiap transaksi QRIS = 50 poin\n✅ Selesaikan daily challenge = 50-200 poin\n✅ Weekly challenge = 300-600 poin\n✅ Ajak teman = 150 poin + bonus cash\n✅ Review merchant = 25 poin\n\nPoin kamu sekarang: 8,750 poin 🎉\n\nMau tau cara tukar poin? 💰';
    }

    if (text.includes('tutorial') || text.includes('cara')) {
      return 'Saya punya tutorial lengkap untuk:\n\n1️⃣ Cara bertransaksi QRIS\n2️⃣ Menyelesaikan challenge\n3️⃣ Program referral\n4️⃣ Tukar poin jadi hadiah\n\nMau belajar yang mana dulu? Pilih nomor 1-4 ya! 🎓';
    }

    if (text.includes('bantuan') || text.includes('help') || text.includes('masalah')) {
      return 'Saya di sini untuk bantu! 🤝\n\nMasalah umum:\n• Transaksi gagal\n• QR tidak terbaca\n• Poin belum masuk\n• Lupa password\n\nCoba ceritakan masalah kamu lebih detail, atau hubungi customer service kami di WA: 0812-3456-7890 📱';
    }

    return 'Terima kasih sudah bertanya! 😊 Bisa jelaskan lebih detail apa yang kamu butuhkan? Atau coba pilih topik bantuan di bawah ini:\n\n• Cara transaksi QRIS\n• Info merchant terdekat\n• Cara dapat poin\n• Tutorial lengkap\n• Bantuan teknis';
  };

  const handleQuickReply = (text) => {
    handleSendMessage(text);
  };

  return (
    <div className="h-full flex flex-col bg-white w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6379B9] to-[#E29B06] text-white p-4 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold">Kaka AI</h1>
              <div className="flex items-center gap-1 text-xs text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Online 24/7</span>
              </div>
            </div>
          </div>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Phone size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-md mx-auto w-full">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex items-start gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {showQuickReplies && messages.length <= 1 && (
        <div className="px-4 pb-2 max-w-md mx-auto w-full">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-amber-600" />
            <span className="text-sm text-gray-600 font-medium">Topik Populer:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickReplies.map((reply) => (
              <button
                key={reply.id}
                onClick={() => handleQuickReply(reply.text)}
                className="flex-shrink-0 bg-white text-gray-700 px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-[#6379B9]/10 transition-all text-sm font-medium border border-gray-200"
              >
                <span className="mr-1">{reply.icon}</span>
                {reply.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Topics */}
      {messages.length <= 1 && (
        <div className="px-4 pb-4 max-w-md mx-auto w-full">
          <div className="grid grid-cols-2 gap-2">
            {suggestedTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleQuickReply(topic.title)}
                className="bg-white rounded-xl p-3 shadow-md hover:shadow-lg hover:bg-[#6379B9]/10 transition-all text-left"
              >
                <div className="text-2xl mb-1">{topic.icon}</div>
                <div className="font-semibold text-sm text-gray-800">{topic.title}</div>
                <div className="text-xs text-gray-500">{topic.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2">
            {/* Voice Button */}
            <button className="w-10 h-10 bg-[#6379B9]/10 text-[#6379B9] rounded-full flex items-center justify-center hover:bg-[#6379B9]/20 transition-colors flex-shrink-0">
              <Mic size={20} />
            </button>

            {/* Camera Button */}
            <button className="w-10 h-10 bg-[#E29B06]/10 text-[#E29B06] rounded-full flex items-center justify-center hover:bg-[#E29B06]/20 transition-colors flex-shrink-0">
              <Camera size={20} />
            </button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ketik pesan..."
                className="w-full px-4 py-3 pr-10 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6379B9]"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Paperclip size={20} />
              </button>
            </div>

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                inputText.trim()
                  ? 'bg-gradient-to-r from-[#6379B9] to-[#E29B06] text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>

          <div className="mt-2 text-center">
            <p className="text-xs text-gray-500">
              Kaka AI siap membantu dalam Bahasa Indonesia & Bahasa Papua
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex items-start gap-2 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 ${
          isBot ? 'bg-[#6379B9]' : 'bg-[#E29B06]'
        }`}
      >
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>

      {/* Message */}
      <div className="flex-1 max-w-[75%]">
        <div
          className={`rounded-2xl px-4 py-3 shadow-md ${
            isBot
              ? 'bg-white text-gray-800 rounded-tl-none'
              : 'bg-gradient-to-r from-[#E29B06] to-[#6379B9] text-white rounded-tr-none'
          }`}
        >
          <p className="text-sm whitespace-pre-line">{message.text}</p>
        </div>
        <div className="mt-1 px-2">
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
