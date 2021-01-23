import{c as s}from"./createSpan-f9f70e5d.js"
import{y as n,j as t,i as a,o as e,h as o,b as f,B as i,bh as c,V as r,W as b,bW as l,J as h}from"./calfSystem-393ab895.js"
import{g as m,s as x}from"./idb-46b78b1e.js"
function p(s){let t=function(s){return s||""}(s)
const a=h("message",n("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),x("fsh_fsboxcontent",t)}function u(){r("injectFSBoxLog","injectFsBoxContent"),b(l)}function g(n){const t=n.lastElementChild
a(t,"<br>"),function(s){let n=f("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=i(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${c}${n}">Ignore</a> ]</span> `))}(t)
const r=s({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
e(r,u),o(t,r)}function d(){const s=n("minibox-fsbox")
t()&&s&&g(s)}export default d
//# sourceMappingURL=injectFSBoxLog-18793e18.js.map
