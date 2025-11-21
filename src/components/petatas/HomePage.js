'use client';

import { useState } from 'react';
import { Star, Gift, Users, Target, Clock, ChevronRight, Zap, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const [userData] = useState({
    name: 'Budi Santoso',
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    totalPoints: 8750,
    streak: 7,
  });

  const dailyChallenges = [
    {
      id: 1,
      title: 'Campus Champion',
      description: 'Bayar 2x di area kampus',
      progress: 1,
      target: 2,
      reward: 150,
      icon: '🎓',
      timeLeft: '18j 24m',
    },
    {
      id: 2,
      title: 'Budget Tracker',
      description: 'Total belanja < Rp50.000',
      progress: 35000,
      target: 50000,
      reward: 100,
      icon: '💰',
      timeLeft: '18j 24m',
    },
    {
      id: 3,
      title: 'Social Sharer',
      description: 'Post story ke Instagram',
      progress: 0,
      target: 1,
      reward: 200,
      icon: '📱',
      timeLeft: '18j 24m',
    },
  ];

  const weeklyChallenges = [
    {
      id: 4,
      title: 'Diversity Explorer',
      description: 'Bayar di 5 kategori berbeda',
      progress: 3,
      target: 5,
      reward: 300,
      bonus: 'Rp30K',
      icon: '🌟',
      timeLeft: '4h 12j',
    },
    {
      id: 5,
      title: 'Streak Master',
      description: 'Gunakan QRIS 7 hari berturut-turut',
      progress: 5,
      target: 7,
      reward: 500,
      bonus: 'Rp50K',
      icon: '🔥',
      timeLeft: '4h 12j',
    },
    {
      id: 6,
      title: 'Community Builder',
      description: 'Ajak 3 teman bergabung',
      progress: 1,
      target: 3,
      reward: 600,
      bonus: 'Rp75K',
      icon: '👥',
      timeLeft: '4h 12j',
    },
  ];

  const referralStats = {
    total: 8,
    pending: 2,
    completed: 6,
    earnings: 900,
    cashEarnings: 90000,
    nextTier: 'Bronze Badge',
    nextTierAt: 10,
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">Halo, {userData.name.split(' ')[0]}! 👋</h1>
            <p className="text-orange-100 text-sm mt-1">Mari selesaikan tantangan hari ini</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2">
            <div className="text-xs text-orange-100">Total Poin</div>
            <div className="text-xl font-bold">{userData.totalPoints.toLocaleString('id-ID')}</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Level {userData.level}</span>
            <span className="text-xs text-orange-100">{userData.xp}/{userData.xpToNext} XP</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${(userData.xp / userData.xpToNext) * 100}%` }}
            />
          </div>
        </div>

        {/* Streak Badge */}
        <div className="mt-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 w-fit">
          <Zap className="text-yellow-300" size={20} fill="currentColor" />
          <span className="font-semibold">{userData.streak} Hari Streak!</span>
        </div>
      </div>

      {/* Daily Challenges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="text-orange-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Tantangan Harian</h2>
          </div>
          <div className="flex items-center gap-1 text-orange-600 text-sm">
            <Clock size={16} />
            <span>Reset: 18j 24m</span>
          </div>
        </div>

        <div className="space-y-3">
          {dailyChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} type="daily" />
          ))}
        </div>
      </div>

      {/* Weekly Challenges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-[#6379B9]" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Tantangan Mingguan</h2>
          </div>
          <div className="flex items-center gap-1 text-[#6379B9] text-sm">
            <Clock size={16} />
            <span>Reset: 4h 12j</span>
          </div>
        </div>

        <div className="space-y-3">
          {weeklyChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} type="weekly" />
          ))}
        </div>
      </div>

      {/* Referral Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Users size={28} />
          <h2 className="text-xl font-bold">Program Referral</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl font-bold">{referralStats.completed}</div>
            <div className="text-xs text-blue-100">Berhasil</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl font-bold">{referralStats.pending}</div>
            <div className="text-xs text-blue-100">Pending</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl font-bold">{referralStats.earnings}</div>
            <div className="text-xs text-blue-100">Total Poin</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-lg font-bold">Rp{(referralStats.cashEarnings / 1000).toFixed(0)}K</div>
            <div className="text-xs text-blue-100">Bonus Cash</div>
          </div>
        </div>

        {/* Progress to Next Tier */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{referralStats.nextTier}</span>
            <span className="text-xs text-blue-100">{referralStats.total}/{referralStats.nextTierAt} referral</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${(referralStats.total / referralStats.nextTierAt) * 100}%` }}
            />
          </div>
        </div>

        <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
          <Gift size={20} />
          Ajak Teman Sekarang
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function ChallengeCard({ challenge, type }) {
  const progress = (challenge.progress / challenge.target) * 100;
  const isComplete = challenge.progress >= challenge.target;

  return (
    <div className={`bg-white rounded-xl p-4 shadow-md border-2 ${
      isComplete ? 'border-green-400' : 'border-transparent'
    }`}>
      <div className="flex items-start gap-3">
        <div className="text-4xl">{challenge.icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-gray-800">{challenge.title}</h3>
            {isComplete && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                ✓ Selesai
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">
                Progress: {challenge.progress}/{challenge.target}
              </span>
              <span className="text-xs font-semibold text-orange-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${
                  isComplete ? 'bg-green-500' : 'bg-orange-500'
                } rounded-full h-2 transition-all duration-500`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Rewards */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-lg">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-semibold">{challenge.reward} poin</span>
              </div>
              {challenge.bonus && (
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                  <Gift size={16} />
                  <span className="text-sm font-semibold">{challenge.bonus}</span>
                </div>
              )}
            </div>
            {!isComplete && (
              <button className="text-orange-600 text-sm font-semibold hover:text-orange-700">
                Mulai →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
