import{S as t,i as o,s as e,e as a,t as s,g as i,a as n,b as c,l as r,n as l,d as u,f as p,r as m,q as f}from"./index-66734780.js"
import{H as d,R as b,at as h,ai as g,c as j,c6 as k,N as x,c7 as y,bI as T,bw as q,s as v,V as $,C as S}from"./calfSystem-45544049.js"
import{c as G}from"./currentGuildId-2687cdb7.js"
import{a as w}from"./getIsOwnGuild-5da2f70e.js"
import{a as B}from"./profile-c4f7e7d2.js"
import{o as J}from"./openQuickBuffByName-81a3ab3b.js"
import"./colouredDots-8e1602e8.js"
import"./batch-62de3d3c.js"
import"./onlineDot-d26b9768.js"
import"./doStatTotal-c1750c57.js"
import"./executeAll-f8eab1e4.js"
import"./playerName-c1bcaeb9.js"
import"./intValue-da5ad0eb.js"
import"./valueText-f47f9857.js"
import"./interceptSubmit-bea77d0e.js"
import"./formToUrl-61791a0c.js"
import"./fshOpen-56a6fafa.js"
function N(t){let o,e,b,h,j,k,x,y,T,q,v,$,S,w,B,J,N=t[1]&&d("showAdmin"),A=t[1]&&function(t){let o,e,p,m
return{c(){o=a("button"),e=s(" "),i(o,"class","fshTempleThree svelte-1xo8gqh"),i(o,"type","button"),i(o,"data-tooltip","Recall items from "+t[2])},m(a,s){n(a,o,s),c(o,e),p||(m=r(o,"click",t[7]),p=!0)},p:l,d(t){t&&u(o),p=!1,m()}}}(t),C=N&&function(t){let o,e,p,m
return{c(){o=a("button"),e=s(" "),f(o,"background-image","url('"+g+"guilds/"+G()+"_mini.png')"),i(o,"type","button"),i(o,"data-tooltip","Rank "+t[2]),i(o,"class","svelte-1xo8gqh")},m(a,s){n(a,o,s),c(o,e),p||(m=r(o,"click",t[8]),p=!0)},p:l,d(t){t&&u(o),p=!1,m()}}}(t)
return{c(){o=a("div"),e=a("button"),b=s(" "),h=p(),j=a("button"),k=s(" "),x=p(),y=a("button"),T=s(" "),q=p(),v=a("button"),$=s(" "),S=p(),A&&A.c(),w=p(),C&&C.c(),i(e,"class","fshQuickBuff svelte-1xo8gqh"),i(e,"type","button"),i(e,"data-tooltip","Buff "+t[2]),i(j,"class","fshJoin svelte-1xo8gqh"),i(j,"type","button"),i(j,"data-tooltip","Join All Groups"+t[0]),i(y,"class","fshGold svelte-1xo8gqh"),i(y,"type","button"),i(y,"data-tooltip","Go to "+t[2]+"'s auctions"),i(v,"class","fshTempleTwo svelte-1xo8gqh"),i(v,"type","button"),i(v,"data-tooltip","Create Secure Trade to "+t[2])},m(a,s){n(a,o,s),c(o,e),c(e,b),c(o,h),c(o,j),c(j,k),c(o,x),c(o,y),c(y,T),c(o,q),c(o,v),c(v,$),c(o,S),A&&A.m(o,null),c(o,w),C&&C.m(o,null),B||(J=[r(e,"click",t[3]),r(j,"click",t[4]),r(y,"click",t[5]),r(v,"click",t[6])],B=!0)},p(t,[o]){t[1]&&A.p(t,o),N&&C.p(t,o)},i:l,o:l,d(t){t&&u(o),A&&A.d(),C&&C.d(),B=!1,m(J)}}}function A(t){const o=j.enableMaxGroupSizeToJoin?` < ${j.maxGroupSizeToJoin} Members`:"",e=w(),a=b("player_id")||h(),s=B()
function i(t){$("profile","quick button",t)}return[o,e,s,function(t){t.target.blur(),i("quickbuff"),J(s)},function(){i("join groups"),k()},function(){i("auctions"),x(`${y}&type=-3&tid=${a}`)},function(){i("secure trade"),x(`${T}${s}`)},function(){i("recall items"),x(`${q}${s}`)},function(){i("rank"),x(`${v}members&subcmd2=changerank&member_id=${a}`)}]}class C extends t{constructor(t){super(),o(this,t,A,N,e,{})}}function I(){const t=S('#profileLeftColumn img[src*="/avatars/"][width="200"]')
t&&new C({anchor:t.nextElementSibling,target:t.parentNode})}export default I
//# sourceMappingURL=profileInjectQuickButton-8cdb6d7b.js.map
