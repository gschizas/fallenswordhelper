import{be as e,y as t,m as n,h as o,o as s,U as i,g as r,t as a,A as c}from"./calfSystem-964f4fc9.js"
import{i as f}from"./insertTextBeforeEnd-63c8e563.js"
import{c as l}from"./createButton-342296b6.js"
function m(t){return function(t){return e({subcmd:"unequipitem",inventory_id:t})}(t)}let u
function d(e,t){t.s&&c("",e.parentNode)}function p(e){const t=/inventory_id=(\d+)/.exec(e.href)[1]
t&&m(t).then(a(d,e))}function h(){i("profile","nekidBtn")
const e=u.nextElementSibling
r("a",e).forEach(p)}function b(){const e=t("profileRightColumn")
u=t("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,r=function(){const e=n({className:"fshCenter"}),t=l({className:"fshBl fshBls",textContent:"Nekid"})
return f(e,"[ "),o(e,t),f(e," ]"),s(t,h),e}()
e.replaceChild(r,i)}export default b
//# sourceMappingURL=nekidBtn-f862302f.js.map
