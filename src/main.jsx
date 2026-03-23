import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./Context/MovieContext";
import { PageProvider } from "./Context/PaginationContext";
import { FavouriteProvider } from "./Context/FavouriteContext";
import { WatchListProvider } from "./Context/WatchListContext";
import { AuthProvider } from "./Context/AuthContext";
import "./index.css";
import App from "./components/App";
import ResetPassword from "./components/ResetPassword";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PageProvider>
          <MovieProvider>
            <FavouriteProvider>
              <WatchListProvider>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                  />
                </Routes>
              </WatchListProvider>
            </FavouriteProvider>
          </MovieProvider>
        </PageProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);