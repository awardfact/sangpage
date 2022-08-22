
import React , {useEffect, useState , Component} from 'react';
import axios ,{post } from 'axios';

function Main(props){



    const [exchange , setExchange] = useState();
    const [exchangeDate , setExchangeDate]  = useState();


    const [location , setLocation]  = useState({
        long : 127,
        lat : 35,
    });





    const getMainInfo = ()=>{
        axios.get("/main",
        {
            params :  {
                long : location.long,
                lat : location.lat,
            }
        }
        ).then(function (response) {

            if(response.data.location){
                response.data.location.forEach((key, index) =>{
                    console.log(key.category);
                });
            }
            
            setExchangeDate(response.data.exchange[0]['updatedAt'].split('T')[0]);
            setExchange(response.data.exchange);

        }).catch(function (error) {
        //  console.log(error);
        });


    }




    useEffect(()=>{
         navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({
                long : position.coords.longitude,
                lat : position.coords.latitude,
            });
        });
    }, []);


    useEffect(()=>{

       getMainInfo();



   }, [location]);



    return(
        <div className="mainBox">

            <div className="exchangeBox">
                <div className="exchangeBoxTitle">세계 환율 ({exchangeDate})</div>
                <div>
                    <div  className="mainExchange"  >
                        <span>
                    { exchange ? exchange.map((e)=>{
                        return(
                            <>
                                {e.curNm}({e.curUnit}) = {e.dealBars}(KRW)
                            </>
                               
                        )})
                    : "" }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}




export default Main;
