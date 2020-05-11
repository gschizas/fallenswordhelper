import{z as e,p as t,Y as n,A as a,T as s,bj as i,m as c,o,G as l,ak as r,aF as d,w as f}from"./calfSystem-72fdbe97.js"
import"./all-2c2dffdd.js"
import{a as u}from"./allthen-59a5f241.js"
function m(){n(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${d}ui/misc/spinner.gif" width="14" height="14">`,f({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=r("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
u(t,m)}export default function(){!e()&&t&&(!function(){const e=s({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),i(t,"]"),c(t,e),i(t,"["),o(e,h)}(),l("autoFillMinBidPrice")&&(a("auto-fill").checked=!0),n(a("sort0")))}
//# sourceMappingURL=injectAuctionHouse-f0cc43ff.js.map
