import{y as s,j as n,i as t,o as a,h as o,b as e,B as f,bd as i,V as c,W as r,bZ as l,I as b}from"./calfSystem-9901ad27.js"
import{g as m,s as h}from"./idb-efff97cf.js"
import{c as x}from"./createSpan-b27bc4d5.js"
function p(n){let t=function(s){return s||""}(n)
const a=b("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function d(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(c,u),o(n,c)}export default function(){const t=s("minibox-fsbox")
n()&&t&&d(t)}
//# sourceMappingURL=injectFSBoxLog-f15cdb87.js.map
