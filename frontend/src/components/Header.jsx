import { useSDK } from "@metamask/sdk-react";
import { useContext } from "react";

import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../App";

const Header = () => {
  const { account, setAccountHandler } = useContext(AppContext);

  const { sdk } = useSDK();

  const onClickMetaMask = async () => {
    try {
      const accounts = await sdk?.connect();

      setAccountHandler(accounts[0]);
    } catch (error) {
      console.warn("Errrrrrrr");
    }
  };

  return (
    <div>
      <div className="max-w-screen-md w-full flex left-1/2 -translate-x-1/2 fixed top-0 justify-between bg-blue-50">
        <div>
          <Link to="/">Main</Link>
          <Link to="/mint" className="ml-2">
            Mint
          </Link>
        </div>
        {account ? (
          <>
            <div>{`${account.substring(0, 7)}...${account.substring(
              account.length - 7
            )}`}</div>

            <button className="ml-2" onClick={() => setAccountHandler("")}>
              Logout
            </button>
          </>
        ) : (
          <button className="" onClick={onClickMetaMask}>
            Login
          </button>
        )}
      </div>
      <Outlet />
      {/* 항상 아래에 위치 */}
    </div>
  );
};

export default Header;
