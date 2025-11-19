import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GeolocationReactQuery from './components/GeolocationReactQuery'
import MapDisplay from './components/MapDisplay';
import './App.scss'

// user input -> updates inputCoords -> submit -> fetch API -> updates mapCoords -> re-centres map

// Top-level component managing global state for input coordinates and map coordinates.
function App() {

  // Tracks user input and defaults to empty strings.
  const [inputCoords, setInputCoords] = useState({ latitude: "", longitude: "" });
  // Controls where the map is centred and defaults to London.
  const [mapCoords, setMapCoords] = useState({ latitude: 51.509865, longitude: -0.118092 });
  
  // Required by React Query to manage cache and queries globally.
  const queryClient = new QueryClient();

  return (
    <>
      <main className='site-main'>
        <QueryClientProvider client={queryClient}>
          <GeolocationReactQuery coords={inputCoords} setCoords={setInputCoords} onSubmit={(newCoords) => setMapCoords(newCoords)} />
          <MapDisplay latitude={mapCoords.latitude} longitude={mapCoords.longitude} />
        </QueryClientProvider>
      </main>
    </>
  )
}

export default App
