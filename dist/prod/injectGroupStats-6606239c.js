import{z as e,C as t,ab as a}from"./calfSystem-4f7c0235.js"
import{g as m}from"./groupViewStats-020846f2.js"
import{g as n}from"./getMercStats-672e888e.js"
let s
function o(e,m,n){t(`<span class="fshBlue">${a(m)}</span> ( ${a(m-n)} )`,e)}function r(e){o(s.attackElement,s.attack,e.attack),o(s.defenseElement,s.defense,e.defense),o(s.armorElement,s.armor,e.armor),o(s.damageElement,s.damage,e.damage),o(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(r))}
//# sourceMappingURL=injectGroupStats-6606239c.js.map
