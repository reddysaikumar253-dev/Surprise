export const DEFAULT_COMPLIMENTS = [
  { text: 'You look absolutely adorable today', order: 1, category: 'birthday' },
  { text: 'You have the sweetest, most genuine vibe', order: 2, category: 'birthday' },
  { text: 'You make everything feel lighter just by being there', order: 3, category: 'birthday' },
  { text: 'You are naturally charming without even trying', order: 4, category: 'birthday' },
  { text: 'You make every single moment feel more special', order: 5, category: 'birthday' },
  { text: 'Your laugh is genuinely the most beautiful sound', order: 6, category: 'birthday' },
  { text: 'You have the most beautiful soul I have ever known', order: 7, category: 'birthday' },
  { text: 'Being around you just feels like home', order: 8, category: 'birthday' },
];

export const DEFAULT_GALLERY_PHOTOS = [
  { imageUrl: '/photos/photo1.jpg', caption: 'Us', quote: 'With you, everything feels right', order: 1 },
  { imageUrl: '/photos/photo2.jpg', caption: 'Always', quote: 'My favorite person in every universe', order: 2 },
  { imageUrl: '/photos/photo3.jpg', caption: 'Forever', quote: 'Every moment with you is magic', order: 3 },
  { imageUrl: '/photos/photo4.jpg', caption: 'My heart', quote: 'You make ordinary days extraordinary', order: 4 },
  { imageUrl: '/photos/photo5.jpg', caption: 'Peace', quote: "You're not just my love, you're my peace", order: 5 },
  { imageUrl: '/photos/photo6.jpg', caption: 'Eternity', quote: "Forever wouldn't be enough", order: 6 },
];

export const DEFAULT_LOVE_LETTER = {
  recipientName: process.env.NEXT_PUBLIC_RECIPIENT_NAME || 'My Queen',
  paragraphs: [
    "I just wanted to tell you something... you really are special in a way that's hard to explain.",
    "There's a softness in the way you talk, a sweetness in the way you smile, and something genuinely beautiful about you that just feels so good to be around.",
    "You don't try to be anything extra, you're just you — and that's exactly what makes you so incredibly lovely.",
    "On your birthday, I want you to know that every single day with you is a gift I never take for granted.",
    "Happy birthday, My Queen. Today and always, you are everything. 💕",
  ],
  signoff: 'Forever yours 🌹',
  theme: 'birthday',
};
