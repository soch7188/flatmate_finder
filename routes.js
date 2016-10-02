import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect} from 'react-router'

import Appp from './components/Appp';
import HomeContainer from './containers/HomeContainer';
import FlatMateContainer from './containers/FlatMateContainer';

const NotFound = () => (
    <h1>404.. This page is not found!</h1>);


export default (
    <Route path='/'>
        <IndexRedirect to='home'/>
        <Route path='home' components={HomeContainer}/>
        <Route path='' component={Appp}>
            <Route path='flatmatelist/' component={FlatMateContainer} />
            <Route path='*' component={NotFound} />
        </Route>
    </Route>
)