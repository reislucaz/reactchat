import { useContext, useState } from "react";
import StatusOptions from "./options";
import './index.css';
import { HomeContext } from "../../../../Contexts/home";

function SelectStatus() {
    const { status, setStatus } = useContext(HomeContext);

    const handleChange = (e: any) => {
        e.preventDefault();

        sessionStorage.setItem("status", e.target.value);
        setStatus(e.target.value);
    }

    const options = StatusOptions();

    return (
        <select className={`profile-status ${status}`} onChange={e => handleChange(e)}>
            { options.map((option, index) => {
                return (
                    <option
                    key={index}
                    value={option.value}
                    selected={option.value == status ? true : false}>
                        {option.label}
                    </option>
                )
            })}
        </select>
    )
}

export default SelectStatus;
