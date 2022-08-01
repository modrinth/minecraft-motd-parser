Object.defineProperty(exports,"__esModule",{value:!0});const s=require("./utils"),l={"§k":"obfuscated;","§l":"font-weight: bold;","§m":"text-decoration: line-through;","§n":"text-decoration: underline;","§o":"font-style: italic;","§r":"color: inherit;text-decoration: none !important;font-weight:normal!important;font-style: normal!important;"},F={bold:"font-weight: bold;",italic:"font-style: italic;",underlined:"text-decoration:underline;",strikethrough:"text-decoration: line-through;",obfuscated:"mc_obfuscated;",reset:"color: inherit;text-decoration: none !important;font-weight:normal!important;font-style: normal!important;"},i={"§k":"obfuscated","§l":"bold","§m":"strikethrough","§n":"underlined","§o":"italic","§r":""},f={"§0":"#000000","§1":"#0000AA","§2":"#00AA00","§3":"#00AAAA","§4":"#AA0000","§5":"#AA00AA","§6":"#FFAA00","§7":"#AAAAAA","§8":"#555555","§9":"#5555FF","§a":"#55FF55","§b":"#55FFFF","§c":"#FF5555","§d":"#FF55FF","§e":"#FFFF55","§f":"#FFFFFF"},c={black:"#000000",dark_blue:"#0000AA",dark_green:"#00AA00",dark_aqua:"#00AAAA",dark_red:"#AA0000",dark_purple:"#AA00AA",gold:"#FFAA00",gray:"#AAAAAA",dark_gray:"#555555",blue:"#5555FF",green:"#55FF55",aqua:"#55FFFF",red:"#FF5555",light_purple:"#FF55FF",yellow:"#FFFF55",white:"#FFFFFF"};function u(t){let e=t;t=new RegExp(/([§][0-9a-fA-FklmnorFKLMNOR])/g.source);const r=e.split(t);let o="",n="",a="";return r.forEach((e,t)=>{var r=e.toLowerCase();if(f.hasOwnProperty(r))n=f[r];else if(l.hasOwnProperty(r))o=l[r];else{let t="";r=e;""!==n&&(t=`color:${n};`),""!==r&&(r=(0,s.htmlStringFormatting)(r),0!==t.length||0!==o.length?a+=`<span style="${t}${o}">${r}</span>`:a+=r)}}),a}function e(t){let e=t;t=new RegExp(/([§][0-9a-f0-9a-fA-FklmnorFKLMNOR])/g.source);const r=e.split(t);let o="",n="",a={text:"",extra:[]},l=(r.forEach(e=>{var t=e.toLowerCase();if(f.hasOwnProperty(t))n=f[t];else if(i.hasOwnProperty(t))o=i[t];else{let t={text:"",extra:[]};""!==o&&(t[o]=!0),t.text=e,""!==n&&(t.color=n),"object"==typeof a.extra&&a.extra.push(t)}}),[]);return a.extra&&(1<a.extra.length?a.extra.forEach((t,e)=>{""===t.text?a.extra&&"object"==typeof a.extra[e+1]&&l.push(Object.assign(Object.assign({},t),a.extra[e+1])):t.text!==(l[l.length-1]&&l[l.length-1].text)&&l.push(t)}):l.push(a.extra[0])),l=l.filter(t=>""!==t.text),{text:a.text,extra:l}}function A(t){let e="",r="",o="";for(var n of Object.keys(t))if(n=n.toLowerCase(),F.hasOwnProperty(n))t[n]&&(o+=""+F[n]);else if("text"!==n||"string"!=typeof t.text&&"number"!=typeof t.text){if("color"===n){var a=t[n];if("string"==typeof a){if(c.hasOwnProperty(a)){r=`color: ${c[a]};`;continue}if(f.hasOwnProperty(a)){r=`color: ${f[a]};`;continue}r=`color: ${a};`;continue}}if("extra"===n&&"object"==typeof t.extra)for(var l of t.extra)(0,s.isMotdJSONType)(l)&&(e+=A(l))}else e+=u(String(t.text));let i="";return i=0!==o.length||0!==r.length?`<span style="${r+o}">${e}</span>`:e}function r(t){return A(JSON.parse(JSON.stringify(t)))}exports.default={cleanTags:function(t){return t.replace(/(?:§)([0-9a-fA-FklmnorFKLMNOR])/g,"")},textToHTML:u,textToJSON:e,JSONToHtml:A,jsonRender:r,autoToHtml:function(t){return"object"==typeof t?r(t):"string"==typeof t?r(e(t)):"unknown motd data type"}};