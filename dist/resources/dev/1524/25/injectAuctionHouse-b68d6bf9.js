import{x as e,p as t,y as n,a5 as a,o as i,H as s,Q as r,aH as o,u as c}from"./calfSystem-69dd5601.js"
import"./insertElementBefore-286ff14c.js"
import{i as l}from"./insertElementAfterBegin-c6f715e1.js"
import{c as d}from"./createSpan-71b557d6.js"
import{g as f}from"./getArrayByClassName-0f29c742.js"
import"./all-3791b7d5.js"
import{a as m}from"./allthen-ad810e11.js"
function u(){r(n("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(p)
m(t,u)}function g(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&n("auto-fill").click())}export default g
//# sourceMappingURL=injectAuctionHouse-b68d6bf9.js.map
