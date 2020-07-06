import{x as e,p as t,y as a,a7 as n,o as i,G as s,Q as r,aD as o,u as c}from"./calfSystem-34fcd691.js"
import"./insertElementBefore-f1fdb06b.js"
import{i as l}from"./insertElementAfterBegin-e1b4401b.js"
import{c as f}from"./createSpan-4ec18ffd.js"
import{g as m}from"./getArrayByClassName-674a825f.js"
import"./all-9da52a21.js"
import{a as d}from"./allthen-f8a5c187.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}export default function(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}
//# sourceMappingURL=injectAuctionHouse-f0837326.js.map
