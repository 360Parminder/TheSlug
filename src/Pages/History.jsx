import { useEffect, useState } from "react"
import List from "../Components/List"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Alertmessage from "../Components/Alertmessage";
import Listloader from "../Components/Loaders/Listloader";
import baseUrl from "../baseUrl";




const History=({reload})=>{
    const navigate =  useNavigate();
    const [history, setHistory] = useState();
    const [message,setMessage] = useState();
    const [messageType,setMessageType]=useState(null);
        
    useEffect(() => {
      const allLinks = async ()=>{
        try {
            const response = await axios.post(`${baseUrl.backend}/show_urls`,{},{
                withCredentials: true
            })
            if(response.status === 200){
              setHistory(response.data.urls);
              
            }else{
                setMessage("Unable to fetch history")
                setMessageType("error")
            }
          
        } catch (error) {
            setMessage(error.toString())
            setMessageType("error")
            setTimeout(() => {
                navigate('*')
            }, 3000);
        }
      }
      allLinks()
    }, [reload])
    
    return(
        <>
        <Alertmessage  message={message} type={messageType} />
        <div className="w-full h-full flex justify-center">
            {
                history?
                    (
                        <List allLinks={history}/>
                    ):
                    (
                    <Listloader/>
                    )
            }
        </div>
        </>
    )
}
export default History