import IconService from "icon-sdk-js";
const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

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

export function nFormatter(num, digits) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value;
        });
    return item
        ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
        : "0";
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatTimestamp = (timestamp) => {
    return new Date((timestamp / 1e6) * 1000).toUTCString();
};

export const getEstimatedEnd = (
    startTimestamp,
    startBlockHeight,
    endBlockHeight
) => {
    let _startBlockHeight = IconConverter.toNumber(startBlockHeight);
    let _endBlockHeight = IconConverter.toNumber(endBlockHeight);
    let diff = (_endBlockHeight - _startBlockHeight) * 2;
    return new Date(
        (IconConverter.toNumber(startTimestamp) / 1e6 + diff) * 1000
    ).toUTCString();
};
