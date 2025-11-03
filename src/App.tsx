import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GeolocatorReactQuery from './components/GeolocatorReactQuery'
import MapDisplay from './components/MapDisplay';
import './App.css'

function App() {

  const [inputCoords, setInputCoords] = useState({ latitude: "", longitude: "" });
  const [mapCoords, setMapCoords] = useState({ latitude: "51.509865", longitude: "-0.118092" });
  
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GeolocatorReactQuery coords={inputCoords} setCoords={setInputCoords} onSubmit={(newCoords) => setMapCoords(newCoords)} />
        <MapDisplay latitude={mapCoords.latitude} longitude={mapCoords.longitude} />
      </QueryClientProvider>
    </>
  )
}

export default App
