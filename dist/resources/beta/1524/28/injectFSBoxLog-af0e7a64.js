import{y as s,j as n,i as t,o as a,h as e,b as o,B as f,b7 as i,U as c,V as r,bV as b,J as l}from"./calfSystem-964f4fc9.js"
import{g as m,s as h}from"./idb-be8b4ca8.js"
import{c as x}from"./createSpan-f18d72eb.js"
function p(n){let t=function(s){return s||""}(n)
const a=l("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(b)}function g(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(c,u),e(n,c)}function d(){const t=s("minibox-fsbox")
n()&&t&&g(t)}export default d
//# sourceMappingURL=injectFSBoxLog-af0e7a64.js.map
