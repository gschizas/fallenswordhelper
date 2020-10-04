import{x as e,p as t,y as a,a8 as n,o as i,H as s,P as r,aE as o,u as c}from"./calfSystem-3bdf319e.js"
import"./insertElementBefore-543d9ef0.js"
import{i as l}from"./insertElementAfterBegin-788dea7e.js"
import{c as d}from"./createSpan-a10d5602.js"
import{g as m}from"./getArrayByClassName-1fb66d0d.js"
import"./all-e81516b4.js"
import{a as f}from"./allthen-dd6cac31.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
f(t,u)}function g(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}export default g
//# sourceMappingURL=injectAuctionHouse-d6e05641.js.map
