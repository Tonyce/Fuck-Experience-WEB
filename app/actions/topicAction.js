"use strict"

import smallAppDispatcher from '../dispatcher/smallAppDispatcher'

import WebAPI from '../api/WebAPI'


class Action {

	
	loadTopicData() {
		this.loadData("api/topic", "GET", "");
	}

	loadTopicMore(lastId) {
		this.loadData(`api/topic?id=${lastId}`, "GET", "");	
	}

	newTopic(body, callback) {
		WebAPI.newTopic(body, callback);
	}

	loadOneTopic(id) {
		WebAPI.loadTopic(id);	
	}

	loadData(url, method, body) {
		WebAPI.loadTopicData(url, method, body);
	}

	receiveData(data) {
		smallAppDispatcher.handleViewAction({
			type: "receiveTopicsData",
      		data: data
		})
	}

	receiveMoreData(data) {
		smallAppDispatcher.handleViewAction({
			type: "receiveTopicsMore",
      		data: data
		})	
	}

	receiveTopic(data) {
		smallAppDispatcher.handleViewAction({
			type: "receiveTopic",
      		data: data
		})		
	}
}

export default new Action()