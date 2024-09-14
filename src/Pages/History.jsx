import { useEffect, useState } from "react"
import List from "../Components/List"
import { useNavigate } from "react-router-dom";
import Alertmessage from "../Components/Alertmessage";
import Listloader from "../Components/Loaders/Listloader";
import UserServices from "../Services/UserServices";





const History=({reload})=>{
    const navigate =  useNavigate();
    const [history, setHistory] = useState();
    const [message,setMessage] = useState();
    const [messageType,setMessageType]=useState(null);
        
    useEffect(() => {
      const allLinks = async ()=>{
       const response = await UserServices.fetchHistory();
       if(response){
           setHistory(response?.urls);
       }
      }
      allLinks()
    }, [reload])
    
    return(
        <>
        <Alertmessage  message={message} type={messageType} />
        <div className="w-full h-full flex justify-center ">
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