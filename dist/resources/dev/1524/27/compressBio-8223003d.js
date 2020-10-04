import{y as e,f as t,t as o,W as s}from"./calfSystem-ec5e5725.js"
import{c as r}from"./createInput-a9a25c4d.js"
import{c as a}from"./createLabel-de3c44aa.js"
import{i as n}from"./insertElementBefore-543d9ef0.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const a=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(a,"change",o(s,"bio","toggle"))}(e),n(a({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function i(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}export default i
//# sourceMappingURL=compressBio-8223003d.js.map
