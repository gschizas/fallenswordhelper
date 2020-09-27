import{x as e,p as t,y as n,a7 as a,o as i,H as s,P as r,aD as o,u as c}from"./calfSystem-71b9378d.js"
import"./insertElementBefore-286ff14c.js"
import{i as l}from"./insertElementAfterBegin-1ff1031d.js"
import{c as f}from"./createSpan-729a1388.js"
import{g as m}from"./getArrayByClassName-0b903c97.js"
import"./all-3791b7d5.js"
import{a as d}from"./allthen-ad810e11.js"
function u(){r(n("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}function g(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&n("auto-fill").click())}export default g
//# sourceMappingURL=injectAuctionHouse-de10bb77.js.map
