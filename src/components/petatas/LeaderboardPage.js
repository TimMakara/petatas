'use client';

import { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Users, UserCircle2, Store, Gift, Flame } from 'lucide-react';

export default function LeaderboardPage() {
  const [userType, setUserType] = useState('pengguna'); // 'pengguna' or 'bisnis'
  const [timePeriod, setTimePeriod] = useState('minggu'); // 'hari', 'minggu', 'bulan', 'alltime'

  const leaderboardPengguna = [
    { rank: 1, name: 'Petrus Maury', points: 15420, gender: 'male', transactions: 156, badge: 'gold' },
    { rank: 2, name: 'Maria Kambu', points: 14230, gender: 'female', transactions: 142, badge: 'silver' },
    { rank: 3, name: 'Daniel Kogoya', points: 12850, gender: 'male', transactions: 128, badge: 'bronze' },
    { rank: 4, name: 'Elisabeth Rumadas', points: 11540, gender: 'female', transactions: 115 },
    { rank: 5, name: 'Andreas Kareth', points: 10820, gender: 'male', transactions: 108 },
    { rank: 6, name: 'Ruth Mote', points: 9650, gender: 'female', transactions: 96 },
    { rank: 7, name: 'John Mampioper', points: 8940, gender: 'male', transactions: 89 },
    { rank: 8, name: 'Grace Numberi', points: 8320, gender: 'female', transactions: 83 },
    { rank: 9, name: 'Michael Rumkorem', points: 7850, gender: 'male', transactions: 78 },
    { rank: 10, name: 'Christina Asso', points: 7420, gender: 'female', transactions: 74 },
  ];

  const currentUser = {
    rank: 24,
    name: 'Kamu',
    points: 5240,
    gender: 'neutral',
    transactions: 52,
  };

  const weeklyPrizes = [
    { rank: '1', prize: 'Rp2.000.000', color: 'from-yellow-400 to-yellow-600' },
    { rank: '2', prize: 'Rp1.500.000', color: 'from-gray-300 to-gray-500' },
    { rank: '3', prize: 'Rp1.000.000', color: 'from-orange-400 to-orange-600' },
    { rank: '4-10', prize: 'Rp500.000', color: 'from-blue-400 to-blue-600' },
  ];

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6379B9] to-[#E29B06] text-white p-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy size={32} />
          <h1 className="text-2xl font-bold">Papan Peringkat</h1>
        </div>
        <p className="text-center text-white/80 text-sm">
          Bersaing dan menangkan hadiah mingguan!
        </p>
      </div>

      {/* User Type Tabs */}
      <div className="px-4 -mt-4 mb-4">
        <div className="bg-white rounded-2xl shadow-lg p-1 grid grid-cols-2 gap-1">
          <button
            onClick={() => setUserType('pengguna')}
            className={`py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              userType === 'pengguna'
                ? 'bg-gradient-to-r from-[#E29B06] to-[#6379B9] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users size={18} />
            Pengguna
          </button>
          <button
            onClick={() => setUserType('bisnis')}
            className={`py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              userType === 'bisnis'
                ? 'bg-gradient-to-r from-[#E29B06] to-[#6379B9] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Store size={18} />
            Bisnis
          </button>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { value: 'hari', label: 'Hari Ini' },
            { value: 'minggu', label: 'Minggu Ini' },
            { value: 'bulan', label: 'Bulan Ini' },
            { value: 'alltime', label: 'Sepanjang Masa' },
          ].map((period) => (
            <button
              key={period.value}
              onClick={() => setTimePeriod(period.value)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                timePeriod === period.value
                  ? 'bg-[#6379B9] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prizes Info */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-[#E29B06] to-[#6379B9] rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Gift size={20} />
            <h3 className="font-bold">Hadiah Minggu Ini</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {weeklyPrizes.map((prize, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <div className="text-xs text-white/80">Peringkat {prize.rank}</div>
                <div className="font-bold text-sm">{prize.prize}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3 items-end">
          {/* Rank 2 */}
          <TopRankCard
            rank={2}
            data={leaderboardPengguna[1]}
            badge="silver"
          />

          {/* Rank 1 */}
          <TopRankCard
            rank={1}
            data={leaderboardPengguna[0]}
            badge="gold"
            isFirst
          />

          {/* Rank 3 */}
          <TopRankCard
            rank={3}
            data={leaderboardPengguna[2]}
            badge="bronze"
          />
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="px-4 pb-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#6379B9] to-[#E29B06] text-white px-4 py-3">
            <h3 className="font-bold">Peringkat 4-10</h3>
          </div>
          {leaderboardPengguna.slice(3).map((user) => (
            <LeaderboardRow key={user.rank} user={user} />
          ))}
        </div>
      </div>

      {/* Current User Position */}
      <div className="px-4 pb-6">
        <div className="bg-gradient-to-r from-[#6379B9] to-[#E29B06] text-white rounded-2xl p-4 shadow-lg">
          <div className="text-sm text-white/80 mb-2">Posisi Kamu</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold">#{currentUser.rank}</div>
              <div>
                <div className="font-bold">{currentUser.name}</div>
                <div className="text-sm text-white/80">{currentUser.points.toLocaleString('id-ID')} poin</div>
              </div>
            </div>
            <div className="text-right">
              <UserCircle2
                size={48}
                className={currentUser.gender === 'neutral' ? 'text-white' : currentUser.gender === 'female' ? 'text-pink-300' : 'text-blue-300'}
              />
              <div className="text-xs text-white/80 mt-1">{currentUser.transactions} transaksi</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="text-xs text-white/80">Naik ke Top 10 untuk hadiah Rp500K!</div>
            <div className="text-sm font-semibold mt-1 flex items-center gap-1">
              Butuh 2,180 poin lagi
              <Flame size={16} className="text-orange-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopRankCard({ rank, data, badge, isFirst = false }) {
  const getBadgeColor = () => {
    if (badge === 'gold') return 'from-yellow-400 to-yellow-600';
    if (badge === 'silver') return 'from-gray-300 to-gray-500';
    if (badge === 'bronze') return 'from-orange-400 to-orange-600';
  };

  const getBadgeIcon = () => {
    if (rank === 1) return <Crown size={24} className="text-yellow-300" fill="currentColor" />;
    if (rank === 2) return <Medal size={20} className="text-gray-300" />;
    if (rank === 3) return <Medal size={20} className="text-orange-400" />;
  };

  return (
    <div className={`relative ${isFirst ? 'pb-4' : ''}`}>
      <div className={`bg-white rounded-2xl p-4 shadow-lg ${isFirst ? 'transform scale-110' : ''}`}>
        {/* Badge Icon */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className={`bg-gradient-to-br ${getBadgeColor()} rounded-full p-2 shadow-lg`}>
            {getBadgeIcon()}
          </div>
        </div>

        {/* Avatar */}
        <div className="text-center mt-4 mb-2">
          <div className={`mx-auto flex items-center justify-center ${isFirst ? 'w-16 h-16' : 'w-12 h-12'}`}>
            <UserCircle2
              size={isFirst ? 64 : 48}
              className={data.gender === 'female' ? 'text-pink-500' : 'text-blue-500'}
            />
          </div>
          <div className={`font-bold text-gray-800 mt-2 ${isFirst ? 'text-base' : 'text-sm'}`}>
            {data.name.split(' ')[0]}
          </div>
        </div>

        {/* Points */}
        <div className={`text-center bg-gradient-to-br ${getBadgeColor()} text-white rounded-xl py-2 px-3`}>
          <div className={`font-bold ${isFirst ? 'text-lg' : 'text-sm'}`}>
            {data.points.toLocaleString('id-ID')}
          </div>
          <div className="text-xs opacity-90">poin</div>
        </div>

        {/* Transactions */}
        <div className="text-center mt-2 text-xs text-gray-500">
          {data.transactions} transaksi
        </div>
      </div>
    </div>
  );
}

function LeaderboardRow({ user }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#6379B9]/20 flex items-center justify-center font-bold text-[#6379B9]">
          {user.rank}
        </div>
        <UserCircle2
          size={40}
          className={user.gender === 'female' ? 'text-pink-500' : 'text-blue-500'}
        />
        <div>
          <div className="font-semibold text-gray-800">{user.name}</div>
          <div className="text-xs text-gray-500">{user.transactions} transaksi</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-[#6379B9]">{user.points.toLocaleString('id-ID')}</div>
        <div className="text-xs text-gray-500">poin</div>
      </div>
    </div>
  );
}
