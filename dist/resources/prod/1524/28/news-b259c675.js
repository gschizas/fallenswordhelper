import{D as e,p as a,ap as t,h as r,C as s,bp as n,bq as o,H as i,a3 as f,Y as c,b2 as m,B as p}from"./calfSystem-a5da5210.js"
import{i as d}from"./insertElementBefore-eada6f05.js"
import{c as l}from"./createSpan-8b1ff67f.js"
import{c as h}from"./createAnchor-3e31cf0b.js"
import{g as u}from"./getArrayByClassName-6e0bb75e.js"
import{g as b}from"./getTitle-0292e0c7.js"
import{i as g}from"./insertHtmlAfterEnd-60f61894.js"
import{p as C}from"./parseDateAsTimestamp-5ef6ade0.js"
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
t>i(f)&&c(f,t)}()}export default T
//# sourceMappingURL=news-b259c675.js.map
