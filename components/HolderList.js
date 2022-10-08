import {
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import IconService from "icon-sdk-js";
import ProposalCollection from "./ProposalCollection";
import ICONexConnection from "../util/interact";
import CustomAlert from "./CustomAlert";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const DataTable = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
            },
            useSortBy
        );
    return (
        <Table {...getTableProps()} variant="simple">
            <Thead>
                {headerGroups.map((headerGroup, index) => (
                    <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, innerIndex) => (
                            <Th
                                key={innerIndex}
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                                isNumeric={column.isNumeric}
                            >
                                {column.render("Header")}
                                <Text as="span" pl="4">
                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <TriangleDownIcon aria-label="sorted descending" />
                                        ) : (
                                            <TriangleUpIcon aria-label="sorted ascending" />
                                        )
                                    ) : null}
                                </Text>
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                        <Tr key={index} {...row.getRowProps()}>
                            {row.cells.map((cell, innerIndex) => (
                                <Td
                                    key={innerIndex}
                                    {...cell.getCellProps()}
                                    isNumeric={cell.column.isNumeric}
                                >
                                    {cell.render("Cell")}
                                </Td>
                            ))}
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};

const connection = new ICONexConnection();

const HolderList = ({ voterInfo, userInfo, pid, totalSupply }) => {
    const [showStatus, setShowStatus] = useState(false);
    const [statusInfo, setStatusInfo] = useState({
        type: "loading",
        title: "delegating votes",
        desc: "awaiting tx approval...",
    });
    const [showClose, setShowClose] = useState(true);
    const [data, setData] = useState([{}]);
    const [delegate, setDelegate] = useState(null);
    const [validDelegates, setValidDelegates] = useState([]);
    const [delegateVisibility, setDelegateVisibility] = useState(false);
    const delegateToUser = async (user) => {
        setShowStatus(true);
        setShowClose(false);
        const txObj = new IconBuilder.CallTransactionBuilder()
            .from(userInfo.userAddress)
            .to(pid)
            .nid(IconConverter.toBigNumber(2))
            .nonce(IconConverter.toBigNumber(1))
            .version(IconConverter.toBigNumber(3)) //constant
            .timestamp(new Date().getTime() * 1000)
            .method("setDelegation")
            .params({
                delegate: user,
            })
            .build();
        const estimatedSteps = IconConverter.toBigNumber(
            await connection.debugService.estimateStep(txObj).execute()
        );

        txObj.stepLimit = IconService.IconConverter.toHex(
            estimatedSteps.plus(IconConverter.toBigNumber(10000)) // prevent out of step
        );

        const payload = {
            jsonrpc: "2.0",
            method: "icx_sendTransaction",
            id: 6639,
            params: IconConverter.toRawTransaction(txObj),
        };

        let rpcResponse = await connection.ICONexRequest(
            "REQUEST_JSON-RPC",
            payload
        );

        getTransactionResult(user, rpcResponse, 5);
    };

    const getTransactionResult = async (user, rpcResponse, maxRetry) => {
        console.log("trying...", maxRetry);
        if (rpcResponse.error) {
            setShowClose(true);
            setStatusInfo({
                type: "failure",
                title: "ooops",
                desc: "your transaction was not approved",
            });
        } else {
            try {
                const txResult = await connection.iconService
                    .getTransactionResult(rpcResponse.result)
                    .execute();
                if (txResult.status === 1) {
                    setShowClose(true);
                    setStatusInfo({
                        type: "success",
                        title: "success",
                        desc: "votes have been delegated",
                    });
                    setDelegate(user);
                } else {
                    console.log("FAILED BOI", txResult);
                    setShowClose(true);
                    setStatusInfo({
                        type: "failure",
                        title: "ooops",
                        desc: "your transaction has failed, please try again",
                    });
                }
            } catch (err) {
                if (maxRetry > 0) {
                    setTimeout(
                        () =>
                            getTransactionResult(
                                user,
                                rpcResponse,
                                maxRetry - 1
                            ),
                        2200
                    );
                } else {
                    console.log(err);
                    setShowClose(true);
                    setStatusInfo({
                        type: "failure",
                        title: "ooops",
                        desc: "your transaction has failed, please try again",
                    });
                }
            }
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: "Address",
                accessor: "holderAddress",
                Cell: (props) => (
                    <Text color="#3D5CC3" fontWeight="semibold">
                        {props.value}
                    </Text>
                ),
            },
            { Header: "Votes", accessor: "holderVotes" },
            {
                Header: "Voting Weight",
                accessor: "votingWeight",
                Cell: (props) => <Text>{props.value}%</Text>,
            },
            {
                Header: "",
                accessor: "action",
                Cell: (props) => {
                    if (delegateVisibility) {
                        if (
                            props.row.original.holderAddress === delegate ||
                            !validDelegates.includes(
                                props.row.original.holderAddress
                            )
                        ) {
                            return (
                                <Button variant="outside-button" disabled>
                                    Delegate
                                </Button>
                            );
                        } else {
                            return (
                                <Button
                                    variant="outside-button"
                                    onClick={() => {
                                        delegateToUser(
                                            props.row.original.holderAddress
                                        );
                                    }}
                                >
                                    Delegate
                                </Button>
                            );
                        }
                    }
                },
            },
        ],
        [delegate, validDelegates]
    );

    useEffect(() => {
        const temp = [];
        let holderVotes;
        totalSupply = IconConverter.toNumber(totalSupply);
        for (var key in voterInfo) {
            holderVotes = IconConverter.toNumber(voterInfo[key]);
            temp.push({
                holderAddress: key,
                holderVotes: holderVotes,
                votingWeight: ((holderVotes / totalSupply) * 100).toFixed(2),
            });
        }

        const getUserBalance = async (user) => {
            const call = new IconBuilder.CallBuilder()
                .to(pid)
                .method("balanceOf")
                .params({ _owner: user })
                .build();
            let res = await connection.iconService.call(call).execute();
            if (res > 0) {
                setDelegateVisibility(true);
            }
            console.log("heheeee", res);
        };
        const getDelegate = async (user) => {
            const call = new IconBuilder.CallBuilder()
                .method("getDelegate")
                .to(pid)
                .params({ user: user })
                .build();
            let res = await connection.iconService.call(call).execute();
            setDelegate(res);
        };

        const getValidDelegates = async (user) => {
            const call = new IconBuilder.CallBuilder()
                .method("getValidDelegates")
                .to(pid)
                .params({ user: user })
                .build();
            let res = await connection.iconService.call(call).execute();
            setValidDelegates(res);
        };

        setData(temp);
        if (userInfo.userAddress !== 0) {
            getUserBalance(userInfo.userAddress);
            getDelegate(userInfo.userAddress);
            getValidDelegates(userInfo.userAddress);
        } else {
            setDelegateVisibility(false);
        }
    }, [totalSupply, voterInfo]);

    return (
        <>
            <DataTable columns={columns} data={data} />
            <CustomAlert
                showStatus={showStatus}
                onClose={() => {
                    setShowStatus(false);
                    setStatusInfo({
                        type: "loading",
                        title: "delegating votes",
                        desc: "awaiting tx approval",
                    }); //revert everything to default
                }}
                title={statusInfo.title}
                desc={statusInfo.desc}
                status={statusInfo.type}
                showClose={showClose}
            />
        </>
    );
};

export default HolderList;
