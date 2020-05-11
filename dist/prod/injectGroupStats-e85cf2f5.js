import{z as e,C as a,ab as t}from"./calfSystem-72fdbe97.js"
import{g as m}from"./groupViewStats-d15a6c7a.js"
import{g as n}from"./getMercStats-f478d0eb.js"
let s
function o(e,m,n){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-n)} )`,e)}function r(e){o(s.attackElement,s.attack,e.attack),o(s.defenseElement,s.defense,e.defense),o(s.armorElement,s.armor,e.armor),o(s.damageElement,s.damage,e.damage),o(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(r))}
//# sourceMappingURL=injectGroupStats-e85cf2f5.js.map
