import './App.css';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Main from './layouts/Main';
import About from './layouts/About';
import Apartments from './layouts/Apartments';
import Cta from './layouts/Cta';
import VideoFile from './layouts/VideoFile';
import Map from './layouts/Map';
import Feedback from './layouts/Feedback';
import Footer from './layouts/Footer';
import Database from './layouts/Database';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import Catalog from './catalog/Catalog';
import Ipoteka from './Ipoteka/Ipoteka';
import Contacts from './contacts/Contacts';

function App() {
  return (
    <div className="app">
      
      <Routes>
        {/* Главная страница со всеми компонентами */}
        <Route path="/" element={
          <>
            <Header />
            <Main />
            <About />
            <Apartments />
            <Cta />
            <VideoFile />
            <Map />
            <Feedback />
            <Footer />
          </>
        } />
        
        {/* Отдельные страницы */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/ipoteka" element={<Ipoteka />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      
      <Database />
      
      {/* YouTube LightBox */}
      <div id="youtubelightbox" className="youtubelightbox">
        <div className="youtubelightbox__centeredchild">
          <div className="youtubelightbox__videowrapper">
            <div id="youtubelightboxPlayer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;