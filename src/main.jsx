import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MovieProvider } from './Context/MovieContext'
import { PageProvider } from './Context/PaginationContext'
import { FavouriteProvider } from './Context/FavouriteContext'
import { WatchListProvider } from './Context/WatchListContext'
import { AuthProvider } from './Context/AuthContext'
import './index.css'
import App from './components/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <PageProvider>
    <MovieProvider>
    <FavouriteProvider>
    <WatchListProvider> 
    <App />
    </WatchListProvider>
    </FavouriteProvider>
    </MovieProvider>
    </PageProvider>
    </AuthProvider>
  </StrictMode>,
)
