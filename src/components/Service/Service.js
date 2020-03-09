import React, { Component } from "react";
import MainNavigation from "../../navigation/MainNavigation";
import ListArray from "../../client/DashBoard/components/ListArray";
import "./style/service.scss";

class Service extends Component {
	render() {
		return (
			<React.Fragment>
				<MainNavigation />
				<div className="service__container--whole">
					<h3 className="service__header--top">Service Categories</h3>
					<span className="service__paragraph--title">
						Choose a service you need ...
					</span>
					<p className="service__paragraph--content">
						To-do list never getting shorter? Take the burden off
						and find the help you need on Broomer.
					</p>

					<ListArray />
				</div>
			</React.Fragment>
		);
	}
}

export default Service;
