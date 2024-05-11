import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import AdminHomePage from "./pages/AdminHomePage"
import CustomerHomePage from "./pages/CustomerHomePage"

const App  =() =>{
  return (
    <div className="App">
      <BrowserRouter>
        <div className="web_body">
          <NavBar/>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/admin-homepage" element={<AdminHomePage/>} />
              <Route path="/customer-homepage" element={<CustomerHomePage/>} />
              <Route path="*" element={<NoPage/>} />
          </Routes>
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
