'use strict';

export function isEmptyObject (val) {
    if (typeof val === "object" && !(val instanceof Array)) {
        var hasProp = true;
        for (var prop in val) {
            hasProp = false;
            break;
        }
        return hasProp;
    }
}



export function smoothScrollY(obj,time){
	let timer;
	if(timer) {
		clearInterval(timer);
		timer = null;
	}else {
		timer = setInterval((e)=>{
			if(window.scrollTo) {
				window.scrollTo(0,obj.offsetTop)
			}
		},time)
	}
};
