import{x as e,p as t,y as a,a7 as n,o as i,G as s,Q as r,aD as o,u as c}from"./calfSystem-1b876afa.js"
import"./insertElementBefore-f07a50c4.js"
import{i as l}from"./insertElementAfterBegin-476f3d65.js"
import{c as f}from"./createSpan-bd67d773.js"
import{g as m}from"./getArrayByClassName-ef7e9871.js"
import"./all-8cfc3076.js"
import{a as d}from"./allthen-d1515ca1.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}export default function(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}
//# sourceMappingURL=injectAuctionHouse-d5247909.js.map
