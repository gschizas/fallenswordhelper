import{c as t}from"./createButton-3f9a1ed2.js"
import{al as e,y as n,m as o,h as s,o as a,V as i,g as r,t as f,A as c}from"./calfSystem-393ab895.js"
import{i as l}from"./insertTextBeforeEnd-580aaa56.js"
function m(t){return function(t){return e({subcmd:"unequipitem",inventory_id:t})}(t)}let u
function d(t,e){e.s&&c("",t.parentNode)}function p(t){const e=/inventory_id=(\d+)/.exec(t.href)[1]
e&&m(e).then(f(d,t))}function h(){i("profile","nekidBtn")
const t=u.nextElementSibling
r("a",t).forEach(p)}function x(){const e=n("profileRightColumn")
u=n("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,r=function(){const e=o({className:"fshCenter"}),n=t({className:"fshBl fshBls",textContent:"Nekid"})
return l(e,"[ "),s(e,n),l(e," ]"),a(n,h),e}()
e.replaceChild(r,i)}export default x
//# sourceMappingURL=nekidBtn-b78946a7.js.map
