import{g as a,y as i,B as n,G as t,b_ as o,b$ as s}from"./calfSystem-4cc738f8.js"
import{i as c}from"./insertHtmlAfterEnd-3b4dcf73.js"
function e(a){if(!n(a).includes("New attack group created."))return
let i=""
if(t("enableMaxGroupSizeToJoin")){const a=t("maxGroupSizeToJoin")
i=`<a href="${s}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups less than size ${a}.</p></a>`}else i=`<a href="${o}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups.</p></a>`
c(a,`<li class="notification">${i}</li>`)}export default function(){a("li",i("pCL")).forEach(e)}
//# sourceMappingURL=injectJoinAllLink-bee89819.js.map
