import{z as e,C as a,ab as t}from"./calfSystem-cb871cc0.js"
import{g as m}from"./groupViewStats-b5a72545.js"
import{g as n}from"./getMercStats-7a3573c9.js"
let s
function c(e,m,n){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-n)} )`,e)}function o(e){c(s.attackElement,s.attack,e.attack),c(s.defenseElement,s.defense,e.defense),c(s.armorElement,s.armor,e.armor),c(s.damageElement,s.damage,e.damage),c(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(o))}
//# sourceMappingURL=injectGroupStats-b65030c6.js.map
