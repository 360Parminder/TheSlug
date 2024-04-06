const PopupCard=()=>{
    return(
        <>
        <div className=" absolute z-50 w-screen h-screen backdrop-blur-sm flex items-center justify-center">
            <div className="border-2 rounded-xl shadow-xl shadow-[#ced4da] w-[30rem] h-[35rem] ">
                <div className="flex flex-col items-center">
                       <div className=" border-b-2 w-full flex justify-center">
                       <h3 className="my-5 ">Download QR Code</h3>
                       </div>
                        <img className=" mt-32  w-[10rem] h-[10rem]" src="src/assets/qrcode.png" alt="QrCode" />
                </div>
            </div>
        </div>
        </>
    )
}
export default  PopupCard;