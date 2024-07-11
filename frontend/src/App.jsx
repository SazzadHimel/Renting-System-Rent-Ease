import { Outlet } from 'react-router-dom';
import Navigation from './pages/Auth/Navigation.jsx';
// import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
    <ToastContainer/>
    <Navigation/>
    <main>
      <Outlet/>
    </main>
    </>
  )
}

export default App