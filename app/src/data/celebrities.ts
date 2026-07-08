export interface Celebrity {
  name: string;
  category: string;
  tweetCount: number;
  photo: string;
  objectPosition?: string;
  linked?: boolean;
}

export const CELEBRITIES: Celebrity[] = [
  { name: 'Kanye West', category: 'Musician', tweetCount: 20, photo: '/celebrities/kanye-musician.png', linked: true },
  { name: 'Elon Musk', category: 'Business man', tweetCount: 8, photo: '/celebrities/elon.png', objectPosition: '55% 30%' },
  { name: 'Kanye West', category: 'Politician', tweetCount: 4, photo: '/celebrities/kanye-politician.png' },
  { name: 'Kanye West', category: 'Football player', tweetCount: 4, photo: '/celebrities/kanye-football.png' },
  { name: 'Crissy Teigen', category: 'Model, TV star', tweetCount: 4, photo: '/celebrities/crissy.png', objectPosition: 'center 20%' },
  { name: 'Blake Shelton', category: 'Model, TV star', tweetCount: 3, photo: '/celebrities/blake.png', objectPosition: '55% 22%' },
];
