import{y as s,j as n,i as t,o as a,h as o,b as e,B as i,b7 as c,U as f,V as r,bV as l,J as b}from"./calfSystem-f9a27018.js"
import{g as m,s as h}from"./idb-5c501cd3.js"
import{c as x}from"./createSpan-7dc30d50.js"
function p(n){let t=function(s){return s||""}(n)
const a=b("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function u(){f("injectFSBoxLog","injectFsBoxContent"),r(l)}function d(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=i(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${c}${n}">Ignore</a> ]</span> `))}(n)
const f=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(f,u),o(n,f)}function g(){const t=s("minibox-fsbox")
n()&&t&&d(t)}export default g
//# sourceMappingURL=injectFSBoxLog-847cc203.js.map
