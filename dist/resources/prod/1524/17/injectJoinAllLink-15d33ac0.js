import{g as a,x as i,A as t,D as n,bt as o,bu as s}from"./calfSystem-dec5e071.js"
import{i as e}from"./insertHtmlAfterEnd-52e450d3.js"
function c(a){if(!t(a).includes("New attack group created."))return
let i=""
if(n("enableMaxGroupSizeToJoin")){const a=n("maxGroupSizeToJoin")
i=`<a href="${s}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups less than size ${a}.</p></a>`}else i=`<a href="${o}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups.</p></a>`
e(a,`<li class="notification">${i}</li>`)}export default function(){a("li",i("pCL")).forEach(c)}
//# sourceMappingURL=injectJoinAllLink-15d33ac0.js.map
