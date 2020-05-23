import{z as e,p as t,Y as n,A as a,T as s,bl as i,m as c,o,G as l,ak as r,aF as d,w as f}from"./calfSystem-fb94ddf0.js"
import"./all-d850e92d.js"
import{a as u}from"./allthen-b2156df7.js"
function m(){n(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${d}ui/misc/spinner.gif" width="14" height="14">`,f({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=r("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
u(t,m)}export default function(){!e()&&t&&(!function(){const e=s({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),i(t,"]"),c(t,e),i(t,"["),o(e,h)}(),l("autoFillMinBidPrice")&&(a("auto-fill").checked=!0),n(a("sort0")))}
//# sourceMappingURL=injectAuctionHouse-9718f971.js.map
