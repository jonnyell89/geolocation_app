import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherAPI } from "../state";

function GeolocatorReactQuery() {

    const [coords, setCoords] = useState({latitude: "", longitude: ""});

    // Function to fetch data.
    const getGeolocation = async () => {

        const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=5&appid=${WeatherAPI}`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        return response.json();
    }

    const { data, isLoading, isError, error, refetch} = useQuery({
        queryKey: ["geolocation", coords.latitude, coords.longitude],
        queryFn: getGeolocation,
        enabled: false, // Prevents auto run.
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setCoords({...coords, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        // Validate input before refetch.
        const lat = parseFloat(coords.latitude);
        const lon = parseFloat(coords.longitude);

        if (isNaN(lat) || isNaN(lon)) {
            alert("please enter valid numeric coordinates.");
            return;
        }

        // Tells React Query to fetch now.
        refetch();
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

            {isLoading && <p>Loading...</p>}
            {isError && <p style={{ color: "red" }}>Error...{(error as Error).message}</p>}
            {data && data.length > 0 && <p>Location: {data[0].name}</p>}
        </>
    )
}

export default GeolocatorReactQuery;
