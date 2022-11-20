import { useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Address from "./Address";
import ConnectButton from "./ConnectButton";
// import Balance from "./Balance";
// import Button from "./Button";
import Admin from "./Admin";
import WorkflowButton from "./WorkflowButton";


function VotingDapp() {
  const { state: { contract, accounts } } = useEth();
  // const [balance, setBalance] = useState();

  // const refreshBalance = async () => {
  //   const value = await contract.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
  //   setBalance(value);
  // }

  useEffect(() => {
    // if (contract?.methods) {
    //     refreshBalance();
    // }
  }, [contract]);



  return (
    <div className="web3stuff">
        <ConnectButton />
        <br></br>
        <WorkflowButton />
        <Address accounts={accounts}/>
        <Admin accounts={accounts} contract={contract}/>

    </div>
  );
}

export default VotingDapp;
