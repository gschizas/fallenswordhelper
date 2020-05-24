import{y as e,B as a,ab as t}from"./calfSystem-d96a3efd.js"
import{g as m}from"./groupViewStats-fc9bca6b.js"
import{g as n}from"./getMercStats-fd7e8c16.js"
let s
function f(e,m,n){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-n)} )`,e)}function o(e){f(s.attackElement,s.attack,e.attack),f(s.defenseElement,s.defense,e.defense),f(s.armorElement,s.armor,e.armor),f(s.damageElement,s.damage,e.damage),f(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(o))}
//# sourceMappingURL=injectGroupStats-917c98ad.js.map
