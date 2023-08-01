/*
 * minecraft motd parser
 * (c) 2023 Kevin Zheng
 * Released under the MIT license
 */
import {
  htmlStringFormatting,
  cleanTags,
  cleanHtmlTags,
} from "./utils";
import {
  JSONToHTML,
  textToHTML,
  textToJSON,
  jsonRender,
  autoToHTML,
} from "./parser";





export * from './utils';
export * from "./parser";



/*
 * #### minecraft motd parser
 * * [github](https://github.com/SnowFireWolf/minecraft-motd-parser/tree/main#minecraft-server-motd-parser)
 * * [npm](https://www.npmjs.com/package/@sfirew/minecraft-motd-parser)
 *
 * (c) 2023 Kevin Zheng
 *
 * Released under the MIT license
 */
const motdParser = {
  // text convert to HTML
  textToHTML,
  // text convert to JSON
  textToJSON,
  // JSON convert to HTML
  JSONToHTML,
  // JSON full convert HTML (include enter)
  jsonRender,
  // auto check type to convert
  autoToHTML,

  // utils
  htmlStringFormatting,
  // clean all motd tags
  cleanTags,
  // clean all html tags
  cleanHtmlTags,
};

export default motdParser;
