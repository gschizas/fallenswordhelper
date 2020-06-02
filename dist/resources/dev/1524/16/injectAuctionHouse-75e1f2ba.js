import{w as e,p as t,x as a,a5 as n,o as s,D as i,P as r,aG as o,t as c}from"./calfSystem-d49dbbd3.js"
import"./insertElementBefore-5eb6d41d.js"
import{i as l}from"./insertElementAfterBegin-cc62b549.js"
import{c as d}from"./createSpan-d12a564e.js"
import"./all-042a202c.js"
import{a as m}from"./allthen-d63ed67c.js"
import{g as f}from"./getArrayByClassName-511145a8.js"
function p(){r(a("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(u)
m(t,p)}export default function(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),s(e,h)}(),i("autoFillMinBidPrice")&&(a("auto-fill").checked=!0))}
//# sourceMappingURL=injectAuctionHouse-75e1f2ba.js.map
