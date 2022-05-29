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

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default ICONexConnection;
