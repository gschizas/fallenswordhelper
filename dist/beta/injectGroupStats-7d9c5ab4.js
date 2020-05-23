import{z as e,C as t,ab as a}from"./calfSystem-fb94ddf0.js"
import{g as m}from"./groupViewStats-28e77f71.js"
import{g as n}from"./getMercStats-90ddb18e.js"
let s
function f(e,m,n){t(`<span class="fshBlue">${a(m)}</span> ( ${a(m-n)} )`,e)}function o(e){f(s.attackElement,s.attack,e.attack),f(s.defenseElement,s.defense,e.defense),f(s.armorElement,s.armor,e.armor),f(s.damageElement,s.damage,e.damage),f(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(o))}
//# sourceMappingURL=injectGroupStats-7d9c5ab4.js.map
