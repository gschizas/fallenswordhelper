import{z as a,p as e,Y as t,A as n,T as s,bj as i,m as c,o,G as l,ak as r,aF as d,w as u}from"./calfSystem-3956a623.js"
import"./all-0781ab5a.js"
import{a as f}from"./allthen-a3d20eb3.js"
function m(){t(n("refresh"))}function p(a){const e=a.parentNode.parentNode.children[0].children[0]
return a.outerHTML=`<img src="${d}ui/misc/spinner.gif" width="14" height="14">`,u({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(e.dataset.tipped)[1]})}function h(){const a=r("auctionCancel",n("resultRows"))
if(0===a.length)return
const e=a.map(p)
f(e,m)}export default function(){!a()&&e&&(!function(){const a=s({className:"smallLink",textContent:"Cancel All"}),e=n("fill").parentNode.parentNode.nextElementSibling.children[0]
e.classList.add("fshCenter"),i(e,"]"),c(e,a),i(e,"["),o(a,h)}(),l("autoFillMinBidPrice")&&(n("auto-fill").checked=!0),t(n("sort0")))}
//# sourceMappingURL=injectAuctionHouse-30c482d8.js.map
