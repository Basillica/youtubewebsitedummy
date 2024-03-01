// @ts-nocheck
import React from 'react'
import './App.css'
import { PeriodicTable } from './models/periodic'
import { YouTubeGallery } from './models/youtube'
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar'
import { RootPage } from './models/root';




const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<RootPage />} />
        <Route path="/youtube" element={<YouTubeGallery />} />
        <Route path="/archive" element={<PeriodicTable />} />
        <Route path="/projects" element={<PeriodicTable />} />
      </Routes>
    </>
  );
}

export default App
