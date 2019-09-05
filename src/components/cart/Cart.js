import React, { Component } from 'react';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import { ProductConsumer } from '../../context';
import CardTotals from './CardTotals';
// import {BrowserRouter as Router} from
// 'react-router-dom';

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const {cart} = value;
                        if(cart.length > 0) {
                            return (
                                <React.Fragment>
                                    <Title name="your" title="cart" />
                                    <CartColumns />
                                    <CartList value={value} />
                                    <CardTotals value={value} />
                                </React.Fragment>
                            );
                        } else {
                            return <EmptyCart />
                        }
                    }}
                </ProductConsumer>
            </section>
        );
    }
}
