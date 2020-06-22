import{x as e,p as t,y as a,a5 as n,o as i,G as s,R as r,aH as c,u as o}from"./calfSystem-4cc738f8.js"
import"./insertElementBefore-dcd1920e.js"
import{i as l}from"./insertElementAfterBegin-fe5a69b7.js"
import{c as f}from"./createSpan-273eaa7e.js"
import{g as m}from"./getArrayByClassName-cef24a4c.js"
import"./all-4929a748.js"
import{a as d}from"./allthen-58353ff8.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,o({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}export default function(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}
//# sourceMappingURL=injectAuctionHouse-8766c6e1.js.map
