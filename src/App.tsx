import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import GeolocatorReactQuery from './components/GeolocatorReactQuery'

function App() {
  
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GeolocatorReactQuery />
      </QueryClientProvider>
    </>
  )
}

export default App
