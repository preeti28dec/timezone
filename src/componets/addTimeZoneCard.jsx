import { AiFillCloseCircle } from 'react-icons/ai'
import React, { useEffect, useMemo, useState } from "react";
import moment from "moment-timezone";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
function AddTimeZoneCard(props) {

    const [tz, setTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [datetime, setDatetime] = useState(moment());
    const [Arra, setArra] = useState([])
    useMemo(() => {
        const tzValue = tz.value ?? tz;
        setDatetime(datetime.tz(tzValue));
    }, [tz, datetime])

    const arr = tz.label ? tz.label : tz
    const Split = arr.split(" ");
    const label = Split.slice(1).join(" ");
    const altName = tz.altName ? tz.altName : tz
    const value = tz.value ? tz.value : tz
    const time = datetime.format("h:mm:ss")
    const date = datetime.format("dddd,DD MMMM YYYY ")
    const obj = {
        label: label,
        altName: altName,
        value: value,
        time: time,
        date: date
    }

    const handleClick = (e) => {
        setArra(current => [...current, obj]);
    };


    function Interval() {
        setTimeout(() => {
            setDatetime(moment())
        }, 1000)
    }

    useEffect(() => Interval(), [datetime])

    console.log("datetime:- ", Arra);

    return (
        <div className={props.open ? 'child true' : 'child'}>
            <div className="AddTimeZoneCard_parent">
                <div className='top_space'></div>
                <div className="AddTimeZoneCard_child">
                    <div className='second_section'>
                        <div className='input_box'>
                            <TimezoneSelect className='input' value={tz} onChange={setTz} timezones={{ ...allTimezones }} />
                            <div className='input_icon' onClick={() => props.onAdd()}><AiFillCloseCircle /></div>
                        </div>
                    </div>
                    <div className='main_save_card'>
                        <div className="save_card">
                            <div className='text_weight'>{label}</div>
                            <div className='altName'>{altName}</div>
                            <p className='save_card_p'>{value}</p>
                            <div className='AddTimeZoneCard_text_weight'>
                                <div className='text_weight'>{time}&nbsp;</div>
                                <p className='save_card_p'>&nbsp;{date}</p>
                            </div>
                            <spna className='add_button'
                                onClick={() => {
                                    handleClick();
                                    props.onAdd(obj)
                                }}
                            >Add</spna>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTimeZoneCard
