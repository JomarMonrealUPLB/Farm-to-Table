import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import AdminHomePage from "./pages/AdminHomePage"
import CustomerHomePage from "./pages/CustomerHomePage"
import ShoppingPage from "./pages/ShoppingPage";
import AccountManagement from "./pages/AccountManagement";
import background from "./assets/images/background.png"
import Messenger from "./pages/Messenger";

const App  =() =>{
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className="web_body">
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/admin-homepage" element={<AdminHomePage/>} />
              <Route path="/customer-homepage" element={<CustomerHomePage/>} />
              <Route path="/shopping-page" element={<ShoppingPage/>} />
              <Route path="/account-management" element={<AccountManagement/>} />
              <Route path="*" element={<Messenger/>} />
          </Routes>
          <img className="page_background_decor" src={background}/>
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
