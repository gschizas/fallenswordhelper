import{x as e,p as t,y as a,a7 as n,o as i,H as s,P as r,aD as o,u as c}from"./calfSystem-a5da5210.js"
import"./insertElementBefore-eada6f05.js"
import{i as l}from"./insertElementAfterBegin-619f3b2f.js"
import{c as f}from"./createSpan-8b1ff67f.js"
import{g as m}from"./getArrayByClassName-6e0bb75e.js"
import"./all-7e2b4bf6.js"
import{a as d}from"./allthen-7191069a.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}function b(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}export default b
//# sourceMappingURL=injectAuctionHouse-8ea5d99e.js.map
