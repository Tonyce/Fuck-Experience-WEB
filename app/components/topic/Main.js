
"use strict";

import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, Link } from 'react-router'
import Card from '../Card';

import mainStore from '../../stores/mainStore';
import mainAction from '../../actions/mainAction';

import topicStore from '../../stores/topicStore';
 

class TopicItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let topic = this.props.topic;
		// <Link to={{ pathname: `topic/${topic.id}`, query: { showAge: true } }} >Bob With Query Params</Link>
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
			topics: [],
		}
	}

	componentDidMount() {
		mainStore.addChangeListener( this._onChange );
		mainAction.loadTopicData();
	}

	componentWillUnmount() {
	    mainStore.removeChangeListener( this._onChange );
	}

	_onChange() {
		let topicContent = mainStore.getMainData();
			topicContent = JSON.parse(topicContent);
		// console.log(topicContent);
		let cardContent = topicContent.card;
		let topics = topicContent.topics;
		this.setState({ 
			topics: topics
		}); 
	}

	loadMore() {
		alert("loadMore");
		//get last maindata last topic id
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
