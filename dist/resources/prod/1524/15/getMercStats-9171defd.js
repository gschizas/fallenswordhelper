import{t,u as e,I as r,s as n,aL as a,ai as u}from"./calfSystem-740ec4d2.js"
function c(t,e,r){return e+Math.round(Number(a[r].exec(t)[1])*u)}function s(t,e){return t.map(n(c,e.dataset.tipped))}function m(t){const n=e(t)
return function(t){return{attack:t[0],defense:t[1],armor:t[2],damage:t[3],hp:t[4]}}(function(t){return t.reduce(s,[0,0,0,0,0])}(r('#pCC img[src*="/merc/"]',n)))}function o(){return t({cmd:"guild",subcmd:"mercs"}).then(m)}export{o as g}
//# sourceMappingURL=getMercStats-9171defd.js.map
