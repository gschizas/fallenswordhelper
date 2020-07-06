import{D as e,p as a,ap as t,h as r,C as s,bs as n,bt as o,G as c,a3 as i,Y as f,b3 as m,B as p}from"./calfSystem-019de1cf.js"
import{i as d}from"./insertElementBefore-f1fdb06b.js"
import{c as l}from"./createSpan-c11958c4.js"
import{c as h}from"./createAnchor-c50bee88.js"
import{g as u}from"./getArrayByClassName-b956f719.js"
import{g as b}from"./getTitle-13ec26f0.js"
import{i as g}from"./insertHtmlAfterEnd-4e8e25bc.js"
import{p as C}from"./parseDateAsTimestamp-1a852ddf.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(b(e)),t=h({href:_(a),target:"_blank"})
d(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function A(e){const a=l({innerHTML:k(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>C(p(e.children[2]))
export default function(){c("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
g(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
g(a,L(o,"News"))}(),c("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),u("news_body_tavern",a).filter(y).forEach(A)),c("trackLadderReset")&&function(){const e=u("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>c(i)&&f(i,t)}()}
//# sourceMappingURL=news-ce1319a2.js.map
