import { IconImage } from '../atoms/IconImage';

export function AboutHeroSection() {
  return (
    <section className="about-hero" aria-label="About us introduction">
      <div className="about-hero-copy">
        <p className="about-hero-en">technologies for your smile</p>
        <p className="about-hero-ja">-技術であなたを笑顔に-</p>
      </div>
      <IconImage className="about-hero-image" name="top-image.png" alt="" />
    </section>
  );
}
