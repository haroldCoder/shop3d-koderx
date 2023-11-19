'use client'
import React from 'react'
import Nav from "./components/Nav";
import Home from "./components/Home";
import { Route, Routes, BrowserRouter } from 'react-router-dom'

export default function App() {
    return (
        <>
        <BrowserRouter>
        <Nav />
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}
