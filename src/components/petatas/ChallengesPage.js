'use client';

import { useState } from 'react';
import { Star, Gift, Users, Target, Clock, ChevronRight, Zap, Calendar, GraduationCap, Wallet, Share2, Sparkles, Flame, HandHeart } from 'lucide-react';

export default function ChallengesPage() {
  const [userData] = useState({
    name: 'Yosua Wenda',
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
      icon: 'GraduationCap',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      timeLeft: '18j 24m',
    },
    {
      id: 2,
      title: 'Budget Tracker',
      description: 'Total belanja < Rp50.000',
      progress: 35000,
      target: 50000,
      reward: 100,
      icon: 'Wallet',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      timeLeft: '18j 24m',
      showCurrency: true,
    },
    {
      id: 3,
      title: 'Social Sharer',
      description: 'Post story ke Instagram',
      progress: 0,
      target: 1,
      reward: 200,
      icon: 'Share2',
      iconColor: 'text-[#E29B06]',
      iconBg: 'bg-[#E29B06]/10',
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
      icon: 'Sparkles',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
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
      icon: 'Flame',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
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
      icon: 'Users',
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
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
    <div className="p-4 space-y-6 bg-white w-full">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#E29B06] to-[#6379B9] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Halo, Kaka {userData.name.split(' ')[0]}!</h1>
              <HandHeart size={24} className="text-white" />
            </div>
            <p className="text-white/80 text-sm mt-1">Mari selesaikan tantangan hari ini</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2">
            <div className="text-xs text-white/80">Total Poin</div>
            <div className="text-xl font-bold">{userData.totalPoints.toLocaleString('id-ID')}</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Level {userData.level}</span>
            <span className="text-xs text-white/80">{userData.xp}/{userData.xpToNext} XP</span>
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
            <Target className="text-[#E29B06]" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Tantangan Harian</h2>
          </div>
          <div className="flex items-center gap-1 text-[#E29B06] text-sm">
            <Clock size={16} />
            <span>18j 24m</span>
          </div>
        </div>

        <div className="space-y-3">
          {dailyChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>

      {/* Weekly Challenges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="text-[#6379B9]" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Tantangan Mingguan</h2>
          </div>
          <div className="flex items-center gap-1 text-[#6379B9] text-sm">
            <Clock size={16} />
            <span>4h 12j</span>
          </div>
        </div>

        <div className="space-y-3">
          {weeklyChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>

      {/* Referral Section */}
      <div className="bg-gradient-to-br from-[#6379B9] to-[#E29B06] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Users size={28} />
          <h2 className="text-xl font-bold">Program Referral</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl font-bold">{referralStats.completed}</div>
            <div className="text-xs text-white/80">Berhasil</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl font-bold">{referralStats.pending}</div>
            <div className="text-xs text-white/80">Pending</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl font-bold">{referralStats.earnings}</div>
            <div className="text-xs text-white/80">Total Poin</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-lg font-bold">Rp{(referralStats.cashEarnings / 1000).toFixed(0)}K</div>
            <div className="text-xs text-white/80">Bonus Cash</div>
          </div>
        </div>

        {/* Progress to Next Tier */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{referralStats.nextTier}</span>
            <span className="text-xs text-white/80">{referralStats.total}/{referralStats.nextTierAt} referral</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${(referralStats.total / referralStats.nextTierAt) * 100}%` }}
            />
          </div>
        </div>

        <button className="w-full bg-white text-[#6379B9] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <Gift size={20} />
          Ajak Teman Sekarang
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function ChallengeCard({ challenge }) {
  const progress = challenge.showCurrency
    ? (challenge.progress / challenge.target) * 100
    : (challenge.progress / challenge.target) * 100;
  const isComplete = challenge.progress >= challenge.target;

  const formatProgress = () => {
    if (challenge.showCurrency) {
      return `Rp${(challenge.progress / 1000).toFixed(0)}K / Rp${(challenge.target / 1000).toFixed(0)}K`;
    }
    return `${challenge.progress}/${challenge.target}`;
  };

  const iconMap = {
    GraduationCap: GraduationCap,
    Wallet: Wallet,
    Share2: Share2,
    Sparkles: Sparkles,
    Flame: Flame,
    Users: Users,
  };

  const IconComponent = iconMap[challenge.icon];

  return (
    <div className={`bg-white rounded-xl p-4 shadow-md border-2 transition-all ${
      isComplete ? 'border-green-400 bg-green-50' : 'border-transparent'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-xl ${challenge.iconBg} flex items-center justify-center`}>
          <IconComponent className={challenge.iconColor} size={28} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-gray-800">{challenge.title}</h3>
            {isComplete && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                ✓ Selesai
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">
                Progress: {formatProgress()}
              </span>
              <span className="text-xs font-semibold text-[#E29B06]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${
                  isComplete ? 'bg-green-500' : 'bg-[#E29B06]'
                } rounded-full h-2 transition-all duration-500`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Rewards */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#E29B06]/10 text-[#E29B06] px-3 py-1 rounded-lg">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-semibold">{challenge.reward} poin</span>
              </div>
              {challenge.bonus && (
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg">
                  <Gift size={14} />
                  <span className="text-xs font-semibold">{challenge.bonus}</span>
                </div>
              )}
            </div>
            {!isComplete && (
              <button className="text-[#E29B06] text-sm font-semibold hover:text-[#E29B06]/80 flex items-center gap-1">
                Mulai
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
