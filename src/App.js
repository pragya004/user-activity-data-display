import zIndex from "@material-ui/core/styles/zIndex"
import React, {useEffect, useState, lazy, Suspense} from "react"
import "./App.css"


const UserDisplay = lazy(() => import("./Components/UserDisplay"))

function App() {
    // const [userData, setUserData] = useState([])

    // async function fetchdata()
    // {
    //     const data = await fetch('https://proxy-server-weatherapi.herokuapp.com/members') 
    //     const jsonData = await data.json()
    //     setUserData(jsonData)
    // }

    // useEffect(()=>{
    //     fetchdata()
    // },[])

    return (
        <div className="mainDiv" style={{position:"relative",height:"100vh",width:"100vw", overflow:"hidden"}}>
    
            <div className="rectangle"></div>
            <div className="circle"></div>
    
            
            <div className="displayTable">
                <Suspense fallback={<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>}>
                    {/* <UserDisplay userData = {userData} /> */}
                    <UserDisplay />
                </Suspense> 
            </div>
            
        </div>
    );
    
}

export default App;
