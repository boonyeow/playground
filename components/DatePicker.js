import { Box, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
    DateRange,
    DayPicker,
    SelectRangeEventHandler,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
const DatePicker = ({ selectedRange, setSelectedRange }) => {
    const [fromValue, setFromValue] = useState("");
    const [toValue, setToValue] = useState("");

    const handleRangeSelect = (e) => {
        setSelectedRange(e);
        console.log(e);
    };

    // const handleFromChange = () => {};

    // const handleToChange = () => {};

    return (
        <>
            <Box
                p="15px"
                bg="white"
                mt="15px"
                borderRadius="15px"
                border="1px solid var(--chakra-colors-blackAlpha-200);"
            >
                <DayPicker
                    mode="range"
                    selected={selectedRange}
                    onSelect={setSelectedRange}
                    min={1}
                    max={30}
                    fromDate={new Date()}
                    numberOfMonths={2}
                    pagedNavigation
                />
            </Box>

            {/* <Input value={fromValue} onChange={handleFromChange}></Input>
            <Input value={toValue} onChange={handleToChange}></Input> */}
        </>
    );
};

export default DatePicker;
