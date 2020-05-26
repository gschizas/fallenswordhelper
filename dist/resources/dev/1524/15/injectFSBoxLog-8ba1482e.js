import{x as s,j as n,i as a,o as e,f as t,b as o,a5 as f,A as i,b3 as c,S as l,T as r,b4 as b,F as x,a7 as h}from"./calfSystem-ee582533.js"
import{c as m}from"./createSpan-63b97269.js"
function u(n){let a=function(s){return s||""}(n)
const e=x("message",s("minibox-fsbox"))[0].innerHTML
a.indexOf(e)<0&&(a=`<br>${e}${a}`),a.length>1e4&&(a=a.substring(0,1e4)),h("fsh_fsboxcontent",a)}function p(){l("injectFSBoxLog","injectFsBoxContent"),r(b)}function g(s){const n=s.lastElementChild
a(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(f("fsh_fsboxcontent").then(u),n=i(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${c}${n}">Ignore</a> ]</span> `))}(n)
const l=m({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
e(l,p),t(n,l)}export default function(){const a=s("minibox-fsbox")
n()&&a&&g(a)}
//# sourceMappingURL=injectFSBoxLog-8ba1482e.js.map
