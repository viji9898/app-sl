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
const center = { lat: 5.9803969, lng: 80.358803 };
// ✅ YOUR PLACES ARRAY GOES HERE (at the top of the file)
const places = [
  {
    id: "ahangama-31p",
    name: "31 Perch Land — Inland Ahangama",
    brokerName: "Chandana Nanayakkara",
    brokerNumber: "+94 77 718 5465",
    rating: 4.8,
    category: "Land for Sale",
    status: "Available",
    address: "Bandaramulla Road, Inland Ahangama, Southern Province, Sri Lanka",
    pricePerPerch: 3000000,
    sizePerches: 31,
    zoning: "UDA Mixed-Use (G+2 permissible)",
    features: [
      "main Galle Road frontage",
      "flat terrain",
      "natural drainage",
      "mature trees",
    ],
    image: "/property-images/ahangama-31-perches/ahangama-31-perches.jpg",
    position: { lat: 5.975029, lng: 80.356993 },
    icon: "/pin.svg",
    concept:
      "Ideal for a courtyard-style mixed-use development with 3 apartments (700 sqft each) and a café spine.",
  },
  {
    id: "ahangama-70p",
    name: "70 Perch Inland Property — Ahangama",
    brokerName: "Chandana Nanayakkara",
    brokerNumber: "+94 77 718 5465",
    rating: 2.0,
    category: "Land with House",
    status: "Not Recommended",
    address: "Inland Ahangama, Southern Province, Sri Lanka",
    pricePerPerch: 900000,
    sizePerches: 70,
    size: "70 perches",
    zoning: "Residential / Mixed-Use (Inland)",
    features: [
      "Existing house on property",
      "Narrow access roads",
      "Limited vehicle approach",
      "Flat inland terrain",
      "Basic utility connections",
    ],
    image:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200",
    position: { lat: 5.973409, lng: 80.370451 },
    icon: "/pin.svg",
    concept:
      "Inland property with limited access and an existing structure. Roads are narrow — not suitable for commercial or large-scale development. Best suited for small renovation or private residence.",
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
            {selectedPlace.pricePerPerch && (
              <div
                style={{
                  ...styles.categoryStyle,
                  fontWeight: "bold",
                  color: "#e74c3c",
                }}
              >
                LKR {selectedPlace.pricePerPerch.toLocaleString()} per perch
              </div>
            )}
            {selectedPlace.sizePerches && (
              <div style={styles.categoryStyle}>
                Size: {selectedPlace.sizePerches} perches
              </div>
            )}
            {selectedPlace.pricePerPerch && selectedPlace.sizePerches && (
              <div
                style={{
                  ...styles.categoryStyle,
                  fontWeight: "bold",
                  color: "#2c3e50",
                }}
              >
                Total: LKR{" "}
                {(
                  selectedPlace.pricePerPerch * selectedPlace.sizePerches
                ).toLocaleString()}
              </div>
            )}
            {selectedPlace.zoning && (
              <div style={styles.categoryStyle}>
                Zoning: {selectedPlace.zoning}
              </div>
            )}
            {selectedPlace.features && (
              <div style={styles.categoryStyle}>
                Features: {selectedPlace.features.join(", ")}
              </div>
            )}
            {selectedPlace.brokerName && (
              <div style={{ ...styles.categoryStyle, marginTop: "10px" }}>
                Broker: {selectedPlace.brokerName}
              </div>
            )}
            {selectedPlace.brokerNumber && (
              <div style={{ ...styles.categoryStyle, fontWeight: "bold" }}>
                Contact: {selectedPlace.brokerNumber}
              </div>
            )}
            {selectedPlace.concept && (
              <div
                style={{
                  ...styles.addressStyle,
                  marginTop: "10px",
                  fontStyle: "italic",
                }}
              >
                {selectedPlace.concept}
              </div>
            )}
            <div style={styles.addressStyle}>{selectedPlace.address}</div>
          </div>
        ) : (
          <div style={styles.placeCardStyle}>
            <h2 style={styles.titleStyle}>
              {isMobile ? "Tap a pin" : "Select a Property"}
            </h2>
            <p style={styles.categoryStyle}>
              {isMobile
                ? "Tap on a pin to see land details."
                : "Click on a pin to see land details and pricing."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapView;
