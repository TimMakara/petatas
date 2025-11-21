'use client';

import { useState } from 'react';
import { Coins, Gift, Smartphone, Zap, ShoppingBag, Award, Clock, ChevronRight, Star, TrendingUp } from 'lucide-react';

export default function PointsPage() {
  const [activeCategory, setActiveCategory] = useState('digital'); // 'digital', 'fisik', 'experiential'

  const pointsData = {
    total: 8750,
    lifetime: 15420,
    thisMonth: 3240,
    expiring: 500,
    expiryDate: '31 Des 2024',
  };

  const recentActivity = [
    { id: 1, title: 'Campus Champion', points: 150, type: 'earned', date: '2 jam lalu', icon: '🎓' },
    { id: 2, title: 'Pulsa Telkomsel 25K', points: -250, type: 'redeemed', date: '1 hari lalu', icon: '📱' },
    { id: 3, title: 'Transaksi di Rumah Makan Mama Maria', points: 50, type: 'earned', date: '1 hari lalu', icon: '💰' },
    { id: 4, title: 'Referral berhasil', points: 150, type: 'earned', date: '2 hari lalu', icon: '👥' },
    { id: 5, title: 'Weekly Challenge', points: 300, type: 'earned', date: '3 hari lalu', icon: '🏆' },
  ];

  const digitalRewards = [
    {
      id: 1,
      name: 'Pulsa Telkomsel 25K',
      points: 250,
      value: 'Rp25.000',
      icon: '📱',
      provider: 'Telkomsel',
      stock: 'Tersedia',
    },
    {
      id: 2,
      name: 'Paket Data XL 3GB',
      points: 300,
      value: 'Rp30.000',
      icon: '📶',
      provider: 'XL',
      stock: 'Tersedia',
    },
    {
      id: 3,
      name: 'GoPay Rp50K',
      points: 500,
      value: 'Rp50.000',
      icon: '💚',
      provider: 'GoPay',
      stock: 'Tersedia',
    },
    {
      id: 4,
      name: 'OVO Rp50K',
      points: 500,
      value: 'Rp50.000',
      icon: '💜',
      provider: 'OVO',
      stock: 'Tersedia',
    },
    {
      id: 5,
      name: 'Dana Rp100K',
      points: 1000,
      value: 'Rp100.000',
      icon: '💙',
      provider: 'Dana',
      stock: 'Tersedia',
    },
    {
      id: 6,
      name: 'ShopeePay Rp100K',
      points: 1000,
      value: 'Rp100.000',
      icon: '🧡',
      provider: 'ShopeePay',
      stock: 'Tersedia',
    },
  ];

  const physicalRewards = [
    {
      id: 7,
      name: 'Kaos PETATAS',
      points: 800,
      value: 'Limited Edition',
      icon: '👕',
      stock: '25 tersisa',
    },
    {
      id: 8,
      name: 'Tumbler Premium',
      points: 1200,
      value: 'Stainless Steel',
      icon: '🥤',
      stock: '15 tersisa',
    },
    {
      id: 9,
      name: 'Tote Bag Papua',
      points: 600,
      value: 'Desain Eksklusif',
      icon: '👜',
      stock: '40 tersisa',
    },
    {
      id: 10,
      name: 'Power Bank 10.000mAh',
      points: 2500,
      value: 'Fast Charging',
      icon: '🔋',
      stock: '8 tersisa',
    },
    {
      id: 11,
      name: 'TWS Earbuds',
      points: 4000,
      value: 'Bluetooth 5.0',
      icon: '🎧',
      stock: '5 tersisa',
    },
    {
      id: 12,
      name: 'Voucher Indomaret 100K',
      points: 1000,
      value: 'Rp100.000',
      icon: '🎟️',
      stock: 'Tersedia',
    },
  ];

  const experientialRewards = [
    {
      id: 13,
      name: 'Workshop Digital Payment',
      points: 500,
      value: 'Gratis Masuk',
      icon: '🎓',
      stock: '20 kuota',
      date: '15 Jan 2025',
    },
    {
      id: 14,
      name: 'Business Coaching UMKM',
      points: 1500,
      value: '3 Sesi',
      icon: '💼',
      stock: '5 kuota',
      date: 'Fleksibel',
    },
    {
      id: 15,
      name: 'Meetup PETATAS Community',
      points: 300,
      value: 'Networking Event',
      icon: '🤝',
      stock: '50 kuota',
      date: '20 Jan 2025',
    },
    {
      id: 16,
      name: 'Sertifikat Digital Champion',
      points: 2000,
      value: 'Official Certificate',
      icon: '🏅',
      stock: 'Unlimited',
      date: 'Langsung',
    },
  ];

  const getRewards = () => {
    if (activeCategory === 'digital') return digitalRewards;
    if (activeCategory === 'fisik') return physicalRewards;
    return experientialRewards;
  };

  return (
    <div className="w-full pb-6 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#E29B06] to-[#6379B9] text-white p-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Coins size={32} />
          <h1 className="text-2xl font-bold">Poin & Hadiah</h1>
        </div>

        {/* Total Points */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
          <div className="text-center mb-2">
            <div className="text-sm text-white/80 mb-1">Total Poin Kamu</div>
            <div className="text-5xl font-bold mb-1">{pointsData.total.toLocaleString('id-ID')}</div>
            <div className="text-sm text-white/80">
              ≈ Rp{(pointsData.total * 100).toLocaleString('id-ID')}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-xs text-white/80 mb-1">Lifetime</div>
            <div className="text-lg font-bold">{pointsData.lifetime.toLocaleString('id-ID')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-xs text-white/80 mb-1">Bulan Ini</div>
            <div className="text-lg font-bold">{pointsData.thisMonth.toLocaleString('id-ID')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-xs text-white/80 mb-1">Kadaluarsa</div>
            <div className="text-lg font-bold text-red-300">{pointsData.expiring}</div>
          </div>
        </div>

        {/* Expiry Warning */}
        {pointsData.expiring > 0 && (
          <div className="mt-4 bg-red-500/20 backdrop-blur-sm border border-red-300/30 rounded-xl p-3 flex items-center gap-2">
            <Clock size={16} className="text-red-200" />
            <div className="text-xs text-red-100">
              <span className="font-semibold">{pointsData.expiring} poin</span> akan hangus pada {pointsData.expiryDate}
            </div>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="px-4 -mt-4 mb-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-1 grid grid-cols-3 gap-1">
          <button
            onClick={() => setActiveCategory('digital')}
            className={`py-3 rounded-xl font-semibold transition-all text-sm ${
              activeCategory === 'digital'
                ? 'bg-gradient-to-r from-[#E29B06] to-[#6379B9] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📱 Digital
          </button>
          <button
            onClick={() => setActiveCategory('fisik')}
            className={`py-3 rounded-xl font-semibold transition-all text-sm ${
              activeCategory === 'fisik'
                ? 'bg-gradient-to-r from-[#E29B06] to-[#6379B9] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            🎁 Fisik
          </button>
          <button
            onClick={() => setActiveCategory('experiential')}
            className={`py-3 rounded-xl font-semibold transition-all text-sm ${
              activeCategory === 'experiential'
                ? 'bg-gradient-to-r from-[#E29B06] to-[#6379B9] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            ✨ Event
          </button>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {getRewards().map((reward) => (
            <RewardCard key={reward.id} reward={reward} userPoints={pointsData.total} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="text-gray-700" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Aktivitas Terakhir</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {recentActivity.map((activity, idx) => (
            <ActivityRow key={activity.id} activity={activity} isLast={idx === recentActivity.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RewardCard({ reward, userPoints }) {
  const canAfford = userPoints >= reward.points;

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all ${
      canAfford ? 'border-green-400 hover:shadow-xl' : 'border-gray-200 opacity-75'
    }`}>
      <div className="p-4">
        {/* Icon */}
        <div className="text-5xl mb-3 text-center">{reward.icon}</div>

        {/* Name */}
        <h3 className="font-bold text-gray-800 text-sm mb-1 text-center min-h-[40px]">
          {reward.name}
        </h3>

        {/* Value */}
        <div className="text-center mb-2">
          <div className="text-xs text-gray-500">{reward.value}</div>
          {reward.date && (
            <div className="text-xs text-[#6379B9] mt-1">📅 {reward.date}</div>
          )}
        </div>

        {/* Points */}
        <div className="flex items-center justify-center gap-1 bg-[#E29B06]/10 text-[#E29B06] py-2 px-3 rounded-xl mb-2">
          <Star size={16} fill="currentColor" />
          <span className="font-bold text-sm">{reward.points}</span>
          <span className="text-xs">poin</span>
        </div>

        {/* Stock */}
        <div className="text-center text-xs text-gray-500 mb-3">
          {reward.stock}
        </div>

        {/* Redeem Button */}
        <button
          disabled={!canAfford}
          className={`w-full py-2 rounded-xl font-semibold text-sm transition-all ${
            canAfford
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canAfford ? 'Tukar Sekarang' : 'Poin Kurang'}
        </button>
      </div>
    </div>
  );
}

function ActivityRow({ activity, isLast }) {
  const isEarned = activity.type === 'earned';

  return (
    <div className={`flex items-center justify-between px-4 py-3 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{activity.icon}</div>
        <div>
          <div className="font-semibold text-gray-800 text-sm">{activity.title}</div>
          <div className="text-xs text-gray-500">{activity.date}</div>
        </div>
      </div>
      <div className={`font-bold ${isEarned ? 'text-green-600' : 'text-red-600'}`}>
        {isEarned ? '+' : ''}{activity.points}
      </div>
    </div>
  );
}
