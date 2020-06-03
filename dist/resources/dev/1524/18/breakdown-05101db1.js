import{q as e,w as t,D as o,i as s,p as n,o as i,x as a,X as r,s as d,bO as c,as as m}from"./calfSystem-5545a3e6.js"
import"./isChecked-ae232d81.js"
import{s as p}from"./simpleCheckbox-16914843.js"
import"./getArrayByClassName-8790cbe5.js"
import"./indexAjaxJson-06c0d970.js"
import"./cmdExport-2a172ff1.js"
import"./guildStore-be1d5903.js"
import"./getInventory-e72d2901.js"
import"./getInventoryById-f2f6620e.js"
import{p as g}from"./perfFilter-dbb2fdde.js"
let l
const f=[]
function b(e){e.hide()}function u(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(u,e,d(b,e)))}function h(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function j(e){0!==e.error?h("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=c+m+"breakdown&m=1"}function x(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(f).then(j)}function k(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?x():h("Error: No items selected.","rgb(164, 28, 28)")}(e)}function y(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=f.indexOf(t);-1===o?f.push(t):f.splice(o,1)}function C(){l=!l,r("disableBreakdownPrompts",l)}export default function(){t()||(g("composing"),l=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),y),i(a("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-05101db1.js.map
