import React from "react";
import { withRouter } from "react-router";
import { fetchHisOrders } from "../../../api/business";
import CircularProgress from "@material-ui/core/CircularProgress";

class TotalFinishTasksNumber extends React.Component {
	state = {
		totalFinishTasksNumber: 0,
		isLoading: false,
		error: null
	};

	componentDidMount() {
		const businessId = this.props.match.params.businessId;
		this.getTotalFinishTasksNumber(businessId);
	}

	getTotalFinishTasksNumber = businessId => {
		this.setState({ isLoading: true }, () => {
			fetchHisOrders(businessId, null, null, "done")
				.then(business => {
					const totalFinishTasksNumber = business.orders.length;
					this.setState({ totalFinishTasksNumber, isLoading: false });
				})
				.catch(error => this.setState({ error, isLoading: false }));
		});
	};

	render() {
		return this.state.error ? (
			<div className="card__number--top-right">error</div>
		) : this.state.isLoading ? (
			<div className="card__number-container--top-right">
				<CircularProgress disableShrink size={30} color="inherit" />
			</div>
		) : (
			<p className="card__number--top-right">
				{this.state.totalFinishTasksNumber}
			</p>
		);
	}
}

export default withRouter(TotalFinishTasksNumber);
