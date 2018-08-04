import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <Link to="/" className="navbar-brand" href="#">E-SHOP</Link>
                </div>
            </nav>
        )
    }
}

export default Navbar;