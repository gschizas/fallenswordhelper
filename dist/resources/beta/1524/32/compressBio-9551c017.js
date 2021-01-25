import{c as e}from"./createInput-538cc410.js"
import{c as t}from"./createLabel-0085779f.js"
import{y as o,f as s,t as r,V as a}from"./calfSystem-26bcf570.js"
import{i as n}from"./insertElementBefore-aa28f497.js"
function c(o){o.parentNode.classList.add("fshCompressor"),function(t){const o=n(e({id:"fshCompressToggle",type:"checkbox"}),t)
s(o,"change",r(a,"bio","toggle"))}(o),n(t({className:"sendLink",htmlFor:"fshCompressToggle"}),o)}function f(){const e=o("profile-bio")
e&&e.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(e)>10&&c(e)}export default f
//# sourceMappingURL=compressBio-9551c017.js.map
