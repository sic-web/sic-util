!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).utils={})}(this,(function(t){"use strict";const e=t=>[Number.parseInt(t.substring(1,3),16),Number.parseInt(t.substring(3,5),16),Number.parseInt(t.substring(5,7),16)],n=(t,e)=>[Math.round(t[0]+(255-t[0])*(1-e)),Math.round(t[1]+(255-t[1])*(1-e)),Math.round(t[2]+(255-t[2])*(1-e))],r=t=>{const e=t?.reduce(((t,e)=>{const n=e?.toString(16)?.padStart(2,"0");return t+n}),"#");return e};t.demo=()=>!0,t.get_multiple_color=(t,o)=>{let u;if(null===t)return t;u="string"==typeof t?e(t):t;const s=n(u,o);return r(s)},t.hex_to_rgb=e,t.reduce_opacity=n,t.rgb_to_hex=r}));
