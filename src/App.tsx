import React, {useRef, useState} from "react";
import './styles/main.css';
import Index from "./components/pages/character/Index";
import Show from "./components/pages/character/Show";
import SearchBox from "./components/SearchBox";
import Error from "./components/pages/errors/Error";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';


const App = () => {
    return (
        <Router>
            <div className="bg-gray-900 text-white text-lg">
                <header className="border-b border-gray-800">
                    <nav className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 py-6">
                        <div className="flex flex-col lg:flex-row items-center">
                            <Link to="/">
                                <img
                                    className="w-64"
                                    src="/images/rick-and-morty-logo.png"
                                    alt="logo"/>
                            </Link>
                        </div>

                        <div className="flex items-center mt-6 lg:mt-0">
                            {/*Search Box*/}
                            <SearchBox />
                        </div>
                    </nav>
                </header>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <main>
                    <Switch>

                        <Route path="/page-not-found">
                            <Error>
                                Page Not Found
                            </Error>
                        </Route>

                        <Route path="/character/:id">
                            <Show />
                        </Route>

                        <Route exact path="/">
                            <Index />
                        </Route>

                        <Route path="*">
                            <Error>
                                Page Does Not Exist
                            </Error>
                        </Route>

                    </Switch>
                </main>

                <footer>
                    <div className="container mx-auto px-4 py-6">
                        Powered By <a href="https://rickandmortyapi.com/" className="underline hover:text-gray-400">Rick and Morty API</a>
                    </div>
                </footer>

            </div>
        </Router>
    );
}

export default App;
