import React from 'react'; 
import { withRouter, Redirect, Switch, Route } from 'react-router-dom'; 
import Home from '../Components/Home';
import Product from '../Components/Product';

const Main = props => {
	return (
		<Switch>
			<Route exact path="/" render={props =>  <Home {...props} /> } />	
            <Route exact path="/product/:productid" render={ props => <Product { ...props } /> } />
		</Switch>
	)
}


export default withRouter(Main);