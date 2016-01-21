
"use strict";

import React from 'react';
import {render} from 'react-dom';
import Card from '../Card'

import mainStore from '../../stores/mainStore';
import mainAction from '../../actions/mainAction';

class Main extends React.Component {

	constructor(props) {
		super(props);
		this._onChange = this._onChange.bind(this);
		this.state = {
			card: ""
		}
		// console.log("about card")
	}

	componentDidMount() {
		// console.log("about didMount")
		const { item } = this.props.params
		mainStore.addChangeListener( this._onChange );
    	mainAction.loadScheduleData(`${item}`);
	}

	componentWillUnmount() {
		// console.log("about WillUnmount")
	    mainStore.removeChangeListener( this._onChange );
	}

	_onChange() {
		let scheduleContent = mainStore.getMainData();
		scheduleContent = JSON.parse(scheduleContent);

		let cardContent = scheduleContent.card;
		
		this.setState({ 
			card: cardContent
		}); 
	}

	render() {
		// const { item } = this.props.params
		// console.log(item)
		return (
			<div>
				<Card>
					{this.state.card}
				</Card>

				<div className="schedule">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Main