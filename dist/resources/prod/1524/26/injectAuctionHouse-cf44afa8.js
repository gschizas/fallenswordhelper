import{x as e,p as t,y as n,a7 as a,o as i,H as s,P as r,aD as c,u as o}from"./calfSystem-a5fc99d4.js"
import"./insertElementBefore-47c09359.js"
import{i as l}from"./insertElementAfterBegin-247c27dd.js"
import{c as d}from"./createSpan-032806d8.js"
import{g as m}from"./getArrayByClassName-7db9f7c4.js"
import"./all-646b32fa.js"
import{a as f}from"./allthen-18c82be8.js"
function u(){r(n("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,o({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(p)
f(t,u)}function g(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&n("auto-fill").click())}export default g
//# sourceMappingURL=injectAuctionHouse-cf44afa8.js.map
