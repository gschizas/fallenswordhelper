import{x as s,j as n,i as t,o as a,f as o,b as e,A as i,b9 as f,S as c,T as r,b_ as l,F as b}from"./calfSystem-57340987.js"
import{g as m,s as x}from"./idb-c55e2904.js"
import{c as h}from"./createSpan-14d38ba8.js"
function p(n){let t=function(s){return s||""}(n)
const a=b("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),x("fsh_fsboxcontent",t)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=i(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${f}${n}">Ignore</a> ]</span> `))}(n)
const c=h({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(c,u),o(n,c)}export default function(){const t=s("minibox-fsbox")
n()&&t&&g(t)}
//# sourceMappingURL=injectFSBoxLog-7e666d57.js.map
