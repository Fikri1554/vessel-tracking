import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ vessels }) => {
  return (
    <MapContainer 
      center={[-2.5, 118]} 
      zoom={5} 
      style={{ height: '100vh' }}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmlrei0xODQ1IiwiYSI6ImNtMGM2eXdoaTAwMncyaXM3cWNqd2NqM20ifQ.qqDdZe5sneVax6hozsqymQ"
        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
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
