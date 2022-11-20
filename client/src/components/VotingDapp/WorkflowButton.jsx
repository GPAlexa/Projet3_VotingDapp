// import { useEffect, useState } from "react";
// import useEth from "../../contexts/EthContext/useEth";



// function WorkflowButton() {
//     const { state: { contract, accounts } } = useEth();
//     const [workflowStatus, setWorkflowStatus] = useState(0);
//     // const [isAdmin, setIsAdmin] = useState(true);

//     // setWorkflowStatus(1);
//     const getWorkflow = async () => {
//         const status = await contract.methods.workflowStatus().call();
//         console.log("STATUS VOTING %%%%%%%%%%%%%%%%%",status)
//         setWorkflowStatus(status);
//     }

//     useEffect(() => {

        
//     // if(address === ''){
//     //     initTry();
//     // }
//     // address === addressAdmin ? setIsAdmin(true) : setIsAdmin(false)
//         getWorkflow();
//     }, [])

// //   const changeStatusVoting = async (status: number) => {

// //     switch (status) {
// //         case 0:
// //             await contract.methods.changeStatusX.send({from: '0x'})
// //             break;
// //         case 1:

// //             break;
// //         default:
// //             break;
// //     }
// //   }
// //   const renderBtnAdmin = () => {
// //     switch (statusVoting) {
// //         case 0:
// //             return (<button onClick={() => changeStatusVoting(0)}>close registration</button>)
// //         case 1:

// //             break;
// //         default:
// //             break;
// //     }
// //   }
//   return (
//     <div>
//         <p>Status voting is {workflowStatus}</p>
//     </div>
//   );

// }
// }
// export default WorkflowButton;


import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const WorkflowButton = () => {

    const WorkflowStatus = {
        RegisteringVoters: 0,
        ProposalsRegistrationStarted: 1,
        ProposalsRegistrationEnded: 2,
        VotingSessionStarted: 3,
        VotingSessionEnded: 4,
        VotesTallied: 5,
      }

    const WorkflowStatusLabels = {
        0: 'Registering voters',
        1: 'Registering proposals',
        2: 'Proposals registration ended',
        3: 'Voting session in progress',
        4: 'Voting session ended',
        5: 'Vote tallied',
    }

    const { state: { contract, accounts } } = useEth()
    const [workflowStatus, setWorkflowStatus] = useState(WorkflowStatus.RegisteringVoters)

    useEffect(() => {
        (async () => {
            const currentStatus = await contract.methods.workflowStatus().call({from: accounts[0]})
            if (currentStatus) {
                setWorkflowStatus(parseInt(currentStatus))
            }

            await contract.events.WorkflowStatusChange({fromBlock: 'earliest'})
                .on('data', event => {
                    let newWorkflowStatus = parseInt(event.returnValues.newStatus);
                    setWorkflowStatus(newWorkflowStatus);
                    console.log(newWorkflowStatus);
                })
                .on('changed', changed => console.log(changed))
                .on('error', error => console.log(error))
                .on('connected', str => console.log(str))
        })()
    }, [contract, accounts, setWorkflowStatus])

    const handleChangeWorkflowStatus = async () => {
        const newStatus = workflowStatus+1;

        let changeWorkflowStatusCall
        switch (newStatus) {
            case WorkflowStatus.ProposalsRegistrationStarted:
                changeWorkflowStatusCall = await contract.methods.startProposalsRegistering().send({from: accounts[0]});
                break;
            case WorkflowStatus.ProposalsRegistrationEnded:
                changeWorkflowStatusCall = await contract.methods.endProposalsRegistering().send({from: accounts[0]});
                break;
            case WorkflowStatus.VotingSessionStarted:
                changeWorkflowStatusCall = await contract.methods.startVotingSession().send({from: accounts[0]});
                break;
            case WorkflowStatus.VotingSessionEnded:
                changeWorkflowStatusCall = await contract.methods.endVotingSession().send({from: accounts[0]});
                break;
            case WorkflowStatus.VotesTallied:
                changeWorkflowStatusCall = await contract.methods.tallyVotes().send({from: accounts[0]});
                break;
            default:
                console.log('Wrong status specified.')
                break;
        }

        if (changeWorkflowStatusCall) {
            setWorkflowStatus(changeWorkflowStatusCall.events.WorkflowStatusChange.returnValues.newStatus)
        }
    }

    return (
        <>
            <p>Current workflow status: {WorkflowStatusLabels[workflowStatus]}</p>
            <button onClick={handleChangeWorkflowStatus}>Change to next workflow status</button>
        </>
    );
}

export default WorkflowButton;