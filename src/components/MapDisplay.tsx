import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type MapDisplayProps = {
    latitude: string;
    longitude: string;
}

function RecentreMap({ lat, lon }: { lat: number; lon: number }) {

    const map = useMap();

    useEffect(() => {
        map.setView([lat, lon]);
    }, [lat, lon, map]);

    return null;
}

function MapDisplay({ latitude, longitude }: MapDisplayProps) {
    
    const lat = parseFloat(latitude as string);
    const lon = parseFloat(longitude as string);
    const position: [number, number] = [lat, lon];

    return (
        <MapContainer className="leaflet-container" center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={position}>
                <Popup>
                    Coordinates: {latitude}, {longitude}
                </Popup>
            </Marker>
            <RecentreMap lat={lat} lon={lon} />
        </MapContainer>
    )
}

export default MapDisplay;
