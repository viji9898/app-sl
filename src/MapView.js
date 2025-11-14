import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const getResponsiveStyles = (isMobile) => ({
  containerStyle: {
    width: isMobile ? "100%" : "70%",
    height: isMobile ? "50vh" : "100vh",
  },

  appStyle: {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    height: "100vh",
  },

  sidebarStyle: {
    width: isMobile ? "100%" : "30%",
    height: isMobile ? "50vh" : "100vh",
    backgroundColor: "#f8f9fa",
    padding: isMobile ? "15px" : "20px",
    overflowY: "auto",
    borderLeft: isMobile ? "none" : "1px solid #dee2e6",
    borderTop: isMobile ? "1px solid #dee2e6" : "none",
  },

  placeCardStyle: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: isMobile ? "15px" : "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  imageStyle: {
    width: "100%",
    height: isMobile ? "150px" : "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },

  titleStyle: {
    fontSize: isMobile ? "20px" : "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },

  ratingStyle: {
    fontSize: isMobile ? "16px" : "18px",
    color: "#f39c12",
    marginBottom: "5px",
  },

  categoryStyle: {
    fontSize: isMobile ? "14px" : "16px",
    color: "#666",
    marginBottom: "5px",
  },

  statusStyle: {
    fontSize: isMobile ? "14px" : "16px",
    color: "#27ae60",
    marginBottom: "10px",
  },

  addressStyle: {
    fontSize: isMobile ? "12px" : "14px",
    color: "#666",
    lineHeight: "1.4",
  },

  closeButtonStyle: {
    display: isMobile ? "block" : "none",
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#f8f9fa",
    border: "1px solid #dee2e6",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    fontSize: "18px",
    cursor: "pointer",
    zIndex: 1000,
  },
});

// Map center (Spitalfields)
const center = { lat: 51.5194, lng: -0.0741 };

// ✅ YOUR PLACES ARRAY GOES HERE (at the top of the file)
const places = [
  {
    id: "bottles",
    name: "BOTTLES",
    rating: 4.3,
    category: "Italian restaurant",
    status: "Closed until 12:00 PM",
    address: "67 Brushfield St, London E1 6AA, United Kingdom",
    image:
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200",
    position: { lat: 51.5192, lng: -0.074 },
    icon: "/pin.svg",
  },
  {
    id: "merchant-weaver",
    name: "Merchant & Weaver",
    rating: 4.6,
    category: "Bar · Restaurant",
    status: "Open · Closes 11:00 PM",
    address: "8 Lamb St, London E1 6EA, United Kingdom",
    image:
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200",
    position: { lat: 51.5198, lng: -0.0751 },
    icon: "/pin.svg",
  },
];

function MapView() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handleCloseDetails = () => {
    setSelectedPlace(null);
  };

  const styles = getResponsiveStyles(isMobile);

  return (
    <div style={styles.appStyle}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={styles.containerStyle}
          center={center}
          zoom={isMobile ? 14 : 15}
          options={{
            disableDefaultUI: isMobile,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: !isMobile,
            gestureHandling: isMobile ? "greedy" : "cooperative",
          }}
        >
          {/* Render markers from places data */}
          {places.map((place) => (
            <Marker
              key={place.id}
              position={place.position}
              icon={{
                url: place.icon,
                scaledSize: {
                  width: isMobile ? 32 : 38,
                  height: isMobile ? 32 : 38,
                },
              }}
              title={place.name}
              onClick={() => handleMarkerClick(place)}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      <div style={styles.sidebarStyle}>
        {selectedPlace ? (
          <div style={{ ...styles.placeCardStyle, position: "relative" }}>
            {isMobile && (
              <button
                style={styles.closeButtonStyle}
                onClick={handleCloseDetails}
                aria-label="Close details"
              >
                ×
              </button>
            )}
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              style={styles.imageStyle}
            />
            <h2 style={styles.titleStyle}>{selectedPlace.name}</h2>
            <div style={styles.ratingStyle}>★ {selectedPlace.rating}</div>
            <div style={styles.categoryStyle}>{selectedPlace.category}</div>
            <div style={styles.statusStyle}>{selectedPlace.status}</div>
            <div style={styles.addressStyle}>{selectedPlace.address}</div>
          </div>
        ) : (
          <div style={styles.placeCardStyle}>
            <h2 style={styles.titleStyle}>
              {isMobile ? "Tap a pin" : "Select a Place"}
            </h2>
            <p style={styles.categoryStyle}>
              {isMobile
                ? "Tap on a pin to see details about the location."
                : "Click on a pin to see details about the location."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapView;
