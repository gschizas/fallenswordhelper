import{y as s,j as n,i as t,o,h as a,b as e,B as i,bd as f,V as c,W as r,bZ as l,J as b}from"./calfSystem-69dd5601.js"
import{g as m,s as h}from"./idb-874fe815.js"
import{c as x}from"./createSpan-71b557d6.js"
function d(n){let t=function(s){return s||""}(n)
const o=b("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(o)<0&&(t=`<br>${o}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function p(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function u(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(d),n=i(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${f}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
o(c,p),a(n,c)}function g(){const t=s("minibox-fsbox")
n()&&t&&u(t)}export default g
//# sourceMappingURL=injectFSBoxLog-4350d740.js.map
