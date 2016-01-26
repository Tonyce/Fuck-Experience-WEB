
'use strict';

let __instance = (function () {
	let instance;
	return (newInstance) => {
		if (newInstance) instance = newInstance;
		return instance;
	}
}());

class UserInfo {
	constructor(userName, userImage) {
		if (__instance()) return __instance();
		
		this.userName = userName;
		this.userImage = userImage;
		__instance(this);
	}
}

export default UserInfo