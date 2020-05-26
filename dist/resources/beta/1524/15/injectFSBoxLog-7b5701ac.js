import{x as s,j as n,i as a,o as e,f as t,b as o,a4 as f,A as i,b1 as c,R as l,S as r,b2 as b,F as x,a6 as h}from"./calfSystem-1262535f.js"
import{c as m}from"./createSpan-aa5e4be8.js"
function u(n){let a=function(s){return s||""}(n)
const e=x("message",s("minibox-fsbox"))[0].innerHTML
a.indexOf(e)<0&&(a=`<br>${e}${a}`),a.length>1e4&&(a=a.substring(0,1e4)),h("fsh_fsboxcontent",a)}function p(){l("injectFSBoxLog","injectFsBoxContent"),r(b)}function g(s){const n=s.lastElementChild
a(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(f("fsh_fsboxcontent").then(u),n=i(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${c}${n}">Ignore</a> ]</span> `))}(n)
const l=m({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
e(l,p),t(n,l)}export default function(){const a=s("minibox-fsbox")
n()&&a&&g(a)}
//# sourceMappingURL=injectFSBoxLog-7b5701ac.js.map
