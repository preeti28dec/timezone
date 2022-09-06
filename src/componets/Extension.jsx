import { useEffect, useRef, useState } from 'react'
import AddTimeZoneCard from './addTimeZoneCard'

import { AiFillPlusCircle } from 'react-icons/ai'
import YourTime from './Yourtime'

function Extension() {
    const [timezone, setTimezone] = useState([])
    const [popup, setPopup] = useState(false)
    const [Delete, setDelete] = useState("")
    const loaded = useRef(false);

    function deletButton(id) {
        const taskCopy = [...timezone]
        taskCopy.splice(id, 1)
        setTimezone(taskCopy)
    };

    useEffect(() => {
        if (loaded.current) {
            localStorage.setItem('timezone', JSON.stringify(timezone));
        } else {
            loaded.current = true;
            const data = JSON.parse(localStorage.getItem('timezone'));
            if (data) {
                setTimezone(data);
            }
        }
    }, [timezone]);
    return (
        <>
            <div className='main'>
                <div className='content_box'>
                    <AddTimeZoneCard open={popup} onAdd={(e) => {
                        console.log("check", timezone); setPopup(false)
                        if (e) {
                            setTimezone((s) => {
                                if (s.some(element => element.value === e.value)) {
                                    return [...s]
                                }
                                return [...s, e]
                            })
                        }
                    }} />

                    <div className='SaveTimeZoneCard'>
                        <YourTime />
                        <div>
                            <div className='save_time_zone'>
                                <div className='text_weight'>Saved Time Zones</div>
                                <div className='button' onClick={() => setPopup(true)}>
                                    <div className='icon'><AiFillPlusCircle />
                                    </div>
                                    <div className='button_text'>Add More Timezone</div>
                                </div>
                            </div>
                            <div className='main_save_card'>
                                {timezone.map((item, id) => {
                                    return <div key={id} value={Delete} onChange={e => setDelete(e.target.value)}>
                                        <div className='save_card'>
                                            <div className='text_weight'>{item?.label}</div>
                                            <div className='altName'>{item?.altName}</div>
                                            <p className='save_card_p'>{item?.value}</p>
                                            <div className='AddTimeZoneCard_text_weight'>
                                                <div className='text_weight'>{item?.time}&nbsp;</div>
                                                <p className='save_card_p'>&nbsp;{item?.date}</p>
                                            </div>
                                            <spna className='add_button' id={id} onClick={() => deletButton(id)}>Delete</spna>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Extension


