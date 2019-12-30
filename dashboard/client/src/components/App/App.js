import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import NavBar from "../Common/NavBar";

const App = ({children}) => (
  <Route

    render={(props) => {
      return (

          <div className="wrapper">
            <NavBar/>
            <div>{children}</div>
          </div>

      );
    }}
  />
);

export default App;
