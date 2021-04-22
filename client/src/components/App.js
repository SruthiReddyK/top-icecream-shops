import React, { Component } from 'react';
import { CircularProgress, AppBar, Typography } from '@material-ui/core';

import ShopList from './ShopList';

class App extends Component {
	state = {
		shops: [],
		isLoading: true
	}

	render() {
		const { shops, isLoading } = this.state;
		if (isLoading) {
			return (
				<div style={{ height: window.innerHeight }} className="activity-indicator">
					<CircularProgress />
					<Typography>Finding top icecream shops. Please wait..</Typography>
				</div>
			)
		}
		return (
			<div>
				<AppBar className="app-bar" position="fixed" style={{ backgroundColor: 'lightblue', color: 'black' }}>
					<Typography variant="h5">
						Love Icecreams? Here are the Top 5 Icecream shops in Alpharetta
					</Typography>
				</AppBar>
				<ShopList shops={shops} />
			</div>
		)
	}

	componentDidMount() {
		fetch('/api/v1/top-ice-cream-shops')
			.then(response => {
				console.log('response ', response);
				return response.json();
			})
			.then(json => {
				this.setState({
					shops: json,
					isLoading: false
				})
			})
			.catch(e => {
				this.setState({
					isLoading: false
				})
			});
	}
}

export default App;
