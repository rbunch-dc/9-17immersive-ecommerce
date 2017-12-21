import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Orders from './Orders';
import Information from './Information';


class Account extends Component{
	constructor(){
		super();
	}

	componentDidMount(){
	}

	componentWillReceiveProps(newProps){
	}

	render(){
		console.log(this.props.match)
		return(
			<div>
				<h1>Account page</h1>
				<Link to="/account/orders">Orders</Link> | 
				<Link to="/account/information">Acount Information</Link>
				<div>
					<Route exact path="/account/orders" component={Orders} />
					<Route exact path="/account/information" component={Information} />
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	// state = RootReducer
	return{
		auth: state.auth,

	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({

	},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);
// export default NavBar;