"use strict"

import mainAction from '../actions/mainAction';
import topicAction from '../actions/topicAction';

class WebAPI {

	constructor() {

	}

	login(url, callback) {
		const req = new XMLHttpRequest()
		req.onload = function () {
			let data = ""
			if (req.status === 404) {
				
			} else {
				data = req.response;
			}
			callback(data);
		}
		req.open("GET", url);
		req.send("");
	}

	//topic
	loadTopicData(url, method, body) {
		const req = new XMLHttpRequest()
		req.onload = function () {
			let data = ""
			if (req.status === 404) {
				
			} else {
				data = req.response;
			}

			data = JSON.parse(data);
			console.log(url);
			if (/\?/.test(url)) {	
				console.log("testdata", data);
				topicAction.receiveMoreData(data);
			}else {
				console.log("data", data);
				topicAction.receiveData(data);
			}
		}
		req.open(method, url)
		req.send(body)
	}

	loadTopic(id) {
		let url = `api/topic/${id}`;
		this.loadData(url, "GET", "", (data) => {
			
			// console.log(data);
			topicAction.receiveTopic(data);
		})
	}

	newTopic(body, callback){
		// this.loadData("api/newTopic", "POST", body);
		const req = new XMLHttpRequest()
		req.onload = function () {
			let data = ""
			if (req.status === 404) {
				
			} else {
				data = req.response;
			}
			// mainAction.receiveData(data);
			callback(data);
		}
		req.open("POST", "api/topic/new")
		console.log(JSON.stringify(body))
		req.send(JSON.stringify(body));	
	}

	//main
	loadMainData(url, method, body) {
		const req = new XMLHttpRequest()
		req.onload = function () {
			let data = ""
			if (req.status === 404) {
				
			} else {
				data = req.response;
			}
			mainAction.receiveData(data);
		}
		req.open(method, url)
		req.send(body)
	}

	loadData(url, method, body, callback) {
		const req = new XMLHttpRequest()
		req.onload = function () {
			let data = ""
			if (req.status === 404) {
				
			} else {
				data = req.response;
			}
			callback(data)
		}
		req.open(method, url)
		req.send(body)
	}
}

export default new WebAPI()