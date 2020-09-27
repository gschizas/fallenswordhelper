import{D as e,p as a,at as t,h as r,C as s,bz as n,bA as o,H as i,a6 as c,Z as f,ba as m,B as d}from"./calfSystem-69dd5601.js"
import{i as p}from"./insertElementBefore-286ff14c.js"
import{c as l}from"./createSpan-71b557d6.js"
import{c as h}from"./createAnchor-e92f73d4.js"
import{g as u}from"./getArrayByClassName-0f29c742.js"
import{g}from"./getTitle-d7dce018.js"
import{i as C}from"./insertHtmlAfterEnd-df8843e7.js"
import{p as b}from"./parseDateAsTimestamp-02f5c147.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(g(e)),t=h({href:_(a),target:"_blank"})
p(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function A(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function k(e){const a=l({innerHTML:A(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>b(d(e.children[2]))
function T(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
C(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
C(a,L(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),u("news_body_tavern",a).filter(y).forEach(k)),i("trackLadderReset")&&function(){const e=u("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>i(c)&&f(c,t)}()}export default T
//# sourceMappingURL=news-51342e59.js.map
