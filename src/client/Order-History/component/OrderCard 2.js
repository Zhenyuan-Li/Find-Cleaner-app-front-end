import React from "react";
import { Link } from "react-router-dom";
import { CLIENT_BASE_URL } from "../../../routes/URLMap";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";

import  AddLocationOutlinedIcon  from '@material-ui/icons/AddLocationOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';


import "../style/orderHistory.scss";

const useStyles = makeStyles({
	root: {
        padding: "20px 20px 0",
        marginBottom: "20px",
        borderLeft: "solid 5px rgb(112, 168, 112)"
	},
	card_container: {
		borderBottom: "solid 2px lightgrey"
	},
	media: {
		height: 70
	},
	price: {
		fontWeight: 500
	},
	card_title: {
		fontWeight: 500
	}
});

export default function OrderCard() {
	const classes = useStyles();

	return (
		<CardActionArea component={Link} to={`${CLIENT_BASE_URL}/order-history/orderId`}>
		{/* <CardActionArea> */}
			<Card className={classes.root}>
				<Grid container className={classes.card_container} spacing={2}>
					<Grid item xs={9}>
						<Typography
							className={classes.card_title}
							gutterBottom
							variant="h5"
							component="h2"
						>
							House Cleaning
						</Typography>
						<div>
							<ul className="order-card__list">
								<li>
									<AddLocationOutlinedIcon />
									<span>116 Adelaide St, Brisbane City</span>
								</li>
								<li>
									<DateRangeOutlinedIcon />
									<span>Sat, 15 Feb</span>
								</li>
							</ul>
						</div>
					</Grid>
					<Grid className="order-card__right" item xs={3}>
						<Typography
							className={classes.price}
							gutterBottom
							variant="h4"
							component="h2"
						>
							$180
						</Typography>
						<Avatar className="order-card__avatar" alt="user1" src="/1.jpg" />
					</Grid>
				</Grid>
				<p className="order-card__status">OPEN</p>
			</Card>
		{/* </Link> */}
		</CardActionArea>
	);
}
