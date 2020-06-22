import{D as e,p as a,at as t,h as r,C as s,bz as n,bA as o,G as c,a6 as i,Z as f,ba as d,B as m}from"./calfSystem-4cc738f8.js"
import{i as p}from"./insertElementBefore-dcd1920e.js"
import{c as l}from"./createSpan-273eaa7e.js"
import{c as h}from"./createAnchor-d415ddba.js"
import{g as u}from"./getArrayByClassName-cef24a4c.js"
import{g as b}from"./getTitle-9d3da9f2.js"
import{i as g}from"./insertHtmlAfterEnd-3b4dcf73.js"
import{p as C}from"./parseDateAsTimestamp-adcf08c1.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(b(e)),t=h({href:_(a),target:"_blank"})
p(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function A(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function k(e){const a=l({innerHTML:A(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>d("PvP Ladder",e.children[1]),E=e=>C(m(e.children[2]))
export default function(){c("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
g(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
g(a,L(o,"News"))}(),c("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),u("news_body_tavern",a).filter(y).forEach(k)),c("trackLadderReset")&&function(){const e=u("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>c(i)&&f(i,t)}()}
//# sourceMappingURL=news-1dfb8a75.js.map
