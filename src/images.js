/*
 * @Author: fz6m
 * @Date: 2020-06-27 16:30:40
 * @LastEditTime: 2020-06-27 23:38:53
 * @Description: 
 */ 

const basePath = 'https://cdn.jsdelivr.net/gh/fz6m/Private-web@20.0/kyaru/kyaru'

let images = []

for(let i = 1; i < 40; i++) {
    if(i == 1) {
        images.push(basePath + '.png')
    } else {
        images.push(basePath + i.toString() + '.png')
    }
}

export default images

