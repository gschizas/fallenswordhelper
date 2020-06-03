import{w as e,p as t,x as n,a5 as a,o as s,D as i,P as r,aG as o,t as c}from"./calfSystem-f7574730.js"
import"./insertElementBefore-b5c9c232.js"
import{i as l}from"./insertElementAfterBegin-5fb4abe9.js"
import{c as m}from"./createSpan-4e730390.js"
import"./all-d5952527.js"
import{a as d}from"./allthen-0309499d.js"
import{g as f}from"./getArrayByClassName-6077b562.js"
function p(){r(n("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(u)
d(t,p)}export default function(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),s(e,h)}(),i("autoFillMinBidPrice")&&(n("auto-fill").checked=!0))}
//# sourceMappingURL=injectAuctionHouse-be231862.js.map
