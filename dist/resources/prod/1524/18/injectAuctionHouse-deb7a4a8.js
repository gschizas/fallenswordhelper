import{w as e,p as t,x as a,a5 as n,o as s,D as i,O as r,aB as o,t as c}from"./calfSystem-8b6534a5.js"
import"./insertElementBefore-91801123.js"
import{i as l}from"./insertElementAfterBegin-982d3e85.js"
import{c as f}from"./createSpan-a256b285.js"
import"./all-a74f4d72.js"
import{a as m}from"./allthen-fc452f77.js"
import{g as d}from"./getArrayByClassName-6b8fb696.js"
function p(){r(a("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=d("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(u)
m(t,p)}export default function(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),s(e,h)}(),i("autoFillMinBidPrice")&&(a("auto-fill").checked=!0))}
//# sourceMappingURL=injectAuctionHouse-deb7a4a8.js.map
