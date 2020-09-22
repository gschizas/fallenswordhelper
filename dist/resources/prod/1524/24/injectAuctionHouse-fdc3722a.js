import{x as e,p as t,y as a,a7 as n,o as i,H as s,Q as r,aD as o,u as c}from"./calfSystem-ec854151.js"
import"./insertElementBefore-2ad05963.js"
import{i as l}from"./insertElementAfterBegin-a7242446.js"
import{c as f}from"./createSpan-3f02730c.js"
import{g as m}from"./getArrayByClassName-99588fac.js"
import"./all-e4fd8fad.js"
import{a as d}from"./allthen-c22b3f9e.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}function g(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}export default g
//# sourceMappingURL=injectAuctionHouse-fdc3722a.js.map
