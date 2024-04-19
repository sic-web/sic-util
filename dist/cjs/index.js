'use strict';

var author = require('./modules/author.js');
var cityOptions = require('./modules/cityOptions.js');
var color = require('./modules/color.js');
var demo = require('./modules/demo.js');
var file = require('./modules/file.js');
var number = require('./modules/number.js');
var system = require('./modules/system.js');
var temporary = require('./modules/temporary.js');
var validation = require('./modules/validation.js');
var window = require('./modules/window.js');



exports.author_strict = author.author_strict;
exports.author_traceId = author.author_traceId;
exports.city_options = cityOptions.city_options;
exports.get_multiple_color = color.get_multiple_color;
exports.hex_to_rgb = color.hex_to_rgb;
exports.reduce_opacity = color.reduce_opacity;
exports.rgb_to_hex = color.rgb_to_hex;
exports.demo = demo.demo;
exports.file_calculate_md5 = file.file_calculate_md5;
exports.num_expand_100 = number.num_expand_100;
exports.num_reduce_100 = number.num_reduce_100;
exports.num_text = number.num_text;
exports.sys_print = system.sys_print;
exports.tem_compare_version = temporary.tem_compare_version;
exports.tem_get_tableHeader = temporary.tem_get_tableHeader;
exports.val_edgeSpace = validation.val_edgeSpace;
exports.val_email = validation.val_email;
exports.val_empty = validation.val_empty;
exports.val_idCard = validation.val_idCard;
exports.val_num = validation.val_num;
exports.val_phone = validation.val_phone;
exports.val_space = validation.val_space;
exports.win_dynamic_fontSize = window.win_dynamic_fontSize;
