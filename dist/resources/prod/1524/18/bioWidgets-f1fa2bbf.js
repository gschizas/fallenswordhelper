import{D as e,x as t,c as s,o,e as a,k as i,f as r,i as n,p as l,z as c,W as u}from"./calfSystem-8b6534a5.js"
import"./numberIsNaN-0a4ef3fd.js"
import"./roundToString-ec4dfe54.js"
import{b as f,r as m}from"./render-a0178922.js"
import"./playerName-bb9c2b65.js"
import"./toLowerCase-91b39a88.js"
import{c as p}from"./createInput-a695d53e.js"
import{i as b}from"./insertTextBeforeEnd-2b95801c.js"
import"./testRange-aac8f77d.js"
import{t as d}from"./testQuant-361a100e.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function k(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(k,e)}function y(){const e=d(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=v(e,N)
return"guild"===s.cmd&&(t=v(t,j)),t}(g.value)
e=m(e),c(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=i({className:"fshBioContainer "+e}),o=i({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
r(t,o),w=i({className:"fshBioPreview fshBioInner"}),r(t,w),r(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=i({innerHTML:"<br>Display "})
B=p({min:1,max:99,type:"number",value:h}),r(e,B),b(e," Lines ")
const t=p({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,y),r(e,t),r(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,f),a(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-f1fa2bbf.js.map
