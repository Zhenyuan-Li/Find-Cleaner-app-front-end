import React from "react";
import { useSpring, animated } from "react-spring";
import house from "../../../assets/images/house.png";
import kitchen from "../../../assets/images/kitchen.png";
import carpet from "../../../assets/images/carpet.png";
import rent from "../../../assets/images/rent.png";
import bathroom from "../../../assets/images/bathroom.png";
import window from "../../../assets/images/window.png";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { BUSINESS_BASE_URL, CLIENT_BASE_URL } from "../../../routes/URLMap";
import { getBusinessId, getClientId } from "../../../utils/auth";
import { isLoggedIn } from "../../../utils/auth";
import { POST_ORDER_AT_HOMEPAGE } from "../../../utils/variables";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(theme =>
	createStyles({
		margin: {
			margin: theme.spacing(1)
		}
	})
);

export default function FloatingActionButtonSize() {
	const props = useSpring({
		opacity: 1,
		from: { opacity: 0 }
	});
	const listArray = [
		{ img: house, alt: "Home Cleaning", description: "Home Cleaning" },
		{
			img: rent,
			alt: "End of Lease Cleaning",
			description: "End of Lease Cleaning"
		},
		{ img: carpet, alt: "Carpet Cleaning", description: "Carpet Cleaning" },

		{
			img: kitchen,
			alt: "Oven Cleaning",
			description: "Oven Cleaning"
		},
		{
			img: bathroom,
			alt: "Bathroom Cleaning",
			description: "Bathroom Cleaning"
		},
		{ img: window, alt: "Window Cleaning", description: "Window Cleaning" }
	];
	const classes = useStyles();
	const loginClient = getClientId();
	const loginBussiness = getBusinessId();
	return (
		<animated.div style={props} className="list-array__container--whole">
			<Grid container spacing={0} className={classes.margin}>
				{listArray.map((list, index) => {
					return (
						<Grid item lg={4} md={6} sm={6} xs={12} key={index}>
							<div className="list-array__container--single">
								<div>
									{loginBussiness && isLoggedIn() ? (
										<Fab
											color="primary"
											className={classes.margin}
											component={Link}
											to={`${BUSINESS_BASE_URL}/${loginBussiness}/browse-order`}
										>
											<img
												src={list.img}
												alt={list.alt}
												className="list-array__icon--single"
											/>
										</Fab>
									) : loginClient && isLoggedIn() ? (
										<Fab
											component={Link}
											to={`${CLIENT_BASE_URL}/${loginClient}`}
											onClick={() => {
												localStorage.setItem(
													POST_ORDER_AT_HOMEPAGE,
													true
												);
											}}
											color="primary"
											className={classes.margin}
										>
											<img
												src={list.img}
												alt={list.alt}
												className="list-array__icon--single"
											/>
										</Fab>
									) : (
										<Fab
											component={Link}
											to={`${CLIENT_BASE_URL}/${loginClient}`}
											onClick={() => {
												localStorage.setItem(
													POST_ORDER_AT_HOMEPAGE,
													true
												);
											}}
											color="primary"
											className={classes.margin}
										>
											<img
												src={list.img}
												alt={list.alt}
												className="list-array__icon--single"
											/>
										</Fab>
									)}
								</div>

								<span>{list.description}</span>
							</div>
						</Grid>
					);
				})}
			</Grid>
		</animated.div>
	);
}
