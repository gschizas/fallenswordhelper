import{c as a}from"./createAnchor-6cfb2588.js"
import{c as e}from"./createSpan-58506d04.js"
import{g as t}from"./getArrayByClassName-8cefca3b.js"
import{g as r}from"./getTitle-62ba3c23.js"
import{D as s,p as n,aH as o,h as i,C as c,bF as f,bG as m,H as p,a5 as d,_ as l,aG as h,B as u}from"./calfSystem-19a5d332.js"
import{i as b}from"./insertElementBefore-aa28f497.js"
import{i as g}from"./insertHtmlAfterEnd-6d4e13a3.js"
import{p as C}from"./parseDateAsTimestamp-09891562.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function _(a,e){return`<a href="${a}" target="_blank">${e}</a>`}function j(a){return`${o}creatures&search_name=${a}`}function w(e){const t=encodeURIComponent(r(e)),s=a({href:j(t),target:"_blank"})
b(s,e),i(s,e)}function y(a){return $.test(a.firstChild.nodeValue)}function k(a){const e=a.firstChild.nodeValue.match($)
var t
return e[2]=_(j(e[2]),e[2]),e[4]=_((t=e[4],`${o}realms&search_name=${t}`),e[4]),e.slice(1).join("")}function A(a){const t=e({innerHTML:k(a)})
a.replaceChild(t,a.firstChild)}const L=(a,e)=>`&nbsp;<a href="${a}&page=2">View ${e} Page 2</a>`
const v=a=>h("PvP Ladder",a.children[1]),E=a=>C(u(a.children[2]))
function H(){p("pageTwoLinks")&&function(){const a=c(`#pCC a[href="${f}"]`)
if(!a)return
g(a,L(f,"Updates"))
const e=c(`#pCC a[href="${m}"]`)
g(e,L(m,"News"))}(),p("addUfsgLinks")&&(s('.news_body img[src*="/creatures/"]').forEach(w),t("news_body_tavern",n).filter(y).forEach(A)),p("trackLadderReset")&&function(){const a=t("news_head_tavern",n).filter(v).map(E),e=Math.max.apply(null,a)
e>p(d)&&l(d,e)}()}export default H
//# sourceMappingURL=news-ce92edf5.js.map
