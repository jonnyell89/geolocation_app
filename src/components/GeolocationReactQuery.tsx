import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherAPI } from "../state";

type GeolocationProps = {
    coords: { latitude: string; longitude: string };
    setCoords: React.Dispatch<React.SetStateAction<{ latitude: string; longitude: string }>>;
    onSubmit: (coords: { latitude: number; longitude: number }) => void;
}

function GeolocationReactQuery({ coords, setCoords, onSubmit }: GeolocationProps) {

    // Asynchronous function to fetch geolocation data.
    const getGeolocation = async () => {

        const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=5&appid=${WeatherAPI}`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        return response.json();
    }

    // React Query hook to manage async status and data fetching and caching.
    const { data, isLoading, isError, error, refetch} = useQuery({
        queryKey: ["geolocation", coords.latitude, coords.longitude],
        queryFn: getGeolocation,
        enabled: false, // Prevents automatic fetch and refetch must be called manually.
    })

    // With each keystroke, updates state and re-renders input component.
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setCoords({...coords, [event.target.name]: event.target.value})
    }

    // Triggers a manual fetch on form submission.
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        // Prevents default web browser refresh.
        event.preventDefault();

        // Converts coordinate strings to floats.
        const lat = parseFloat(coords.latitude as string);
        const lon = parseFloat(coords.longitude as string);

        // Validates that coordinates are numbers.
        if (isNaN(lat) || isNaN(lon)) {
            alert("Please enter valid numeric coordinates.");
            return;
        }

        // Refetch is called manually.
        const result = await refetch();

        // Updates map coordinates with valid API location data.
        onSubmit({ latitude: result.data[0].lat, longitude: result.data[0].lon });
    }

    // Runs when data changes or setCoords is called.
    useEffect(() => {

        if (data && data.length > 0) {

            const location = data[0];

            if (location.name && location.lat && location.lon) {

                // Updates input coordinates with valid API location data.
                setCoords({
                    latitude: location.lat.toString(),
                    longitude: location.lon.toString(),
                })
            }
        }        
    }, [data, setCoords]);

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
                <button type="submit" disabled={!coords.latitude || !coords.longitude}>Submit</button>
            </form>

            {isLoading && <p>Loading...</p>}
            {isError && <p style={{ color: "red" }}>Error...{(error as Error).message}</p>}
            {data && data.length > 0 && <p>Location: {data[0].name}</p>}
        </>
    )
}

export default GeolocationReactQuery;
