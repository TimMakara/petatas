'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Trophy,
  Coins,
  Users,
  ShoppingCart,
  Award,
  Edit,
  ChevronRight,
  Bell,
  Lock,
  Globe,
  HelpCircle,
  FileText,
  LogOut,
  CheckCircle,
  TrendingUp,
  Calendar,
  Zap,
  Target,
  Gift,
} from 'lucide-react';

export default function ProfilePage() {
  const [userData] = useState({
    name: 'Yosua Wenda',
    email: 'yosua.wenda@email.com',
    phone: '0812-3456-7890',
    location: 'Sorong, Papua Barat',
    avatar: '👨',
    verified: true,
    joinDate: 'September 2024',
    persona: 'Mahasiswa',
  });

  const [stats] = useState({
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    totalPoints: 8750,
    lifetimePoints: 15420,
    transactions: 127,
    challengesCompleted: 45,
    referrals: 8,
    currentRank: 24,
    streak: 7,
  });

  const badges = [
    { id: 1, name: 'Early Adopter', icon: '🌟', earned: true, date: 'Sep 2024' },
    { id: 2, name: 'Week Warrior', icon: '⚔️', earned: true, date: 'Okt 2024' },
    { id: 3, name: 'Social Butterfly', icon: '🦋', earned: true, date: 'Nov 2024' },
    { id: 4, name: 'Point Master', icon: '💎', earned: true, date: 'Nov 2024' },
    { id: 5, name: 'Bronze Recruiter', icon: '🥉', earned: false, date: null },
    { id: 6, name: 'Gold Champion', icon: '🏆', earned: false, date: null },
  ];

  const recentTransactions = [
    { id: 1, merchant: 'Warung Kopi Papua Kakak John', amount: 25000, points: 50, date: '2 jam lalu' },
    { id: 2, merchant: 'Toko Sembako Keluarga Wenda', amount: 150000, points: 50, date: '1 hari lalu' },
    { id: 3, merchant: 'Rumah Makan Mama Maria', amount: 85000, points: 50, date: '2 hari lalu' },
  ];

  return (
    <div className="w-full pb-6 bg-white">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#E29B06] to-[#6379B9] text-white p-6 rounded-b-3xl shadow-xl mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl border-4 border-white/30">
                {userData.avatar}
              </div>
              {userData.verified && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <CheckCircle size={16} />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                <Award size={14} />
                <span>{userData.persona}</span>
              </div>
              <div className="flex items-center gap-1 text-white/80 text-xs mt-1">
                <Calendar size={12} />
                <span>Bergabung {userData.joinDate}</span>
              </div>
            </div>
          </div>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Edit size={20} />
          </button>
        </div>

        {/* Level Progress */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">Level {stats.level}</span>
            </div>
            <span className="text-xs text-white/80">
              {stats.xp}/{stats.xpToNext} XP
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${(stats.xp / stats.xpToNext) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Coins className="text-[#E29B06]" size={24} />}
            label="Total Poin"
            value={stats.totalPoints.toLocaleString('id-ID')}
            bgColor="from-[#E29B06]/10 to-[#E29B06]/20"
          />
          <StatCard
            icon={<Trophy className="text-[#6379B9]" size={24} />}
            label="Peringkat"
            value={`#${stats.currentRank}`}
            bgColor="from-[#6379B9]/10 to-[#6379B9]/20"
          />
          <StatCard
            icon={<ShoppingCart className="text-[#6379B9]" size={24} />}
            label="Transaksi"
            value={stats.transactions}
            bgColor="from-[#6379B9]/10 to-[#6379B9]/20"
          />
          <StatCard
            icon={<Users className="text-[#E29B06]" size={24} />}
            label="Referral"
            value={stats.referrals}
            bgColor="from-[#E29B06]/10 to-[#E29B06]/20"
          />
          <StatCard
            icon={<Target className="text-[#E29B06]" size={24} />}
            label="Challenge"
            value={stats.challengesCompleted}
            bgColor="from-[#E29B06]/10 to-[#E29B06]/20"
          />
          <StatCard
            icon={<Zap className="text-[#6379B9]" size={24} />}
            label="Streak"
            value={`${stats.streak} hari`}
            bgColor="from-[#6379B9]/10 to-[#6379B9]/20"
          />
        </div>
      </div>

      {/* Personal Info */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Informasi Pribadi</h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <InfoRow icon={<Mail size={20} />} label="Email" value={userData.email} />
          <InfoRow icon={<Phone size={20} />} label="Telepon" value={userData.phone} />
          <InfoRow icon={<MapPin size={20} />} label="Lokasi" value={userData.location} isLast />
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Badge & Pencapaian</h2>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">Transaksi Terakhir</h2>
          <button className="text-orange-600 text-sm font-semibold flex items-center gap-1">
            Lihat Semua
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {recentTransactions.map((tx, idx) => (
            <TransactionRow
              key={tx.id}
              transaction={tx}
              isLast={idx === recentTransactions.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Pengaturan</h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <SettingRow icon={<Bell size={20} />} label="Notifikasi" />
          <SettingRow icon={<Lock size={20} />} label="Privasi & Keamanan" />
          <SettingRow icon={<Globe size={20} />} label="Bahasa" value="Indonesia" />
          <SettingRow icon={<HelpCircle size={20} />} label="Bantuan & Dukungan" />
          <SettingRow icon={<FileText size={20} />} label="Syarat & Ketentuan" isLast />
        </div>
      </div>

      {/* Logout */}
      <div className="px-4">
        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg">
          <LogOut size={20} />
          Keluar
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bgColor }) {
  return (
    <div className={`bg-gradient-to-br ${bgColor} rounded-2xl p-4 shadow-md border border-white/50`}>
      <div className="flex items-center gap-2 mb-2">{icon}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

function InfoRow({ icon, label, value, isLast = false }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-4 ${
        !isLast ? 'border-b border-gray-100' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-600">{icon}</div>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="font-semibold text-gray-800 text-sm">{value}</span>
    </div>
  );
}

function BadgeCard({ badge }) {
  return (
    <div
      className={`bg-white rounded-2xl p-4 shadow-md text-center ${
        !badge.earned && 'opacity-40 grayscale'
      }`}
    >
      <div className="text-4xl mb-2">{badge.icon}</div>
      <div className="text-xs font-semibold text-gray-800 mb-1">{badge.name}</div>
      {badge.earned && badge.date && (
        <div className="text-xs text-green-600">✓ {badge.date}</div>
      )}
      {!badge.earned && <div className="text-xs text-gray-400">Terkunci</div>}
    </div>
  );
}

function TransactionRow({ transaction, isLast }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${
        !isLast ? 'border-b border-gray-100' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="text-orange-600" size={20} />
        </div>
        <div>
          <div className="font-semibold text-gray-800 text-sm">{transaction.merchant}</div>
          <div className="text-xs text-gray-500">{transaction.date}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-gray-800 text-sm">
          Rp{transaction.amount.toLocaleString('id-ID')}
        </div>
        <div className="text-xs text-green-600">+{transaction.points} poin</div>
      </div>
    </div>
  );
}

function SettingRow({ icon, label, value = null, isLast = false }) {
  return (
    <button
      className={`w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors ${
        !isLast ? 'border-b border-gray-100' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-600">{icon}</div>
        <span className="font-medium text-gray-800 text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-gray-500">{value}</span>}
        <ChevronRight className="text-gray-400" size={20} />
      </div>
    </button>
  );
}
