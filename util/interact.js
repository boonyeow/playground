import IconService from "icon-sdk-js";
import cfg from "./config";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

class ICONexConnection {
    constructor() {
        this.httpProvider = new HttpProvider(cfg.NODE_URL);
        this.iconService = new IconService(this.httpProvider);
        this.wallet = IconService.IconWallet.loadPrivateKey(
            "4e53d8d26fcb04f1f36b0e0659c19ccf9e2b5c4faea25b29dd084033c7b48dbd"
        );
    }

    getWalletAddress() {
        return this.ICONexRequest("REQUEST_ADDRESS");
    }

    ICONexRequest(requestType, payload) {
        return new Promise((resolve, reject) => {
            function eventHandler(event) {
                const { payload } = event.detail;
                window.removeEventListener(
                    "ICONEX_RELAY_RESPONSE",
                    eventHandler
                );
                resolve(payload);
            }
            window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler);

            window.dispatchEvent(
                new window.CustomEvent("ICONEX_RELAY_REQUEST", {
                    detail: {
                        type: requestType,
                        payload,
                    },
                })
            );
        });
    }
}

export async function estimateStepsforDeployment(from, content, params) {
    const timestampInDecimal = Date.now() * 1000;
    const timestamp = "0x" + timestampInDecimal.toString(16); //to hex string
    const txObj = {
        jsonrpc: "2.0",
        method: "debug_estimateStep",
        id: 1234,
        params: {
            version: "0x3",
            from,
            to: cfg.SCORE_INSTALL_ADDRESS, //selectedNetworkData.CONTRACT_DEPLOY_ADDRESS,
            timestamp,
            nid: cfg.NID,
            nonce: "0x1",
            dataType: "deploy",
            data: {
                contentType: "application/java",
                content, // compressed SCORE data
                params,
            },
        },
    };
    try {
        const responsePromise = await fetch(cfg.DEBUG_URL, {
            method: "POST",
            body: JSON.stringify(txObj),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseJSON = await responsePromise.json();

        return responseJSON.result;
    } catch (err) {
        console.error("FETCH:", err);
        throw err;
    }
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default ICONexConnection;
