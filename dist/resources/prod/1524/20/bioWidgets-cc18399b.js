import{G as e,y as t,c as s,o,e as i,l as r,f as a,i as n,p as l,A as c,Y as u}from"./calfSystem-03970067.js"
import"./numberIsNaN-b19dc958.js"
import"./roundToString-0800d627.js"
import{b as f,r as m}from"./render-cb51450f.js"
import"./playerName-e0979c8e.js"
import"./toLowerCase-5a7ad345.js"
import{c as p}from"./createInput-7a44ee58.js"
import{i as b}from"./insertTextBeforeEnd-2cd4288e.js"
import"./testRange-bf9beb57.js"
import{t as d}from"./testQuant-5851cf4e.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],y=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function j(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(j,e)}function k(){const e=d(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){const e=function(e){let t=v(e,N)
return"guild"===s.cmd&&(t=v(t,y)),t}(g.value),t=m(e)
c(t||e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=r({className:"fshBioContainer "+e}),o=r({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
a(t,o),w=r({className:"fshBioPreview fshBioInner"}),a(t,w),a(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=r({innerHTML:"<br>Display "})
B=p({min:1,max:99,type:"number",value:h}),a(e,B),b(e," Lines ")
const t=p({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,k),a(e,t),a(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,f),i(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-cc18399b.js.map
