import React from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {NavBar} from "./components/Nav/Navigation";
import {HomepagePage} from "./pages/Homepage/Homepage/Homepage";
import {Container} from "react-bootstrap";
import {Footer} from "./components/Footer/Footer";
import {Registration} from "./pages/Registration/Registration";
import Address from "./Address";
import {Info} from "./pages/Info/Info";
import {Video} from "./pages/Video/Video";
import {Track} from "./pages/Track/Track";
import {Contact} from "./pages/Contact/Contact";
import {Results} from "./pages/Result/Results";
import {ResultList} from "./pages/ResultList/ResultList";

export default function App() {

    const results: number[] = [
        2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021
    ].reverse()

    return (
        <div id={'app'}>
            <div>
                <BrowserRouter>
                    <NavBar/>
                    <div className="content">
                        <Container>
                            <Switch>
                                <Route exact={true} path={Address.registration}>
                                    <Registration/>
                                </Route>
                                <Route exact={true} path={Address.info}>
                                    <Info/>
                                </Route>
                                <Route exact={true} path={Address.video}>
                                    <Video/>
                                </Route>
                                <Route exact={true} path={Address.track}>
                                    <Track/>
                                </Route>
                                <Route exact={true} path={Address.contacts}>
                                    <Contact/>
                                </Route>
                                <Route exact={true} path={Address.results}>
                                    <ResultList years={results}/>
                                </Route>
                                <Route exact={true} path={Address.resultsPlaceholder}>
                                    <Results/>
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

