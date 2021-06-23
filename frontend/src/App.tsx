import React from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {NavBar} from "./components/Nav/Navigation";
import {HomepagePage} from "./pages/Homepage/Homepage/Homepage";
import {Container} from "react-bootstrap";
import {Footer} from "./components/Footer/Footer";
import {Registration} from "./pages/Homepage/Registration/Registration";

export default function App() {
    return (
        <div id={'app'}>
            <div>
                <BrowserRouter>
                    <NavBar/>
                    <div className="content">
                        <Container>
                            <Switch>
                                <Route exact={true} path="/registrace.html">
                                    <Registration/>
                                </Route>
                                <Route exact={true} path="/">
                                    <HomepagePage/>
                                </Route>
                            </Switch>
                        </Container>
                    </div>
                </BrowserRouter>
            </div>
            <Footer/>
        </div>
    );
}


