import{D as e,p as a,aq as t,h as r,C as s,bq as n,br as o,H as i,a4 as f,Z as c,b3 as m,B as d}from"./calfSystem-3bdf319e.js"
import{i as p}from"./insertElementBefore-543d9ef0.js"
import{c as l}from"./createSpan-a10d5602.js"
import{c as h}from"./createAnchor-2f31a00c.js"
import{g as u}from"./getArrayByClassName-1fb66d0d.js"
import{g as b}from"./getTitle-c1f063e1.js"
import{i as g}from"./insertHtmlAfterEnd-56f50dfb.js"
import{p as C}from"./parseDateAsTimestamp-3b93125b.js"
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
t>i(f)&&c(f,t)}()}export default T
//# sourceMappingURL=news-3c5939bc.js.map
