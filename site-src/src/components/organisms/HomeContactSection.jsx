import { Link } from 'react-router';

export function HomeContactSection() {
  return (
    <section className="home-section home-contact-section">
      <div className="home-section-container">
        <h2 className="home-section-title">Contact us</h2>

        <p className="home-contact-lead">
          ご質問やご協力のご提案など、<br />
          お気軽にお問い合わせください。
        </p>

        <div className="home-section-cta">
          <Link to="/contactus" className="cta-button">
            お問い合わせフォームへ
          </Link>
        </div>
      </div>
    </section>
  );
}
