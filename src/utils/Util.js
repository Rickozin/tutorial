const moment = require('moment')
const abbrev = require("./plugins/abbrev.js");
renderEmoji = require("./plugins/renderEmoji.js");
const momentDurationFormatSetup = require("moment-duration-format")
momentDurationFormatSetup(moment)
moment.locale("pt_br")


module.exports = class Util {
  static toAbbrev(num) {
    return abbrev(num);
  }

  static renderEmoji(ctx, msg, x, y) {
    return renderEmoji(ctx, msg, x, y);
  }
  static discordTime(time = new Date()) {
    let date = time && time instanceof Date ? time : new Date();
    let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `Today at ${hours}:${minutes}`
  }
  static formatTime(time) {
    if(!time) return "00:00";
    const fmt = moment.duration(time).format("dd:hh:mm:ss");
    
    const chunk = fmt.split(":")
    if (chunk.length < 2) chunk.unshift("00");
    return chunk.join(":");
  }
  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  static timeGet(tempo) {
    moment.duration(tempo).format("h [horas] m [minutos] e s [segundos]").replace("minsutos", "minutos")
  }
  static format(tm) {
    moment(tm).format("LLL")
  }
};
