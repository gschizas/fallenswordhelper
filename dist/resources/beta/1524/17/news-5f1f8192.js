import{I as e,p as a,ao as t,f as r,M as s,bC as n,bD as o,D as i,a1 as c,W as f,b6 as m,A as p}from"./calfSystem-02ae8657.js"
import{i as d}from"./insertElementBefore-35d3b41e.js"
import{c as l}from"./createSpan-0a306aad.js"
import{g as h}from"./getArrayByClassName-d2e73c64.js"
import{i as u}from"./insertHtmlAfterEnd-23545b48.js"
import{c as b}from"./createAnchor-7515f2c1.js"
import{g}from"./getTitle-8c8fa922.js"
import{p as C}from"./parseDateAsTimestamp-3e99b4b4.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(g(e)),t=b({href:_(a),target:"_blank"})
d(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function A(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function k(e){const a=l({innerHTML:A(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>C(p(e.children[2]))
export default function(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
u(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
u(a,L(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),h("news_body_tavern",a).filter(y).forEach(k)),i("trackLadderReset")&&function(){const e=h("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>i(c)&&f(c,t)}()}
//# sourceMappingURL=news-5f1f8192.js.map
