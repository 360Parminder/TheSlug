
import axios from "axios";
import baseUrl from "../baseUrl";

const UserServices = {
    getUser: async (token) => {
        try {
            const response = await axios.post(`${baseUrl.backend}/view_profile`,{},{withCredentials:true})
            if (response.status==200) {
                return response.data;
            }
            else{
                return null;
            }
          } catch (error) {
            console.log(error);
            return null;
          }
        
    },
    fetchUrl: async (link) => {
        try {
            const response = await axios.post(`${baseUrl.backend}/url_shorten`,
             {
               redirectURL: link 
              },{
                withCredentials: true
              });
              if(response.status==200){
                return response.data;
              }
              else{
                return null;
              }
          } catch (error) {
            console.log(error);
            return null;
          }
        
    },
    fetchHistory: async () => {
        try {
            const response = await axios.post(`${baseUrl.backend}/show_urls`,{},{
                withCredentials: true
            })
            if(response.status === 200){
            return response.data
            }else{
                return null
            }
          
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    
};

export default UserServices;