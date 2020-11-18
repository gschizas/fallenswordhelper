import{y as e,f as t,t as o,V as s}from"./calfSystem-02c48ff5.js"
import{c as r}from"./createInput-6ef511c8.js"
import{c as n}from"./createLabel-14fb38bd.js"
import{i as a}from"./insertElementBefore-7e0a7ce8.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const n=a(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(n,"change",o(s,"bio","toggle"))}(e),a(n({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function f(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}export default f
//# sourceMappingURL=compressBio-970dcb6f.js.map
