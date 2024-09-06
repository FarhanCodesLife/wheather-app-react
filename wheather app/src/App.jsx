import axios from 'axios';
import React, { useRef, useState } from 'react'





function App() {
let [allwheathers,setallwheathers] = useState([])
  let inputval = useRef()

  function wheathershow(event) {
    event.preventDefault()

    axios(`https://api.weatherapi.com/v1/current.json?key=e3e98122324b454b92f44333241406&q=${inputval.current.value}&aqi=no`)
    .then((res)=>{
console.log(res.data.location);
allwheathers.unshift(res.data)
setallwheathers([...allwheathers])

    })
    .catch((error)=>{
      alert(`solve this error` + error)
      console.log(`solve this error ==> ` + error)
      
    })
    
  inputval.current.value = ''
    
  }

  return (
    <>
    <div>App</div>
    <div>
      <form onSubmit={wheathershow}>
        <input type="text" placeholder='enter city name' ref={inputval}/>
        <button>show wheather</button>
      </form>
    </div>

<div>
  {allwheathers.map((items ,index)=>{

    return <div key={index} >

      <h1>{items.location.name}</h1>
      <h1>{items.location.country}</h1>
      <h1>{items.location.region}</h1>
    </div>

  })}
</div>

    </>
  )
}

export default App