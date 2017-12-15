import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductRow from '../components/ProductRow';

class ProductLines extends Component{
	constructor(){
		super();
		this.state = {
			productList: []
		}
	}


	componentDidMount(){
		const pl = this.props.match.params.productLine
		const url = `${window.apiHost}/productlines/${pl}/get`;
		axios.get(url)
		.then((response)=>{
			console.log(response);
			this.setState({
				productList: response.data
			})
		});
	}

	render(){
		// console.log(this.props);
		// console.log(this.props.pl)
		console.log(this.state.productList);
		const products = this.state.productList.map((product,index)=>{
			return (
				<ProductRow 
					key={index}
					product={product}
				/>
			)
		})
		var thisPL = this.props.pl.filter((obj)=>{
			return obj.productLine === this.props.match.params.productLine
		})
		if(thisPL.length === 0){
			var desc = ""
		}else{
			var desc = thisPL[0].textDescription
		}

		return(
			<div>
				<h1>Welcome to the {this.props.match.params.productLine} page</h1>
				<p>{desc}</p>
				<div className="products">
					<table className="table table-striped">
						<thead>
							<tr>
								<th className="table-head">Product Name</th>
								<th className="table-head">Model Scale</th>
								<th className="table-head">Made by</th>
								<th className="table-head">Description</th>
								<th className="table-head">In Stock</th>
								<th className="table-head">Your Price!</th>
								<th className="table-head">MSRP</th>
							</tr>
						</thead>
						<tbody>
							{products}	
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		pl: state.pl
	}
}

// export default ProductLines;
export default connect(mapStateToProps)(ProductLines)