
import Registration from './components/Registration'
import Login from './components/Login'
import Dashbord from './components/Dashbord'
import ProtectedRouter from './components/ProtectedRouter';
import Friend from './pages/Friend';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Context from './Context';
import { useState } from 'react';
function App() {
  const [shareData, setShareData]= useState(null);

  return (
    <>
 <Context.Provider value={{shareData,setShareData}}>
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

</Context.Provider>
    </>
  )
}

export default App
