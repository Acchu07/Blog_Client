import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import HomePage from "./components/homepage.jsx"
import Dashboard from "./components/Dashboard.jsx";
import { UserLoggedInProvider } from "./context/userLoggedInContext.jsx";


function App() {
  return (
    <UserLoggedInProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </UserLoggedInProvider>
  )
}

export default App
