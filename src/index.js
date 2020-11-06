import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/loginComponent';
import Boards from './components/boardsComponent'
import PrivateRoute from './components/protectedRouteComponent';
import Register from './components/registerComponent';
import DetailBoard from './components/detailABoardComponent';
import User from './components/userComponent';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={Login}/>
      <PrivateRoute exact path="/boards" component={Boards}></PrivateRoute>
      <PrivateRoute exact path="/boards/info" component={DetailBoard}></PrivateRoute>
      <PrivateRoute exact path="/user" component={User}></PrivateRoute>
      <Route path="/register" component={Register}></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
