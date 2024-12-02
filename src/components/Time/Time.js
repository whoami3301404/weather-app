import React, { useState, useEffect } from "react";
import "./Time.css";

const Time = () => {
    const getCurrentDate = () => {
        const now = new Date();
        const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

        return {
            day: days[now.getDay()],
            date: now.getDate(),
            month: months[now.getMonth()],
            year: now.getFullYear()
        };
    }

    const [date, setDate] = useState(getCurrentDate());

    const updateDate = () => {
        setDate(getCurrentDate());
    }
    
    useEffect(() => {
        const intervalID = setInterval(updateDate, 1000);
        return () => clearInterval(intervalID);
    }, []);

    return (
        <span className="date">{date.day} {date.date} {date.month} {date.year}</span>
    );
}

export default Time;