import{y as s,j as n,i as t,o as a,h as o,b as e,B as f,b8 as i,U as c,V as r,bW as l,J as b}from"./calfSystem-cf4d22a7.js"
import{g as m,s as h}from"./idb-4798970d.js"
import{c as x}from"./createSpan-7e967fbf.js"
function p(n){let t=function(s){return s||""}(n)
const a=b("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(c,u),o(n,c)}function d(){const t=s("minibox-fsbox")
n()&&t&&g(t)}export default d
//# sourceMappingURL=injectFSBoxLog-9c979b5c.js.map
