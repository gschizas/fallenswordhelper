import{c as e}from"./createAnchor-c78bfac3.js"
import{c as a}from"./createSpan-f9f70e5d.js"
import{g as t}from"./getArrayByClassName-1bdcec20.js"
import{g as r}from"./getTitle-b48791f0.js"
import{D as s,p as n,aG as o,h as i,C as c,bE as f,bF as m,H as p,a4 as d,Z as l,aF as h,B as u}from"./calfSystem-393ab895.js"
import{i as b}from"./insertElementBefore-43970b1f.js"
import{i as g}from"./insertHtmlAfterEnd-568576c8.js"
import{p as C}from"./parseDateAsTimestamp-01885405.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${o}creatures&search_name=${e}`}function w(a){const t=encodeURIComponent(r(a)),s=e({href:_(t),target:"_blank"})
b(s,a),i(s,a)}function y(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var t
return a[2]=j(_(a[2]),a[2]),a[4]=j((t=a[4],`${o}realms&search_name=${t}`),a[4]),a.slice(1).join("")}function A(e){const t=a({innerHTML:k(e)})
e.replaceChild(t,e.firstChild)}const E=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const L=e=>h("PvP Ladder",e.children[1]),v=e=>C(u(e.children[2]))
function T(){p("pageTwoLinks")&&function(){const e=c(`#pCC a[href="${f}"]`)
if(!e)return
g(e,E(f,"Updates"))
const a=c(`#pCC a[href="${m}"]`)
g(a,E(m,"News"))}(),p("addUfsgLinks")&&(s('.news_body img[src*="/creatures/"]').forEach(w),t("news_body_tavern",n).filter(y).forEach(A)),p("trackLadderReset")&&function(){const e=t("news_head_tavern",n).filter(L).map(v),a=Math.max.apply(null,e)
a>p(d)&&l(d,a)}()}export default T
//# sourceMappingURL=news-9faff382.js.map
