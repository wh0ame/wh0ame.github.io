import React from 'react';
import { YMaps, Map as YandexMap, Placemark } from '@pbe/react-yandex-maps';

export default function Map() {
  return (
    <div className="container">
      <div className="section-map__title">
        <h2 className="title-2" id="map">Район на карте</h2>
      </div>
      <div className="section-map__map">
        <YMaps>
          <YandexMap
            defaultState={{
              center: [59.9342802, 30.3350986], // Координаты Санкт-Петербурга
              zoom: 12,
            }}
            width="100%"
            height="358px"
          >
            <Placemark geometry={[59.9342802, 30.3350986]} />
          </YandexMap>
        </YMaps>
      </div>
    </div>
  );
}