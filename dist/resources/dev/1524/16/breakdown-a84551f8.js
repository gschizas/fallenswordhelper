import{q as e,w as t,D as o,i as s,p as n,o as i,x as a,X as r,s as c,bO as d,as as m}from"./calfSystem-d49dbbd3.js"
import"./isChecked-e319351c.js"
import{s as p}from"./simpleCheckbox-1fc6621f.js"
import"./getArrayByClassName-511145a8.js"
import"./indexAjaxJson-6ef1f9f4.js"
import"./cmdExport-1b537f9c.js"
import"./guildStore-783e895e.js"
import"./getInventory-ac7eb5ee.js"
import"./getInventoryById-aa05fc4e.js"
import{p as g}from"./perfFilter-e9ea0249.js"
let l
const f=[]
function b(e){e.hide()}function u(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(u,e,c(b,e)))}function h(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function j(e){0!==e.error?h("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=d+m+"breakdown&m=1"}function x(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(f).then(j)}function k(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?x():h("Error: No items selected.","rgb(164, 28, 28)")}(e)}function y(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=f.indexOf(t);-1===o?f.push(t):f.splice(o,1)}function C(){l=!l,r("disableBreakdownPrompts",l)}export default function(){t()||(g("composing"),l=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),y),i(a("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-a84551f8.js.map
