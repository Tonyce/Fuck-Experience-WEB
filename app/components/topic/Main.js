
"use strict";

import React from 'react';
import {render} from 'react-dom';
import Card from '../Card';

import mainStore from '../../stores/mainStore';
import mainAction from '../../actions/mainAction';

import topicStore from '../../stores/topicStore';
 

class TopicItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			id: props.topic
		}
	}

	openTopic(event) {
		// alert(`openTopic ${this.state.id}`);
		topicStore.openTopic("open");
		// console.log("openTopic")
		// let rect = event.target.getBoundingClientRect();
		// console.log(rect);
		// console.log(event.target.clientWidth);
		// console.log(event.target.clientHeight);
		// console.log(event.target.scrollTop);
		// console.log(event.target.scrollLeft);
		// alert(`${event.pageX}, ${event.pageY}`)
		if (this.props.openTopic) {
			this.props.openTopic(event);
		}
	}

	render() {
		return (
			<div className="topic flex-layout h-center" onClick={(event)=>this.openTopic(event)}>
				{this.props.topic}
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
			topics: [1,2,3,4,5,6,7],
			topicStyle: {},
			animateTopic: "topicA",
			cardDisplay: "block"
		}
	}

	componentDidMount() {
		// console.log("about didMount")
		
		mainStore.addChangeListener( this._onChange );
	}

	componentWillUnmount() {
		// console.log("about WillUnmount")
	    mainStore.removeChangeListener( this._onChange );
	}
	_onChange() {

		let aboutContent = mainStore.getMainData();
		aboutContent = JSON.parse(aboutContent);

		let cardContent = aboutContent.card;
		
		this.setState({ 
			card: cardContent
		}); 
	}

	openTopic(event) {
		// console.log(event);
		let rect = event.target.getBoundingClientRect();
		// console.log(rect);
		this.rect = rect;
		let topicStyle = {
			left: rect.left - 20,
			top: rect.top + document.body.scrollTop
		}

		this.setState( {
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
				cardDisplay: "none"
			})
		}, 300)

	}

	closeTopic() {
		topicStore.openTopic("close");
		let rect = this.rect
		this.setState( {
			topicStyle: {
				left: rect.left - 20,
				top: rect.top + document.body.scrollTop
			},
			cardDisplay: "block",
			animateTopic: "topicA"
		})

		let hidenTimer = setTimeout( () => {
			clearTimeout(hidenTimer)
			this.setState( {
				topicStyle: {
					left: rect.left - 20,
					top: rect.top + document.body.scrollTop
				}
			})
		}, 300)
	}

	newTopic() {
		alert("newTopic");
	}

	render() {
		return (
			<div>
				<div className="card" style={{display:this.state.cardDisplay}}>
					<div className="flex-layout h-center v-between">
						<h3>大家都在说</h3>
						<a onClick={(event) => this.newTopic(event) }>发布话题</a>
					</div>
					<div className="topics">
						{this.state.topics.map((item, i) => {
							return <TopicItem topic={item} key={i} openTopic={(event) => this.openTopic(event) }/>
						})}
					</div>
					<div className="flex-layout h-center">
						<a>MORE>></a>
					</div>
				</div>
				<div style={this.state.topicStyle} 
					className={this.state.animateTopic}
					onClick={ (e) => this.closeTopic(e) }>
					topic
				</div>
			</div>
		);
	}
}

export default Main