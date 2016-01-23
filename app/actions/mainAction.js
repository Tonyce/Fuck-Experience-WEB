"use strict"

import smallAppDispatcher from '../dispatcher/smallAppDispatcher'

import WebAPI from '../api/WebAPI'


class MainAction {

	loadIndexData() {
		this.loadData("api/index", "GET", "");
	}

	loadTopicData() {
		this.loadData("api/topic", "GET", "");
	}

	loadScheduleData(item) {
		this.loadData(`api/schedule/${item}`, "GET", "");
	}

	loadData(url, method, body) {
		/*
		// could be remove if you don't need loading
		smallAppDispatcher.handleViewAction({
			type: "loadMainData"
		})
		*/
		WebAPI.loadMainData(url, method, body);
	}

	receiveData(data) {
		// console.log("receiveBlogs...", data);
		smallAppDispatcher.handleViewAction({
			type: "receiveMainData",
      		data: data
		})
	}
}

export default new MainAction()