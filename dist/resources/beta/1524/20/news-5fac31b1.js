import{D as e,p as a,ap as t,f as r,C as s,bw as n,bx as o,G as i,a3 as c,Y as f,b5 as m,B as p}from"./calfSystem-05554bae.js"
import{i as d}from"./insertElementBefore-2ba0b318.js"
import{c as l}from"./createSpan-472d43ae.js"
import{i as h}from"./insertHtmlAfterEnd-1461aee3.js"
import{c as u}from"./createAnchor-8b587d74.js"
import{g as b}from"./getArrayByClassName-4e6df9b6.js"
import{g}from"./getTitle-a484868e.js"
import{p as C}from"./parseDateAsTimestamp-4d374b86.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(g(e)),t=u({href:_(a),target:"_blank"})
d(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function A(e){const a=l({innerHTML:k(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>C(p(e.children[2]))
export default function(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
h(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
h(a,L(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),b("news_body_tavern",a).filter(y).forEach(A)),i("trackLadderReset")&&function(){const e=b("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>i(c)&&f(c,t)}()}
//# sourceMappingURL=news-5fac31b1.js.map
