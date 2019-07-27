import React, { Component } from 'react';
import './App.css';
import Main from './components/main';
import Admin from './components/admin';
import Customer from './components/customer';
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";


const beverageMenu =
{
  "Description": "BIO Beverage Menu",
  "BeverageBarDate": "2018-09-28T15:17:40.033+00:00",
  "BeverageIds": [
    "04d8e4eb-306e-4ff3-a027-7bed4da883f8",
    "0ae5a67d-d055-4fef-9a0a-889001dcb241",
    "1d10b218-f4da-4ae3-a383-de1657dbaa6a",
    "241ae7d5-4ccb-4b74-8783-bbe2c55f162f",
    "2630c442-84a7-4e44-829f-38e15f7fcbbb"
  ],
  "Beverages": [
    {
      "BeverageId": "04d8e4eb-306e-4ff3-a027-7bed4da883f8",
      "Name": "Sparkling Cranberry Punch"
    },
    {
      "BeverageId": "0ae5a67d-d055-4fef-9a0a-889001dcb241",
      "Name": "Raspberry Fizz"
    },
    {
      "BeverageId": "1d10b218-f4da-4ae3-a383-de1657dbaa6a",
      "Name": "Virgin Frozen Margarita"
    },
    {
      "BeverageId": "241ae7d5-4ccb-4b74-8783-bbe2c55f162f",
      "Name": "Iced Chocolate Delight"
    },
    {
      "BeverageId": "2630c442-84a7-4e44-829f-38e15f7fcbbb",
      "Name": "Summer Punch"
    }
  ]
}


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Route exact path="/" globalStore={beverageMenu} component={Main} /> */}
          {/* <Route path="/admin" globalStore={beverageMenu} component={Admin} /> */}
          <Redirect from="/" to="customer" />
          <Route path="/customer" component={() => <Customer globalStore={beverageMenu} />} />
          <Route path="/admin" component={() => <Admin globalStore={beverageMenu} />} />

        </div>
      </Router>
    );
  }
}

export default App;
