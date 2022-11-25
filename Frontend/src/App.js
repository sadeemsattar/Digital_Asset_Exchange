import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Home } from "./Components/Home/Home";
import { Profile } from "./Components/Profile/Profile";
import { AddNFT } from "./Components/AddNFT/AddNFT";
import { ShowNFT } from "./Components/ShowNFT/ShowNFT";
import { PurchaseNFT } from "./Components/PurchaseNFT/PurchaseNFT";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/add_asset" element={<AddNFT />} />
          <Route path="/show_asset" element={<ShowNFT />} />
          <Route path="/purchase_asset" element={<PurchaseNFT />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
