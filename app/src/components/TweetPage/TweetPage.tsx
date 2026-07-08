import { useState } from 'react';
import { motion } from 'motion/react';
import { Hero } from './Hero/Hero';
import { BillionsSection } from './BillionsSection/BillionsSection';
import { AdlStat } from './AdlStat/AdlStat';
import { PiersMorgan } from './PiersMorgan/PiersMorgan';
import { Footer } from './Footer/Footer';

export function TweetPage({ playIntro, onOpenArtist }: { playIntro: boolean; onOpenArtist: () => void }) {
  // The pie chart draws in slice by slice (largest share first) once it
  // scrolls into view — everything below it (ADL stat, Piers Morgan, footer)
  // should hold off fading in until that sequence finishes, so the pie chart
  // reads as its own complete beat rather than racing the rest of the page.
  const [pieComplete, setPieComplete] = useState(false);

  return (
    <div className="mobile-page">
      <Hero playIntro={playIntro} onOpenArtist={onOpenArtist} />

      <motion.p
        className="m-deleted-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        The tweet was deleted. <br />
        The consequences were not.
      </motion.p>

      <BillionsSection onPieComplete={() => setPieComplete(true)} />
      <AdlStat gate={pieComplete} />
      <PiersMorgan gate={pieComplete} />
      <Footer />
    </div>
  );
}
