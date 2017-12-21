import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Orders extends Component{
	constructor(){
		super();
		this.state = {
			myOrders: []
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps === this.props){
			console.log("I will never run");
		}
	}

	componentDidMount(){
		// console.log(this.props.auth.token);
		// Only submit the request to express if they DO have a token
		if(this.props.auth.token !== undefined){
			const thePromise = axios({
				method: "POST",
				url: `${window.apiHost}/orders/get`,
				data: {
					userToken: this.props.auth.token
				}
			});

			thePromise.then((response)=>{
				console.log(response.data);
				this.setState({
					myOrders: response.data
				})
			});
		}
	}

	render(){
		const orderNumbers = this.state.myOrders.map((order)=>{
			return order.orderNumber
		})
		console.log(this.props);
		if(this.props.auth.token === undefined){
			return(
				<h1>Please <Link to="/login">login</Link> to view your cart</h1>
			)
		}
		return(
			<div>
				<h1>Orders</h1>
				{orderNumbers}
			</div>


		)
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth,
	}
}


export default connect(mapStateToProps)(Orders);