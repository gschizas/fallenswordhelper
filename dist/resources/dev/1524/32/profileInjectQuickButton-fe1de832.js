import{S as t,i as o,s as a,e,t as s,g as i,a as n,b as c,l as r,n as l,d as u,f as p,r as m,q as f}from"./index-66734780.js"
import{H as d,S as b,aB as h,al as g,c as j,cb as k,N as x,cc as y,bO as T,bC as q,s as v,W as S,C as $}from"./calfSystem-19a5d332.js"
import{c as G}from"./currentGuildId-daa4c793.js"
import{a as w}from"./getIsOwnGuild-292e0ced.js"
import{a as B}from"./profile-2583cb22.js"
import{o as C}from"./openQuickBuffByName-a375d5da.js"
import"./colouredDots-797c1a21.js"
import"./batch-2bc71ae7.js"
import"./onlineDot-f2638c3d.js"
import"./doStatTotal-6503c402.js"
import"./executeAll-f8eab1e4.js"
import"./playerName-09521e4e.js"
import"./intValue-da5ad0eb.js"
import"./valueText-c9c4edc1.js"
import"./interceptSubmit-6d528c47.js"
import"./formToUrl-8a3e8d2a.js"
import"./fshOpen-56a6fafa.js"
function J(t){let o,a,b,h,j,k,x,y,T,q,v,S,$,w,B,C,J=t[1]&&d("showAdmin"),N=t[1]&&function(t){let o,a,p,m
return{c(){o=e("button"),a=s(" "),i(o,"class","fshTempleThree svelte-1xo8gqh"),i(o,"type","button"),i(o,"data-tooltip","Recall items from "+t[2])},m(e,s){n(e,o,s),c(o,a),p||(m=r(o,"click",t[7]),p=!0)},p:l,d(t){t&&u(o),p=!1,m()}}}(t),A=J&&function(t){let o,a,p,m
return{c(){o=e("button"),a=s(" "),f(o,"background-image","url('"+g+"guilds/"+G()+"_mini.png')"),i(o,"type","button"),i(o,"data-tooltip","Rank "+t[2]),i(o,"class","svelte-1xo8gqh")},m(e,s){n(e,o,s),c(o,a),p||(m=r(o,"click",t[8]),p=!0)},p:l,d(t){t&&u(o),p=!1,m()}}}(t)
return{c(){o=e("div"),a=e("button"),b=s(" "),h=p(),j=e("button"),k=s(" "),x=p(),y=e("button"),T=s(" "),q=p(),v=e("button"),S=s(" "),$=p(),N&&N.c(),w=p(),A&&A.c(),i(a,"class","fshQuickBuff svelte-1xo8gqh"),i(a,"type","button"),i(a,"data-tooltip","Buff "+t[2]),i(j,"class","fshJoin svelte-1xo8gqh"),i(j,"type","button"),i(j,"data-tooltip","Join All Groups"+t[0]),i(y,"class","fshGold svelte-1xo8gqh"),i(y,"type","button"),i(y,"data-tooltip","Go to "+t[2]+"'s auctions"),i(v,"class","fshTempleTwo svelte-1xo8gqh"),i(v,"type","button"),i(v,"data-tooltip","Create Secure Trade to "+t[2])},m(e,s){n(e,o,s),c(o,a),c(a,b),c(o,h),c(o,j),c(j,k),c(o,x),c(o,y),c(y,T),c(o,q),c(o,v),c(v,S),c(o,$),N&&N.m(o,null),c(o,w),A&&A.m(o,null),B||(C=[r(a,"click",t[3]),r(j,"click",t[4]),r(y,"click",t[5]),r(v,"click",t[6])],B=!0)},p(t,[o]){t[1]&&N.p(t,o),J&&A.p(t,o)},i:l,o:l,d(t){t&&u(o),N&&N.d(),A&&A.d(),B=!1,m(C)}}}function N(t){const o=j.enableMaxGroupSizeToJoin?` < ${j.maxGroupSizeToJoin} Members`:"",a=w(),e=b("player_id")||h(),s=B()
function i(t){S("profile","quick button",t)}return[o,a,s,function(t){t.target.blur(),i("quickbuff"),C(s)},function(){i("join groups"),k()},function(){i("auctions"),x(`${y}&type=-3&tid=${e}`)},function(){i("secure trade"),x(`${T}${s}`)},function(){i("recall items"),x(`${q}${s}`)},function(){i("rank"),x(`${v}members&subcmd2=changerank&member_id=${e}`)}]}class A extends t{constructor(t){super(),o(this,t,N,J,a,{})}}function O(){const t=$('#profileLeftColumn img[src*="/avatars/"][width="200"]')
t&&new A({anchor:t.nextElementSibling,target:t.parentNode})}export default O
//# sourceMappingURL=profileInjectQuickButton-fe1de832.js.map
