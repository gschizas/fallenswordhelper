import{D as e,p as a,ap as t,h as r,C as s,bp as n,bq as o,H as i,a3 as c,Y as f,b2 as m,B as p}from"./calfSystem-57628ebe.js"
import{i as d}from"./insertElementBefore-7e0a7ce8.js"
import{c as l}from"./createSpan-4a052a9f.js"
import{c as h}from"./createAnchor-e1a9e7aa.js"
import{g as u}from"./getArrayByClassName-b9f9e51c.js"
import{g as b}from"./getTitle-3fefd696.js"
import{i as g}from"./insertHtmlAfterEnd-5ac4fa8d.js"
import{p as C}from"./parseDateAsTimestamp-a0fe37ba.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(b(e)),t=h({href:_(a),target:"_blank"})
d(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function A(e){const a=l({innerHTML:k(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>C(p(e.children[2]))
function T(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
g(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
g(a,L(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),u("news_body_tavern",a).filter(y).forEach(A)),i("trackLadderReset")&&function(){const e=u("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>i(c)&&f(c,t)}()}export default T
//# sourceMappingURL=news-6addefee.js.map
