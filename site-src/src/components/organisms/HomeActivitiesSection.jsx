import { Link } from 'react-router';
import { activities } from '../../data/activities';
import { ActivityIcon } from '../atoms/ActivityIcon';

export function HomeActivitiesSection() {
  return (
    <section className="home-section home-activities-section">
      <div className="home-section-container">
        <h2 className="home-section-title">
          <span className="section-marker">Activities</span>
        </h2>

        <div className="home-activities-grid">
          {activities.map((activity) => (
            <Link key={activity.slug} to={activity.to} className="home-activity-card">
              <ActivityIcon name={activity.icon} className="home-activity-icon" />
              <h3 className="home-activity-title">{activity.title}</h3>
              <p className="home-activity-description">{activity.description}</p>
              <span className="home-activity-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
