export interface HeroMoment {
  label: string;
  date: string;
  body: string;
  meta?: string;
  metaLeft?: string;
  metaRight?: string;
  isQuote?: boolean;
  image: string;
  alt: string;
}

export const HERO_MOMENTS: HeroMoment[] = [
  {
    label: "'White Lives Matter'",
    date: 'Oct 3, 2022',
    body: 'Kanye closed out Yeezy Season 9 in Paris wearing a "White Lives Matter" shirt, with Candace Owens beside him in the same design. The phrase itself began as a white supremacist slogan, coined in direct response to Black Lives Matter and tracked as such by the ADL and the SPLC for nearly a decade. Kanye framed it as a joke, a provocation, a statement about free thought. The fashion industry did not take it that way. Vogue, GQ, and Dazed all ran pieces the same day condemning the show. It was the first domino - six days later, its logic would resurface in a tweet, this time aimed squarely at Jewish people, and the industry\'s patience would already be gone.',
    meta: 'Six days before the tweet',
    image: '/carousel-wlm.png',
    alt: 'White Lives Matter shirt',
  },
  {
    label: 'Diddy',
    date: 'Oct 6–7, 2022',
    body: "Three days after the Paris show, Diddy called Kanye privately, urging him to reconsider the shirt and walk back the growing backlash before it escalated further. Kanye's response was to post screenshots of their private texts publicly, reframing the call as an attempt to silence him rather than to help him. He suggested Diddy was being used by unnamed forces to pressure him into an apology he didn't believe he owed. Instagram removed the posts and restricted his account within hours. It was a preview of the pattern that would define the following weeks: private concern from people around him, met publicly with defiance, escalation, and a refusal to back down - each round making the next consequence larger than the last.",
    meta: 'Two days before the tweet',
    image: '/carousel-diddy.png',
    alt: 'Diddy',
  },
  {
    label: 'The tweet',
    date: 'Oct 8 2022',
    body: '"I\'m a bit sleepy tonight but when I wake up I\'m going death con 3 On JEWISH PEOPLE The funny thing is I actually can\'t be Anti Semitic because black people are actually Jew also You guys have toyed with me and tried to black ball anyone whoever opposes your agenda"',
    metaLeft: 'Live for 18h',
    metaRight: 'removed by <strong>twitter</strong>',
    isQuote: true,
    image: '/carousel-tweet.png',
    alt: 'The tweet',
  },
  {
    label: 'Celebrity backlash',
    date: 'Oct 9–11, 2022',
    body: 'The tweet triggered an immediate wave of celebrity condemnation, with figures like Jamie Lee Curtis, David Schwimmer, and Kim Kardashian among the first to publicly speak out. It was a tipping point - the moment the backlash against Kanye shifted from murmurs to a full, coordinated public reckoning.',
    meta: 'Days after the tweet',
    image: '/carousel-jamie.png',
    alt: 'Celebrity backlash',
  },
  {
    label: 'Business collapse',
    date: 'Oct 12–25, 2022',
    body: "Balenciaga, JPMorgan Chase, CAA, Gap, Foot Locker and Adidas severed ties in rapid succession over just two weeks, each announcement landing before the last had fully settled. Adidas alone had built Yeezy into a roughly $1.5B-a-year business; JPMorgan's exit cut him off from mainstream business banking entirely. TJX pulled Yeezy product from over 4,700 stores. MRC shelved a completed documentary. His longtime personal attorney withdrew at the moment of maximum legal exposure. On October 25th - the same day Adidas made its announcement - Forbes recalculated his net worth at $400 million, down from $2 billion, and formally stripped him of billionaire status. Roughly $1.6 billion in verified net worth gone, alongside an estimated $3B+ in total deal value, in under three weeks.",
    meta: 'Weeks after the tweet',
    image: '/carousel-adidas.png',
    alt: 'Business collapse',
  },
  {
    label: 'Kanye on InfoWars',
    date: 'Dec 1, 2022',
    body: 'Six weeks after the tweet, with nearly every major partnership already gone, Kanye appeared on Alex Jones\' InfoWars and escalated rather than retreated. "I like Hitler," he said. "I love Nazis." He praised Adolf Hitler by name on air, calling him misunderstood, and repeated antisemitic conspiracy theories with Jones - a platform already notorious for spreading extremist and conspiratorial content - offering little resistance. Elon Musk, who had reinstated Kanye\'s X account weeks earlier, suspended it again the very next day, citing incitement to violence. What began as a shirt at a fashion show had, in under two months, arrived at open Holocaust apologia broadcast to a mainstream audience.',
    meta: 'Two months after the tweet',
    image: '/carousel-infowars.jpg',
    alt: 'Kanye on InfoWars',
  },
];
