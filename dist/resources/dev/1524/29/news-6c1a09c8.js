import{D as e,p as a,at as t,h as r,C as s,bw as n,bx as o,H as i,a6 as c,Z as f,b9 as m,B as d}from"./calfSystem-02c48ff5.js"
import{i as p}from"./insertElementBefore-7e0a7ce8.js"
import{c as l}from"./createSpan-1a0a0b1a.js"
import{c as h}from"./createAnchor-d707da0a.js"
import{g as u}from"./getArrayByClassName-8897eb0e.js"
import{g as b}from"./getTitle-3fefd696.js"
import{i as g}from"./insertHtmlAfterEnd-b7d6a20f.js"
import{p as C}from"./parseDateAsTimestamp-c157f06b.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(b(e)),t=h({href:_(a),target:"_blank"})
p(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function A(e){const a=l({innerHTML:k(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>C(d(e.children[2]))
function T(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
g(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
g(a,L(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),u("news_body_tavern",a).filter(y).forEach(A)),i("trackLadderReset")&&function(){const e=u("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>i(c)&&f(c,t)}()}export default T
//# sourceMappingURL=news-6c1a09c8.js.map
