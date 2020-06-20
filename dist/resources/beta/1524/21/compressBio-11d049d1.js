import{y as e,f as t,t as o,U as s}from"./calfSystem-89b939c8.js"
import{c as r}from"./createInput-efc68c10.js"
import{c as n}from"./createLabel-e0d7a850.js"
import{i as a}from"./insertElementBefore-08d48547.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const n=a(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(n,"change",o(s,"bio","toggle"))}(e),a(n({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}export default function(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}
//# sourceMappingURL=compressBio-11d049d1.js.map
