export interface ArtistTweet {
  date: string;
  quote: string;
  linked?: boolean;
  ts: number;
}

const RAW: Omit<ArtistTweet, 'ts'>[] = [
  { date: 'Jan 27, 2016', quote: '"First of all, you stole your whole shit from Cudi"' },
  { date: 'Jan 27, 2016', quote: '"Second, your first single was corny as fuck and most there after"' },
  { date: 'Jan 27, 2016', quote: '"3rd no one I know has ever listened to one of your albums all the way through. 4th you let a stripper trap you."' },
  { date: 'Jan 27, 2016', quote: '"You wouldn\'t have a child if it wasn\'t for me. You own waves???? I own your child!!!!"' },
  { date: 'Jul 24, 2017', quote: '"BILL COSBY WAS FRAMED"' },
  { date: 'Jul 20, 2020', quote: '"I been trying to get divorced since Kim met with Meek at the Warldolf for prison reform"' },
  { date: 'Jul 21, 2020', quote: '"Kim was trying to fly to Wyoming with a doctor to lock me up like on the movie Get Out because I cried about saving my daughters life yesterday"' },
  { date: 'Jul 22, 2020', quote: '"Kris Jong-Un"' },
  { date: 'Jul 22, 2020', quote: '"I put my life on God that North\'s mom would never photograph her doing playboy and that\'s on God I\'m at the ranch. Come and get me."' },
  { date: 'Jul 22, 2020', quote: '"Everybody knows the movie Get Out is about me."' },
  { date: 'Sep 16, 2020', quote: '"If anyone wants to call a white supremacist … this is the editor of Forbes." [shared Randall Lane\'s phone number]' },
  { date: 'Jun 11, 2021', quote: '"Kim\'s a white supremacist. She and her mother are trying to erase my Black children from my culture."' },
  { date: 'Jan 4, 2022', quote: '"SKETE DAVIDSON DEAD AT AGE 28"' },
  { date: 'Oct 3, 2022', quote: '"I\'m a little confused. Who do y\'all think created cancel culture? Jewish people have owned the Black voice. When I say \'Jew\' I mean the 12 lost tribes of Judah."' },
  { date: 'Oct 3, 2022', quote: '"Ima use you as an example to show the Jewish people that told you to call me that no one can threaten or influence me."' },
  { date: 'Oct 8, 2022', quote: '"I\'m a bit sleepy tonight but when I wake up I\'m going death con 3 On JEWISH PEOPLE. The funny thing is I actually can\'t be Anti Semitic because black people are actually Jew also You guys have toyed with me and tried to black ball anyone whoever opposes your agenda"', linked: true },
  { date: 'Oct 9, 2022', quote: '"I\'m not anti-semitic but I am anti-media. The media is run by the Jewish people and the Jewish people do not like Black people."' },
  { date: 'Dec 1, 2022', quote: '"I like Hitler. I love Nazis. Every human being has something of value. Hitler was right."' },
  { date: 'Dec 8, 2022', quote: '"Nick Fuentes and Milo are two of the most complex and interesting people I\'ve met. They are raising important questions for society."' },
  { date: 'Jan 1, 2023', quote: '"SHALOM. Happy New Year. I love Jewish people. But I also love Nazis. I love everyone."' },
];

export const ARTIST_TWEETS: ArtistTweet[] = RAW.map((t) => ({ ...t, ts: new Date(t.date).getTime() }));
