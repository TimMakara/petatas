'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, Edit2 } from 'lucide-react';

export default function MyPusakaPage() {
  const [activeTab, setActiveTab] = useState('ar');
  const [searchQuery, setSearchQuery] = useState('');

  // User profile data
  const userProfile = {
    name: 'Raden Wijaya',
    username: '@radenwijaya',
    bio: 'Pecinta budaya Indonesia 🇮🇩 | Mengoleksi artefak digital & cerita tradisional',
    profileImage: 'https://i.pravatar.cc/150?img=12',
  };

  // User's AR Experiences
  const myARExperiences = [
    {
      id: 1,
      title: 'Wayang Kulit Arjuna',
      description: 'Wayang kulit karakter Arjuna dari cerita Mahabharata',
      thumbnail: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=400&fit=crop',
      creator: 'Raden Wijaya',
      creatorAvatar: 'https://i.pravatar.cc/150?img=12',
      likes: 234,
      isLiked: true,
    },
    {
      id: 2,
      title: 'Candi Borobudur',
      description: 'Model 3D Candi Borobudur yang megah',
      thumbnail: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=400&fit=crop',
      creator: 'Raden Wijaya',
      creatorAvatar: 'https://i.pravatar.cc/150?img=12',
      likes: 456,
      isLiked: false,
    },
    {
      id: 3,
      title: 'Keris Pusaka',
      description: 'Keris pusaka dengan ukiran detail',
      thumbnail: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop',
      creator: 'Raden Wijaya',
      creatorAvatar: 'https://i.pravatar.cc/150?img=12',
      likes: 189,
      isLiked: true,
    },
    {
      id: 4,
      title: 'Batik Kawung',
      description: 'Motif batik Kawung klasik dari Yogyakarta',
      thumbnail: 'https://images.unsplash.com/photo-1617533555203-eccd85c81e43?w=400&h=400&fit=crop',
      creator: 'Raden Wijaya',
      creatorAvatar: 'https://i.pravatar.cc/150?img=12',
      likes: 312,
      isLiked: false,
    },
  ];

  // User's Storybooks
  const myStorybooks = [
    {
      id: 1,
      title: 'Sangkuriang',
      description: 'Legenda pembentukan Gunung Tangkuban Perahu',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      creator: 'Raden Wijaya',
      creatorAvatar: 'https://i.pravatar.cc/150?img=12',
      likes: 567,
      isLiked: true,
    },
    {
      id: 2,
      title: 'Roro Jonggrang',
      description: 'Kisah cinta dan kutukan Candi Prambanan',
      thumbnail: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=400&fit=crop',
      creator: 'Raden Wijaya',
      creatorAvatar: 'https://i.pravatar.cc/150?img=12',
      likes: 423,
      isLiked: false,
    },
    {
      id: 3,
      title: 'Bawang Merah Bawang Putih',
      description: 'Cerita rakyat tentang dua saudara tiri',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop',
      creator: 'Raden Wijaya',
      creatorAvatar: 'https://i.pravatar.cc/150?img=12',
      likes: 389,
      isLiked: true,
    },
    {
      id: 4,
      title: 'Timun Mas',
      description: 'Petualangan Timun Mas melawan raksasa',
      thumbnail: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400&h=400&fit=crop',
      creator: 'Raden Wijaya',
      creatorAvatar: 'https://i.pravatar.cc/150?img=12',
      likes: 445,
      isLiked: false,
    },
  ];

  // Filter based on search and active tab
  const filteredARExperiences = myARExperiences.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStorybooks = myStorybooks.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ARExperienceCard = ({ item }) => (
    <Link href={`/ar/${item.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative aspect-square">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={item.creatorAvatar}
              alt={item.creator}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-xs text-gray-600">{item.creator}</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{item.title}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.preventDefault();
                // Toggle like logic here
              }}
              className="flex items-center gap-1 text-sm"
              style={{ color: item.isLiked ? '#473C8B' : '#6B7280' }}
            >
              <Heart size={16} fill={item.isLiked ? '#473C8B' : 'none'} />
              <span>{item.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );

  const StorybookCard = ({ item }) => (
    <Link href="/storybook/my/0debe010-4dfc-452b-bdce-caaca077d3c0">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative aspect-square">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={item.creatorAvatar}
              alt={item.creator}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-xs text-gray-600">{item.creator}</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{item.title}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.preventDefault();
                // Toggle like logic here
              }}
              className="flex items-center gap-1 text-sm"
              style={{ color: item.isLiked ? '#473C8B' : '#6B7280' }}
            >
              <Heart size={16} fill={item.isLiked ? '#473C8B' : 'none'} />
              <span>{item.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#F8F5F2' }}>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Profile Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <Image
              src={userProfile.profileImage}
              alt={userProfile.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1" style={{ color: '#1B1B1E' }}>
                {userProfile.name}
              </h2>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>
                {userProfile.username}
              </p>
              <p className="text-sm" style={{ color: '#1B1B1E' }}>
                {userProfile.bio}
              </p>
            </div>
          </div>
          
          {/* Edit Profile Button */}
          <button
            className="w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            style={{
              backgroundColor: '#473C8B',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3a3070';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#473C8B';
            }}
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              size={20}
              style={{ color: '#473C8B' }}
            />
            <input
              type="text"
              placeholder="Cari koleksi saya..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                backgroundColor: 'white',
                color: '#1B1B1E',
                focusRingColor: '#473C8B',
              }}
            />
          </div>
        </div>

        {/* Tab Switch */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('ar')}
            className="flex-1 py-3 px-4 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: activeTab === 'ar' ? '#473C8B' : 'white',
              color: activeTab === 'ar' ? 'white' : '#6B7280',
            }}
          >
            AR Experience
          </button>
          <button
            onClick={() => setActiveTab('storybook')}
            className="flex-1 py-3 px-4 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: activeTab === 'storybook' ? '#473C8B' : 'white',
              color: activeTab === 'storybook' ? 'white' : '#6B7280',
            }}
          >
            Buku Cerita
          </button>
        </div>

        {/* Grid Content */}
        {activeTab === 'ar' && (
          <div className="grid grid-cols-2 gap-4">
            {filteredARExperiences.length > 0 ? (
              filteredARExperiences.map((item) => (
                <ARExperienceCard key={item.id} item={item} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p style={{ color: '#6B7280' }}>Tidak ada AR Experience yang ditemukan</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'storybook' && (
          <div className="grid grid-cols-2 gap-4">
            {filteredStorybooks.length > 0 ? (
              filteredStorybooks.map((item) => (
                <StorybookCard key={item.id} item={item} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p style={{ color: '#6B7280' }}>Tidak ada Buku Cerita yang ditemukan</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
