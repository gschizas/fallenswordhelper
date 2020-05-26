import{w as e,p as t,O as n,x as a,aR as s,o as i,D as r,aw as o,t as c}from"./calfSystem-ee582533.js"
import"./insertElementBefore-7ed837be.js"
import{i as l}from"./insertElementAfterBegin-115e10be.js"
import{c as d}from"./createSpan-63b97269.js"
import"./all-b94d2d9d.js"
import{a as m}from"./allthen-f1914fd2.js"
import{g as f}from"./getArrayByClassName-981a136a.js"
function p(){n(a("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(u)
m(t,p)}export default function(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),s(t,"]"),l(t,e),s(t,"["),i(e,h)}(),r("autoFillMinBidPrice")&&(a("auto-fill").checked=!0),n(a("sort0")))}
//# sourceMappingURL=injectAuctionHouse-fd425371.js.map
