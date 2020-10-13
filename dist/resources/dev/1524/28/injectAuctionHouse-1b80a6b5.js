import{x as e,p as t,y as a,a5 as n,o as i,H as s,Q as r,aH as o,u as c}from"./calfSystem-b136673a.js"
import"./insertElementBefore-eada6f05.js"
import{i as l}from"./insertElementAfterBegin-9a4b7ee1.js"
import{c as m}from"./createSpan-65142707.js"
import{g as f}from"./getArrayByClassName-d5f86271.js"
import"./all-7e2b4bf6.js"
import{a as d}from"./allthen-7191069a.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}function g(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}export default g
//# sourceMappingURL=injectAuctionHouse-1b80a6b5.js.map
