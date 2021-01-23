import{c as e}from"./createAnchor-48441df8.js"
import{c as a}from"./createSpan-08d79c06.js"
import{g as t}from"./getArrayByClassName-b0ef8ab2.js"
import{g as r}from"./getTitle-b48791f0.js"
import{D as s,p as n,az as o,h as i,C as c,by as f,bz as m,H as p,a3 as d,Y as l,ay as h,B as u}from"./calfSystem-7aee5245.js"
import{i as b}from"./insertElementBefore-43970b1f.js"
import{i as g}from"./insertHtmlAfterEnd-ac29d90e.js"
import{p as C}from"./parseDateAsTimestamp-9a3302cb.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${o}creatures&search_name=${e}`}function y(a){const t=encodeURIComponent(r(a)),s=e({href:_(t),target:"_blank"})
b(s,a),i(s,a)}function w(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var t
return a[2]=j(_(a[2]),a[2]),a[4]=j((t=a[4],`${o}realms&search_name=${t}`),a[4]),a.slice(1).join("")}function A(e){const t=a({innerHTML:k(e)})
e.replaceChild(t,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>h("PvP Ladder",e.children[1]),E=e=>C(u(e.children[2]))
function T(){p("pageTwoLinks")&&function(){const e=c(`#pCC a[href="${f}"]`)
if(!e)return
g(e,L(f,"Updates"))
const a=c(`#pCC a[href="${m}"]`)
g(a,L(m,"News"))}(),p("addUfsgLinks")&&(s('.news_body img[src*="/creatures/"]').forEach(y),t("news_body_tavern",n).filter(w).forEach(A)),p("trackLadderReset")&&function(){const e=t("news_head_tavern",n).filter(v).map(E),a=Math.max.apply(null,e)
a>p(d)&&l(d,a)}()}export default T
//# sourceMappingURL=news-f39ee3ba.js.map
