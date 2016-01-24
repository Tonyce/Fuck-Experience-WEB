
"use strict";

import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, Link } from 'react-router'
import Card from '../Card';

import topicAction from '../../actions/topicAction';
import topicStore from '../../stores/topicStore';
 

class TopicItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let topic = this.props.topic;
		return (
			<div className="topic flex-layout h-center">
				
				<Link to={`topic/${topic.id}`} query={{ title: topic.title }}>{topic.title}</Link>	
				<author>{topic.authorName}</author>
				<div>{topic.time}</div>
			</div>
		)
	}
}


class Main extends React.Component {

	constructor(props) {
		super(props);
		this._onChange = this._onChange.bind(this);
		this.rect = "";
		this.state = {
			topics: topicStore.getTopics()
		}
	}

	componentDidMount() {
		topicStore.addChangeListener("GetTopics", this._onChange );
		if (!this.props.children && (this.state.topics.length < 1)){
			topicAction.loadTopicData();
		}
	}

	componentWillUnmount() {
	    topicStore.removeChangeListener( "GetTopics", this._onChange );
	}

	_onChange() {
		let topics = topicStore.getTopics();
		this.setState({ 
			topics: topics
		}); 
	}

	loadMore() {
		let topicsLen = this.state.topics.length;
		if (topicsLen > 0) {
			let lastTopic = this.state.topics[topicsLen-1];
			let lastId = lastTopic.id;
			topicAction.loadTopicMore(lastId);
		}
	}

	render() {
		let topics = this.state.topics ? this.state.topics : [];

		if (this.props.children) {
			return (
				<div>
					{this.props.children}
				</div>
			)
		}

		return (
			<div>
				<div className="card" >
					<div className="flex-layout h-center v-between">
						<h3>大家都在说</h3>
						<Link className="center" to="topic/newTopic" >
							发布话题
						</Link>
					</div>
					<div className="topics">
						{topics.map((item, i) => {
							return <TopicItem topic={item} key={i} />
						})}
					</div>
					<div className="flex-layout h-center">
						<a onClick={ () => this.loadMore() }>MORE&nbsp;>></a>
					</div>
				</div>
			</div>
		);
	}
}
export default Main
