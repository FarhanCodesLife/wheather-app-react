import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

function App() {

  let [inputval,setinputval]=useState([])
  let [wheatherdata,setwhetherdata]= useState([])
 
    async function getdata() {
    try {

        let data = await axios(`https://api.weatherapi.com/v1/current.json?key=6326e206cf9041e5b3853528241406&q=${val.current.value}&aqi=no`)
        console.log(data);
wheatherdata.push(data.data)
setwhetherdata(wheatherdata)
console.log(wheatherdata);

// renderdata()

      }
     catch (error) {
      console.log(error);
      
    }
    
    
  }

let val = useRef()
function showdata() {
  console.log(val.current.value);
  inputval.push(val.current.value)
  setinputval(inputval)
  console.log(inputval);
  getdata()
  

  val.current.value = ""


  

  
}

  return (

<>

<div>App</div>
<input type="text" placeholder='enter city name' ref={val} />
<button onClick={showdata} >add city</button>



<div>
  {wheatherdata ? <div>
    {wheatherdata.map((items)=>{
      return <div>

        <h1>{items.location.name}</h1>
      </div>
    })}
    </div>:<div><h1>loading</h1></div>}
</div>





</>



  )
}

export default App