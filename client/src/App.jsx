import { EthProvider } from "./contexts/EthContext";
import { useEffect } from "react";
import VotingDapp from "./components/VotingDapp";

import "./App.css";
import Footer from "./components/Footer";
// import ConnectButton from "./components/VotingDapp/ConnectButton";



function App() {
  
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <VotingDapp />
        </div>
      </div>
      <Footer />
    </EthProvider>
  );
}

export default App;