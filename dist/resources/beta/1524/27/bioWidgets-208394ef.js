import{H as e,y as t,c as s,o,f as a,m as i,h as r,i as n,p as l,A as c,Z as u}from"./calfSystem-70c7a660.js"
import"./numberIsNaN-871eca26.js"
import"./roundToString-5fa05af1.js"
import{b as f,r as m}from"./render-d9add0e3.js"
import"./playerName-d7dd0a91.js"
import"./toLowerCase-33399b5a.js"
import{c as d}from"./createInput-1c8df108.js"
import{i as p}from"./insertTextBeforeEnd-46662d9e.js"
import"./testRange-dd13e903.js"
import{t as b}from"./testQuant-4241d27c.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],y=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function j(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(j,e)}function k(){const e=b(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){const e=function(e){let t=v(e,N)
return"guild"===s.cmd&&(t=v(t,y)),t}(g.value),t=m(e)
c(t||e,w)}function S(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=i({className:"fshBioContainer "+e}),o=i({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
r(t,o),w=i({className:"fshBioPreview fshBioInner"}),r(t,w),r(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=i({innerHTML:"<br>Display "})
B=d({min:1,max:99,type:"number",value:h}),r(e,B),p(e," Lines ")
const t=d({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,k),r(e,t),r(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,f),a(g,"keyup",T),T())}export default S
//# sourceMappingURL=bioWidgets-208394ef.js.map
