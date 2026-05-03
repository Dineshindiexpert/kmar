'use client';

import { useState } from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

const DateDropdown = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="">
            
            <DatePicker
                selected={date}
                
                onChange={(date) => setDate(date)}
                dateFormat="MMMM d, yyyy"
                className="form-control"
            />
        </div>
    );
};

export default DateDropdown;