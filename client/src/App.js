import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import AdminHomePage from "./pages/AdminHomePage"
import CustomerHomePage from "./pages/CustomerHomePage"
import ShoppingPage from "./pages/ShoppingPage";
import AccountManagement from "./pages/AccountManagement";
import background from "./assets/images/background.png"
import CartPage from "./pages/CartPage";
import OrderFulfillment from "./pages/OrderFulfillment";
import ProductListingsPage from "./pages/ProductListingsPage";
import SalesReport from "./pages/SalesReport";
import AddProductPage from "./pages/AddProductPage";
import ProfilePage from "./pages/ProfilePage"
import { UserType } from "./constants/UserType";
import { iconColor, iconSize } from './constants/IconSize';

import { LiaHomeSolid } from "react-icons/lia";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import { MdFormatListBulleted } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import EditProductPage from "./pages/EditProductPage";



const App  =() =>{
  const [userType,setUserType] = useState(UserType.GUEST)

  const routeList = [
    {path: "/", element: UserType.MERCHANT === userType? <AdminHomePage />: UserType.CUSTOMER === userType? <CustomerHomePage/>: <Login onSubmit={(type) => setUserType(type)}/>, visibility: ["all"],icon: <LiaHomeSolid color={iconColor} size={iconSize}/> },
    {path: "/login", element: <Login onSubmit={(type) => setUserType(type)}/>, visibility: ["no_nav","all"]},
    {path: "/signup", element: <Signup />, visibility: ["no_nav","all"]},
    {path: "/admin-homepage", element: <AdminHomePage />, visibility: ["no_nav",UserType.MERCHANT]},
    {path: "/customer-homepage", element: <CustomerHomePage />, visibility: ["no_nav",UserType.CUSTOMER]},
    {path: "/shopping-page", element: <ShoppingPage />, visibility: [UserType.CUSTOMER],icon: <FiShoppingBag color={iconColor} size={iconSize}/>},
    {path: "/cart", element: <CartPage />, visibility: [UserType.CUSTOMER],icon: <PiShoppingCartSimpleBold color={iconColor} size={iconSize}/>},
    {path: "/account-management", element: <AccountManagement />, visibility: [UserType.MERCHANT],icon: <MdOutlineManageAccounts color={iconColor} size={iconSize}/>},
    {path: "/profile-page/:id", element: <ProfilePage />, visibility: ["no_nav",UserType.MERCHANT,UserType.CUSTOMER]},
    {path: "/order-fulfillment", element: <OrderFulfillment />, visibility: [UserType.MERCHANT],icon: <IoReceiptOutline color={iconColor} size={iconSize}/>},
    {path: "/product-listings", element: <ProductListingsPage />, visibility: [UserType.MERCHANT],icon: <MdFormatListBulleted color={iconColor} size={iconSize}/>},
    {path: "/sales-report", element: <SalesReport />, visibility: [UserType.MERCHANT],icon: <TbReport color={iconColor} size={iconSize}/>},
    {path: "/add-product", element: <AddProductPage />, visibility: [UserType.MERCHANT],icon: <IoIosAddCircleOutline color={iconColor} size={iconSize}/>},
    {path: "/edit-product/:id", element: <EditProductPage />, visibility: ["no_nav",UserType.MERCHANT]},
    {path: "/logout", element: <Navigate to="/"/>, visibility: ["all"], icon: <LuLogOut color={iconColor} size={"3.5ch"}/>},
    {path: "/*", element: <NoPage />, visibility: ["none"]},
  ]

  useEffect(() => {
    setUserType(sessionStorage.getItem("userType"))
  }, []);

  useEffect(() => {
    console.log(userType)
    return () => {
      
    };
  }, [userType]);

  return (
    <div className="App">
      <BrowserRouter>
        {userType && userType !== UserType.GUEST? <NavBar onLogout={()=>setUserType(UserType.GUEST)} navBarItems = {routeList.filter(route=> route.visibility[0] !== "no_nav" && (route.visibility.includes("all") || route.visibility.includes(userType)) )}/> : null}
        <div className="web_body">
          <Routes>
              {
                routeList.map((route,index)=>
                  <Route key={index} path={route.path} element={route.visibility.includes("all")? route.element: route.visibility.includes(userType)? route.element: <NoPage/>} />
                )
              }
          </Routes>
          {/* <img className="page_background_decor" src={background}/> */}
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
