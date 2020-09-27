import{D as a,p as e,ap as t,h as r,C as s,bx as n,by as o,H as i,a3 as c,Y as f,b5 as m,B as p}from"./calfSystem-d3aab5a8.js"
import{i as d}from"./insertElementBefore-286ff14c.js"
import{c as l}from"./createSpan-2f44b58c.js"
import{c as h}from"./createAnchor-6f09e937.js"
import{g as u}from"./getArrayByClassName-c7a1058a.js"
import{g as b}from"./getTitle-d7dce018.js"
import{i as g}from"./insertHtmlAfterEnd-d031a1ae.js"
import{p as C}from"./parseDateAsTimestamp-2f425fab.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(a,e){return`<a href="${a}" target="_blank">${e}</a>`}function _(a){return`${t}creatures&search_name=${a}`}function y(a){const e=encodeURIComponent(b(a)),t=h({href:_(e),target:"_blank"})
d(t,a),r(t,a)}function w(a){return $.test(a.firstChild.nodeValue)}function k(a){const e=a.firstChild.nodeValue.match($)
var r
return e[2]=j(_(e[2]),e[2]),e[4]=j((r=e[4],`${t}realms&search_name=${r}`),e[4]),e.slice(1).join("")}function A(a){const e=l({innerHTML:k(a)})
a.replaceChild(e,a.firstChild)}const L=(a,e)=>`&nbsp;<a href="${a}&page=2">View ${e} Page 2</a>`
const v=a=>m("PvP Ladder",a.children[1]),E=a=>C(p(a.children[2]))
function T(){i("pageTwoLinks")&&function(){const a=s(`#pCC a[href="${n}"]`)
if(!a)return
g(a,L(n,"Updates"))
const e=s(`#pCC a[href="${o}"]`)
g(e,L(o,"News"))}(),i("addUfsgLinks")&&(a('.news_body img[src*="/creatures/"]').forEach(y),u("news_body_tavern",e).filter(w).forEach(A)),i("trackLadderReset")&&function(){const a=u("news_head_tavern",e).filter(v).map(E),t=Math.max.apply(null,a)
t>i(c)&&f(c,t)}()}export default T
//# sourceMappingURL=news-368f5942.js.map
