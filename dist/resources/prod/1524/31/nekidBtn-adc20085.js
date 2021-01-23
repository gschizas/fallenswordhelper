import{c as e}from"./createButton-504c23fa.js"
import{bl as t,y as n,m as o,h as s,o as i,U as a,g as r,t as f,A as c}from"./calfSystem-7aee5245.js"
import{i as l}from"./insertTextBeforeEnd-0a7068ff.js"
function m(e){return function(e){return t({subcmd:"unequipitem",inventory_id:e})}(e)}let u
function d(e,t){t.s&&c("",e.parentNode)}function p(e){const t=/inventory_id=(\d+)/.exec(e.href)[1]
t&&m(t).then(f(d,e))}function h(){a("profile","nekidBtn")
const e=u.nextElementSibling
r("a",e).forEach(p)}function x(){const t=n("profileRightColumn")
u=n("profileCombatSetDiv")
const a=u.parentNode.nextElementSibling,r=function(){const t=o({className:"fshCenter"}),n=e({className:"fshBl fshBls",textContent:"Nekid"})
return l(t,"[ "),s(t,n),l(t," ]"),i(n,h),t}()
t.replaceChild(r,a)}export default x
//# sourceMappingURL=nekidBtn-adc20085.js.map
