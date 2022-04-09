import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

if (window.location.host.startsWith("www.")) {
    const parts = window.location.host.split('.').slice(1)
    // @ts-ignore
    window.location = window.location.protocol + "//" + parts.join('.') + window.location.pathname
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

