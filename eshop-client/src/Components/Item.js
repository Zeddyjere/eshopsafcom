import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
    render() { 
        return (
            <div className="col-4">
                <div class="card">
                    <img class="card-img-top" src="https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">{ this.props.productname }</h5>
                        <p class="card-text">{ this.props.productdescription }</p>
                        <Link to={ `/product/${ this.props.id }` } href="#" class="btn btn-info btn-sm">Buy for ksh { this.props.productprice }</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item;