import{q as e,w as t,D as o,i as s,p as n,o as a,x as i,X as r,s as c,bO as d,as as m}from"./calfSystem-f7574730.js"
import"./isChecked-8b5fb1cd.js"
import{s as p}from"./simpleCheckbox-6ccf77ae.js"
import"./getArrayByClassName-6077b562.js"
import"./indexAjaxJson-66a839ba.js"
import"./cmdExport-da1f542a.js"
import"./guildStore-8fe7d393.js"
import"./getInventory-580028ac.js"
import"./getInventoryById-c0c88cd1.js"
import{p as g}from"./perfFilter-6b429ea9.js"
let l
const f=[]
function b(e){e.hide()}function u(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(u,e,c(b,e)))}function h(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function j(e){0!==e.error?h("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=d+m+"breakdown&m=1"}function x(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(f).then(j)}function k(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?x():h("Error: No items selected.","rgb(164, 28, 28)")}(e)}function y(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=f.indexOf(t);-1===o?f.push(t):f.splice(o,1)}function C(){l=!l,r("disableBreakdownPrompts",l)}export default function(){t()||(g("composing"),l=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),y),a(i("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-8e45a6e4.js.map
