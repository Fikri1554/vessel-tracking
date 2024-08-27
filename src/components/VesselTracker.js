// src/components/VesselTracker.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';

const VesselTracker = () => {
  const [vessels, setVessels] = useState([]);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');
  const [sizeFilter, setSizeFilter] = useState('All');

  useEffect(() => {
    const fetchVessels = async () => {
      try {
        const response = await axios.get('YOUR_VESSEL_TRACKING_API_ENDPOINT', {
          params: {
            key: 'YOUR_API_KEY',
            // Add other parameters based on your API requirements
          }
        });
        setVessels(response.data.vessels);
      } catch (error) {
        console.error("Error fetching vessel data:", error);
      }
    };

    fetchVessels();

    const intervalId = setInterval(fetchVessels, 30000); // Poll every 30 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  useEffect(() => {
    applyFilters();
  }, [typeFilter, sizeFilter, vessels]);

  const applyFilters = () => {
    let filtered = vessels;

    if (typeFilter !== 'All') {
      filtered = filtered.filter(vessel => vessel.type === typeFilter);
    }

    if (sizeFilter !== 'All') {
      filtered = filtered.filter(vessel => vessel.size === sizeFilter);
    }

    setFilteredVessels(filtered);
  };

  return (
    <div>
      <h2>Filter Vessels</h2>
      <div>
        <label>
          Type:
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Cargo">Cargo</option>
            <option value="Tanker">Tanker</option>
            <option value="Passenger">Passenger</option>
            {/* Add more vessel types as needed */}
          </select>
        </label>

        <label>
          Size:
          <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            {/* Define size categories based on your data */}
          </select>
        </label>
      </div>

      <Map vessels={filteredVessels} />
    </div>
  );
};

export default VesselTracker;
