import{y as e,f as t,t as o,V as s}from"./calfSystem-38898f3e.js"
import{c as r}from"./createInput-c92705dc.js"
import{c as n}from"./createLabel-b51e565d.js"
import{i as a}from"./insertElementBefore-2ad05963.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const n=a(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(n,"change",o(s,"bio","toggle"))}(e),a(n({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function i(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}export default i
//# sourceMappingURL=compressBio-40a61e46.js.map
