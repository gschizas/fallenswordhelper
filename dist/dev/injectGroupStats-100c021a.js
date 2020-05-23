import{z as e,C as a,ac as t}from"./calfSystem-70b0df7f.js"
import{g as m}from"./groupViewStats-62ee3e4b.js"
import{g as n}from"./getMercStats-39a48e48.js"
let s
function o(e,m,n){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-n)} )`,e)}function r(e){o(s.attackElement,s.attack,e.attack),o(s.defenseElement,s.defense,e.defense),o(s.armorElement,s.armor,e.armor),o(s.damageElement,s.damage,e.damage),o(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(r))}
//# sourceMappingURL=injectGroupStats-100c021a.js.map
