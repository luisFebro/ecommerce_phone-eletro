import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/cart/';
import Default from './components/Default';
import Modal from './components/Modal';
import About from './components/About';

export default function App() {
    return (
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route exact path="/" component={ProductList} /> {/*This will be routed first*/}
                <Route path ="/about" component={About} />
                <Route path ="/details" component={Details} />
                <Route path="/cart" component={Cart} />
                <Route component={Default} />
            </Switch>
            <Modal />
        </React.Fragment>
    );
}