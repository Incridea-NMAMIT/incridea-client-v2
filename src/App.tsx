import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.tsx'

import { SocketProvider } from './context/SocketContext'
import Sidebar from './components/Sidebar.tsx'
import Navbar from './components/Navbar.tsx'
import TargetCursor from './components/TargetCursor.tsx'

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <TargetCursor
            spinDuration={2.8}
            hoverDuration={0.7}
        />
        <AppRoutes />
        <Navbar/>
        <Sidebar/>
      </SocketProvider>
    </BrowserRouter>
  )
}

export default App
