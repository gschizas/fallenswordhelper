import{I as a,p as e,at as t,f as r,N as s,bF as n,bG as o,D as i,a6 as c,X as f,bb as m,A as p}from"./calfSystem-5545a3e6.js"
import{i as d}from"./insertElementBefore-babbeb6f.js"
import{c as l}from"./createSpan-2a3ac8a5.js"
import{g as h}from"./getArrayByClassName-8790cbe5.js"
import{i as u}from"./insertHtmlAfterEnd-489f5b87.js"
import{c as b}from"./createAnchor-0a460032.js"
import{g}from"./getTitle-f5eb3786.js"
import{p as C}from"./parseDateAsTimestamp-d25abda3.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(a,e){return`<a href="${a}" target="_blank">${e}</a>`}function _(a){return`${t}creatures&search_name=${a}`}function w(a){const e=encodeURIComponent(g(a)),t=b({href:_(e),target:"_blank"})
d(t,a),r(t,a)}function y(a){return $.test(a.firstChild.nodeValue)}function A(a){const e=a.firstChild.nodeValue.match($)
var r
return e[2]=j(_(e[2]),e[2]),e[4]=j((r=e[4],`${t}realms&search_name=${r}`),e[4]),e.slice(1).join("")}function k(a){const e=l({innerHTML:A(a)})
a.replaceChild(e,a.firstChild)}const L=(a,e)=>`&nbsp;<a href="${a}&page=2">View ${e} Page 2</a>`
const v=a=>m("PvP Ladder",a.children[1]),E=a=>C(p(a.children[2]))
export default function(){i("pageTwoLinks")&&function(){const a=s(`#pCC a[href="${n}"]`)
if(!a)return
u(a,L(n,"Updates"))
const e=s(`#pCC a[href="${o}"]`)
u(e,L(o,"News"))}(),i("addUfsgLinks")&&(a('.news_body img[src*="/creatures/"]').forEach(w),h("news_body_tavern",e).filter(y).forEach(k)),i("trackLadderReset")&&function(){const a=h("news_head_tavern",e).filter(v).map(E),t=Math.max.apply(null,a)
t>i(c)&&f(c,t)}()}
//# sourceMappingURL=news-d8613e2e.js.map
