import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Global, css} from '@emotion/react'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Global styles={css`
          body {
            font-family: "Roboto";
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
          }

          p {
            font-style: normal;
          }

          button {
            width: 25%;
            height: 68px;
            transition: .4s;
            
            //шрифт
            color: #7b7b7b;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 21px;

            //кнопка 
            border: none;
            outline: none;
            background: linear-gradient(91.2deg, #FFFFFF 0%, #F2F2F2 100%);
            box-shadow: -2px -4px 8px #FFFFFF, 2px 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 88px;

            &:hover {
              cursor: pointer;
              color: #000000
            }

            &:active {
              background: linear-gradient(91.2deg, #FFFFFF 0%, #F2F2F2 100%);
              box-shadow: inset -2px -4px 12px #FFFFFF, inset 2px 4px 8px rgba(0, 0, 0, 0.2);
            }
          }
        `}/>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
