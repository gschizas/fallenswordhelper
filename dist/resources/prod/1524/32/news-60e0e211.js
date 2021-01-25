import{c as a}from"./createAnchor-7e36362f.js"
import{c as e}from"./createSpan-4c34b034.js"
import{g as t}from"./getArrayByClassName-b62a000f.js"
import{g as r}from"./getTitle-62ba3c23.js"
import{D as s,p as n,aA as o,h as i,C as c,bz as f,bA as m,H as p,a4 as l,Z as d,az as h,B as u}from"./calfSystem-45544049.js"
import{i as b}from"./insertElementBefore-aa28f497.js"
import{i as g}from"./insertHtmlAfterEnd-05df8cbc.js"
import{p as C}from"./parseDateAsTimestamp-63431542.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(a,e){return`<a href="${a}" target="_blank">${e}</a>`}function _(a){return`${o}creatures&search_name=${a}`}function A(e){const t=encodeURIComponent(r(e)),s=a({href:_(t),target:"_blank"})
b(s,e),i(s,e)}function w(a){return $.test(a.firstChild.nodeValue)}function y(a){const e=a.firstChild.nodeValue.match($)
var t
return e[2]=j(_(e[2]),e[2]),e[4]=j((t=e[4],`${o}realms&search_name=${t}`),e[4]),e.slice(1).join("")}function k(a){const t=e({innerHTML:y(a)})
a.replaceChild(t,a.firstChild)}const L=(a,e)=>`&nbsp;<a href="${a}&page=2">View ${e} Page 2</a>`
const v=a=>h("PvP Ladder",a.children[1]),E=a=>C(u(a.children[2]))
function T(){p("pageTwoLinks")&&function(){const a=c(`#pCC a[href="${f}"]`)
if(!a)return
g(a,L(f,"Updates"))
const e=c(`#pCC a[href="${m}"]`)
g(e,L(m,"News"))}(),p("addUfsgLinks")&&(s('.news_body img[src*="/creatures/"]').forEach(A),t("news_body_tavern",n).filter(w).forEach(k)),p("trackLadderReset")&&function(){const a=t("news_head_tavern",n).filter(v).map(E),e=Math.max.apply(null,a)
e>p(l)&&d(l,e)}()}export default T
//# sourceMappingURL=news-60e0e211.js.map
