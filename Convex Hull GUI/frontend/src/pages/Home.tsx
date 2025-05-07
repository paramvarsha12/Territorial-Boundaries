import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polygon } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import axios from 'axios';

interface Coordinate {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 0,
  lng: 0
};

const Home: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [hullPoints, setHullPoints] = useState<Coordinate[]>([]);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
  });

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newCoord = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setCoordinates(prev => [...prev, newCoord]);
    }
  }, []);

  const addCoordinate = () => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    
    if (!isNaN(latNum) && !isNaN(lngNum)) {
      setCoordinates(prev => [...prev, { lat: latNum, lng: lngNum }]);
      setLat('');
      setLng('');
    }
  };

  const calculateHull = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/convex-hull', { coordinates });
      setHullPoints(response.data.hull);
    } catch (error) {
      console.error('Error calculating convex hull:', error);
    }
  };

  const clearPoints = () => {
    setCoordinates([]);
    setHullPoints([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-white">Territorial Boundaries Visualization</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="number"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Latitude"
                className="bg-gray-800 text-white p-2 rounded border border-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-600"
              />
              <input
                type="number"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Longitude"
                className="bg-gray-800 text-white p-2 rounded border border-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-600"
              />
              <button
                onClick={addCoordinate}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 active:shadow-inner px-4 py-2 rounded-lg transition-all duration-150 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:-translate-y-1 hover:scale-105"
                style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.25)' }}
              >
                Add Point
              </button>
            </div>

            <div className="space-x-4">
              <button
                onClick={calculateHull}
                className="bg-green-600 hover:bg-green-700 active:scale-95 active:shadow-inner px-4 py-2 rounded-lg transition-all duration-150 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:-translate-y-1 hover:scale-105"
                style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.25)' }}
              >
                Calculate Hull
              </button>
              <button
                onClick={clearPoints}
                className="bg-red-600 hover:bg-red-700 active:scale-95 active:shadow-inner px-4 py-2 rounded-lg transition-all duration-150 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:-translate-y-1 hover:scale-105"
                style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.25)' }}
              >
                Clear Points
              </button>
            </div>

            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <h3 className="font-bold mb-2 text-white">Current Points:</h3>
              <div className="max-h-40 overflow-y-auto text-gray-300">
                {coordinates.map((coord, index) => (
                  <div key={index} className="text-sm">
                    Point {index + 1}: {coord.lat.toFixed(6)}, {coord.lng.toFixed(6)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-800">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={2}
                onClick={onMapClick}
                options={{
                  styles: [
                    {
                      featureType: "all",
                      elementType: "geometry",
                      stylers: [{ color: "#242f3e" }]
                    },
                    {
                      featureType: "all",
                      elementType: "labels.text.stroke",
                      stylers: [{ color: "#242f3e" }]
                    },
                    {
                      featureType: "all",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#746855" }]
                    },
                    {
                      featureType: "administrative.locality",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#d59563" }]
                    },
                    {
                      featureType: "poi",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#d59563" }]
                    },
                    {
                      featureType: "poi.park",
                      elementType: "geometry",
                      stylers: [{ color: "#263c3f" }]
                    },
                    {
                      featureType: "poi.park",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#6b9a76" }]
                    },
                    {
                      featureType: "road",
                      elementType: "geometry",
                      stylers: [{ color: "#38414e" }]
                    },
                    {
                      featureType: "road",
                      elementType: "geometry.stroke",
                      stylers: [{ color: "#212a37" }]
                    },
                    {
                      featureType: "road",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#9ca5b3" }]
                    },
                    {
                      featureType: "water",
                      elementType: "geometry",
                      stylers: [{ color: "#17263c" }]
                    },
                    {
                      featureType: "water",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#515c6d" }]
                    }
                  ]
                }}
              >
                {coordinates.map((coord, index) => (
                  <Marker
                    key={index}
                    position={coord}
                    animation={google.maps.Animation.DROP}
                  />
                ))}
                {hullPoints.length > 0 && (
                  <Polygon
                    paths={hullPoints}
                    options={{
                      fillColor: "#4CAF50",
                      fillOpacity: 0.35,
                      strokeColor: "#4CAF50",
                      strokeOpacity: 0.8,
                      strokeWeight: 2
                    }}
                  />
                )}
              </GoogleMap>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-800 text-white">
                Loading map...
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home; 