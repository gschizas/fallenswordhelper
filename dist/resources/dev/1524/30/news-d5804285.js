import{D as e,p as a,at as t,h as r,C as s,bw as n,bx as o,H as i,a6 as c,Z as f,b9 as m,B as p}from"./calfSystem-54df10e3.js"
import{i as d}from"./insertElementBefore-1b96a575.js"
import{c as l}from"./createSpan-f01d3abc.js"
import{c as h}from"./createAnchor-1e22829c.js"
import{g as u}from"./getArrayByClassName-1306b7b7.js"
import{g as b}from"./getTitle-24a55fc7.js"
import{i as g}from"./insertHtmlAfterEnd-a9fec142.js"
import{p as C}from"./parseDateAsTimestamp-c381ef9a.js"
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
//# sourceMappingURL=news-d5804285.js.map
