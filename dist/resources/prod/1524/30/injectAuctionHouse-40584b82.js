import{x as e,p as t,y as a,a7 as n,o as i,H as s,P as r,aD as o,u as c}from"./calfSystem-6459f18a.js"
import"./insertElementBefore-1b96a575.js"
import{i as l}from"./insertElementAfterBegin-d4bb1be4.js"
import{c as m}from"./createSpan-91ae3503.js"
import{g as f}from"./getArrayByClassName-b1615c24.js"
import"./all-36f83e81.js"
import{a as d}from"./allthen-7d061027.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}function g(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}export default g
//# sourceMappingURL=injectAuctionHouse-40584b82.js.map
