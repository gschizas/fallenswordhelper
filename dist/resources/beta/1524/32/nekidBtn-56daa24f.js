import{c as e}from"./createButton-426dccef.js"
import{bo as t,y as n,m as o,h as s,o as i,V as r,g as c,t as a,A as f}from"./calfSystem-26bcf570.js"
import{i as l}from"./insertTextBeforeEnd-51cfe46b.js"
function m(e){return function(e){return t({subcmd:"unequipitem",inventory_id:e})}(e)}let u
function d(e,t){t.s&&f("",e.parentNode)}function p(e){const t=/inventory_id=(\d+)/.exec(e.href)[1]
t&&m(t).then(a(d,e))}function h(){r("profile","nekidBtn")
const e=u.nextElementSibling
c("a",e).forEach(p)}function b(){const t=n("profileRightColumn")
u=n("profileCombatSetDiv")
const r=u.parentNode.nextElementSibling,c=function(){const t=o({className:"fshCenter"}),n=e({className:"fshBl fshBls",textContent:"Nekid"})
return l(t,"[ "),s(t,n),l(t," ]"),i(n,h),t}()
t.replaceChild(c,r)}export default b
//# sourceMappingURL=nekidBtn-56daa24f.js.map
