import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routes';
import FirstPage from './components/FirstPage/FirstPage';
import SecondPage from './components/SecondPage/SecondPage';

ReactDOM.render(<SecondPage />, document.getElementById("app"));
