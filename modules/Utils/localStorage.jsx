'use strict';

/**
 * 常用LocalStorage操作
 */

/**
 * 判断对象val 是否等于 {}
 * @param val
 * @returns {boolean}
 */
export function setLocalStorage (name,value) {
    if(localStorage && localStorage.setItem && JSON && JSON.stringify){
        localStorage.setItem(name,JSON.stringify(value));
    }else{
        return false;
    }
}
export function getLocalStorage (name) {
    if(localStorage && localStorage.getItem && JSON && JSON.parse){
        let temp = localStorage.getItem(name);
        let data = {};
        data = JSON.parse(temp)
        return data;
    }else{
        return false;
    }

}
