import React from "react"
import ContentLoader from "react-content-loader"

const Pageloader = () => (
  <ContentLoader 
    speed={2}
    width={'100vw'}
    height={'100vh'}
    viewBox="0 0 800 800"
    backgroundColor="#1C283F"
    foregroundColor="#0000"
    
  >
    {/* <rect x="48" y="5" rx="3" ry="3" width="110" height="8" />  */}
    <rect x="0" y="10" rx="3" ry="3" width="100" height="20" />
    <rect x="600" y="10" rx="3" ry="3" width="100" height="20" />
    <rect x="710" y="10" rx="3" ry="3" width="100" height="20" />
    <rect x="50" y="250" rx="3" ry="3" width="700" height="60" />
    <rect x="100" y="400" rx="3" ry="3" width="600" height="8" />
    <rect x="150" y="420" rx="3" ry="3" width="500" height="8" /> 
    <rect x="140" y="500" rx="30" ry="30" width="550" height="50" />
    <rect x="0" y="600" rx="3" ry="3" width="800" height="10" /> 
    <rect x="0" y="630" rx="3" ry="3" width="800" height="10" /> 
    <rect x="0" y="660" rx="3" ry="3" width="800" height="10" /> 
     
    {/* <circle cx="20" cy="20" r="20" />  */}
    {/* <rect x="48" y="98" rx="24" ry="24" width="423" height="230" /> */}
  </ContentLoader>
)



export default Pageloader
