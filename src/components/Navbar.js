import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logo from '../logo.svg';
import styled from 'styled-components';
import { ButtonContainer } from './Button';

export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                <Link to='/'>
                    <img src={Logo} alt="store" className="navbar-brand"/>
                </Link>
               <ul className="navbar-nav align-items-center">
                   <li className="nav-item ml-5">
                       <Link to="/" className="nav-link">products</Link>
                   </li>
               </ul>
               <ul className="navbar-nav align-items-center">
                   <li className="nav-item ml-3">
                       <Link to="/" className="nav-link">categories</Link>
                   </li>
               </ul>
               <Link to="/cart" className="ml-auto">
                   <ButtonContainer>
                        <span className="mr-2">
                           <i className="fas fa-cart-plus"></i>
                        </span>
                       my cart
                   </ButtonContainer>
               </Link>

            </NavWrapper>
        );
    }
}

// STYLES
const NavWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link {
        color: var(--mainWhite) !important;
        font-size: 1.3rem;
        text-transform: capitalize;
    }
`;

