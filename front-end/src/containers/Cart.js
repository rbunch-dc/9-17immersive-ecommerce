import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetCart from '../actions/GetCart';
import { Link } from 'react-router-dom';

class Cart extends Component{

	componentDidMount(){
		console.log(this.props.auth);
		if(this.props.auth.token === undefined){
			// if the user has no token... they should not be here. Goodbye.
			// this.props.history.push('/login')
		}else{
			// the user does have a token, go get their cart!
			this.props.getCart(this.props.auth.token);
		}
	}

	render(){
		console.log(this.props.cart);
		if(!this.props.cart.totalItems){
			// if this return occurs, the render is DONE
			return(
				<div>
					<h3>Your cart is empty! Get shopping or <Link to="/login">login</Link></h3>
				</div>
			)
		}else{
			var cartArray = this.props.cart.products.map((product,index)=>{
				console.log(product)
				return (
					<h1>{product.productName}</h1>
				)
			})
			return(
				<div>
					{cartArray}
				</div>
			)
		}
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth,
		cart: state.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getCart: GetCart
	},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);
