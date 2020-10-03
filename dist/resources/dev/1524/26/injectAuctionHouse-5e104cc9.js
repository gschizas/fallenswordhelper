import{x as e,p as t,y as n,a5 as a,o as i,H as s,Q as r,aH as o,u as c}from"./calfSystem-4991bf5b.js"
import"./insertElementBefore-47c09359.js"
import{i as l}from"./insertElementAfterBegin-7a3db4df.js"
import{c as f}from"./createSpan-7856b9fc.js"
import{g as m}from"./getArrayByClassName-7efc50e3.js"
import"./all-646b32fa.js"
import{a as d}from"./allthen-18c82be8.js"
function u(){r(n("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}function b(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&n("auto-fill").click())}export default b
//# sourceMappingURL=injectAuctionHouse-5e104cc9.js.map
