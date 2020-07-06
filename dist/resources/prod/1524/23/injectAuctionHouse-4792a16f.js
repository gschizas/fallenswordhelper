import{x as e,p as t,y as a,a7 as n,o as i,G as s,Q as r,aD as o,u as c}from"./calfSystem-019de1cf.js"
import"./insertElementBefore-f1fdb06b.js"
import{i as l}from"./insertElementAfterBegin-da8071d0.js"
import{c as f}from"./createSpan-c11958c4.js"
import{g as d}from"./getArrayByClassName-b956f719.js"
import"./all-9da52a21.js"
import{a as m}from"./allthen-f8a5c187.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=d("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
m(t,u)}export default function(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}
//# sourceMappingURL=injectAuctionHouse-4792a16f.js.map
