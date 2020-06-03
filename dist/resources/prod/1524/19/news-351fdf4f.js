import{I as e,p as a,ao as t,f as r,M as s,bz as n,bA as o,D as c,a1 as i,W as f,b4 as m,A as p}from"./calfSystem-6fc0cc1b.js"
import{i as l}from"./insertElementBefore-6f4b88f2.js"
import{c as d}from"./createSpan-12ee4f1a.js"
import{g as h}from"./getArrayByClassName-50cbc2c4.js"
import{i as u}from"./insertHtmlAfterEnd-cb1e0a76.js"
import{c as b}from"./createAnchor-255afa0c.js"
import{g}from"./getTitle-f60d0475.js"
import{p as C}from"./parseDateAsTimestamp-576c2f4c.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function A(e){const a=encodeURIComponent(g(e)),t=b({href:_(a),target:"_blank"})
l(t,e),r(t,e)}function w(e){return $.test(e.firstChild.nodeValue)}function y(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function k(e){const a=d({innerHTML:y(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>C(p(e.children[2]))
export default function(){c("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
u(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
u(a,L(o,"News"))}(),c("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(A),h("news_body_tavern",a).filter(w).forEach(k)),c("trackLadderReset")&&function(){const e=h("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>c(i)&&f(i,t)}()}
//# sourceMappingURL=news-351fdf4f.js.map
