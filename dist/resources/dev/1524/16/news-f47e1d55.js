import{I as e,p as a,at as t,f as r,N as s,bF as n,bG as o,D as i,a6 as c,X as f,bb as d,A as m}from"./calfSystem-d49dbbd3.js"
import{i as p}from"./insertElementBefore-5eb6d41d.js"
import{c as l}from"./createSpan-d12a564e.js"
import{g as h}from"./getArrayByClassName-511145a8.js"
import{i as u}from"./insertHtmlAfterEnd-43b283e0.js"
import{c as b}from"./createAnchor-040d02de.js"
import{g}from"./getTitle-bf27450e.js"
import{p as C}from"./parseDateAsTimestamp-526fc279.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(g(e)),t=b({href:_(a),target:"_blank"})
p(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function A(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function k(e){const a=l({innerHTML:A(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>d("PvP Ladder",e.children[1]),E=e=>C(m(e.children[2]))
export default function(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
u(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
u(a,L(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),h("news_body_tavern",a).filter(y).forEach(k)),i("trackLadderReset")&&function(){const e=h("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>i(c)&&f(c,t)}()}
//# sourceMappingURL=news-f47e1d55.js.map
