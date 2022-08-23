
import React , {useEffect, useState , Component ,useRef} from 'react';
import axios ,{post } from 'axios';



function Map(props){

    return(
        <div className="mapBox">
            <div className="map" ref={props.mapRef} id="map" ></div>
        </div>
    );

}

function Weather(props){



    return(
        <div className="mainWeather">
        { props.weather ? props.weather.map((e)=>{
            switch(e.category._text){
                case 'T1H'  :
                    return(
                    <div key={e.category._text}>
                        현재기온 : {e.obsrValue._text} 도
                    </div>
                        );         
                break;
    
                case 'VEC'  :

                    switch(parseInt(e.obsrValue._text / 22.5)){

                        case 0 :
                        case 15 :
                            return(
                                <span key={e.category._text} >풍향 : 북 </span>
                            );    
                        break;
                        case 1 :
                        case 2 :
                            return(
                                <span key={e.category._text}>풍향 : 북동 </span>
                            );    
                        break;
                        case 3 :
                        case 4 :
                            return(
                                <span key={e.category._text}>풍향 : 동 </span>
                            );    
                        break;
                        case 5 :
                        case 6 :
                            return(
                                <span key={e.category._text}>풍향 : 남동 </span>
                            );    
                        break;
                        case 7 :
                        case 8 :
                            return(
                                <span key={e.category._text}>풍향 : 남 </span>
                            );    
                        break;
                        case 9 :
                        case 10 :
                            return(
                                <span key={e.category._text} >풍향 : 남서 </span>
                            );    
                        break;
                        case 11 :
                        case 12 :
                            return(
                                <span key={e.category._text}>풍향 : 서 </span>
                            );    
                        break;
                        case 13 :
                        case 14 :
                            return(
                                <span key={e.category._text}>풍향 : 북서 </span>
                            );    
                        break;
                    }
     
                break;
                case 'WSD'  :
                    return(
                        <span key={e.category._text}> 풍속 : {e.obsrValue._text}m/s </span>
                    );         
                break;
                case 'SKY'  :
                    switch(parseInt(e.obsrValue._text)){

                        case 1 :
                            return(
                                <span key={e.category._text}> 맑음 </span>
                            );    
                        break;
                        case 2 :
                            return(
                                <span key={e.category._text}> 구름조금 </span>
                            );    
                        break;
                        case 3 :
                            return(
                                <span key={e.category._text}> 구름많음 </span>
                            );    
                        break;
                        case 4 :
                            return(
                                <span key={e.category._text}> 흐림 </span>
                            );    
                        break;
                    }
    
                break;
                case 'PTY'  :
                    switch(parseInt(e.obsrValue._text)){
                       
                        case 1 :
                            return(
                                <span key={e.category._text}> 비 </span>
                            );    
                        break;
                        case 2 :
                            return(
                                <span key={e.category._text}> 비/눈 </span>
                            );    
                        break;
                        case 3 :
                            return(
                                <span key={e.category._text}> 눈 </span>
                            );    
                        break;
                        case 5 :
                            return( 
                                <span key={e.category._text}> 빗방울 </span>
                            );    
                        break;
                        case 6 :
                            return(
                                <span key={e.category._text}> 빗방울눈날림 </span>
                            );    
                        break;
                        case 7 :
                            return(
                                <span key={e.category._text}> 눈날림 </span>
                            );    
                        break;
                    }
                break;
                case 'POP'  :
                    return(
                        <span key={e.category._text}> 강수확률 : {e.obsrValue._text}% </span>
                    );         
                break;
                case 'WAV'  :
                    return(
                        <span key={e.category._text}> 파고 : {e.obsrValue._text}M </span>
                    );               
                break;
                case 'RN1'  :
                    return(
                        <span key={e.category._text}> 강수량 : {e.obsrValue._text}mm </span>
                    );           
                break;
                case 'REH'  :
                    return(
                        <span key={e.category._text}> 습도 : {e.obsrValue._text}% </span>
                    );          
                break;
                case 'SNO'  :
                    return(
                        <span key={e.category._text}> 적설량 : {e.obsrValue._text} </span>
                    );        
                break;
    
            }
    
               
        })
        : "" }    
        
        
        </div>


    );




}


function Main(props){


    const {kakao} = window;

    const [exchange , setExchange] = useState();
    const [exchangeDate , setExchangeDate]  = useState();
    const [weather , setWeather]  = useState();

    const [location , setLocation]  = useState();

    const mapRef= useRef(null);


    // 카카오지도를 그려주는 함수 
    const printMap = () =>{
        let container = document.getElementById("map");
        //var container = mapRef;
        console.log(location);
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(location ?  location.lat : 33.450701,location ?  location.long : 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        
        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


    }


    // 환율과 현재 날씨 정보를 가져오는 함수 
    const getMainInfo = ()=>{
        axios.get("/main",
        {
            params :  {
                long : location?  location.long : 0,
                lat :  location?  location.lat : 0 ,
            }
        }
        ).then(function (response) {

            // if(response.data.location){
            //     response.data.location.forEach((key, index) =>{
            //     });
            // }
            

            setWeather(response.data.location);
            setExchangeDate(response.data.exchange[0]['updatedAt'].split('T')[0]);
            setExchange(response.data.exchange);

        }).catch(function (error) {
        //  console.log(error);
        });


    }



    //현재 위치를 가져옴 
    useEffect(()=>{


         navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({
                long : position.coords.longitude,
                lat : position.coords.latitude,
            });
        });
    }, []);


    //위치정보가 변경되면 데이터들을 불러옴 
    useEffect(()=>{

       getMainInfo();

       if(location){
        printMap();
       }


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
                            <span key={e.sno}>
                                {e.curNm}({e.curUnit}) = {e.dealBars}(KRW)
                            </span>
                               
                        )})
                    : "" }
                        </span>
                    </div>


                    <Weather weather={weather} />
                    <Map mapRef={mapRef} />
                </div>
            </div>
        </div>
    );
}




export default Main;
