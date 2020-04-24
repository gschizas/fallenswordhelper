import{z as t,p as e,Y as a,A as n,T as s,bj as i,m as c,o,G as l,ak as r,aF as d,w as f}from"./calfSystem-cb871cc0.js"
import"./all-56fa180f.js"
import{a as u}from"./allthen-fa22d516.js"
function m(){a(n("refresh"))}function p(t){const e=t.parentNode.parentNode.children[0].children[0]
return t.outerHTML=`<img src="${d}ui/misc/spinner.gif" width="14" height="14">`,f({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(e.dataset.tipped)[1]})}function h(){const t=r("auctionCancel",n("resultRows"))
if(0===t.length)return
const e=t.map(p)
u(e,m)}export default function(){!t()&&e&&(!function(){const t=s({className:"smallLink",textContent:"Cancel All"}),e=n("fill").parentNode.parentNode.nextElementSibling.children[0]
e.classList.add("fshCenter"),i(e,"]"),c(e,t),i(e,"["),o(t,h)}(),l("autoFillMinBidPrice")&&(n("auto-fill").checked=!0),a(n("sort0")))}
//# sourceMappingURL=injectAuctionHouse-12073b1a.js.map
