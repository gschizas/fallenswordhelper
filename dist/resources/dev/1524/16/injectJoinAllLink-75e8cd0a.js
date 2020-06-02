import{g as a,x as i,A as n,D as t,bA as o,bB as s}from"./calfSystem-d49dbbd3.js"
import{i as c}from"./insertHtmlAfterEnd-43b283e0.js"
function e(a){if(!n(a).includes("New attack group created."))return
let i=""
if(t("enableMaxGroupSizeToJoin")){const a=t("maxGroupSizeToJoin")
i=`<a href="${s}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups less than size ${a}.</p></a>`}else i=`<a href="${o}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups.</p></a>`
c(a,`<li class="notification">${i}</li>`)}export default function(){a("li",i("pCL")).forEach(e)}
//# sourceMappingURL=injectJoinAllLink-75e8cd0a.js.map
