import{D as e,p as a,at as t,h as r,C as s,bz as n,bA as o,G as i,a6 as c,Z as f,ba as m,B as d}from"./calfSystem-9901ad27.js"
import{i as p}from"./insertElementBefore-f1fdb06b.js"
import{c as l}from"./createSpan-b27bc4d5.js"
import{c as h}from"./createAnchor-0efcad5e.js"
import{g as u}from"./getArrayByClassName-a5f709cf.js"
import{g as b}from"./getTitle-13ec26f0.js"
import{i as g}from"./insertHtmlAfterEnd-74bf7056.js"
import{p as C}from"./parseDateAsTimestamp-517c1f16.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(b(e)),t=h({href:_(a),target:"_blank"})
p(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function A(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function k(e){const a=l({innerHTML:A(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>C(d(e.children[2]))
export default function(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
g(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
g(a,L(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),u("news_body_tavern",a).filter(y).forEach(k)),i("trackLadderReset")&&function(){const e=u("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>i(c)&&f(c,t)}()}
//# sourceMappingURL=news-e5b4ba85.js.map
