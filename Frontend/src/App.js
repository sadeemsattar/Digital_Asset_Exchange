import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Home } from "./Components/Home/Home";
import { Profile } from "./Components/Profile/Profile";
import { AddNFT } from "./Components/AddNFT/AddNFT";
import { ShowNFT } from "./Components/ShowNFT/ShowNFT";
import { PurchaseNFT } from "./Components/PurchaseNFT/PurchaseNFT";
import { Web3ReactProvider } from "@web3-react/core";
import EthContext from "./contexts/EthContext";
import { reducer, initialState } from "./contexts/state";
import Web3 from "web3";
import React, { useReducer } from "react";

function App() {
  const getLibrary = (provider) => {
    return new Web3(provider);
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
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
      </Web3ReactProvider>
    </EthContext.Provider>
  );
}

export default App;
