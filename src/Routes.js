import { Routes, Route } from 'react-router-dom';
import App from './App';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import Catalog from './catalog/Catalog';
import Ipoteka from './Ipoteka/Ipoteka';
import Contacts from './contacts/Contacts';
import Agreement from './agreement/Agreement';
import ApartmentCard from './catalog/ApartmentCard';
import NotFoundPage from './pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Главный макет */}
      <Route path="/" element={<App />}>
        {/* Вложенные маршруты */}
        <Route index element={null} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="ipoteka" element={<Ipoteka />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="agreement" element={<Agreement />} />
        <Route path="pizdes" element={<ApartmentCard />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      
      {/* Отдельные маршруты */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Обработка 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}