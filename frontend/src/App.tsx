import {Route, Routes, BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './App.css';
import {NavBar} from "./components/Nav/Navigation";
import {Container} from "react-bootstrap";
import {Footer} from "./components/Footer/Footer";
import {Registration} from "./pages/Registration/Registration";
import {Info} from "./pages/Info/Info";
import {Video} from "./pages/Video/Video";
import {Track} from "./pages/Track/Track";
import {Contact} from "./pages/Contact/Contact";
import {Results} from "./pages/Result/Results";
import {ResultList} from "./pages/ResultList/ResultList";
import {Rules} from "./pages/Rules/Rules";
import {HomepagePage} from "./pages/Homepage/Homepage";
import React from "react";
import Address from "./Address";

export default function App() {

    const registrationEnabled = false

    const results: string[] = [
        "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2021", "2022", "2023", "2024", "2024-borak", "2025"
    ].reverse()

    return (
        <div id={'app'}>
            <div>
                <BrowserRouter>
                    <NavBar/>
                    <div className="content">
                        <Container>
                            <Routes>
                                <Route path={Address.registration}
                                       element={<Registration enabled={registrationEnabled}/>}/>
                                <Route path={Address.info} element={<Info/>}/>
                                <Route path={Address.video} element={<Video/>}/>
                                <Route path={Address.track} element={<Track/>}/>
                                <Route path={Address.contacts} element={<Contact/>}/>
                                <Route path={Address.results} element={<ResultList years={results}/>}/>
                                <Route path={Address.rules} element={<Rules/>}/>
                                <Route path="/" element={<HomepagePage/>}/>
                                {results.map((year) => {
                                    return (
                                        <Route
                                            key={year}
                                            path={Address.resultsPlaceholder.replace(':year', year)}
                                            element={<Results year={year.toString()}/>}
                                        />
                                    )
                                })}
                            </Routes>
                        </Container>
                    </div>
                </BrowserRouter>
            </div>
            <Footer/>
        </div>
    );
}


