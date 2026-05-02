import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from './components/atoms/ScrollToTop';
import { Footer } from './components/organisms/Footer';
import { Header } from './components/organisms/Header';
import { activityPages } from './data/activityPages';
import { AboutPage } from './pages/AboutPage';
import { WaterHardnessPage } from './pages/WaterHardnessPage';
import { ActivityPage } from './pages/ActivityPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { MemberDetailPage } from './pages/MemberDetailPage';
import { MembersPage } from './pages/MembersPage';
import { NewsPage } from './pages/NewsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-ink">
        <div className="flex min-h-screen flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/page/:pageNumber" element={<Navigate to="/news" replace />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/members/:memberSlug" element={<MemberDetailPage />} />
            <Route path="/contactus" element={<ContactPage />} />
            <Route path="/activities" element={<Navigate to="/activities/play" replace />} />
            <Route path="/activities/play" element={<ActivityPage page={activityPages.play} />} />
            <Route path="/activities/co-creation" element={<ActivityPage page={activityPages.coCreation} />} />
            <Route path="/activities/it-iot-lesson" element={<ActivityPage page={activityPages.lesson} />} />
            <Route path="/activities/it/iot-lesson" element={<Navigate to="/activities/it-iot-lesson" replace />} />
            <Route path="/activities/it%2Fiot-lesson" element={<Navigate to="/activities/it-iot-lesson" replace />} />
            <Route path="/activities/cafe-wa-create" element={<ActivityPage page={activityPages.cafe} />} />
            <Route path="/calc-waterhardness" element={<WaterHardnessPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
