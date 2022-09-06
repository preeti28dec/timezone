import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import TimezoneSelect, { allTimezones } from "react-timezone-select";

function DateTime() {
  const now=new Date()
  const [localTime, setLocalTime] = useState(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().substring(0, 19));
  const [localtz, setLocaltz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [countryTime, setCountryTime] = useState(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().substring(0, 19));
  const [countrytz, setCountrytz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const [leftTimeString, setLeftTimeString] = useState("")
  // const [rightTimeString, setRightTimeString] = useState("")
  useEffect(() => {
    if (localtz.value) {
      setLeftTimeString(moment(new Date(localTime).toISOString()).tz(localtz.value).toISOString());
    }
  }, [localtz, localTime])

  useEffect(() => {
    if (countrytz.value && leftTimeString) {
      console.log
        ((moment(new Date(leftTimeString).toISOString()).tz(countrytz.value).toISOString()));
    }
  }, [leftTimeString, countrytz]);

  return (
    <div className='main_container'>
      <h1 className='title'>DateFul Time Zone Converter</h1>
      <div className='input_box_date_time'>
        <div className='Chack_date_time'>
          <div className='input_type'>
            <input type="datetime-local" value={localTime} className='input_time '
              onChange={(e) => { setLocalTime(e.target.value) }}
            />
            <input type="datetime-local" value={countryTime} className='input_time '
              onChange={(e) => { setCountryTime(e.target.value) }}
            />
          </div>
          <div className='input_type'>
            <TimezoneSelect className='input' value={localtz} onChange={setLocaltz} timezones={{ ...allTimezones }} />
            <TimezoneSelect className='input' value={countrytz} onChange={setCountrytz} timezones={{ ...allTimezones }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateTime


