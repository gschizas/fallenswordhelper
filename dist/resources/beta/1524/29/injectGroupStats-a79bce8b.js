import{x as a,A as e}from"./calfSystem-f9a27018.js"
import{a as t}from"./addCommas-0aacc5f1.js"
import"./intValue-f94761c7.js"
import{g as m}from"./groupViewStats-e79ccf6f.js"
import{g as s}from"./getMercStats-d57bfc28.js"
let n
function f(a,m,s){e(`<span class="fshBlue">${t(m)}</span> ( ${t(m-s)} )`,a)}function o(a){f(n.attackElement,n.attack,a.attack),f(n.defenseElement,n.defense,a.defense),f(n.armorElement,n.armor,a.armor),f(n.damageElement,n.damage,a.damage),f(n.hpElement,n.hp,a.hp)}function r(){a()||(n=m(document),n.attackElement&&s().then(o))}export default r
//# sourceMappingURL=injectGroupStats-a79bce8b.js.map
