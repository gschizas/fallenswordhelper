import{y as e,f as t,t as o,V as s}from"./calfSystem-69dd5601.js"
import{c as r}from"./createInput-31301338.js"
import{c as n}from"./createLabel-76355438.js"
import{i as a}from"./insertElementBefore-286ff14c.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const n=a(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(n,"change",o(s,"bio","toggle"))}(e),a(n({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function f(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}export default f
//# sourceMappingURL=compressBio-dd6acf8b.js.map
