import React, { Component } from 'react';
import { apiCall } from '../Services/api';
import axios from 'axios';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            mpesaresponse: "",
            price: "",
            phone: "",
            error: "",
            isResponsePresent: false
        }
    }

    handlePrice = (e) => {
        this.setState({ price: e.target.value })
    }

    handlePhone = (e) => {
        this.setState({ phone: e.target.phone })
    }

    componentDidMount() {
        // Make an Api Call to fetch all the products
        apiCall("get", `${process.env.REACT_APP_URL}/api/product/${this.props.match.params.productid}`)
            .then(res => {
                this.setState({ product: res })
            }).catch(err => {
                console.log(err);
            })
    }

    lipaNaMpesa = () => {
        if(this.state.phone !== "" && this.state.price !== "") {
            this.setState({ error: "" })
            // The code for the transaction will go here
            let oauth_token = "2BdPLyoX4sLR1r9wwRcymECO1y84",
                url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
                auth = "Bearer " + oauth_token;

            axios({
                method: 'post',
                url: url,
                headers: {
                    'crossDomain': true,
                    "Authorization": auth,
                    'Access-Control-Allow-Origin': '*',
                },
                json: {
                    "BusinessShortCode": " ",
                    "Password": " ",
                    "Timestamp": " ",
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount": this.state.price,
                    "PartyA": this.state.phone,
                    "PartyB": " ",
                    "PhoneNumber": this.state.phone,
                    "CallBackURL": "https://ip_address:port/callback",
                    "AccountReference": " ",
                    "TransactionDesc": " "
                }
            }).then((response, body) => {
                console.log(body)
                this.setState({ mpesaresponse: `Well hello. You know this isn't for real right? But anyway, here's the response from mpesa. ${body}`, isResponsePresent: true })
            }).catch(error => {
                this.setState({ mpesaresponse: `${error}`, isResponsePresent: true })
            });;
        } else {
            this.setState({ error: "Please enter all the details" })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="dividerr"></div>
                <div className="row">
                    <div className="col-6">
                        <img src="https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" class="img-thumbnail" />
                    </div>
                    <div className="col-6">
                        <div className="card card-body">
                            <h1>{this.state.product.productname}</h1>
                            <h5>KSH {this.state.product.productprice}</h5>
                            <div>{this.state.product.productdescription}</div>
                            <div className="dividerr"></div>

                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Amount</label>
                                <div class="col-sm-10">
                                    <input onChange={ this.handlePrice } type="number" class="form-control" placeholder="0" />
                                </div>
                            </div>

                             <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Phone</label>
                                <div class="col-sm-10">
                                    <input onChange={ this.handlePhone } type="text" class="form-control" placeholder="Enter your phone number" />
                                </div>
                            </div>

                            <button onClick={this.lipaNaMpesa} type="button" className="btn btn-success btn-sm">
                                Lipa Na Mpesa
                            </button>

                            <div className="dividerr"></div>

                            { this.state.isResponsePresent && (
                                <div className="alert alert-info" role="alert">
                                    Hi there. You know this isn't for real right? But anyway, here's the response from mpesa. <br /><br /><strong>{ this.state.mpesaresponse }</strong>
                                </div>
                            ) }

                            { this.state.error !== "" && (
                                <div className="alert alert-danger" role="alert">
                                    { this.state.error }
                                </div>
                            ) }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;