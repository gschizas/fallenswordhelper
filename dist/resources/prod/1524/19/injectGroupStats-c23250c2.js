import{w as a,z as e}from"./calfSystem-6fc0cc1b.js"
import{a as t}from"./addCommas-1fbf27a6.js"
import"./intValue-3f75a919.js"
import{g as m}from"./groupViewStats-2943077d.js"
import{g as s}from"./getMercStats-9db8df0f.js"
let n
function f(a,m,s){e(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,a)}function o(a){f(n.attackElement,n.attack,a.attack),f(n.defenseElement,n.defense,a.defense),f(n.armorElement,n.armor,a.armor),f(n.damageElement,n.damage,a.damage),f(n.hpElement,n.hp,a.hp)}export default function(){a()||(n=m(document),n.attackElement&&s().then(o))}
//# sourceMappingURL=injectGroupStats-c23250c2.js.map
