import{D as e,x as t,c as s,o,e as i,k as a,f as r,i as n,p as l,z as c,V as u}from"./calfSystem-1262535f.js"
import"./numberIsNaN-e4fe1516.js"
import"./roundToString-a7da9cfa.js"
import{b as f,r as m}from"./render-b5e94bd3.js"
import"./playerName-11654d0b.js"
import"./toLowerCase-0c270c29.js"
import{c as p}from"./createInput-62cab8cf.js"
import{i as b}from"./insertTextBeforeEnd-e16ecd0f.js"
import"./testRange-9e879bf4.js"
import{t as d}from"./testQuant-c266ac06.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function k(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(k,e)}function y(){const e=d(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=v(e,N)
return"guild"===s.cmd&&(t=v(t,j)),t}(g.value)
e=m(e),c(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=a({className:"fshBioContainer "+e}),o=a({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
r(t,o),w=a({className:"fshBioPreview fshBioInner"}),r(t,w),r(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=a({innerHTML:"<br>Display "})
B=p({min:1,max:99,type:"number",value:h}),r(e,B),b(e," Lines ")
const t=p({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,y),r(e,t),r(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,f),i(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-a7aec679.js.map
