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
    icon: "/pin-green.svg",
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
      "/property-images/ahangama-inland-70-perches/ahangama-inland-70-perches.png",
    position: { lat: 5.973409, lng: 80.370451 },
    icon: "/pin.svg",
    concept:
      "Inland property with limited access and an existing structure. Roads are narrow — not suitable for commercial or large-scale development. Best suited for small renovation or private residence.",
  },
  {
    id: "ahangama-74p",
    name: "74 Perch Elevated Colonial Property — Ahangama",
    brokerName: "Chandana Nanayakkara",
    brokerNumber: "+94 77 718 5465",
    rating: 4.0,
    category: "Land with Colonial House",
    status: "Available",
    address: "Inland Ahangama (near The Kip), Southern Province, Sri Lanka",
    pricePerPerch: 1300000,
    sizePerches: 74,
    size: "74 perches",
    zoning: "Residential / Mixed-Use (Inland)",
    features: [
      "Old colonial-style house (run down condition)",
      "12-foot narrow road access",
      "Elevated terrain with good drainage",
      "Road runs around the property",
      "Proximity to The Kip Ahangama",
      "Scenic inland surroundings",
    ],
    image:
      "/property-images/ahangama-inland-74-perches/ahangama-inland-74-perches.jpg",
    position: { lat: 5.97073, lng: 80.374823 },
    icon: "/pin.svg",
    concept:
      "Elevated inland property featuring a run-down colonial house with road frontage on multiple sides. Narrow 12-foot access road, yet located close to The Kip — ideal for restoration into a boutique villa or heritage guesthouse.",
  },
  {
    id: "ahangama-25p",
    name: "25 Perch Dual Frontage Land — Ahangama",
    brokerName: "Mr. Meththananda",
    brokerNumber: "+94 77 557 8326",
    rating: 4.0,
    category: "Prime Land",
    status: "Available",
    address: "Matara Road, Ahangama, Southern Province, Sri Lanka",
    pricePerPerch: 2500000,
    sizePerches: 25,
    size: "25 perches",
    zoning: "Commercial / Residential Mixed-Use",
    features: [
      "Road frontage on Galle–Matara main road",
      "Secondary access via internal road",
      "Close to major surf points and cafés",
      "Flat, elevated terrain",
      "Ideal for boutique villa or commercial use",
    ],
    image:
      "/property-images/ahangama-main-road-25-perches/aghangama-main-road-frontage-25-perches.jpeg",
    position: { lat: 5.969310420491796, lng: 80.37055541311665 },
    icon: "/pin-green.svg",
    concept:
      "A highly desirable inland plot located near the main Galle–Matara road with dual road frontage. Positioned close to Ahangama’s surf breaks and cafés, this elevated property is ideal for a boutique hospitality, mixed-use, or residential development.",
  },
  {
    id: "ahangama-210p",
    name: "210 Perch Beachfront Property — Ahangama",
    brokerName: "Mr. Meththananda",
    brokerNumber: "+94 77 557 8326",
    rating: 5.0,
    category: "Beachfront Land",
    status: "Available",
    address: "Ahangama Beachfront, Southern Province, Sri Lanka",
    pricePerPerch: 6500000,
    sizePerches: 210,
    size: "210 perches",
    zoning: "Tourism / Commercial",
    features: [
      "Absolute beachfront property",
      "Excellent swimming and surf-friendly beach frontage",
      "Prime tourism zone with resort potential",
      "Easy access from Galle–Matara main road",
      "Surrounded by popular surf points and cafés",
      "High-value neighborhood with boutique resorts nearby",
    ],
    image:
      "/property-images/ahangama-210-beach-front/ahangama-beach-front-210-perches.jpeg",
    position: { lat: 5.973090513482653, lng: 80.36081809527157 },
    icon: "/pin.svg",
    concept:
      "An exceptional beachfront parcel offering direct access to one of Ahangama’s most beautiful and swimmable beaches. Ideal for a luxury resort, boutique villas, or a branded development, this property enjoys a premium location near major surf points and coastal landmarks.",
  },
  {
    id: "ahangama-25p-beachfront",
    name: "25 Perch Narrow Beachfront Plot — Ahangama",
    brokerName: "Mr. Meththananda",
    brokerNumber: "+94 77 557 8326",
    rating: 3.5,
    category: "Beachfront Land",
    status: "Available",
    address: "Ahangama Beachfront, Southern Province, Sri Lanka",
    pricePerPerch: 9000000,
    sizePerches: 25,
    size: "25 perches",
    zoning: "Tourism / Coastal",
    features: [
      "Absolute beachfront position",
      "Premium surf zone frontage",
      "Incredibly high land value — benchmark pricing for the area",
      "Narrow site with potential setback constraints",
      "Ideal for an ultra-luxury villa or branded beachfront residence",
      "Direct beach access and panoramic ocean views",
    ],
    image:
      "/property-images/ahangama-beach-front-25-perches/ahangama-beach-front-25-perches.jpeg",
    position: { lat: 5.973731530201136, lng: 80.35937877018878 },
    icon: "/pin.svg",
    concept:
      "An exclusive but narrow beachfront parcel in central Ahangama — commanding the highest price per perch in the area. Exceptional ocean frontage with direct surf access, though development potential may be limited by coastal setback regulations. Suited for a single high-end villa or architectural statement home.",
  },
  {
    id: "ahangama-16p-inland",
    name: "16 Perch Inland Property — Ahangama",
    brokerName: "Mr. Meththananda",
    brokerNumber: "+94 77 557 8326",
    rating: 3.8,
    category: "Inland Land",
    status: "Available",
    address: "Inland Ahangama, Southern Province, Sri Lanka",
    pricePerPerch: 3500000,
    sizePerches: 16,
    size: "16 perches",
    zoning: "Residential / Mixed-Use (Inland)",
    features: [
      "Located approximately 150 meters inland from the Galle–Matara main road",
      "Narrow access road",
      "Flat, developable terrain",
      "Option to acquire an additional 55 perches adjoining the property",
      "Quiet area, walking distance to main road and surf points",
    ],
    image:
      "/property-images/ahangama-inland-16-perches/ahangama-inland-16-perches.jpeg",
    position: { lat: 5.975738261001794, lng: 80.35945130163013 },
    icon: "/pin.svg",
    concept:
      "Compact inland parcel located just 150 meters from the Galle–Matara main road. Offers potential to expand by acquiring an adjoining 55-perch block. Suitable for a small villa, guesthouse, or combined residential development in a peaceful yet accessible location.",
  },
  {
    id: "ahangama-70p-railway",
    name: "70 Perch Inland Property (Across Railway) — Ahangama",
    brokerName: "Mr. Meththananda",
    brokerNumber: "+94 77 557 8326",
    rating: 4.2,
    category: "Inland Land",
    status: "Available",
    address:
      "Across Railway Line, Inland Ahangama, Southern Province, Sri Lanka",
    pricePerPerch: 1200000,
    sizePerches: 70,
    size: "70 perches",
    zoning: "Residential / Mixed-Use (Inland)",
    features: [
      "Located just across the railway line from the main Ahangama road",
      "Wide cross access with good approach",
      "Flat, regular-shaped block suitable for development",
      "Lower price point compared to nearby inland plots",
      "Quiet inland setting yet close to surf and town",
    ],
    image:
      "/property-images/ahangama-inland-railway-70-perches/ahangama-inland-70-acroos-railway.jpeg",
    position: { lat: 5.97946282163067, lng: 80.34973760262494 },
    icon: "/pin.svg",
    concept:
      "A well-proportioned 70-perch inland property situated just beyond the railway line in Ahangama. Offers wide access and close proximity to the main road at an attractive price point, making it ideal for residential or small-scale hospitality development.",
  },
  {
    id: "ahangama-60p-inland",
    name: "60 Perch Inland Property — Ahangama Fringe",
    brokerName: "Mr. Meththananda",
    brokerNumber: "+94 77 557 8326",
    rating: 3.0,
    category: "Inland Land",
    status: "Available",
    address: "Ahangama Inland Fringe, Southern Province, Sri Lanka",
    pricePerPerch: 700000,
    sizePerches: 60,
    size: "60 perches",
    zoning: "Residential / Mixed-Use (Inland)",
    features: [
      "Located on the inland fringe of Ahangama’s main tourism zone",
      "Quiet environment with proximity to cafes and surf points",
      "Accessible road connection to the Galle–Matara main road",
      "Flat terrain suitable for boutique residential or retreat development",
      "Affordable price relative to core beachfront zones",
    ],
    image:
      "/property-images/ahangama-60-inland-perches/ahangama-inland-60-perches.jpeg",
    position: { lat: 5.984512320965032, lng: 80.33925683422835 },
    icon: "/pin.svg",
    concept:
      "A 60-perch inland property positioned on the outer edge of Ahangama’s main tourism corridor. Offers a balanced mix of tranquility and accessibility at a comparatively lower price point — ideal for boutique villa, yoga retreat, or residential development.",
  },
  {
    id: "ahangama-34p-rokzz",
    name: "34 Perch Inland Property — Ahangama",
    brokerName: "Rokzz",
    brokerNumber: "+94 70 198 3883",
    rating: 3.0,
    category: "Inland Land",
    status: "Available",
    address: "Inland Ahangama, Southern Province, Sri Lanka",
    pricePerPerch: 2000000,
    sizePerches: 34,
    size: "34 perches",
    zoning: "Residential / Mixed-Use (Inland)",
    features: [
      "Accessible via a wide main approach road leading to a narrower lane",
      "Moderate access conditions — suitable for small-scale builds",
      "Quiet inland location within reach of main road and beach",
      "Flat land with basic utilities available",
      "Good mid-range investment opportunity",
    ],
    image:
      "/property-images/ahangama-inland-34-peches/ahangama-inland-34-perches.jpeg",
    position: { lat: 5.9709935892744905, lng: 80.36894609477089 },
    icon: "/pin.svg",
    concept:
      "A mid-sized inland parcel located just off Ahangama’s main access road. The site offers a combination of convenience and seclusion, accessed via a wide road narrowing closer to the property. Suitable for a private residence, small guesthouse, or boutique investment.",
  },
  {
    id: "ahangama-65p-kip",
    name: "65 Perch Inland Property near The Kip — Ahangama",
    brokerName: "Chandana Nanayakkara",
    brokerNumber: "+94 77 718 5465",
    rating: 3.0,
    category: "Inland Land",
    status: "Available",
    address: "Near The Kip, Inland Ahangama, Southern Province, Sri Lanka",
    pricePerPerch: 1150000,
    sizePerches: 65,
    size: "65 perches",
    zoning: "Residential / Mixed-Use (Inland)",
    features: [
      "Located close to The Kip Ahangama",
      "Approx. 4-meter narrow road access",
      "Flat terrain suitable for small villa or residential development",
      "Peaceful inland setting within short reach of main road and surf points",
    ],
    image:
      "/property-images/ahangama-inland-65-perches/ahangama-inland-65-perches.jpeg",
    position: { lat: 5.970312031181886, lng: 80.37476018793431 },
    icon: "/pin.svg",
    concept:
      "A 65-perch inland plot located near The Kip in Ahangama. The site offers a tranquil environment with 4-meter road access and convenient proximity to cafés and surf points — ideal for a small-scale hospitality or residential project.",
  },
  {
    id: "ahangama-85p-gallematara",
    name: "85 Perch Main Road Ocean-View Property — Ahangama",
    brokerName: "Chandana Nanayakkara",
    brokerNumber: "+94 77 718 5465",
    rating: 4.0,
    category: "Commercial / Mixed-Use",
    status: "Available",
    address:
      "Galle–Matara Road Frontage, Ahangama, Southern Province, Sri Lanka",
    pricePerPerch: 2000000,
    sizePerches: 85,
    size: "85 perches",
    zoning: "Commercial / Tourism Mixed-Use",
    features: [
      "30-meter frontage facing Galle–Matara main road",
      "Unobstructed ocean view directly from the property",
      "Prime commercial location with high visibility",
      "Strong suitability for retail, hotel, and mixed residential development",
      "Easy access and strong roadside presence",
      "One of the better-located commercial blocks in the area",
    ],
    image:
      "/property-images/ahangama-road-frontage-85-perches/ahangama-road-frontaga-85-perches.jpeg",
    position: { lat: 5.968002891039969, lng: 80.37449125892566 },
    icon: "/pin-green.svg",
    concept:
      "A highly strategic 85-perch property with 30 meters of Galle–Matara Road frontage and a rare unobstructed ocean view from the land itself. Ideal for commercial retail, boutique hotel, serviced apartments, or a mixed-use coastal development. Strong location, strong visibility, strong potential.",
  },
  {
    id: "ahangama-19p-inland",
    name: "19 Perch Inland Subdivided Property — Ahangama",
    brokerName: "Chandana Nanayakkara",
    brokerNumber: "+94 77 718 5465",
    rating: 2.5,
    category: "Inland Land",
    status: "Available",
    address: "Inland Ahangama, Southern Province, Sri Lanka",
    pricePerPerch: 2000000,
    sizePerches: 19,
    size: "19 perches",
    zoning: "Residential / Mixed-Use (Inland)",
    features: [
      "Subdivided inland land parcel",
      "Additional adjoining land available for expansion",
      "Foreign-owned houses already within the development",
      "Quiet and private location",
      "Suitable for small villa, residence, or cluster development",
    ],
    image:
      "/property-images/ahangama-inland-19-perches/ahangama-inland-19-perches .jpeg",
    position: { lat: 5.982840344639934, lng: 80.35263050436558 },
    icon: "/pin.svg",
    concept:
      "A subdivided 19-perch inland parcel within an emerging residential cluster featuring existing foreign-owned homes. Well-suited for a boutique residence or small villa. Additional land can be secured for those wanting to expand their footprint.",
  },
  {
    id: "ahangama-57p-inland",
    name: "57 Perch Inland Property with House — Ahangama",
    brokerName: "Chandana Nanayakkara",
    brokerNumber: "+94 77 718 5465",
    rating: 3.5,
    category: "Inland Land with House",
    status: "Available",
    address: "Inland Ahangama, Southern Province, Sri Lanka",
    pricePerPerch: 1700000,
    sizePerches: 57,
    size: "57 perches",
    zoning: "Residential / Mixed-Use (Inland)",
    features: [
      "Existing house included with the property",
      "Good inland location with easy access",
      "Strong value for price at 1.7M per perch",
      "Flat and developable terrain",
      "Quiet area close to Ahangama and surf spots",
    ],
    image:
      "/property-images/ahangama-inland-57-perches/ahangama-inland-57-perches.jpeg",
    position: { lat: 5.979274, lng: 80.35054 },
    icon: "/pin.svg",
    concept:
      "A 57-perch inland plot featuring an existing house, offering strong value relative to nearby inland properties. Suitable for residential or rental development, with peaceful surroundings and close proximity to Ahangama’s main amenities.",
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
