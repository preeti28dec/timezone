
import  { useEffect, useMemo, useState } from "react";
import moment from "moment-timezone";

function YourTime() {
    const [tz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [datetime, setDatetime] = useState(moment());
    const dateTime = datetime.format('dddd, ') + datetime.format('DD MMMM YYYY')
    const today = new Date()
    const gtmTime = new Intl.DateTimeFormat('en-GB', { timeStyle: 'long' }).format(today);
    const dateString = gtmTime.split(' ').slice(1, 7).join(' ');

    useMemo(() => {
        const tzValue = tz.value ?? tz;
        setDatetime(datetime.tz(tzValue));
    }, [tz, datetime]);

    function Interval() {
        setTimeout(() => {
            setDatetime(moment())
        }, 1000)
    }

    useEffect(() => Interval(), [datetime])

    return (
        <>
            <div className='your_time text_weight'>Your Time</div>
            <div className='time'>{datetime.format("h:mm:ss")}</div>
            <div className='save_card_p'>&nbsp;{dateTime}&nbsp;{dateString}</div>
        </>
    )
}

export default YourTime
