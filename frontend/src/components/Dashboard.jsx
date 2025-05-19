import React, { useState } from "react";
function Dashboard(){
    const [email,setEmail]=useState('');
    const [status,setStatus]=useState('');
    const handleSendLoc=async()=>{
        console.log("button clicked")
        if(!navigator.geolocation)
        {
            setStatus("coundnt find location");
            
        }
        navigator.geolocation.getCurrentPosition(async(postion)=>{
            console.log("ok");
            const location={
                lat: postion.coords.latitude,
                lng: postion.coords.longitude
            };
            console.log(location);
            try{
                const res=await fetch("https://gps-tracking-backend-hkh1.onrender.com/api/sendlocation",{
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({email,location})
                })
                const text=await res.text();
                setStatus("successfully sent location");
            }
            catch(err)
            {
                setStatus("not able to end location")
            }
        })
    }
    return (
        <div>
            <div>enter mail id </div>
            <input type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
            />
            <button onClick={handleSendLoc}>send my location</button>
            <div>{status}</div>
        </div>
    )
}
export default Dashboard;