import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type MapDisplayProps = {
    latitude: string;
    longitude: string;
}

function MapDisplay({ latitude, longitude }: MapDisplayProps) {
    
    const position: [number, number] = [
        parseFloat(latitude as string),
        parseFloat(longitude as string),
    ]

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
        </MapContainer>
    )
}

export default MapDisplay;
