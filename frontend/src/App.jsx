import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Mint from "./pages/mint";
import Header from "./components/Header";
import { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import { useSDK } from "@metamask/sdk-react";
import MintNft from "./MintNft.json";

export const AppContext = createContext({
  account: "",
  setAccountHandler: () => {},
  web3: undefined,

  contract: undefined,
});
const App = () => {
  const { provider } = useSDK();
  const [account, setAccount] = useState("");
  const setAccountHandler = (state) => setAccount(state);

  const [web3, setWeb3] = useState();

  const [contract, setContract] = useState();

  useEffect(() => {
    if (!provider) return;

    setWeb3(new Web3(provider));
  }, [provider]);
  // 프로바이더가 존재하지 않기때문에 null

  useEffect(() => {
    console.log(web3);
  }, [web3]);

  useEffect(() => {
    if (!web3) return;

    setContract(
      new web3.eth.Contract(
        MintNft,
        "0xdb1246Cd137Ef24bD20d67e325BFF9A24C80827E"
      )
    );
  }, [web3]);
  // 컨트랙트 만들때 abi와 나의 컨트랙트 주소 필요. 나로인해 발행!
  // useEffect(() => {
  //   console.log(contract);
  // }, [contract]);

  return (
    <AppContext.Provider value={{ account, setAccountHandler, contract }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<Main />} />
            <Route path="/mint" element={<Mint />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};
export default App;
