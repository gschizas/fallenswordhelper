import{y as s,j as n,i as t,o as a,h as o,b as e,B as i,bd as f,V as c,W as r,bZ as l,I as b}from"./calfSystem-9c7241dc.js"
import{g as m,s as h}from"./idb-5f8a9591.js"
import{c as x}from"./createSpan-dd12772b.js"
function d(n){let t=function(s){return s||""}(n)
const a=b("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function p(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function u(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(d),n=i(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${f}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(c,p),o(n,c)}export default function(){const t=s("minibox-fsbox")
n()&&t&&u(t)}
//# sourceMappingURL=injectFSBoxLog-c6607e58.js.map
