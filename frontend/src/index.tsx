import './index.css';
import App from './App';
import {createRoot} from "react-dom/client";
import React from 'react';


if (window.location.host.startsWith("www.")) {
    const parts = window.location.host.split('.').slice(1)
    // @ts-ignore
    window.location = window.location.protocol + "//" + parts.join('.') + window.location.pathname
}


const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    /* https://github.com/remix-run/react-router/issues/7870 */
    /* <React.StrictMode> */
    <App/>
    /* </React.StrictMode> */
);

