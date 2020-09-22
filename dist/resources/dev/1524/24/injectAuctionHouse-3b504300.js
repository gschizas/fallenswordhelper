import{x as e,p as t,y as n,a5 as a,o as i,H as s,R as r,aH as o,u as c}from"./calfSystem-38898f3e.js"
import"./insertElementBefore-2ad05963.js"
import{i as l}from"./insertElementAfterBegin-32b9e13c.js"
import{c as f}from"./createSpan-f1b09788.js"
import{g as m}from"./getArrayByClassName-25f769e2.js"
import"./all-e4fd8fad.js"
import{a as d}from"./allthen-c22b3f9e.js"
function u(){r(n("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}function g(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&n("auto-fill").click())}export default g
//# sourceMappingURL=injectAuctionHouse-3b504300.js.map
