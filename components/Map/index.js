import L from 'leaflet';
import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

var myIcon = L.icon({
  iconUrl: 'images/icon-location.svg',
  iconSize: [46, 56],
});

const index = ({ position, zoom }) => {
  return (
    <Map center={position} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position} icon={myIcon}>
        <Popup>
          <span>You are here</span>
        </Popup>
      </Marker>
    </Map>
  );
};

index.propTypes = {};

export default index;
