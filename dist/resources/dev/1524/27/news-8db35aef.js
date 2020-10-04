import{D as e,p as a,au as t,h as r,C as s,bx as n,by as o,H as c,a7 as i,_ as f,ba as m,B as p}from"./calfSystem-ec5e5725.js"
import{i as d}from"./insertElementBefore-543d9ef0.js"
import{c as l}from"./createSpan-a26e8f7c.js"
import{c as h}from"./createAnchor-6c69fd12.js"
import{g as u}from"./getArrayByClassName-bb31bc41.js"
import{g as b}from"./getTitle-c1f063e1.js"
import{i as g}from"./insertHtmlAfterEnd-01ce7acd.js"
import{p as C}from"./parseDateAsTimestamp-2287985e.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function _(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function j(e){return`${t}creatures&search_name=${e}`}function y(e){const a=encodeURIComponent(b(e)),t=h({href:j(a),target:"_blank"})
d(t,e),r(t,e)}function w(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=_(j(a[2]),a[2]),a[4]=_((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function A(e){const a=l({innerHTML:k(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>C(p(e.children[2]))
function T(){c("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
g(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
g(a,L(o,"News"))}(),c("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(y),u("news_body_tavern",a).filter(w).forEach(A)),c("trackLadderReset")&&function(){const e=u("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>c(i)&&f(i,t)}()}export default T
//# sourceMappingURL=news-8db35aef.js.map
