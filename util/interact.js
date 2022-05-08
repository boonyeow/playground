import IconService from "icon-sdk-js/build/icon-sdk-js.web.min.js";
import cfg from "../config.json";

const { IconConverter, IconBuilder, HttpProvider } = IconService;

class ICONexConnection {
    constructor() {
        this.httpProvider = new HttpProvider(cfg.rpc_endpoint);
        this.iconService = new IconService(this.provider);
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

export default ICONexConnection;
