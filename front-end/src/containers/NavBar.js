import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GetProductLines from '../actions/GetProductLines';
import {bindActionCreators} from 'redux';
import LoginAction from '../actions/LoginAction';

class NavBar extends Component{
	constructor(){
		super();
		this.fakeLogin = this.fakeLogin.bind(this)
	}

	fakeLogin(){
		this.props.auth('fake');
	}

	componentDidMount(){
		this.props.getProductLines();
	}

	componentWillReceiveProps(newProps){

	}

	render(){
		// console.log(this.props.cart);
		console.log(this.props.auth);
		if((this.props.auth.name !== undefined) && (this.props.auth.name !== "")){
			// the user is logged in
			if(this.props.cart.length > 0){
				// there is something in this user's cart.
				const totalPrice = this.props.cart[0].totalPrice;
				const totalItems = this.props.cart[0].totalItems;
				var cartText = `(${totalItems}) items in your cart | ($${totalPrice})`
			}else{
				var cartText = "Your cart is empty"
			}
			var rightMenuBar = [
				<li key={1} className="">Welcome, {this.props.auth.name}</li>,
				<li key={2}><Link to="/cart">{cartText}</Link></li>,
				<li key={3}><Link to="/logout">Logout</Link></li>
			]
		}else{
			var rightMenuBar = [
				<li><button className="btn btn-primary" onClick={this.fakeLogin}>FAKE LOGIN</button></li>,
			    <li key={1}><Link to="/login">Sign in</Link> or <Link to="/register">Create an account</Link></li>,
			    <li key={2}>(0) items in cart | ($0.00)</li>
			]
		}
		// console.log(this.props.auth);
		// console.log(this.props.productLines);
		var shopMenu = this.props.productLines.map((pl, index)=>{
			const safeLink = encodeURIComponent(pl.productLine);
			return(<Link key={index} to={`/shop/${safeLink}`}>{pl.productLine}</Link>)
		})
		console.log(shopMenu)
		return(
			<div id="navbar">
				<nav className="navbar navbar-fixed-top">
			  		<div className="container-fluid navbar-white">
			  			<div className="container">
				    		<ul className="nav navbar-nav">
				    			<li><Link to="/">Home</Link></li>
				    			<li className="dropdown">
				    				<Link to="/shop"><i className="arrow down" />Shop</Link>
				    				<ul>
				    					<li className="dropdown-links">
				    						{shopMenu}
				    					</li>
				    				</ul>
				    			</li>
				    			<li><Link to="/about">About Us</Link></li>
				    			<li><Link to="/contact">Contact Us</Link></li>
				    		</ul>
				    	</div>
			    	</div>
			    	<div className="container-fluid navbar-default">
			    		<div className="container">
			    			<div className="nav navbar-header">
			    				ClassicModels Logo
			    			</div>
			    			<div className="nav navbar-nav pull-right">
			    				{rightMenuBar}
			    			</div>
			    		</div>
			    	</div>
			    </nav>
			</div>
		)
	}
}


function mapStateToProps(state){
	// state = RootReducer
	return{
		auth: state.auth,
		productLines: state.pl,
		cart: state.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getProductLines: GetProductLines,
		auth: LoginAction
	},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);
// export default NavBar;