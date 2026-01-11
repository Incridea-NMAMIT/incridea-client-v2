import { useMemo } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.tsx'

import { SocketProvider } from './context/SocketContext'
import Sidebar from './components/Sidebar.tsx'
import TargetCursor from './components/TargetCursor.tsx'

function App() {
  const backgroundStyle = useMemo(() => {
    // Generate 4-5 random blobs for uneven, random look
    const blobs = Array.from({ length: 5 }).map(() => {
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        // Size between 20% and 60%
        const size = 20 + Math.floor(Math.random() * 40); 
        // Deep / Darker purple shades
        const colors = ['#1a0b2e', '#120a1f', '#240a34', '#0f0518', '#1e0b24', '#2e0f35'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, transparent ${size}%)`;
    }).join(', ');

    return {
        backgroundColor: '#000000',
        backgroundImage: blobs,
        // Removed screen blend mode for darker appearance
    };
  }, []);

  return (
    <BrowserRouter>
      <div style={backgroundStyle} className="fixed inset-0 w-full h-full -z-50 pointer-events-none transition-all duration-1000" />
      <SocketProvider>
        <TargetCursor
            spinDuration={2.8}
            hoverDuration={0.7}
        />
        <AppRoutes />
        <Sidebar/>
      </SocketProvider>
    </BrowserRouter>
  )
}

export default App
