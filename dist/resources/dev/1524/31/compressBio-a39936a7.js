import{c as e}from"./createInput-f7e07c00.js"
import{c as t}from"./createLabel-d7669076.js"
import{y as o,f as s,t as r,V as n}from"./calfSystem-393ab895.js"
import{i as a}from"./insertElementBefore-43970b1f.js"
function c(o){o.parentNode.classList.add("fshCompressor"),function(t){const o=a(e({id:"fshCompressToggle",type:"checkbox"}),t)
s(o,"change",r(n,"bio","toggle"))}(o),a(t({className:"sendLink",htmlFor:"fshCompressToggle"}),o)}function f(){const e=o("profile-bio")
e&&e.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(e)>10&&c(e)}export default f
//# sourceMappingURL=compressBio-a39936a7.js.map
