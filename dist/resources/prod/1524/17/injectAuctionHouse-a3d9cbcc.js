import{w as e,p as t,x as n,a5 as a,o as s,D as i,O as r,aB as c,t as o}from"./calfSystem-dec5e071.js"
import"./insertElementBefore-1d764477.js"
import{i as l}from"./insertElementAfterBegin-80cc8c86.js"
import{c as m}from"./createSpan-660731dc.js"
import"./all-74575e32.js"
import{a as d}from"./allthen-38e3a607.js"
import{g as f}from"./getArrayByClassName-82011e34.js"
function p(){r(n("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,o({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(u)
d(t,p)}export default function(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),s(e,h)}(),i("autoFillMinBidPrice")&&(n("auto-fill").checked=!0))}
//# sourceMappingURL=injectAuctionHouse-a3d9cbcc.js.map
