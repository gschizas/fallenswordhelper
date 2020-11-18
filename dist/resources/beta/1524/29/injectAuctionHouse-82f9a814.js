import{x as e,p as t,y as a,a7 as n,o as i,H as s,P as r,aD as c,u as o}from"./calfSystem-f9a27018.js"
import"./insertElementBefore-7e0a7ce8.js"
import{i as l}from"./insertElementAfterBegin-04a4f560.js"
import{c as f}from"./createSpan-7dc30d50.js"
import{g as m}from"./getArrayByClassName-b5f38e7c.js"
import"./all-01203f8c.js"
import{a as d}from"./allthen-ca11bf0c.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,o({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}function g(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}export default g
//# sourceMappingURL=injectAuctionHouse-82f9a814.js.map
