import { useState } from "react";
import { WeatherAPI } from '../state';

function Geolocator() {

    const [coords, setCoords] = useState({
        name: "",
        latitude: "",
        longitude: "",
    })

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        setCoords({...coords, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();

        const lat = parseFloat(coords.latitude);
        const lon = parseFloat(coords.longitude);

        if (isNaN(lat) || isNaN(lon)) {
            setError("Please enter valid numeric coordinates.")
            setStatus("error");
            return;
        }

        try {

            setStatus("loading");
            setError(null);
            
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=${WeatherAPI}`);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const result = await response.json();

            if (!result.length) {
                throw new Error("No location found for inputted coordinates.");
            }

            setCoords({
                latitude: result[0].lat.toString(),
                longitude: result[0].lon.toString(),
                name: result[0].name,
            })

            setStatus("success");

        } catch(err: any) {

            setError(err.message || "Something went wrong when fetching geolocation data.");
            setStatus("error");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="text" id="latitude" name="latitude" value={coords.latitude} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="text" id="longitude" name="longitude" value={coords.longitude} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>

            {status === "idle" && <p>Enter a latitude and longitude</p>}
            {status === "loading" && <p>Loading...</p>}
            {status === "error" && <p style={{ color: "red" }}>Error: {error}</p>}
            {status === "success" && <p>{coords.name}</p>}
        </>
    )
}

export default Geolocator;
