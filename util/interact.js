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
        this.debugProvider = new HttpProvider(cfg.DEBUG_URL);
        this.debugService = new IconService(this.debugProvider);
    }

    getWalletAddress() {
        return this.ICONexRequest("REQUEST_ADDRESS");
    }

    ICONexRequest(requestType, payload) {
        return new Promise((resolve, reject) => {
            function eventHandler(event) {
                const { type, payload } = event.detail;
                window.removeEventListener(
                    "ICONEX_RELAY_RESPONSE",
                    eventHandler
                );

                switch (type) {
                    case "RESPONSE_HAS_ACCOUNT":
                        resolve(payload.hasAccount);
                        break;
                    case "RESPONSE_HAS_ADDRESS":
                        resolve(payload.hasAddress);
                        break;
                    case "RESPONSE_ADDRESS":
                    case "RESPONSE_JSON-RPC":
                    case "RESPONSE_SIGNING":
                        resolve(payload);
                        break;
                    case "CANCEL_JSON-RPC":
                        //console.log("error", "user cancelled rpc req");
                        resolve({ error: "User cancelled JSON-RPC request" });
                        break;
                    case "CANCEL_SIGNING":
                        //console.log("error", "user cancelled signing");
                        resolve({ error: "User cancelled signing request" });
                        break;
                }
            }
            window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler);

            window.dispatchEvent(
                new window.CustomEvent("ICONEX_RELAY_REQUEST", {
                    detail: {
                        type: requestType,
                        payload: payload,
                    },
                })
            );
        });
    }
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncateAddress(addr, displayLength) {
    const length = addr.length;
    return (
        addr.substring(0, displayLength) +
        "..." +
        addr.substring(length - displayLength, length)
    );
}

export default ICONexConnection;
