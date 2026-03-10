import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MovieProvider } from './Context/MovieContext'
import { PageProvider } from './Context/PaginationContext'
import { FavouriteProvider } from './Context/FavouriteContext'
import './index.css'
import App from './components/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageProvider>
    <MovieProvider>
    <FavouriteProvider>
    <App />
    </FavouriteProvider>
    </MovieProvider>
    </PageProvider>
  </StrictMode>,
)
