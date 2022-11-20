import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ConnectButton({refreshBalance}) {
  const { state: { contract, accounts, web3 }, tryInit } = useEth();
    
  const connect = () => {
    tryInit();
 }

  return (
    <div className="btns">
  
      <div className="minting">
      <button onClick={connect} className="input-btn">
        Connect to wallet
      </button>
      </div>
    </div>
  );
}

export default ConnectButton;