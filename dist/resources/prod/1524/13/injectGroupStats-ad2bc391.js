import{z as e,C as a,ab as t}from"./calfSystem-e6a24264.js"
import{g as m}from"./groupViewStats-3044c32d.js"
import{g as n}from"./getMercStats-27263ba4.js"
let s
function o(e,m,n){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-n)} )`,e)}function r(e){o(s.attackElement,s.attack,e.attack),o(s.defenseElement,s.defense,e.defense),o(s.armorElement,s.armor,e.armor),o(s.damageElement,s.damage,e.damage),o(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(r))}
//# sourceMappingURL=injectGroupStats-ad2bc391.js.map
