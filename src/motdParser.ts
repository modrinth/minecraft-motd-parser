/*
 * minecraft motd parser v1.0.9
 * (c) 2022 Kevin Zheng
 * Released under the MIT license
 */

import {
    extraLibraryType,
    motdJsonType
} from './types';
import { isMotdJSONType, htmlStringFormatting } from './utils';


// color code to font styles
const extras: extraLibraryType = {
    '§k': 'obfuscated;',
    '§l': 'font-weight: bold;',
    '§m': 'text-decoration: line-through;',
    '§n': 'text-decoration: underline;',
    '§o': 'font-style: italic;',
    '§r': 'color: inherit;text-decoration: none !important;font-weight:normal!important;font-style: normal!important;',
};

// json extra font styles
const extraFontStyles: extraLibraryType = {
    'bold': 'font-weight: bold;',
    'italic': 'font-style: italic;',
    'underlined': 'text-decoration:underline;',
    'strikethrough': 'text-decoration: line-through;',
    'obfuscated': 'mc_obfuscated;',
    'reset': 'color: inherit;text-decoration: none !important;font-weight:normal!important;font-style: normal!important;',
};

// text to json extra name
const textToJsonExtras: extraLibraryType = {
    '§k': 'obfuscated',
    '§l': 'bold',
    '§m': 'strikethrough',
    '§n': 'underlined',
    '§o': 'italic',
    '§r': '',
    // 大寫
    '§K': 'obfuscated',
    '§L': 'bold',
    '§M': 'strikethrough',
    '§N': 'underlined',
    '§O': 'italic',
    '§P': ''
};

// base color hex
const colorCodeToHex: extraLibraryType = {
    '§0': '#000000',
    '§1': '#0000AA',
    '§2': '#00AA00',
    '§3': '#00AAAA',
    '§4': '#AA0000',
    '§5': '#AA00AA',
    '§6': '#FFAA00',
    '§7': '#AAAAAA',
    '§8': '#555555',
    '§9': '#5555FF',
    '§a': '#55FF55',
    '§b': '#55FFFF',
    '§c': '#FF5555',
    '§d': '#FF55FF',
    '§e': '#FFFF55',
    '§f': '#FFFFFF',
};

// json extra to hex color
const extraColorsToHex: extraLibraryType = {
    'black': '#000000',
    'dark_blue': '#0000AA',
    'dark_green': '#00AA00',
    'dark_aqua': '#00AAAA',
    'dark_red': '#AA0000',
    'dark_purple': '#AA00AA',
    'gold': '#FFAA00',
    'gray': '#AAAAAA',
    'dark_gray': '#555555',
    'blue': '#5555FF',
    'green': '#55FF55',
    'aqua': '#55FFFF',
    'red': '#FF5555',
    'light_purple': '#FF55FF',
    'yellow': '#FFFF55',
    'white': '#FFFFFF',
};







// clean tags
/** 
 * #### `cleanTags(string)`
 * Clean all tags from motd source string.
 */
function cleanTags(text: string) {
    let REGEX = /(?:§)([0-9a-fA-FklmnorFKLMNOR])/g;
    let textResult = ''

    textResult = text.replace(REGEX, '')

    return textResult
}

// text to html
/** 
 * #### `textToHTML(string)`
 * Convert motd text to html.
 */
function textToHTML(motdString: string) {
    let motdText = motdString
    let colorCodeReg = /([§][0-9a-fA-FklmnorFKLMNOR])/g
    let codeREGEX = new RegExp(colorCodeReg.source)
    let codeSplit = motdText.split(codeREGEX);

    let fontStyle = ''
    let colorHex = ''
    let resultHTML = ''

    codeSplit.forEach((item, index) => {
        let motdStringToLowerCase = item.toLowerCase()

        // 過濾 hex
        if (colorCodeToHex.hasOwnProperty(motdStringToLowerCase)) {

            //console.log(`偵測出 ${ colorCodeToHex[item] }`)
            colorHex = colorCodeToHex[motdStringToLowerCase]

            // 過濾文字 style
        } else if (extras.hasOwnProperty(motdStringToLowerCase)) {
            // font style code 轉換
            //console.log(`偵測出 style ${ extras[item] }`)
            fontStyle = extras[motdStringToLowerCase]
            //console.log('textFont: ' + fontStyle)
            // 正常文字
        } else {
            let resultColor = ''
            let textContent = item
            //console.log(fontStyle)

            // 檢查 Hex color
            if (colorHex !== '') {
                resultColor = `color:${colorHex};`
            }

            if (textContent !== '') {
                //console.log('font: ' + fontStyle)
                //console.log('color: ' + colorHex)
                //console.log('text: ' + item)
                //console.log('---------------------------------')
                // replace html tags
                textContent = htmlStringFormatting(textContent)

                if (resultColor.length !== 0 || fontStyle.length !== 0) {
                    resultHTML += `<span style="${resultColor}${fontStyle}">${textContent}</span>`
                } else {
                    resultHTML += textContent
                }
            }
        }
    })

    return resultHTML
}

// text to json
/** 
 * #### `textToJSON(string)`
 * Convert motd text to JSON.
 */
function parseTextToJSON(text: string) {
    let motdText = text

    // color code regex: /([§][0-9a-fklmnor])/g
    // color hex regex: /^#(?:[0-9a-f]{3}){1,2}$/g
    const colorCodeReg = /([§][0-9a-f0-9a-fA-FklmnorFKLMNOR])/g
    let codeREGEX = new RegExp(colorCodeReg.source)
    let textSplit = motdText.split(codeREGEX);
    let fontStyle = ''
    let colorHex = ''

    let resultObject: motdJsonType = {
        text: "",
        extra: []
    }

    // console.log('textSplit', textSplit);

    textSplit.forEach((item) => {
        let stringToLowerCase = item.toLowerCase();

        // color code 轉換成 hex
        if (colorCodeToHex.hasOwnProperty(stringToLowerCase)) {

            //console.log(`偵測出 ${ colorCodeToHex[item] }`)
            colorHex = colorCodeToHex[stringToLowerCase]
        } else if (textToJsonExtras.hasOwnProperty(stringToLowerCase)) {

            // font style code 轉換
            //console.log(`偵測出 style ${ textToJsonExtras[item] }`)
            fontStyle = textToJsonExtras[stringToLowerCase]
        } else {
            let innerObject: motdJsonType = {
                text: "",
                extra: []
            }

            // 其餘字串
            if (fontStyle !== '') {
                innerObject[fontStyle] = true
            }

            innerObject.text = item;

            if (colorHex !== '') {
                innerObject.color = colorHex
            }

            if (typeof resultObject.extra === 'object') {
                resultObject.extra.push(innerObject)
            }
        }
    })

    // console.log('resultObject', resultObject);

    let newExtra: Array<motdJsonType> = [];
    // console.log('resultObject', resultObject);
    if (resultObject.extra) {
        if (resultObject.extra.length > 1) {
            // if text is '', remove it and merge to next array
            resultObject.extra.forEach((item, index) => {
                let prePushObject: motdJsonType = {
                    text: "",
                    extra: [],
                };

                // console.log('item', item);
                if (item.text === '') {
                    if (resultObject.extra && typeof resultObject.extra[index + 1] === 'object') {
                        prePushObject = {
                            ...item as motdJsonType,
                            ...resultObject.extra[index + 1],
                        }
                    }
                } else {
                    if (item.text !== newExtra[newExtra.length - 1].text) {
                        prePushObject = {
                            ...item as motdJsonType,
                        }
                    }
                }

                newExtra.push(prePushObject);
            });
        } else {
            newExtra.push(resultObject.extra[0] as motdJsonType);
        }
    }
    // console.log('newExtra', newExtra);
    // remove blank content
    // newExtra = newExtra.filter(item => item.text !== '');
    // console.log('newExtra', newExtra);

    return {
        text: resultObject.text,
        extra: newExtra,
    };
}

// json convert to html
/** 
 * #### `JSONToString(string)`
 * Convert JSON to HTML.
 */
function parseJSONToHTML(sourceJson: motdJsonType) {
    let htmlElement = ""
    let colorHex = ""
    let fontStyle = ""

    //console.log(sourceJson)
    for (let key of Object.keys(sourceJson)) {
        // console.log('sourceJson key', key);
        key = key.toLowerCase()

        // text styles
        if (extraFontStyles.hasOwnProperty(key)) {
            if (sourceJson[key]) {
                fontStyle += `${extraFontStyles[key]}`
            }

            // else {
            //     if (key === 'bold') {
            //         fontStyle += `font-weight:normal !important;`;

            //     } else if (key === 'italic') {
            //         fontStyle += `font-style: normal !important;`;

            //     } else if (key === 'underline') {
            //         fontStyle += 'text-decoration: none !important;';

            //     } else if (key === 'strikethrough') {
            //         fontStyle += 'text-decoration: line-through !important;';

            //     } else if (key === 'obfuscated') {
            //         fontStyle += ``
            //     } else {
            //         fontStyle = ""
            //     }
            // }
            continue;
        }

        // text
        if (key === "text") {
            if (typeof sourceJson.text === 'string' || typeof sourceJson.text === 'number') {
                // convert all type to string
                htmlElement += textToHTML(String(sourceJson.text));
                continue;
            }
        }

        // color
        if (key === "color") {
            let colorKey = sourceJson[key]

            if (typeof colorKey === 'string') {
                // Hex color
                if (extraColorsToHex.hasOwnProperty(colorKey)) {
                    colorHex = `color: ${extraColorsToHex[colorKey]};`;
                    continue;
                    // color code
                } else if (colorCodeToHex.hasOwnProperty(colorKey)) {
                    colorHex = `color: ${colorCodeToHex[colorKey]};`;
                    continue;
                    // custom color
                } else {
                    // custom hex color code mode
                    colorHex = `color: ${colorKey};`;
                    continue;
                }
            }
        }

        // exrta
        if (key === "extra" && typeof sourceJson.extra === 'object') {
            //console.log(typeof sourceJson.extra);
            for (let sourceJsonExtra of sourceJson.extra) {
                //console.log(sourceJson.extra)
                if (isMotdJSONType(sourceJsonExtra)) {
                    htmlElement += parseJSONToHTML(sourceJsonExtra);
                }
            }
        }

        //console.log('element: ' + htmlElement)
        //console.log('font: ' + fontStyle)
        //console.log('color: ' + colorHex)
    }

    let returnHTML = ''
    if (fontStyle.length !== 0 || colorHex.length !== 0) {
        returnHTML = `<span style="${colorHex + fontStyle}">${htmlElement}</span>`
    } else {
        returnHTML = htmlElement
    }

    return returnHTML;
}



// JSON full convert include newline
function jsonEnterRender(json: motdJsonType | object) {
    // console.log('json', json);
    const resultMotdHtml = parseJSONToHTML(JSON.parse(JSON.stringify(json)));

    //console.log('motd: ' + resultMotd)
    return resultMotdHtml;
}



// TEXT full convert include newline
function textEnterRender(text: string) {
    const resultMotdHtml = textToHTML(text);

    return resultMotdHtml;
}



/** 
 * ### `autoToHtml(object | string)`
 * auto check data type then convert to html.
 */
function autoToHtml(motd: motdJsonType | string | object): string {
    // 類型檢查
    if (typeof motd === 'object') {
        // 如果類型是物件
        // 將 json 轉換成 html
        //logger.warn('處理模式： Object mode')
        return jsonEnterRender(motd);
    } else if (typeof motd === 'string') {
        //logger.warn('處理模式： String mode')
        return jsonEnterRender(parseTextToJSON(motd));
    } else {
        return 'unknown motd data type';
    }
}



/*
 * #### minecraft motd parser v1.0.9
 * * [github](https://github.com/SnowFireWolf/minecraft-motd-parser/tree/main#minecraft-server-motd-parser)
 * * [npm](https://www.npmjs.com/package/@sfirew/mc-motd-parser)
 * (c) 2022 Kevin Zheng
 * 
 * Released under the MIT license
 */
export const motdParser = {
    // delete all tags
    cleanTags,
    // text convert to HTML
    textToHTML,
    // text convert to JSON
    textToJSON: parseTextToJSON,
    // JSON convert HTML
    JSONToHtml: parseJSONToHTML,
    // JSON full convert HTML (include enter)
    jsonEnterRender,
    // TEXT full convert HTML (include enter)
    textEnterRender,
    // auto check type to convert
    autoToHtml,
};
