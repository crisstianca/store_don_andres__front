import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomeMenu from '../pages/HomeMenu'
import { Navigation } from '../components/Navigation'
import { Login } from '../pages/Login'
import { TableProducts } from "../components/TableProducts"
import { Toaster } from "react-hot-toast"
import 'primeicons/primeicons.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <div className="container mx-auto">
              <Navigation />
              <Routes>
                <Route path="/" element={<Navigate to="/menu" />} />
                <Route path="/menu" element={<HomeMenu />} />
                <Route path="/menu/:id" element={<TableProducts />} />
                <Route path="/menu/:id/:categoryId" element={<TableProducts />} />
              </Routes>
            </div>
          }
        />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App
