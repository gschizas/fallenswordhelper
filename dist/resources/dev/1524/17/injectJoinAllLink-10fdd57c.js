import{g as a,x as i,A as n,D as t,bz as o,bA as s}from"./calfSystem-1c103624.js"
import{i as c}from"./insertHtmlAfterEnd-cca1ed99.js"
function e(a){if(!n(a).includes("New attack group created."))return
let i=""
if(t("enableMaxGroupSizeToJoin")){const a=t("maxGroupSizeToJoin")
i=`<a href="${s}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups less than size ${a}.</p></a>`}else i=`<a href="${o}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups.</p></a>`
c(a,`<li class="notification">${i}</li>`)}export default function(){a("li",i("pCL")).forEach(e)}
//# sourceMappingURL=injectJoinAllLink-10fdd57c.js.map
