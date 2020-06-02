import{q as e,w as t,D as o,i as s,p as n,o as a,x as i,X as r,s as c,bN as d,as as m}from"./calfSystem-1c103624.js"
import"./isChecked-acff895a.js"
import{s as p}from"./simpleCheckbox-195e8c73.js"
import"./getArrayByClassName-5fd609f9.js"
import"./indexAjaxJson-ed231bc3.js"
import"./cmdExport-15d3dc9a.js"
import"./guildStore-17582a77.js"
import"./getInventory-baeadfc2.js"
import"./getInventoryById-f4443c8c.js"
import{p as g}from"./perfFilter-f685fd7a.js"
let f
const l=[]
function u(e){e.hide()}function b(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(b,e,c(u,e)))}function h(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function j(e){0!==e.error?h("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=d+m+"breakdown&m=1"}function x(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(l).then(j)}function k(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==l.length?x():h("Error: No items selected.","rgb(164, 28, 28)")}(e)}function y(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=l.indexOf(t);-1===o?l.push(t):l.splice(o,1)}function C(){f=!f,r("disableBreakdownPrompts",f)}export default function(){t()||(g("composing"),f=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),y),a(i("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-c5e6d137.js.map
