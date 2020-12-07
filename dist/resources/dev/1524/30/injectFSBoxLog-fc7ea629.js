import{y as s,j as n,i as t,o as a,h as o,b as e,B as f,bc as i,V as c,W as r,bX as l,J as b}from"./calfSystem-54df10e3.js"
import{g as m,s as h}from"./idb-7f0d2b39.js"
import{c as x}from"./createSpan-f01d3abc.js"
function p(n){let t=function(s){return s||""}(n)
const a=b("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function d(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(c,u),o(n,c)}function g(){const t=s("minibox-fsbox")
n()&&t&&d(t)}export default g
//# sourceMappingURL=injectFSBoxLog-fc7ea629.js.map
