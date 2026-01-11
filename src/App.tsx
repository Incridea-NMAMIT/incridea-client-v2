import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.tsx'

import { SocketProvider } from './context/SocketContext'
import Sidebar from './components/Sidebar.tsx'
import Navbar from './components/Navbar.tsx'

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <AppRoutes />
        <Navbar/>
        <Sidebar/>
      </SocketProvider>
    </BrowserRouter>
  )
}

export default App
