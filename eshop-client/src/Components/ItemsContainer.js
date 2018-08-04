import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Item from './Item';
import { apiCall } from '../Services/api';

class ItemsContainer extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        // Make an Api Call to fetch all the products
        apiCall("get", `${ process.env.REACT_APP_URL }/api/products`)
			.then(res => {
				this.setState({ products: res })
			}).catch(err => {
				console.log(err);
			})
    }

    render() {
        const Products = this.state.products.map(product => (
            <Item 
                key={ product._id }
                productname={ product.productname } 
                productprice={ product.productprice } 
                productdescription={ product.productdescription } 
                productquantity={ product.productquantity }
                id={ product._id }
            />
        ))
        return (
            <div className="container">
                <div className="dividerr"></div>
                <div className="row">
                    { Products }
                </div>
            </div>
        )
    }
}

export default ItemsContainer;