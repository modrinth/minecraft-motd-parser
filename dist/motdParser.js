"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.motdParser=void 0;const utils_1=require("./utils"),extras={"\xa7k":"obfuscated;","\xa7l":"font-weight: bold;","\xa7m":"text-decoration: line-through;","\xa7n":"text-decoration: underline;","\xa7o":"font-style: italic;","\xa7r":"color: inherit;text-decoration: none !important;font-weight:normal!important;font-style: normal!important;"},extraFontStyles={bold:"font-weight: bold;",italic:"font-style: italic;",underline:"text-decoration:underline;",strikethrough:"text-decoration: line-through;",obfuscated:"mc_obfuscated;",reset:"color: inherit;text-decoration: none !important;font-weight:normal!important;font-style: normal!important;"},textToJsonExtras={"\xa7k":"obfuscated","\xa7l":"bold","\xa7m":"strikethrough","\xa7n":"underline","\xa7o":"italic","\xa7r":"","\xa7K":"obfuscated","\xa7L":"bold","\xa7M":"strikethrough","\xa7N":"underline","\xa7O":"italic","\xa7P":""},colorCodeToHex={"\xa70":"#000000","\xa71":"#0000AA","\xa72":"#00AA00","\xa73":"#00AAAA","\xa74":"#AA0000","\xa75":"#AA00AA","\xa76":"#FFAA00","\xa77":"#AAAAAA","\xa78":"#555555","\xa79":"#5555FF","\xa7a":"#55FF55","\xa7b":"#55FFFF","\xa7c":"#FF5555","\xa7d":"#FF55FF","\xa7e":"#FFFF55","\xa7f":"#FFFFFF"},extraColorsToHex={black:"#000000",dark_blue:"#0000AA",dark_green:"#00AA00",dark_aqua:"#00AAAA",dark_red:"#AA0000",dark_purple:"#AA00AA",gold:"#FFAA00",gray:"#AAAAAA",dark_gray:"#555555",blue:"#5555FF",green:"#55FF55",aqua:"#55FFFF",red:"#FF5555",light_purple:"#FF55FF",yellow:"#FFFF55",white:"#FFFFFF"};function cleanTags(a){return a.replace(/(?:§)([0-9a-fA-FklmnorFKLMNOR])/g,"")}function textToHTML(a){let b=new RegExp(/([§][0-9a-fA-FklmnorFKLMNOR])/g.source),c=a.split(b),e="",f="",d="";return c.forEach((g,h)=>{let b=g.toLowerCase();if(colorCodeToHex.hasOwnProperty(b))f=colorCodeToHex[b];else if(extras.hasOwnProperty(b))e=extras[b];else{let c="",a=g;""!==f&&(c=`color:${f};`),""!==a&&(a=(0,utils_1.htmlStringFormatting)(a),0!==c.length||0!==e.length?d+=`<span style="${c}${e}">${a}</span>`:d+=a)}}),d}function parseTextToJSON(c){let d=new RegExp(/([§][0-9a-f0-9a-fA-FklmnorFKLMNOR])/g.source),e=c.split(d),f="",g="",a={text:"",extra:[]};e.forEach(d=>{let b=d.toLowerCase();if(colorCodeToHex.hasOwnProperty(b))g=colorCodeToHex[b];else if(textToJsonExtras.hasOwnProperty(b))f=textToJsonExtras[b];else{let c={text:"",extra:[]};""!==f&&(c[f]=!0),c.text=d,""!==g&&(c.color=g),"object"==typeof a.extra&&a.extra.push(c)}});let b=[];return a.extra&&a.extra.forEach((c,d)=>{""===c.text&&a.extra&&"object"==typeof a.extra[d+1]&&b.push(Object.assign(Object.assign({},c),a.extra[d+1]))}),b=b.filter(a=>""!==a.text),{text:a.text,extra:b}}function parseJSONToHTML(c){let f="",e="",b="";for(let a of Object.keys(c)){if(a=a.toLowerCase(),extraFontStyles.hasOwnProperty(a)){c[a]?b+=`${extraFontStyles[a]}`:"bold"===a?b+="font-weight:normal !important;":"italic"===a?b+="font-style: normal !important;":"underline"===a?b+="text-decoration: none !important;":"strikethrough"===a?b+="text-decoration: line-through !important;":"obfuscated"===a?b+="":b="";continue}if("text"===a&&"string"==typeof c.text){f+=textToHTML(c.text);continue}if("color"===a){let d=c[a];if("string"==typeof d){if(extraColorsToHex.hasOwnProperty(d)){e=`color: ${extraColorsToHex[d]};`;continue}if(colorCodeToHex.hasOwnProperty(d)){e=`color: ${colorCodeToHex[d]};`;continue}e=`color: ${d};`;continue}}if("extra"===a&&"object"==typeof c.extra)for(let g of c.extra)(0,utils_1.isMotdJSONType)(g)&&(f+=parseJSONToHTML(g))}return 0!==b.length||0!==e.length?`<span style="${e+b}">${f}</span>`:f}function jsonEnterRender(a){let b=parseJSONToHTML(JSON.parse(JSON.stringify(a)));return b}function textEnterRender(a){let b=textToHTML(a);return b}function autoToHtml(a){return"object"==typeof a?jsonEnterRender(a):"string"==typeof a?jsonEnterRender(parseTextToJSON(a)):"unknown motd data type"}exports.motdParser={cleanTags,textToHTML,textToJSON:parseTextToJSON,JSONToHtml:parseJSONToHTML,jsonEnterRender,textEnterRender,autoToHtml}