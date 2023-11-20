'use client'
import React, { useEffect } from 'react'
import Nav from "./components/Nav";
import Home from "./components/Home";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import WebSocketServer from './services/socket';
import { Models, user } from './types';
import ModelsSockets from './services/models_sockets';
import usersSocket from './services/users_sockets';

export default function App() {
    const websocket: WebSocketServer<Models> = new ModelsSockets();
    const websocket2: WebSocketServer<user> = new usersSocket();

    useEffect(()=>{
        websocket.conectSocket();
        websocket2.getAll()
        websocket.getAll()
    }, [])

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
