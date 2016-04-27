'use strict';

export function formatTime(date,format){
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a){
            switch (a) {
                case 'yyyy':
                    return date.substr(0,4);
                    break;
                case 'MM':
                    return date.substr(4,2);
                    break;
                case 'dd':
                    return date.substr(6,2);
                    break;
				case 'mm':
                    return date.substr(8,2);
                    break;
				case 'ss':
                    return date.substr(10,2);
                    break;
            }
        })
};
