import{z as e,C as t,ab as a}from"./calfSystem-4b4fbec4.js"
import{g as m}from"./groupViewStats-162802e1.js"
import{g as n}from"./getMercStats-bb6052e5.js"
let s
function o(e,m,n){t(`<span class="fshBlue">${a(m)}</span> ( ${a(m-n)} )`,e)}function r(e){o(s.attackElement,s.attack,e.attack),o(s.defenseElement,s.defense,e.defense),o(s.armorElement,s.armor,e.armor),o(s.damageElement,s.damage,e.damage),o(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(r))}
//# sourceMappingURL=injectGroupStats-e2bf3643.js.map
