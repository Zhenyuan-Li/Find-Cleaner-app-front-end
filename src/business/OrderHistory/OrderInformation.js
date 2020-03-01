import React from "react";
import Grid from "@material-ui/core/Grid";

import {
	Card,
	CardActions,
	CardContent,
	Typography,
	InputLabel,
	FormControl,
	Select,
	Box,
	Button
} from "@material-ui/core";

import ToggleButton from "@material-ui/lab/ToggleButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import "../../components/order/style/orderHistory.scss";
import OrderInformationList from "../../components/order/OrderInformationList";
import { fetchOrderById, changeOrderStatusByBusiness } from "../../api/order";

import ErrorMessage from "../../UI/ErrorMessage";

import { 
	businessRole,
    newOrder, 
    cancelledByClient, 
    accepted, 
    cancelledByBusiness, 
    done 
} from "../../utils/variables";

const listArray = [
	{
		link: "https://www.facebook.com/",
		icon: "fab fa-facebook",
		description: "facebook"
	},
	{
		link: "https://twitter.com/",
		icon: "fab fa-twitter",
		description: "twitter"
	},
	{
		link: "https://www.instagram.com/",
		icon: "fab fa-instagram",
		description: "instagram"
	},
	{
		link: "localhost:3000",
		icon: "fas fa-briefcase",
		description: "and so on"
	}
];


class OrderInformaiton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			role: businessRole,
			order: {},
			error: null,
			isLoading: false,

			selected: false,
			options: '',
			labelWidth: 0
		};

		this.inputLabelRef = React.createRef();
	}

	componentDidMount() {
		const orderId = this.props.match.params.orderId;
		this.loadOrder(orderId);
	}

	loadOrder = orderId => {
		this.setState({ isLoading:true }, () => {
			fetchOrderById(orderId)
				.then(order => this.setState({ order, isLoading: false }))
				.catch(error => this.setState({error}));
		})
	} 
	getButtonText = () => {
		let buttonText;
		if (this.state.order.status === newOrder) {
			buttonText = "Accept Order"
		} else if (this.state.order.status === accepted) {
			buttonText = "Cancel Order"
		}
		return buttonText;
	}

	handleChangeSelected = () => {
		this.setState({ selected: !this.state.selected })
	}

	handleChangeOptions = event => {
		this.setState({ options: event.target.value, 
			labelWidth: this.inputLabelRef.current.offsetWidth
		});
	}
	
	isActive = value => {
		return ((this.state.order.status === value)? "order-information__status-active":"")
	}

	handleChangeStatus = () => {
		let status;
		if (this.state.order.status === newOrder) {
			status = accepted;
		} else if (this.state.order.status === accepted) {
			status = cancelledByBusiness;
		}
		this.setState({}, () => {
			const orderId = this.state.order._id;
			const businessId = this.props.match.params.businessId;
			changeOrderStatusByBusiness(orderId, businessId, status)
				.then(() => this.loadOrder(orderId))
				.catch(error => this.setState({error}));
		});
	}

	render() {
		return (
		<div className="order-information">
			<Grid container className="order-information__top" spacing={2}>
				{!!this.state.error && (
					<ErrorMessage error={this.state.error} />
				)}
				<Grid item xs={8}>
					<div className="order-information__head">
						<ul className="order-information__status">
							<li className={this.isActive(newOrder)}>New</li>
							<li className={this.isActive(cancelledByClient)}>Withdrawn</li>
							<li className={this.isActive(cancelledByBusiness)}>Cancelled</li>
							<li className={this.isActive(accepted)}>Assigned</li>
							<li className={this.isActive(done)}>Completed</li>
						</ul>
						<ToggleButton
							size="small"
							value="follow"
							selected={this.state.selected}
							onChange={this.handleChangeSelected}
						>
							<FavoriteBorderIcon fontSize="small" />
							<p>Follow</p>
						</ToggleButton>
					</div>
					<Typography variant="h4" component="h2">
						House Cleaning
					</Typography>
					<OrderInformationList 
						location={this.state.order.location}
						dueDate={this.state.order.dueDate}
						role={this.state.role}
					/>
					
				</Grid>
				<Grid item xs={4}>
					<Card>
						<CardContent className="order-information__budget">
							<Typography gutterBottom>
								Price
							</Typography>
							<Typography variant="h4" component="p">
								${this.state.order.price}
							</Typography>
						</CardContent>
						<CardActions className="order-information__offer">
							{this.getButtonText() && (
									<Button 
										variant="contained"
										color={"primary"}
										onClick={this.handleChangeStatus}>
										{this.getButtonText()}
									</Button>
								)}
						</CardActions>
					</Card>
					<FormControl
						variant="outlined"
						className="order-information__options"
					>
						<InputLabel
							margin="dense"
							ref={this.inputLabelRef}
							htmlFor="more-options"
						>
							More Options
						</InputLabel>
						<Select
							native
							margin="dense"
							value={this.state.options}
							onChange={this.handleChangeOptions}
							labelWidth={this.state.labelWidth}
							inputProps={{
								name: "options",
								id: "more-options"
							}}
						>
							<option value="" />
							<option value={10}>Ten</option>
							<option value={20}>Twenty</option>
							<option value={30}>Thirty</option>
						</Select>
					</FormControl>
					<Box
						border={1}
						borderRadius={5}
						borderColor="#eee"
						className="order-information__share"
					>
						<InputLabel className="order-information__share--label">
							SHARE
						</InputLabel>
						<div className="order-information__share--whole">
							{listArray.map(list => {
								return (
									<a
										key={list.description}
										href={list.link}
										className="order-information__share--single"
									>
										<i className={list.icon}></i>
									</a>
								);
							})}
						</div>
					</Box>
				</Grid>
			</Grid>
			<div className="order-information__details">
				<Typography variant="h6" component="p">
					DETAILS
				</Typography>
				<ul className="order-information__details--list">
					<li>Number of bedrooms: {this.state.order.bedrooms}</li>
					<li>Number of bathrooms: {this.state.order.bathrooms}</li>
					<li>End-of-lease clean: {this.state.order.endOfLease? "Yes": "No"}</li>
					<li>Oven: {this.state.order.oven? "Yes": "No"}</li>
					<li>Windows: {this.state.order.windows? "Yes": "No"}</li>
					<li>Cabinets: {this.state.order.cabinets? "Yes": "No"}</li>
					<li>Carpet: {this.state.order.carpet? "Yes": "No"}</li>
				</ul>
				<Typography variant="body1" component="p">
					I need dlkalgj aepwgk'ape [apeg[ap aEOihgao ]] jeofiahgiuh
					ioweja owea a aeg aweoig. dlkalgj aepwgk'ape [apeg[ap
					aEOihgao ]] jeofiahgiuh ioweja owea a aeg aweoig. dlkalgj
					aepwgk'ape [apeg[ap aEOihgao ]] jeofiahgiuh ioweja owea a
					aeg aweoig.
				</Typography>
			</div>
		</div>
		)
	}
}

export default OrderInformaiton;
