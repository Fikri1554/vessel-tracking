// src/components/Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ vessels }) => {
  return (
    <MapContainer 
      center={[-2.5, 118]} // Center the map on Indonesia
      zoom={5}             // Adjust the zoom level to cover Indonesia
      style={{ height: '100vh' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {vessels.map(vessel => (
        <Marker key={vessel.mmsi} position={[vessel.lat, vessel.lon]}>
          <Popup>
            {vessel.name} <br /> {vessel.type}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
