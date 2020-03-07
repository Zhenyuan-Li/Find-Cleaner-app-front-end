import React, { Component } from "react";
import OrderCard from "../../components/order/OrderCard";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Maps from "./components/Maps";
import SearchBar from "./components/Search";
import DatePosted from "./components/DatePosted";
import NewTasks from "./components/NewTasks";
import "./style/browseorders.scss";
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";

import { fetchAllNewOrders } from "../../api/order";

import { BUSINESS_BASE_URL } from "../../routes/URLMap";
import ErrorMessage from "../../UI/ErrorMessage";

import { businessRole } from "../../utils/variables";

class BrowseOrder extends Component {
	state = {
		orders: [],
		error: null,
		isLoading: false,
		pagination: {
			page: 1,
			pageSize: 5
		},
		role: businessRole
	};

	componentDidMount() {
		this.loadOrders();
	}

	loadOrders = (page, pageSize) => {
		this.setState({ isLoading: true, orders: [] }, () => {
			fetchAllNewOrders(page, pageSize)
				.then(this.updateOrderData)
				.catch(error => this.setState({ error, isLoading: false }));
		});
	};

	updateOrderData = orderData => {
		this.setState({
			orders: orderData.orders,
			isLoading: false,
			pagination: orderData.pagination
		});
	};

	handlePageChange = (event, data) => {
		this.loadOrders(data);
	};

	render() {
		const businessId = this.props.match.params.businessId;
		const BASE_URL = `${BUSINESS_BASE_URL}/${businessId}`;
		return (
			<React.Fragment>
				<div className="browse-orders">
					<div className="browse-orders--top-bar">
						<DatePosted />
						<NewTasks />
						<SearchBar />
					</div>

					<Container className="order-history__container">
						<Pagination
							page={this.state.pagination.page}
							count={this.state.pagination.pages}
							onChange={this.handlePageChange}
							shape="rounded"
						/>
						{this.state.isLoading && (
							<div className="browse-orders-progress__container">
								<CircularProgress
									size={200}
									color="secondary"
								/>
							</div>
						)}
						<Grid
							container
							spacing={3}
							className="browse-orders--container"
						>
							{!!this.state.error && (
								<ErrorMessage error={this.state.error} />
							)}
							<Grid item xs={6}>
								{!this.state.isLoading &&
									!this.state.orders.length && (
										<p>
											{" "}
											There is no opened orders at the
											moment.{" "}
										</p>
									)}
								{this.state.orders.map(order => (
									<OrderCard
										key={order._id}
										role={this.state.role}
										location={order.location}
										dueDate={order.dueDate}
										price={order.price}
										status={order.status}
										to={`${BASE_URL}/orders/${order._id}`}
									/>
								))}
							</Grid>
							<Grid item xs={6}>
								{!this.state.isLoading && (
									<Maps orders={this.state.orders} />
								)}
							</Grid>
						</Grid>
					</Container>
				</div>
			</React.Fragment>
		);
	}
}

export default BrowseOrder;
