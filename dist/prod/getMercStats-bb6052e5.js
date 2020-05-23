import{w as e,x as r,N as t,v as n,b1 as a,ay as c}from"./calfSystem-4b4fbec4.js"
function u(e,r,t){return r+Math.round(Number(a[t].exec(e)[1])*c)}function s(e,r){return e.map(n(u,r.dataset.tipped))}function m(e){const n=r(e)
return function(e){return{attack:e[0],defense:e[1],armor:e[2],damage:e[3],hp:e[4]}}(function(e){return e.reduce(s,[0,0,0,0,0])}(t('#pCC img[src*="/merc/"]',n)))}function o(){return e({cmd:"guild",subcmd:"mercs"}).then(m)}export{o as g}
//# sourceMappingURL=getMercStats-bb6052e5.js.map
