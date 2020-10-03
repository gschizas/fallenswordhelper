import{y as s,j as n,i as t,o as e,h as o,b as a,B as f,bd as i,V as c,W as r,bY as b,J as l}from"./calfSystem-4991bf5b.js"
import{g as m,s as h}from"./idb-ee31c042.js"
import{c as x}from"./createSpan-7856b9fc.js"
function p(n){let t=function(s){return s||""}(n)
const e=l("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(e)<0&&(t=`<br>${e}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(b)}function g(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=a("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
e(c,u),o(n,c)}function d(){const t=s("minibox-fsbox")
n()&&t&&g(t)}export default d
//# sourceMappingURL=injectFSBoxLog-2a13102d.js.map
