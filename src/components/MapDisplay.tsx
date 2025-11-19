import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type MapDisplayProps = {
    
    latitude: number;
    longitude: number;
}

// Re-centres map on valid API location data.
function RecentreMap({ position: [latitude, longitude] }: { position: [number, number] }) {

    const map = useMap();

    // Runs when state changes.
    useEffect(() => {

        map.setView([latitude, longitude]);

    }, [latitude, longitude, map]);

    return null;
}

// Displays React-Leaflet map container.
function MapDisplay({ latitude, longitude }: MapDisplayProps) {
    
    const position: [number, number] = [latitude, longitude];

    return (
        <MapContainer className="leaflet__container" center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={position}>
                <Popup>
                    Coordinates: {latitude}, {longitude}
                </Popup>
            </Marker>
            <RecentreMap position={position} />
        </MapContainer>
    )
}

export default MapDisplay;
