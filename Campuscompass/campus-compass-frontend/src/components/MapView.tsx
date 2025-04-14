import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import API from '../api/axios';
import SearchBar from './SearchBar';

const FlyToLocation = ({ coords }: { coords: [number, number] }) => {
  const map = useMap(); 
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 15); 
    }
  }, [coords, map]);
  return null;
};

const LocationMarker = ({ onMapClick }: { onMapClick: (coords: [number, number]) => void }) => {
  useMapEvents({
    click(e) {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const MapView = () => {
  const [position, setPosition] = useState<[number, number]>([31.1048, 77.1734]);
  const [flyTo, setFlyTo] = useState<[number, number] | null>(null);
  const [clickedCoords, setClickedCoords] = useState<[number, number] | null>(null);
  const [locationName, setLocationName] = useState('');
  const [review, setReview] = useState('');
  const [savedLocations, setSavedLocations] = useState<
    { name: string; review: string; coordinates: { lat: number; lng: number } }[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await API.get('/locations');
        setSavedLocations(res.data);
      } catch (err) {
        console.error("Failed to fetch locations", err);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = async (location: string) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
    const data = await res.json();

    if (data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setPosition([lat, lon]);
      setFlyTo([lat, lon]);
    } else {
      alert("Location not found");
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <SearchBar onSearch={handleSearch} />

      {clickedCoords && (
  <div
    style={{
      position: 'absolute',
      top: 20,
      left: 60,
      zIndex: 1000,
      background: '#fff',
      padding: '15px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      width: '300px',
      maxHeight: '400px',
      overflowY: 'auto',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h4 style={{ margin: 0 }}>📌 Add a Location</h4>
      <button
        onClick={() => setClickedCoords(null)}
        style={{
          background: 'transparent',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
        }}
        aria-label="Close"
      >
        ❌
      </button>
    </div>

    <label style={{ fontWeight: 'bold', marginBottom: '4px' }}>
      Location Name <span style={{ color: 'red' }}>*</span>
    </label>
    <input
      type="text"
      placeholder="Enter location name"
      value={locationName}
      onChange={(e) => setLocationName(e.target.value)}
      style={{
        marginBottom: '10px',
        padding: '8px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '6px',
      }}
    />

    <label style={{ fontWeight: 'bold', marginBottom: '4px' }}>
      Review <span style={{ color: 'red' }}>*</span>
    </label>
    <textarea
      placeholder="Write a review"
      value={review}
      onChange={(e) => setReview(e.target.value)}
      rows={4}
      style={{
        marginBottom: '10px',
        padding: '8px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '6px',
        resize: 'none',
      }}
    />

    <button
      onClick={async () => {
        if (!locationName.trim() || !review.trim()) {
          alert('Both Location Name and Review are required!');
          return;
        }

        try {
          const res = await API.post('/locations', {
            name: locationName,
            review,
            coordinates: {
              lat: clickedCoords![0],
              lng: clickedCoords![1],
            },
          });

          if (res.status === 201) {
            alert('Location saved!');
            setSavedLocations((prev) => [res.data, ...prev]);
          } else {
            alert('Failed to save location.');
          }
        } catch (err) {
          console.error(err);
          alert('Server error');
        }

        setClickedCoords(null);
        setLocationName('');
        setReview('');
      }}
      style={{
        padding: '10px',
        width: '100%',
        backgroundColor: '#1d3557',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      Submit
    </button>
  </div>
)}


      <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>📍 Selected Location</Popup>
        </Marker>

        {savedLocations.map((loc, idx) => (
          <Marker key={idx} position={[loc.coordinates.lat, loc.coordinates.lng]}>
            <Popup>
              <strong>{loc.name}</strong> <br />
              {loc.review}
            </Popup>
          </Marker>
        ))}

        {clickedCoords && (
          <Marker position={clickedCoords}>
            <Popup>
              New Location: {locationName || 'Unnamed'} <br />
              Review: {review || 'No review yet'}
            </Popup>
          </Marker>
        )}

        <LocationMarker onMapClick={(coords) => setClickedCoords(coords)} />
        {flyTo && <FlyToLocation coords={flyTo} />}
      </MapContainer>
    </div>
  );
};

export default MapView;
