
"use strict";

import React from 'react';
import {render} from 'react-dom';

import Card from '../Card'

import topicStore from '../../stores/topicStore';
import topicAction from '../../actions/topicAction';


class Answer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
			animateAnswer: {
			}
		}
	}

	onContentChange(e) {
		this.setState({
    		content: e.target.value
    	})	
	}

	componentWillReceiveProps(nextProps) {
		// console.log("nextProps", nextProps)

		// if (nextProps.showAnswer) {
		// 	this.setState( {
		// 		animateAnswer: {
		// 			minHeight: "100px"
		// 		}
		// 	})	
		// }else {
		// 	this.setState( {
		// 		animateAnswer: {}
		// 	})
		// }
	}

	submit() {
		if (!this.state.content) {
			alert("不能为空");
			return;
		}

		let {toUser, id} = this.props

		let answer = {
			toUser: toUser,
			content: this.state.content,
			topicId: id,
			isAt: this.props.isAt
		}
		// console.log(answer);
		// alert(this.state.content)
		topicAction.answerTopic(answer, (data) => {
			data = JSON.parse(data);
			if (data.ok) {
				this.setState({
		    		content: ""
		    	})
		    	topicAction.loadOneTopic(id);
			}else {
				alert(data.err)
			}
			if (this.props.showAnswer) {
				this.props.showAnswer();
			}
		})
		
	}

	render() {	
		// console.log(this.props)
		// console.log(toUser, topicId);
		return (
			<div className="answer-container">
				<div className="flex-layout" >
					<textarea value={this.state.content} 
						onChange={ (e)=>this.onContentChange(e) } />
				</div>
				<div>
					<a onClick={ () => this.submit() } >
						回复
					</a>
				</div>
			</div>
		);
	}
}

Answer.propTypes = { 
	showAnswer: React.PropTypes.func
};


class AnswerItem extends React.Component {

	constructor() {
		super();
		this.state = {
			showAnswer: {
				display: "none"
			}
		}
	}

	showAnswer() {

		this.setState( {
			showAnswer: {
				display: this.state.showAnswer.display === "none" ? "block" : "none"
			}
		})
	}

	render() {
		// console.log(this.props.answer)
		let answer = this.props.answer;
		let content = answer.content;
		let toUser = answer.toUser;
		let answeror = answer.answeror;
		if (answer.isAt) {
			content = `@ ${toUser.name}   ${content}`;
		}

		return (
			<div className="answer-item">
				<div className="flex-layout h-center">
					<img src={answeror.image} />
					<span>{answeror.name}</span>
					<span>{answer.time}</span>
					<a onClick={ () => this.showAnswer() }>回复</a>
				</div>
				<div>
					<div>
						{content}
					</div>
					<div style={ this.state.showAnswer } className="flex-layout column">
						<Answer toUser={toUser} id={this.props.id} isAt={true} 
							showAnswer={ () => this.showAnswer() } />
					</div>
				</div>
				
			</div>
		)
	}
}

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
		let author = query.author;
			author = JSON.parse(author);
		let obj = {
			title: title,
			author: author.name,
			image: author.image
		}

		topicStore.changeHeader(obj);
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
		this.setState( {
			topic: topic
		})
	}

	render() {
		let content = this.state.topic.content ? this.state.topic.content : "";
		// console.log("Topic", this.state.topic)
		let author = this.state.topic.author;
		let id = this.state.topic._id;
		let answers = this.state.topic.answers || [];
		return (
			<div>
				<div className="card flex-layout column" >
					<div>
						{content}
					</div>

					{answers.map((item, i) => {
						return <AnswerItem id={id} answer={item} key={i} />
					})}
				</div>

				<div className="answer flex-layout column">
					<Answer toUser={author} id={id} isAt={false} />
				</div>
			</div>
		);
	}
}

export default Info