import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherAPI } from "../state";

type GeolocatorProps = {
    coords: { latitude: string; longitude: string };
    setCoords: React.Dispatch<React.SetStateAction<{ latitude: string; longitude: string }>>;
    onSubmit: (coords: { latitude: string; longitude: string }) => void;
}

// Receives { coords, setCoords } props from the parent component App.tsx.
function GeolocatorReactQuery({ coords, setCoords, onSubmit }: GeolocatorProps) {

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
        enabled: false, // Refetch does not run automatically, but only runs when it is called.
    })

    // With each keystroke, updates field in parent's state and re-renders input component.
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setCoords({...coords, [event.target.name]: event.target.value})
    }

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

        const result = await refetch(); // Tells React Query to fetch now.

        onSubmit({ latitude: result.data[0].lat, longitude: result.data[0].lon });
    }

    // Runs when data or setInputCoords changes.
    useEffect(() => {

        // Without useEffect this would execute on each re-render.
        if (data && data.length > 0) {

            const location = data[0];

            if (location.name && location.lat && location.lon) {

                // Triggers a state update which causes another re-render.
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

export default GeolocatorReactQuery;
