import{a as t}from"./allthen-3a9178b8.js"
import{x as e,p as a,y as n,a7 as s,o as i,H as o,P as r,aj as c,u as l}from"./calfSystem-47fc08ae.js"
import{c as f}from"./createSpan-6b0a8c35.js"
import{d as m}from"./doStatTotal-f1ff3773.js"
import{g as d}from"./getArrayByClassName-2a13cfae.js"
import{i as p}from"./insertElementAfterBegin-dabff013.js"
import"./all-6dfbd6b8.js"
import"./insertElementBefore-43970b1f.js"
function u(){r(n("refresh"))}function h(t){const e=t.parentNode.parentNode.children[0].children[0]
return t.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,l({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(e.dataset.tipped)[1]})}function j(){const e=d("auctionCancel",n("resultRows"))
if(0===e.length)return
const a=e.map(h)
t(a,u)}function b(){!e()&&a&&(!function(){const t=f({className:"smallLink",textContent:"Cancel All"}),e=n("fill").parentNode.parentNode.nextElementSibling.children[0]
e.classList.add("fshCenter"),s(e,"]"),p(e,t),s(e,"["),i(t,j)}(),o("autoFillMinBidPrice")&&r(n("auto-fill")),m())}export default b
//# sourceMappingURL=injectAuctionHouse-3b8fecdc.js.map
