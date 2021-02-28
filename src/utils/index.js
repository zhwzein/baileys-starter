const chalk = require('chalk')
const axios = require('axios')
const moment = require('moment-timezone')
// set time settings
moment.tz.setDefault('Asia/Jakarta').locale('id')

// to know the processing time
const processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

// to check if this is the url
const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

// helper for colors
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

// check for empty variables
const isEmpty = (variable) => {
    return variable === null || variable.match(/^ *$/) !== null
}

// 
const getBuffer = async (url, options) => {
    try {

        options ? options : {}
        const res = axios({
            method: "GET",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })

        return res.data

    } catch (err) {
        console.error(color('[ERR]', 'red'), err)
    }
}

// formatting time
const formatTime = (seconds) => {
    const pad = (s) => {
        return (s < 10 ? '0' : '') + s
    }

    let hours = hours = Math.floor(seconds / (60 * 60)),
        minutes = Math.floor(seconds % (60 * 60) / 60),
        seconds = Math.floor(seconds % 60)

    return `${pad(hours)} hour(s) ${pad(minutes)} minute(s) ${pad(seconds)} second(s)`
}

module.exports = {
    moment,
    processTime,
    isUrl,
    color,
    isEmpty,
    getBuffer,
    formatTime
}