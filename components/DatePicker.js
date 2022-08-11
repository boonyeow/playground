import { Box } from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
const DatePicker = ({ formik }) => {
    return (
        <>
            <Box p="15px" mt="15px" borderRadius="15px">
                <DayPicker
                    mode="range"
                    selected={formik.values.selectedRange}
                    onSelect={(e) => {
                        formik.touched.selectedRange = true;
                        formik.setFieldValue("selectedRange", e);
                    }}
                    min={1}
                    max={30}
                    fromDate={new Date()}
                    numberOfMonths={2}
                    pagedNavigation
                />
            </Box>
        </>
    );
};

export default DatePicker;
