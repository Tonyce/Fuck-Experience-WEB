
"use strict";

import React from 'react';
import {render} from 'react-dom';

import topicStore from '../../stores/topicStore';

class Info extends React.Component {

	constructor() {
		super();
	}

	componentDidMount() {

		let {query} = this.props.location;
		// console.log(query)
		let title = query.title
		topicStore.changeHeader(title);
	}

	componentWillUnmount() {
		topicStore.changeHeader("Topic");
	}

	render() {
		return (
			<div className="card">
				info
			</div>
		);
	}
}

export default Info