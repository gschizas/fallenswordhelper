import{I as e,p as a,at as t,f as r,N as s,bE as n,bF as o,D as c,a6 as i,X as f,bb as m,A as d}from"./calfSystem-1c103624.js"
import{i as p}from"./insertElementBefore-0e09c5df.js"
import{c as l}from"./createSpan-475e9683.js"
import{g as h}from"./getArrayByClassName-5fd609f9.js"
import{i as u}from"./insertHtmlAfterEnd-cca1ed99.js"
import{c as b}from"./createAnchor-70f397fb.js"
import{g}from"./getTitle-888127c9.js"
import{p as C}from"./parseDateAsTimestamp-dbc8fb82.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(g(e)),t=b({href:_(a),target:"_blank"})
p(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function A(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function k(e){const a=l({innerHTML:A(e)})
e.replaceChild(a,e.firstChild)}const E=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const L=e=>m("PvP Ladder",e.children[1]),v=e=>C(d(e.children[2]))
export default function(){c("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
u(e,E(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
u(a,E(o,"News"))}(),c("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),h("news_body_tavern",a).filter(y).forEach(k)),c("trackLadderReset")&&function(){const e=h("news_head_tavern",a).filter(L).map(v),t=Math.max.apply(null,e)
t>c(i)&&f(i,t)}()}
//# sourceMappingURL=news-50017655.js.map
