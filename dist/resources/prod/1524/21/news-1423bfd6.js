import{D as a,p as e,ap as t,h as r,C as s,bs as n,bt as o,G as i,a3 as c,Y as f,b3 as m,B as p}from"./calfSystem-2741d97b.js"
import{i as d}from"./insertElementBefore-1ac41a54.js"
import{c as l}from"./createSpan-b0f81047.js"
import{c as h}from"./createAnchor-8521bda3.js"
import{g as u}from"./getArrayByClassName-3946388a.js"
import{g as b}from"./getTitle-ce8bfaae.js"
import{i as g}from"./insertHtmlAfterEnd-65ae14da.js"
import{p as C}from"./parseDateAsTimestamp-f8f97be9.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(a,e){return`<a href="${a}" target="_blank">${e}</a>`}function _(a){return`${t}creatures&search_name=${a}`}function w(a){const e=encodeURIComponent(b(a)),t=h({href:_(e),target:"_blank"})
d(t,a),r(t,a)}function y(a){return $.test(a.firstChild.nodeValue)}function k(a){const e=a.firstChild.nodeValue.match($)
var r
return e[2]=j(_(e[2]),e[2]),e[4]=j((r=e[4],`${t}realms&search_name=${r}`),e[4]),e.slice(1).join("")}function A(a){const e=l({innerHTML:k(a)})
a.replaceChild(e,a.firstChild)}const L=(a,e)=>`&nbsp;<a href="${a}&page=2">View ${e} Page 2</a>`
const v=a=>m("PvP Ladder",a.children[1]),E=a=>C(p(a.children[2]))
export default function(){i("pageTwoLinks")&&function(){const a=s(`#pCC a[href="${n}"]`)
if(!a)return
g(a,L(n,"Updates"))
const e=s(`#pCC a[href="${o}"]`)
g(e,L(o,"News"))}(),i("addUfsgLinks")&&(a('.news_body img[src*="/creatures/"]').forEach(w),u("news_body_tavern",e).filter(y).forEach(A)),i("trackLadderReset")&&function(){const a=u("news_head_tavern",e).filter(v).map(E),t=Math.max.apply(null,a)
t>i(c)&&f(c,t)}()}
//# sourceMappingURL=news-1423bfd6.js.map
