import { Link } from 'react-router-dom';
import { newsItems } from '../../data/news';
import { NewsTile } from '../molecules/NewsTile';

export function HomeNewsSection() {
  const recentNews = newsItems.slice(0, 5);

  return (
    <section className="home-section home-news-section">
      <div className="home-section-container">
        <h2 className="home-section-title">
          <span className="section-marker">What's new</span>
        </h2>

        <div className="home-news-grid">
          {recentNews.map((item) => (
            <NewsTile key={item.id} item={item} />
          ))}
        </div>

        <div className="home-section-cta">
          <Link to="/news" className="cta-button">
            ニュース一覧へ
          </Link>
        </div>
      </div>
    </section>
  );
}
