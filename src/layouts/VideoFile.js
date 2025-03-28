function VideoFile(){
  return(
    <>
    <div className="video">
      <h2 className="visually-hidden">Видео про ЖК Utopia Estates</h2>
            <div className="container">
              <a
                href="https://www.youtube.com/watch?v=bhJNL9JUsnY"
                data-youtubelightbox=""
                className="video__link"
              >
                <img src="./img/video/play.svg" alt="" className="video__icon" />
                <img src="./img/video/video-img.jpg" alt="" className="video__img" />
              </a>
            </div>
      </div>
    </>
  )
}

export default VideoFile;