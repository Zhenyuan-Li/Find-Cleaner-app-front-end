import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { CLIENT_BASE_URL } from "./URLMap";
import DashBoard from "../client/DashBoard/DashBoard";
import Account from "../client/ClientSetting/Account/Account";
import Password from "../client/ClientSetting/Password/Password";
import TakeOrder from "../client/Take-Order/TakeOrder";
import Profile from "../client/Profile/UserProfile";
import OrderHistory from "../client/Order-History/OrderHistory";
import OrderInformation from "../components/order/OrderInformation";

const ClientRoutes = () => (
	<Switch>
		<Redirect
			exact
			from="/clients"
			to={`${CLIENT_BASE_URL}/dashboard`}
			component={DashBoard}
		/>
		<Route
			exact
			path={`${CLIENT_BASE_URL}/dashboard`}
			component={DashBoard}
		/>
		<Route exact path={`${CLIENT_BASE_URL}/account`} component={Account} />
		<Route
			exact
			path={`${CLIENT_BASE_URL}/password`}
			component={Password}
		/>
		<Route
			exact
			path={`${CLIENT_BASE_URL}/take-order`}
			component={TakeOrder}
		/>
		<Route exact path={`${CLIENT_BASE_URL}/profile`} component={Profile} />
		<Route
			exact
			path={`${CLIENT_BASE_URL}/order-history`}
			component={OrderHistory}
		/>
		<Route
			exact
			path={`${CLIENT_BASE_URL}/orders/:id`}
			component={OrderInformation}
		/>
	</Switch>
);

export default ClientRoutes;
