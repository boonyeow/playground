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
                id: "-",
                startBlockHeight: 0,
                status: 0,
                disagreeVotes: 0,
                agreeVotes: 0,
                noVotes: 0,
            }
        ]
    });

    const [voterInfo, setVoterInfo] = useState({});
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
                    setProposalInfo(json)
                });

            txObj = new IconBuilder.CallBuilder()
                .method('getAllVoters')
                .to(pid)
                .build();

            connection.iconService
                .call(txObj)
                .execute()
                .then((res) => {
                    setVoterInfo(res)
                });
        }
    }, [router.isReady]);

    return (
        <>
            <Box maxWidth={"6xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
                <Sidebar active="Governance" />
                <GovernanceInfo proposalInfo={proposalInfo} voterInfo={voterInfo} pid={pid} />
            </Box>
        </>
    );
};

export default ProjectGovernance;
