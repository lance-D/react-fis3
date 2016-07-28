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

/**
 *  str 为2015-06-04
 *  格式化  2015年06月04日
 */
export function formatTimeToCN(str,format) {
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a){
        switch (a) {
            case 'yyyy':
                return str.substr(0,4)+'年';
                break;
            case 'MM':
                return str.substr(5,2)+'月';
                break;
            case 'dd':
                return str.substr(8,2)+'日';
                break;
        }
    })
}


/**
 * 拼接URL 参数
 * key=xxxx&key2=xxxxx
 * params={
 *     a:'xxx',
 *     b:'xxx'
 * }
 */
export function getURLParmas(params){
	let a = [],i=0;
	for (var k in params) {
		k ? a[i++] = k + '=' + params[k] : '';
	}
	return a.join('&')
}


/**
 * 自动加...  汉字当成两个算
 * @param str
 * @param len
 * @returns {*}
 */
export function spliceStringByLength (str, len, hasNoDotted) {
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) {
            strlen += 2;
        } else {
            strlen++;
        }
        s += str.charAt(i);
        if (strlen >= len) {
            if (i == (str.length - 1)) {
                return s;
            }
            return s +(hasNoDotted?'':'...');
        }
    }
    return s;
}
