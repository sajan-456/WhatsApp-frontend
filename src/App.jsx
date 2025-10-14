
import Registration from './components/Registration'
import Login from './components/Login'
import Dashbord from './components/Dashbord'
import ProtectedRouter from './components/ProtectedRouter';
import Friend from './pages/Friend';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {


  return (
    <>
<BrowserRouter>
      <Routes>
        <Route element={<Registration />} path="/registration" />
        <Route element={<Login />} path="/login" />
         <Route element={<Dashbord />} path="/dashbord" />

        <Route element={
          <ProtectedRouter>
            <Dashbord />
          </ProtectedRouter>
        } path="/">
          <Route element={<Friend />} path="friend/:mobileNumber" />
        </Route>
      </Routes>
    </BrowserRouter>     


    </>
  )
}

export default App
