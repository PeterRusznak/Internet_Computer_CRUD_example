import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Create from './components/Create';
import Display from './components/Display';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Display}></Route>
                        <Route path="/customers" component={Display}></Route>
                        <Route path="/add/:id" component={Create}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}
export default App