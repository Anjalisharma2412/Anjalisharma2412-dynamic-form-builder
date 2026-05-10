import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "../src/pages/Dashboard";
import FillForm from "../src/pages/FillForm";
import Responses from "../src/pages/Responses";
import Login from "../src/pages/Login";
import UserPage from "../src/pages/UserPage";

function App() {
  return(
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/form/:id" element={<FillForm />} />
         <Route path="/responses/:id" element={<Responses />} />
         <Route path="/user" element={<UserPage />}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App;