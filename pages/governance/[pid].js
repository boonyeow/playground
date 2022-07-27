import { Box } from "@chakra-ui/react";
import { IoT1ClickDevicesService } from "aws-sdk";
import GovernanceInfo from "../../components/Governance/GovernanceInfo";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";
import IconService from "icon-sdk-js";
import ICONexConnection from "../../util/interact";
import { useEffect, useRef, useState } from "react";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const ProjectGovernance = () => {
    const router = useRouter();
    const { pid } = router.query;
    const connection = new ICONexConnection;
    const [proposalInfo, setProposalInfo] = useState({
        proposals: [
            {
                id: "0",
                startBlockHeight: 0,
                status: 0,
                disagreeVotes: 0,
                agreeVotes: 0,
                noVotes: 0,
            }
        ]
    });

    useEffect(() => {
        if (router.isReady) {
            const txObj = new IconBuilder.CallBuilder()
                .method('getProposals')
                .to(pid)
                .build();

            connection.iconService
                .call(txObj)
                .execute()
                .then((res) => {
                    var json = JSON.parse(res)
                    // var idList = []
                    // var statusList = []
                    // for (let i = 0; i < json.proposals.length; i++) {
                    //     idList.push(json.proposals[i].id)
                    //     statusList.push(json.proposals[i].status)
                    // }
                    // setProposalInfo({ id: idList, status: statusList })
                    setProposalInfo(json)
                });
        }
    }, [router.isReady]);

    return (
        <>
            {console.log(proposalInfo)}
            <Box maxWidth={"6xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
                <Sidebar />
                <GovernanceInfo proposalInfo={proposalInfo} />
            </Box>
        </>
    );
};

export default ProjectGovernance;
