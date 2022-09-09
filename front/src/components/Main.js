/* global kakao */
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
    const container = useRef();

    // 카카오지도를 그려주는 함수 
    const printMap = () =>{
        let container = document.getElementById("map");
        //var container = mapRef;




        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(location ?  location.lat : 33.450701,location ?  location.long : 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };


        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴



        //지도에 컨트롤 올리기
        var mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        //현재 위치 마커 생성 
        var markerPosition  = new kakao.maps.LatLng(location ?  location.lat : 33.450701,location ?  location.long : 126.570667); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);


        if(weather){

            var iwContent = '<div class="mainWeatherMap" style="margin-top : 0px;">'; 
            iwContent += '<div >현재날씨</div>'; 
            weather.forEach((e)=>{
                switch(e.category._text){
                    case 'T1H'  :
                        iwContent +=   "<div key={e.category._text}>현재기온 : " + e.obsrValue._text + "도</div>";
                    break;
                    case 'VEC'  :
    
                        switch(parseInt(e.obsrValue._text / 22.5)){
    
                            case 0 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 북 </span>";
                            break;
                            case 1 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 북북동 </span>";
                            break;
                            case 2 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 북동 </span>";
                            break;
                            case 3 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 동북동 </span>";
                            break;
                            case 4 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 동 </span>";
                            break;
                            case 5 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 동남동 </span>";
                            break;
                            case 6 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 남동 </span>";
                            break;
                            case 7 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 남남동 </span>";
                            break;
                            case 8 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 남 </span>";
                            break;
                            case 9 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 남남서 </span>";
                            break;
                            case 10 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 남서 </span>";
                            break;
                            case 11 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 서남서 </span>";
                            break;
                            case 12 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 서 </span>";
                            break;
                            case 13 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 서북서 </span>";
                            break;
                            case 14 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 북서 </span>";
                            break;
                            case 15 :
                                iwContent +=  "<span key={e.category._text} > 풍향 : 북북서 </span>";
                            break;
                        }
                    break;
                    case 'WSD'  :
                        iwContent += "<span key=" +e.category._text + "> 풍속 : "+ e.obsrValue._text+"m/s </span>";    
                    break;
                    case 'SKY'  :
                        switch(parseInt(e.obsrValue._text)){
    
                            case 1 :
                                iwContent += "<span key="+e.category._text+"> 맑음 </span>";
                            break;
                            case 2 :
                                iwContent += "<span key="+e.category._text+"> 구름조금 </span>";
                            break;
                            case 3 :
                                iwContent += "<span key="+e.category._text+"> 구름많음 </span>";  
                            break;
                            case 4 :
                                iwContent += "<span key="+e.category._text+"> 흐림 </span>";  
                            break;
                        }
        
                    break;
                    case 'PTY'  :
                        switch(parseInt(e.obsrValue._text)){
                           
                            case 1 :
                                iwContent += "<span key="+e.category._text+"> 비 </span>";
                            break;
                            case 2 :
                                iwContent += "<span key="+e.category._text+"> 비/눈 </span>";
       
                            break;
                            case 3 :
                                iwContent += "<span key="+e.category._text+"> 눈 </span>"; 
                            break;
                            case 5 :
                                iwContent += "<span key="+e.category._text+"> 빗방울 </span>";   
                            break;
                            case 6 :
                                iwContent += "<span key="+e.category._text+"> 빗방울눈날림 </span>"; 
                            break;
                            case 7 :
                                iwContent += "<span key="+e.category._text+"> 눈날림 </span>";
                            break;
                        }
                    break;
                    case 'POP'  :
                        iwContent += "<span key="+e.category._text+"> 강수확률 : "+e.obsrValue._text+"% </span>";    
                    break;
                    case 'WAV'  :
                        iwContent += "<span key="+e.category._text+"> 파고 : "+e.obsrValue._text+"M </span>";                
                    break;
                    case 'RN1'  :
                        iwContent += "<span key="+e.category._text+"> 강수량 : "+e.obsrValue._text+"mm </span>";           
                    break;
                    case 'REH'  :
                        iwContent += "<span key="+e.category._text+"> 습도 : "+e.obsrValue._text+"% </span>";                
                    break;
                    case 'SNO'  :
                        iwContent += "<span key="+e.category._text+"> 적설량 : "+e.obsrValue._text+"cm </span>";                
                    break;
                }
            });
            iwContent += '</div>'; 
                
            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content : iwContent
            });
    
            infowindow.open(map,marker);





        }

        let markerOpen = 1;

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커 위에 인포윈도우를 표시합니다
            if(markerOpen){
                infowindow.close(map, marker);  
                markerOpen = 0;
            }else{
                infowindow.open(map, marker);  
                markerOpen = 1;
            }
            
        });


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


            

            setWeather(response.data.location);
            setExchangeDate(response.data.exchange[0]['updatedAt'].split('T')[0]);
            setExchange(response.data.exchange);

        }).catch(function (error) {
        //  console.log(error);
            alert(error);
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
    }, [container]);


    //위치정보가 변경되면 데이터들을 불러옴 
    useEffect(()=>{

       getMainInfo();




   }, [location]);


    //날씨정보가 업데이트되면 실행 
    useEffect(()=>{


 
        if(location){
         printMap();
        }
 
 
    }, [weather]);



    return(

        <>
        {props ? 
            <>
            <div className="mainBox" ref={container}>

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

        </>

            
        : ""}
        
        </>


    );
}




export default Main;
