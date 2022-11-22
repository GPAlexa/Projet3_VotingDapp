

import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const WorkflowButton = () => {

    const { state: { contract, accounts } } = useEth()
    const [workflowStatus, setWorkflowStatus] = useState()



    const getCurrentWorkflowStatus = async () => {
        const currentWorkflow = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setWorkflowStatus(currentWorkflow);
        console.log("Statut actuel : " + currentWorkflow);
    }

    useEffect(() => {
        getCurrentWorkflowStatus();

    }, [])

    return (
        <>
            <p>Current workflow status: {workflowStatus}</p>
            {/* <button onClick={handleChangeWorkflowStatus}>Change to next workflow status</button> */}
        </>
    );
}

export default WorkflowButton;