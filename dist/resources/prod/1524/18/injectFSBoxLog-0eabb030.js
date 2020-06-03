import{x as s,j as n,i as a,o as t,f as o,b as e,A as i,b7 as f,S as c,T as r,bW as b,F as l}from"./calfSystem-8b6534a5.js"
import{g as m,s as x}from"./idb-abce8d8d.js"
import{c as h}from"./createSpan-a256b285.js"
function p(n){let a=function(s){return s||""}(n)
const t=l("message",s("minibox-fsbox"))[0].innerHTML
a.indexOf(t)<0&&(a=`<br>${t}${a}`),a.length>1e4&&(a=a.substring(0,1e4)),x("fsh_fsboxcontent",a)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(b)}function g(s){const n=s.lastElementChild
a(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=i(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${f}${n}">Ignore</a> ]</span> `))}(n)
const c=h({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
t(c,u),o(n,c)}export default function(){const a=s("minibox-fsbox")
n()&&a&&g(a)}
//# sourceMappingURL=injectFSBoxLog-0eabb030.js.map
