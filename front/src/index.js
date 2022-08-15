import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';


//공통 컴포넌트

import App2 from "./components/App2";


//css
import "./css/index.css";
import "./css/font.css";
import "./css/common.css";

//라우터
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';

function Home(){
  return(
    <div>
      <h2>Home</h2>
    </div>
  )
}

function Home2(){
  return(
    <div>
      <h2>Home2</h2>
    </div>
  )
}



function Home3(){
  return(
    <div>
      <h2>Home3</h2>
    </div>
  )
}





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>

      <App2 />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
