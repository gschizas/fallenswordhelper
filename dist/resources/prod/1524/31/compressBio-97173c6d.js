import{c as e}from"./createInput-cd4a36ae.js"
import{c as t}from"./createLabel-de7e9c70.js"
import{y as o,f as s,t as r,U as a}from"./calfSystem-7aee5245.js"
import{i as n}from"./insertElementBefore-43970b1f.js"
function c(o){o.parentNode.classList.add("fshCompressor"),function(t){const o=n(e({id:"fshCompressToggle",type:"checkbox"}),t)
s(o,"change",r(a,"bio","toggle"))}(o),n(t({className:"sendLink",htmlFor:"fshCompressToggle"}),o)}function i(){const e=o("profile-bio")
e&&e.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(e)>10&&c(e)}export default i
//# sourceMappingURL=compressBio-97173c6d.js.map
