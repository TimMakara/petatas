// Shared dummy data for AR experiences and Buku Cerita
// Used by both /galeri and /my-pusaka pages

// AR Experience data - Interactive stories
export const arExperiences = [
  {
    id: 'sejarah-pacu-jalur',
    user: {
      username: 'budaya_riau',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    thumbnail: '/images/ar-dummy/sejarah-pacu-jalur.png',
    title: 'Sejarah Pacu Jalur',
    shortDescription: 'Jelajahi sejarah tradisi balap perahu Pacu Jalur di Sungai Kampar dengan narasi interaktif',
    likes: 1245,
    modelUrl: '/models/pacu-jalur.glb',
    creator: 'budaya_riau',
    creatorAvatar: 'https://i.pravatar.cc/150?img=1',
    isLiked: true
  },
  {
    id: 'legenda-candi-borobudur',
    user: {
      username: 'heritage_id',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    thumbnail: '/images/ar-dummy/legenda-candi-borobudur.png',
    title: 'Legenda Candi Borobudur',
    shortDescription: 'Temukan kisah pembangunan candi terbesar di dunia dengan timeline interaktif dan tokoh-tokoh bersejarah',
    likes: 892,
    modelUrl: '/models/borobudur.glb',
    creator: 'heritage_id',
    creatorAvatar: 'https://i.pravatar.cc/150?img=2',
    isLiked: false
  },
  {
    id: 'asal-usul-tari-saman',
    user: {
      username: 'nusantara_art',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    thumbnail: '/images/ar-dummy/asal-usul-tari-saman.png',
    title: 'Asal Usul Tari Saman',
    shortDescription: 'Ikuti perjalanan Syekh Saman menciptakan tari seribu tangan dengan animasi dan narasi mendalam',
    likes: 567,
    modelUrl: '/models/tari-saman.glb',
    creator: 'nusantara_art',
    creatorAvatar: 'https://i.pravatar.cc/150?img=3',
    isLiked: true
  },
  {
    id: 'filosofi-batik-nusantara',
    user: {
      username: 'museum_virtual',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    thumbnail: '/images/ar-dummy/filosofi-batik-nusantara.png',
    title: 'Filosofi Batik Nusantara',
    shortDescription: 'Ungkap makna tersembunyi di balik motif batik dengan cerita interaktif dari berbagai daerah',
    likes: 445,
    modelUrl: '/models/batik.glb',
    creator: 'museum_virtual',
    creatorAvatar: 'https://i.pravatar.cc/150?img=4',
    isLiked: false
  }
];

// Buku Cerita data - Story books
export const bukuCeritaData = [
  {
    id: 'pacu-jalur',
    user: {
      username: 'budaya_riau',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    thumbnail: '/images/story-dummy/pacu-jalur.png',
    title: 'Kisah Pacu Jalur',
    shortDescription: 'Tradisi balap perahu panjang khas Kuantan Singingi yang menghidupkan semangat kebersamaan di sungai Batang Kuantan',
    likes: 1567,
    storybookUrl: '/storybook/pacu-jalur',
    creator: 'budaya_riau',
    creatorAvatar: 'https://i.pravatar.cc/150?img=1',
    isLiked: true
  },
  {
    id: 'malin-kundang',
    user: {
      username: 'cerita_rakyat',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    thumbnail: '/images/story-dummy/malin-kundang.png',
    title: 'Malin Kundang',
    shortDescription: 'Kisah anak durhaka yang dikutuk menjadi batu karena mengingkari ibunya',
    likes: 1432,
    storybookUrl: '/storybook/malin-kundang',
    creator: 'cerita_rakyat',
    creatorAvatar: 'https://i.pravatar.cc/150?img=11',
    isLiked: true
  },
  {
    id: 'timun-mas',
    user: {
      username: 'dongeng_nusantara',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    thumbnail: '/images/story-dummy/timun-mas.png',
    title: 'Timun Mas',
    shortDescription: 'Petualangan gadis kecil melawan raksasa dengan biji-biji ajaib pemberian dewa',
    likes: 987,
    storybookUrl: '/storybook/timun-mas',
    creator: 'dongeng_nusantara',
    creatorAvatar: 'https://i.pravatar.cc/150?img=12',
    isLiked: false
  },
  {
    id: 'roro-jonggrang',
    user: {
      username: 'legenda_jawa',
      avatar: 'https://i.pravatar.cc/150?img=13'
    },
    thumbnail: '/images/story-dummy/roro-jonggrang.png',
    title: 'Roro Jonggrang',
    shortDescription: 'Legenda cinta Bandung Bondowoso dan seribu candi yang dibangun dalam semalam',
    likes: 654,
    storybookUrl: '/storybook/roro-jonggrang',
    creator: 'legenda_jawa',
    creatorAvatar: 'https://i.pravatar.cc/150?img=13',
    isLiked: false
  }
];
