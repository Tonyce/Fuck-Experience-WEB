
"use strict";

import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router';
import Card from '../Card';

import mainStore from '../../stores/mainStore';
import mainAction from '../../actions/mainAction';

import topicStore from '../../stores/topicStore';
import WebAPI from '../../api/WebAPI'
 

class TopicItem extends React.Component {

	constructor(props) {
		super(props);
	}

	openTopic(event) {
		// topicStore.openTopic("open");
		// if (this.props.openTopic) {
		// 	this.props.openTopic(event, this.props.topic);
		// }
		<Link to="topic/id" />
	}

	render() {
		let topic = this.props.topic;
		return (
			<div className="topic flex-layout h-center" onClick={(event)=>this.openTopic(event)}>
				<div>{topic.title}</div>
				<div>{topic.authorName}</div>
				<div>{topic.time}</div>
			</div>
		)
	}
}

TopicItem.propTypes = { 
	openTopic: React.PropTypes.func
};

class Main extends React.Component {

	constructor(props) {
		super(props);
		this._onChange = this._onChange.bind(this);
		this.rect = "";
		this.state = {
			topics: [],
			topicStyle: {},
			animateTopic: "topicA",
			cardDisplay: "block",
			topicTitle: "",
			topicContent: "loading",
			titileStyle: {},
			topicOpened: false,
			showTitle: "none"
		}
	}

	componentDidMount() {

		let ATopic = document.getElementById('ATopic');
		ATopic.onscroll = this.topicScroll.bind(this);
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
			card: cardContent,
			topics: topics
		}); 
	}

	topicScroll() {

		// let ATopic = document.getElementById('ATopic');
		// let scrollHeight = ATopic.scrollTop;
		if ( this.state.topicOpened !== true ) {
			return;
		}

		if ( (scrollHeight > 80)  ){
			this.setState( {
				showTitle: "block"
			})
		}else {
			this.setState( {
				showTitle: "none"
			})
		}
	}

	openTopic(event, itemProps) {
		// console.log(itemProps);
		let topicId = itemProps.id;
		console.log(topicId);

		WebAPI.login( `api/topic/${topicId}`, data => {
			let loginObj = {}
			try {
				loginObj = JSON.parse(data)
			}catch(e) {
				alert(e)
			}	
			console.log(loginObj);
			this.setState({
				topicContent: loginObj.content
			})
		})

		let rect = event.target.getBoundingClientRect();
		// console.log(rect);
		this.rect = rect;
		let topicStyle = {
			left: rect.left - 20,
			top: rect.top + document.body.scrollTop
		}

		this.setState( {
			topicOpened: true,
			topicTitle: itemProps.title,
			topicStyle: topicStyle
		})

		let timer = setTimeout(()=> {
			clearTimeout(timer);
			this.setState( {
				topicStyle: {
					left: "",
					top: ""
				},
				animateTopic: "topicA animateTopic"
			})
		}, 10)

		let hidenTimer = setTimeout( () => {
			clearTimeout(hidenTimer)
			this.setState( {
				cardDisplay: "none",
				titileStyle: {
					position: 'fixed',
					boxShadow: '0 2px 5px 0 rgba(0,0,0,.16)'
				}
			})
		}, 300)

	}

	closeTopic() {
		topicStore.openTopic("close");
		let rect = this.rect
		this.setState( {
			topicOpened: false,
			topicStyle: {
				left: rect.left - 20,
				top: rect.top + document.body.scrollTop
			},
			cardDisplay: "block",
			animateTopic: "topicA",
			titileStyle: {}
		})

		let timer = setTimeout( () => {
			clearTimeout(timer)
			this.setState( {
				topicStyle: {
					left: rect.left - 20,
					top: rect.top + document.body.scrollTop
				}
			})
		}, 300)
	}

	newTopic() {
		this.newTopic = true;
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
				<div className="card" style={{display:this.state.cardDisplay}}>
					<div className="flex-layout h-center v-between">
						<h3>大家都在说</h3>
						<Link className="center" to="topic/newTopic">
							发布话题
						</Link>
					</div>
					<div className="topics">
						{topics.map((item, i) => {
							return <TopicItem topic={item} key={i} openTopic={(event, itemProps) => this.openTopic(event, itemProps) }/>
						})}
					</div>
					<div className="flex-layout h-center">
						<a>MORE&nbsp;>></a>
					</div>
				</div>
			</div>
		);
	}
}

export default Main

/*

<div style={this.state.topicStyle}  id="ATopic"  
	className={this.state.animateTopic} >
	<div className="topic-title flex-layout h-center v-between" style={this.state.titileStyle}>
		<div className="flex-layout h-center">

			<img src="https://avatars.githubusercontent.com/u/7351139?v=3" />
			<author>Tonyce</author>

			<h2 style={{display: this.state.showTitle}}>{this.state.topicTitle}</h2>
			
		</div>
		<div className="close-topic" onClick={ (e) => this.closeTopic(e) } >
			X
		</div>
	</div>
	<div className="topic-content">
		{this.state.topicContent}
	</div>
</div>
*/