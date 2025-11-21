'use client';

import { useState } from 'react';
import ChallengesPage from '@/components/petatas/ChallengesPage';
import LeaderboardPage from '@/components/petatas/LeaderboardPage';
import PointsPage from '@/components/petatas/PointsPage';
import ChatbotPage from '@/components/petatas/ChatbotPage';
import ProfilePage from '@/components/petatas/ProfilePage';
import { Home, Trophy, Coins, MessageCircle, User } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('challenges');

  const renderContent = () => {
    switch (activeTab) {
      case 'challenges':
        return <ChallengesPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'points':
        return <PointsPage />;
      case 'chatbot':
        return <ChatbotPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <ChallengesPage />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
      {/* Mobile Container */}
      <div className="relative w-full max-w-[430px] h-full bg-white flex flex-col shadow-2xl">
        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-16">
          {renderContent()}
        </div>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="grid grid-cols-5 h-14">
            <button
              onClick={() => setActiveTab('challenges')}
              className={`flex flex-col items-center justify-center transition-all ${
                activeTab === 'challenges'
                  ? 'text-[#E29B06]'
                  : 'text-gray-400'
              }`}
            >
              <Home size={20} strokeWidth={activeTab === 'challenges' ? 2.5 : 2} />
              <span className="text-[9px] mt-0.5 font-medium">Tantangan</span>
            </button>

            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex flex-col items-center justify-center transition-all ${
                activeTab === 'leaderboard'
                  ? 'text-[#E29B06]'
                  : 'text-gray-400'
              }`}
            >
              <Trophy size={20} strokeWidth={activeTab === 'leaderboard' ? 2.5 : 2} />
              <span className="text-[9px] mt-0.5 font-medium">Peringkat</span>
            </button>

            <button
              onClick={() => setActiveTab('points')}
              className={`flex flex-col items-center justify-center transition-all ${
                activeTab === 'points'
                  ? 'text-[#E29B06]'
                  : 'text-gray-400'
              }`}
            >
              <Coins size={20} strokeWidth={activeTab === 'points' ? 2.5 : 2} />
              <span className="text-[9px] mt-0.5 font-medium">Poin</span>
            </button>

            <button
              onClick={() => setActiveTab('chatbot')}
              className={`flex flex-col items-center justify-center transition-all ${
                activeTab === 'chatbot'
                  ? 'text-[#E29B06]'
                  : 'text-gray-400'
              }`}
            >
              <MessageCircle size={20} strokeWidth={activeTab === 'chatbot' ? 2.5 : 2} />
              <span className="text-[9px] mt-0.5 font-medium">Kaka AI</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center transition-all ${
                activeTab === 'profile'
                  ? 'text-[#E29B06]'
                  : 'text-gray-400'
              }`}
            >
              <User size={20} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
              <span className="text-[9px] mt-0.5 font-medium">Profil</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
