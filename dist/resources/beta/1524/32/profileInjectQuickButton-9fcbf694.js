import{S as t,i as o,s as e,e as a,t as s,g as i,a as n,b as c,l as r,n as l,d as u,f as p,r as m,q as f}from"./index-66734780.js"
import{H as d,R as b,av as h,ak as g,c as j,c8 as k,N as x,c9 as y,bL as v,bz as T,s as q,V as $,C as S}from"./calfSystem-26bcf570.js"
import{c as G}from"./currentGuildId-b9dbffa6.js"
import{a as w}from"./getIsOwnGuild-b5417a67.js"
import{a as B}from"./profile-5c2922ec.js"
import{o as J}from"./openQuickBuffByName-effe4147.js"
import"./colouredDots-d47c6742.js"
import"./batch-ad31c053.js"
import"./onlineDot-018fc1c9.js"
import"./doStatTotal-e2c231bd.js"
import"./executeAll-f8eab1e4.js"
import"./playerName-7d235e41.js"
import"./intValue-da5ad0eb.js"
import"./valueText-60aa9d22.js"
import"./interceptSubmit-ac75d95b.js"
import"./formToUrl-ea3e8186.js"
import"./fshOpen-56a6fafa.js"
function N(t){let o,e,b,h,j,k,x,y,v,T,q,$,S,w,B,J,N=t[1]&&d("showAdmin"),z=t[1]&&function(t){let o,e,p,m
return{c(){o=a("button"),e=s(" "),i(o,"class","fshTempleThree svelte-1xo8gqh"),i(o,"type","button"),i(o,"data-tooltip","Recall items from "+t[2])},m(a,s){n(a,o,s),c(o,e),p||(m=r(o,"click",t[7]),p=!0)},p:l,d(t){t&&u(o),p=!1,m()}}}(t),A=N&&function(t){let o,e,p,m
return{c(){o=a("button"),e=s(" "),f(o,"background-image","url('"+g+"guilds/"+G()+"_mini.png')"),i(o,"type","button"),i(o,"data-tooltip","Rank "+t[2]),i(o,"class","svelte-1xo8gqh")},m(a,s){n(a,o,s),c(o,e),p||(m=r(o,"click",t[8]),p=!0)},p:l,d(t){t&&u(o),p=!1,m()}}}(t)
return{c(){o=a("div"),e=a("button"),b=s(" "),h=p(),j=a("button"),k=s(" "),x=p(),y=a("button"),v=s(" "),T=p(),q=a("button"),$=s(" "),S=p(),z&&z.c(),w=p(),A&&A.c(),i(e,"class","fshQuickBuff svelte-1xo8gqh"),i(e,"type","button"),i(e,"data-tooltip","Buff "+t[2]),i(j,"class","fshJoin svelte-1xo8gqh"),i(j,"type","button"),i(j,"data-tooltip","Join All Groups"+t[0]),i(y,"class","fshGold svelte-1xo8gqh"),i(y,"type","button"),i(y,"data-tooltip","Go to "+t[2]+"'s auctions"),i(q,"class","fshTempleTwo svelte-1xo8gqh"),i(q,"type","button"),i(q,"data-tooltip","Create Secure Trade to "+t[2])},m(a,s){n(a,o,s),c(o,e),c(e,b),c(o,h),c(o,j),c(j,k),c(o,x),c(o,y),c(y,v),c(o,T),c(o,q),c(q,$),c(o,S),z&&z.m(o,null),c(o,w),A&&A.m(o,null),B||(J=[r(e,"click",t[3]),r(j,"click",t[4]),r(y,"click",t[5]),r(q,"click",t[6])],B=!0)},p(t,[o]){t[1]&&z.p(t,o),N&&A.p(t,o)},i:l,o:l,d(t){t&&u(o),z&&z.d(),A&&A.d(),B=!1,m(J)}}}function z(t){const o=j.enableMaxGroupSizeToJoin?` < ${j.maxGroupSizeToJoin} Members`:"",e=w(),a=b("player_id")||h(),s=B()
function i(t){$("profile","quick button",t)}return[o,e,s,function(t){t.target.blur(),i("quickbuff"),J(s)},function(){i("join groups"),k()},function(){i("auctions"),x(`${y}&type=-3&tid=${a}`)},function(){i("secure trade"),x(`${v}${s}`)},function(){i("recall items"),x(`${T}${s}`)},function(){i("rank"),x(`${q}members&subcmd2=changerank&member_id=${a}`)}]}class A extends t{constructor(t){super(),o(this,t,z,N,e,{})}}function C(){const t=S('#profileLeftColumn img[src*="/avatars/"][width="200"]')
t&&new A({anchor:t.nextElementSibling,target:t.parentNode})}export default C
//# sourceMappingURL=profileInjectQuickButton-9fcbf694.js.map
