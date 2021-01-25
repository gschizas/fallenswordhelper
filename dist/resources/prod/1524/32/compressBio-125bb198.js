import{c as e}from"./createInput-8791792e.js"
import{c as t}from"./createLabel-1e17e412.js"
import{y as o,f as s,t as r,V as a}from"./calfSystem-45544049.js"
import{i as n}from"./insertElementBefore-aa28f497.js"
function i(o){o.parentNode.classList.add("fshCompressor"),function(t){const o=n(e({id:"fshCompressToggle",type:"checkbox"}),t)
s(o,"change",r(a,"bio","toggle"))}(o),n(t({className:"sendLink",htmlFor:"fshCompressToggle"}),o)}function c(){const e=o("profile-bio")
e&&e.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(e)>10&&i(e)}export default c
//# sourceMappingURL=compressBio-125bb198.js.map
