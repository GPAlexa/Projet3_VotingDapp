import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Admin({ setValue, setText }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputText, setInputText] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputVoterAddress, setInputVoterAddress] = useState("");
  const [listVoters, setListVoters] = useState([]);


// ____________________________________________
// REGISTER VOTERS

  const handleAddressChange = e => {
    setInputAddress(e.target.value);
  };

  const addVoter = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputAddress === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newText = inputAddress;
    await contract.methods.addVoter(newText).send({ from: accounts[0] });

    let oldEvents= await contract.getPastEvents('VoterRegistered', {
      fromBlock: 0,
      toBlock: 'latest'
    });

    let tempArray = []

    for (const it of oldEvents){
      console.log(it.returnValues);
      tempArray.push(it.returnValues.voterAddress)
    }

    setListVoters(
      tempArray
    );
    console.log("_____OLD EVENT", oldEvents)
  };

// ____________________________________________
// GET VOTER

  const handleVoterAddressChange = e => {
    setInputVoterAddress(e.target.value);
  };


  const getVoter = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputVoterAddress === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newText = inputVoterAddress;
    const voter = await contract.methods.getVoter(newText).call({ from: accounts[0] });
    console.log ("_____voter", voter)
  };
  

// ____________________________________________
// ADD PROPOSAL 

  const handleTextChange = e => {
      setInputText(e.target.value);
  };

  const addProposal = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputText === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newText = inputText;
    await contract.methods.addProposal(newText).send({ from: accounts[0] });

    // let oldEvents= await contract.getPastEvents('VoterRegistered', {
    //   fromBlock: 0,
    //   toBlock: 'latest'
    // });

    // let tempArray = []

    // for (const it of oldEvents){
    //   console.log(it.returnValues);
    //   tempArray.push(it.returnValues.voterAddress)
    // }

    // setListVoters(
    //   tempArray
    // );
    // console.log("_____OLD EVENT", oldEvents)

  };

  // ____________________________________________
  // VOTE 

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const setVote = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.setVote(newValue).send({ from: accounts[0] });
  };

  // ____________________________________________
  // RETURN 


  return (
    <div className="btns">

      <div className="input-btn">
        Add Voter <input
          type="text"
          placeholder="address"
          value={inputAddress}
          onChange={handleAddressChange}
        />
      </div>

      <button onClick={addVoter}>
        Add Voter
      </button>

      <br></br>
      <br></br>


      <div className="input-btn">
        Get Voter <input
          type="text"
          placeholder="address"
          value={inputVoterAddress}
          onChange={handleVoterAddressChange}
        />
      </div>


      <button onClick={getVoter}>
        Get Voter
      </button>
      <br></br>
      <br></br>

      <div onClick={addProposal} className="input-btn">
        Add Proposal<input
          type="text"
          placeholder="string"
          value={inputText}
          onChange={handleTextChange}
        />
      </div>

      <br></br>

      <div onClick={setVote} className="input-btn">
        Set Vote<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
{/* 
      <button onClick={greet}>
        greet()
      </button> */}

      <ul>
        {
          listVoters.map((voter, index) => (<li key={index}>{voter}</li>) )
        }
      </ul>

  

    </div>
  );
}

export default Admin;
