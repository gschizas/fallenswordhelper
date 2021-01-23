import{aw as a}from"./calfSystem-7aee5245.js"
let t
function n(){return t||(t=$("#backpackContainer").data("hcsBackpack")),t}const c=[]
let o
function e(a){const t=a._showPage
a._showPage=function(n,o){a.tabData&&(t.call(a,n,o),function(a){c.length>0&&c.forEach((t=>t(a)))}(a))},o=!0}function s(t,n){c.includes(n)||(o||e(t),a(n)&&c.push(n))}export{n as g,s as m}
//# sourceMappingURL=monkeyBp-3a829a1a.js.map
