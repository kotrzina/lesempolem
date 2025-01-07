import {Route, Routes, BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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
        "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2021", "2022", "2023", "2024", "2024-borak"
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

                                <Route path="/vysledky-2024-borak.html" element={<Results year={"2024-borak"}/> } />
                                <Route path="/vysledky-2024.html" element={<Results year={"2024"}/> } />
                                <Route path="/vysledky-2023.html" element={<Results year={"2023"}/> } />
                                <Route path="/vysledky-2022.html" element={<Results year={"2022"}/> } />
                                <Route path="/vysledky-2021.html" element={<Results year={"2021"}/> } />
                                <Route path="/vysledky-2019.html" element={<Results year={"2019"}/> } />
                                <Route path="/vysledky-2018.html" element={<Results year={"2018"}/> } />
                                <Route path="/vysledky-2017.html" element={<Results year={"2017"}/> } />
                                <Route path="/vysledky-2016.html" element={<Results year={"2016"}/> } />
                                <Route path="/vysledky-2015.html" element={<Results year={"2015"}/> } />
                                <Route path="/vysledky-2014.html" element={<Results year={"2014"}/> } />
                                <Route path="/vysledky-2013.html" element={<Results year={"2013"}/> } />
                            </Routes>
                        </Container>
                    </div>
                </BrowserRouter>
            </div>
            <Footer/>
        </div>
    );
}


