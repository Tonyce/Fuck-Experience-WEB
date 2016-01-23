
"use strict";

import React from 'react';
import {render} from 'react-dom';

import topicStore from '../../stores/topicStore';

class New extends React.Component {

	constructor() {
		super();
	}

	goBack() {
		// if ( canGoBack ) window.back();
	 	history.back()
	}

	componentDidMount() {
		topicStore.changeHeader("New Topic");
	}

	componentWillUnmount() {
		topicStore.changeHeader("Topic");
	}

	render() {
		return (
			<div className="card" onClick={ () => this.goBack() }>
				NewTopic
			</div>
		);
	}
}

export default New