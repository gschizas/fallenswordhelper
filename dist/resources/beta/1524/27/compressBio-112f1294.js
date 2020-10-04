import{y as e,f as t,t as o,V as s}from"./calfSystem-70c7a660.js"
import{c as r}from"./createInput-1c8df108.js"
import{c as n}from"./createLabel-5339f796.js"
import{i as a}from"./insertElementBefore-543d9ef0.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const n=a(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(n,"change",o(s,"bio","toggle"))}(e),a(n({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function f(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}export default f
//# sourceMappingURL=compressBio-112f1294.js.map
