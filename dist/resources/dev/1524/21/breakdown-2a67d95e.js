import{r as e,x as t,G as o,i as s,p as n,o as i,y as a,l as r,Z as d,t as c,bJ as m,as as p}from"./calfSystem-9c7241dc.js"
import"./isChecked-6dfc89f5.js"
import{s as g}from"./simpleCheckbox-6241d838.js"
import"./indexAjaxJson-82fdd15d.js"
import"./cmdExport-cec76f08.js"
import"./guildStore-77f2b14b.js"
import"./getInventory-796b5632.js"
import"./getInventoryById-addb0357.js"
import"./getArrayByClassName-5afbd411.js"
import{p as l}from"./perfFilter-a33ddb22.js"
let f
const b=[]
function u(e){e.hide()}function h(e,t){e.animate({height:0},500,t)}function j(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(h,e,c(u,e)))}function w(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(j,5e3)}function x(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(b).then(x)}function k(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==b.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const t=e.target.id.replace("composing-item-",""),o=b.indexOf(t);-1===o?b.push(t):b.splice(o,1)}function B(){f=!f,d("disableBreakdownPrompts",f)}export default function(){t()||(l("composing"),f=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),C),i(a("disableBreakdownPrompts"),B))}
//# sourceMappingURL=breakdown-2a67d95e.js.map
