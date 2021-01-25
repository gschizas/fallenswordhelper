import{c as e}from"./createInput-85638c5e.js"
import{c as t}from"./createLabel-828801e7.js"
import{y as o,f as s,t as r,W as a}from"./calfSystem-19a5d332.js"
import{i as n}from"./insertElementBefore-aa28f497.js"
function c(o){o.parentNode.classList.add("fshCompressor"),function(t){const o=n(e({id:"fshCompressToggle",type:"checkbox"}),t)
s(o,"change",r(a,"bio","toggle"))}(o),n(t({className:"sendLink",htmlFor:"fshCompressToggle"}),o)}function i(){const e=o("profile-bio")
e&&e.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(e)>10&&c(e)}export default i
//# sourceMappingURL=compressBio-628258b6.js.map
