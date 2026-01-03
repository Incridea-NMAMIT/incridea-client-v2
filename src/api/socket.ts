import { io } from 'socket.io-client'

const getSocketUrl = () => {
    // If VITE_API_URL is defined, use it as base (stripping /api)
    if (typeof import.meta.env.VITE_API_URL === 'string' && import.meta.env.VITE_API_URL.length > 0) {
        return import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
    }
    // Fallback for local development (assuming server is on 4000)
    return 'http://localhost:4000'
}

export const socket = io(getSocketUrl(), {
    autoConnect: false,
    transports: ['websocket', 'polling'] 
})
