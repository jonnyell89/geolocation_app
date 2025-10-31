import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GeolocatorReactQuery from './components/GeolocatorReactQuery'
import MapDisplay from './components/MapDisplay';
import './App.css'

function App() {

  const [coords, setCoords] = useState({ latitude: "51.505", longitude: "-0.09" })
  
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GeolocatorReactQuery coords={coords} setCoords={setCoords} />
        <MapDisplay latitude={coords.latitude} longitude={coords.longitude} />
      </QueryClientProvider>
    </>
  )
}

export default App
