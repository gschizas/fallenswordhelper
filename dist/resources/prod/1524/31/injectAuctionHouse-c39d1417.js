import{a as e}from"./allthen-3a9178b8.js"
import{x as t,p as a,y as n,a7 as s,o as i,H as o,P as r,ah as c,u as l}from"./calfSystem-7aee5245.js"
import{c as m}from"./createSpan-08d79c06.js"
import{d as f}from"./doStatTotal-0f89c931.js"
import{g as d}from"./getArrayByClassName-b0ef8ab2.js"
import{i as p}from"./insertElementAfterBegin-88a9bca4.js"
import"./all-6dfbd6b8.js"
import"./insertElementBefore-43970b1f.js"
function u(){r(n("refresh"))}function h(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,l({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function b(){const t=d("auctionCancel",n("resultRows"))
if(0===t.length)return
const a=t.map(h)
e(a,u)}function g(){!t()&&a&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),s(t,"]"),p(t,e),s(t,"["),i(e,b)}(),o("autoFillMinBidPrice")&&r(n("auto-fill")),f())}export default g
//# sourceMappingURL=injectAuctionHouse-c39d1417.js.map
