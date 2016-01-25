
"use strict";

import React from 'react';
import {render} from 'react-dom';

import topicStore from '../../stores/topicStore';
import topicAction from '../../actions/topicAction';

class New extends React.Component {

	constructor() {
		super();
		this.state = {
			title: "",
			content: "",
			submiting: false
		}
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

	onTitleChange (e) {
    	this.setState({
    		title: e.target.value
    	})
  	}

  	onContentChange (e) {
    	this.setState({
    		content: e.target.value
    	})
  	}

	submitTopic() {
		// console.log(this.state.title, this.state.content);
		if (this.state.title && this.state.content && !this.state.submiting){
			this.setState( {
				submiting: true
			})
			let body = {
				title: this.state.title,
				content: this.state.content
			}
			topicAction.newTopic(body, (data) => {
				data = JSON.parse(data)
				if (data.ok) {
					alert("ok")
					this.setState( {
						title: "",
						content: ""
					})
				}else {
					alert("err")
				}
				this.setState( {
					submiting: false
				})
			})
		}else {
			if (this.state.submiting) {
				alert("提交中请稍后。。。")
			}else {
				alert("不能为空")
			}
		}
	}

	render() {
		return (
			<div className="card flex-layout column" >
				<div className="close flex-layout center" onClick={ () => this.goBack() }>
					<div className="flex-layout center">X</div>
				</div>
				<div className="flex-layout h-center">
					<input autofocus placeholder="标题" 
						onChange={ (e)=>this.onTitleChange(e) } 
						value={this.state.title}/>
				</div>
				<div className="flex-layout">
					<textarea value={this.state.content}
						onChange={ (e)=>this.onContentChange(e) } />
				</div>
				<div>
					<div className="btn"
					 	onClick={ () => this.submitTopic() }>submit</div>
				</div>
			</div>
		);
	}
}

export default New