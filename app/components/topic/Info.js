
"use strict";

import React from 'react';
import {render} from 'react-dom';

import topicStore from '../../stores/topicStore';
import topicAction from '../../actions/topicAction';

class Info extends React.Component {

	constructor() {
		super();
		this._onChange = this._onChange.bind(this);
		this.state = {
			topic: {}
		}
	}

	componentDidMount() {
		let {id} = this.props.params;
		let {query} = this.props.location;
		let title = query.title;
		topicStore.changeHeader(title);

		topicStore.addChangeListener("GetTopic", this._onChange);
		// console.log(id);
		topicAction.loadOneTopic(id);
	}

	componentWillUnmount() {
		topicStore.changeHeader("Topic");
		topicStore.removeChangeListener("GetTopic", this._onChange);
	}

	_onChange() {
		let topic = topicStore.getTopic();
		// console.log(topic)
		this.setState( {
			topic: topic
		})
	}

	render() {
		let content = this.state.topic.content ? this.state.topic.content : "";
		return (
			<div className="card">
				{content}
			</div>
		);
	}
}

export default Info