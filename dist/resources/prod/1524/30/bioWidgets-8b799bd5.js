import{H as e,y as t,c as s,o,f as i,m as r,h as a,i as n,p as l,A as c,Y as u}from"./calfSystem-6459f18a.js"
import"./numberIsNaN-fa7d637d.js"
import"./roundToString-e1cd9532.js"
import{b as m,r as f}from"./render-29ddded3.js"
import"./playerName-d1c3e398.js"
import"./toLowerCase-5e186769.js"
import{c as d}from"./createInput-7be6e294.js"
import{i as p}from"./insertTextBeforeEnd-823db888.js"
import"./testRange-e43cb031.js"
import{t as b}from"./testQuant-8065b1d8.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],y=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function j(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(j,e)}function k(){const e=b(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){const e=function(e){let t=v(e,N)
return"guild"===s.cmd&&(t=v(t,y)),t}(g.value),t=f(e)
c(t||e,w)}function S(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=r({className:"fshBioContainer "+e}),o=r({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
a(t,o),w=r({className:"fshBioPreview fshBioInner"}),a(t,w),a(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=r({innerHTML:"<br>Display "})
B=d({min:1,max:99,type:"number",value:h}),a(e,B),p(e," Lines ")
const t=d({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,k),a(e,t),a(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,m),i(g,"keyup",T),T())}export default S
//# sourceMappingURL=bioWidgets-8b799bd5.js.map
