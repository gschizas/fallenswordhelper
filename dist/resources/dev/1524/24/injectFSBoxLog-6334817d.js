import{y as s,j as n,i as t,o,h as a,b as e,B as f,bd as i,V as c,W as r,bZ as l,J as b}from"./calfSystem-38898f3e.js"
import{g as m,s as h}from"./idb-ccc44752.js"
import{c as x}from"./createSpan-f1b09788.js"
function p(n){let t=function(s){return s||""}(n)
const o=b("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(o)<0&&(t=`<br>${o}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
o(c,u),a(n,c)}function d(){const t=s("minibox-fsbox")
n()&&t&&g(t)}export default d
//# sourceMappingURL=injectFSBoxLog-6334817d.js.map
