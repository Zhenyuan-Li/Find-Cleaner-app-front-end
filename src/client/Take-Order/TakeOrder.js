import React from "react";
import Bedrooms from "./components/Bedrooms";
import Bathrooms from "./components/Bathrooms";
import LeaseEnd from "./components/LeaseEnd";
import OtherClean from "./components/OtherClean";
import Location from "./components/Location";
import Date from "./components/Date";
import Time from "./components/Time";
import Price from "./components/Price";
import { createOrder } from "../../api/order";
import { CLIENT_BASE_URL } from "../../routes/URLMap";

import { withRouter } from "react-router";
class TakeOrder extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			bedrooms: 0,
			bathrooms: 0,
			endOfLease: false,
			oven: false,
			windows: false,
			cabinets: false,
			carpet: false,
			location: "",
			dueDate: "2021-01-01",
			price: 0,
			error: null
		};
	}

	handleChange = event => {
		const key = event.target.name;
		let value = event.target.value;
		if (key === "bedrooms" || key === "bathrooms") {
			value = parseInt(value);
		} else if (key === "location" || key === "dueDate") {
			// value = value;
		} else {
			value = value === "false";
		}

		// this.setState({ [key]: value });
		this.setState({ [key]: value }, () => {
			let totalPrice =
				this.state.bedrooms * 22 +
				this.state.bathrooms * 28 +
				this.state.endOfLease * 135 +
				this.state.oven * 5 +
				this.state.windows * 68 +
				this.state.cabinets * 36 +
				this.state.carpet * 18;
			this.setState({ price: totalPrice });
		});
	};
	handleChangeDate = value => {
		value = value.toString();
		this.setState({ dueDate: value });
	};
	handleSubmit = () => {
		const order = { ...this.state };
		const clientId = this.props.match.params.clientId;
		this.setState({}, () => {
			createOrder(clientId, order)
				.then(newOrder => {
					// this.props.history.push(`${CLIENT_BASE_URL}/order-history/${newOrder.id}`);
					this.props.history.push(
						`${CLIENT_BASE_URL}/${clientId}/orders/${newOrder._id}`
					);
				})
				.catch(error => this.setState({ error }));
		});
	};

	render() {
		return (
			<div className="client__take-order-page">
				<p id="take-order">See how little it will cost...</p>
				<Bedrooms
					bedrooms={this.state.bedrooms}
					handleChange={this.handleChange}
				/>
				<Bathrooms
					bathrooms={this.state.bathrooms}
					handleChange={this.handleChange}
				/>
				<LeaseEnd
					endOfLease={this.state.endOfLease}
					handleChange={this.handleChange}
				/>
				<OtherClean
					oven={this.state.oven}
					windows={this.state.windows}
					cabinets={this.state.cabinets}
					carpet={this.state.carpet}
					handleChange={this.handleChange}
				/>
				<Location
					location={this.state.location}
					handleChange={this.handleChange}
				/>
				<Date
					dueDate={this.state.dueDate}
					handleChange={this.handleChange}
				/>
				<Time
					dueDate={this.state.dueDate}
					handleChangeDate={this.handleChangeDate}
				/>
				<Price
					price={this.state.price}
					handleSubmit={this.handleSubmit}
				/>
			</div>
		);
	}
}

export default withRouter(TakeOrder);
