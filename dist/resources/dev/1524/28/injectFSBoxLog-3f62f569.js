import{y as s,j as n,i as t,o as a,h as o,b as e,B as i,bc as c,V as f,W as r,bX as l,J as b}from"./calfSystem-b136673a.js"
import{g as m,s as h}from"./idb-c31665cb.js"
import{c as x}from"./createSpan-65142707.js"
function p(n){let t=function(s){return s||""}(n)
const a=b("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function u(){f("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=i(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${c}${n}">Ignore</a> ]</span> `))}(n)
const f=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(f,u),o(n,f)}function j(){const t=s("minibox-fsbox")
n()&&t&&g(t)}export default j
//# sourceMappingURL=injectFSBoxLog-3f62f569.js.map
