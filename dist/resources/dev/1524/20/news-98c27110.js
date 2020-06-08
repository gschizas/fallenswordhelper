import{D as e,p as a,at as t,f as r,C as s,by as n,bz as o,G as c,a6 as i,Z as f,ba as m,B as d}from"./calfSystem-a2862afc.js"
import{i as p}from"./insertElementBefore-372e5ad6.js"
import{c as l}from"./createSpan-b8f0a31d.js"
import{i as h}from"./insertHtmlAfterEnd-dd2b68c5.js"
import{c as u}from"./createAnchor-48415e52.js"
import{g as b}from"./getArrayByClassName-c1e64010.js"
import{g}from"./getTitle-f4c4cb2d.js"
import{p as C}from"./parseDateAsTimestamp-0811cfc6.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function y(e){const a=encodeURIComponent(g(e)),t=u({href:_(a),target:"_blank"})
p(t,e),r(t,e)}function w(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function A(e){const a=l({innerHTML:k(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>C(d(e.children[2]))
export default function(){c("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
h(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
h(a,L(o,"News"))}(),c("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(y),b("news_body_tavern",a).filter(w).forEach(A)),c("trackLadderReset")&&function(){const e=b("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>c(i)&&f(i,t)}()}
//# sourceMappingURL=news-98c27110.js.map
