import React, { useState } from 'react';
import ReactModal from 'react-modal';


function VideoFile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="video">
        <h2 className="visually-hidden">Видео про ЖК Utopia Estates</h2>
        <div className="container">
          <button 
            onClick={openModal}
            className="video__link"
            aria-label="Открыть видео"
          >
            <img src="./img/video/play.svg" alt="" className="video__icon" />
            <img src="./img/video/video-img.jpg" alt="Превью видео" className="video__img" />
          </button>
        </div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Видео о ЖК Utopia Estates"
        className="video-modal"
        overlayClassName="video-modal-overlay"
      >
        <button onClick={closeModal} className="video-modal__close">
          &times;
        </button>
        <div className="video-modal__content">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/bhJNL9JUsnY?autoplay=1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Видео о ЖК Utopia Estates"
          ></iframe>
        </div>
      </ReactModal>
    </>
  );
}

export default VideoFile;