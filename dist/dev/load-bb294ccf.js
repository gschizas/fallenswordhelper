import{bI as t,z as e,C as s,aV as o,A as n,b5 as a,ay as r,v as i,G as c,p as l,a5 as u}from"./calfSystem-94018cd0.js"
import{d as f}from"./dialogMsg-22b0e625.js"
function d(t,e){u(e,t[e])}function g(){const t=o(n("HelperfshSettings").value)
if(a(t)){const e=t
r(e).forEach(i(d,e)),f("Settings loaded successfully!")}}function p(t,e){return t[e]=c(e),t}export default function(){if(e())return
const o=function(){const e=[],s=new RegExp(`^${t}`)
for(let o=0,n=window.localStorage.length;o<n;o+=1){const n=window.localStorage.key(o)
n.match(s)&&e.push(n.replace(t,""))}return e}().reduce(p,{})
!function(t,e){s('<h1>FSH Settings</h1><br><center>The box below is your current settings. Copy it to save your current settings<br>To load saved settings, simply replace the contents of the box with your saved copy and press the button below.<textarea align="center" cols="80" rows="25" style="background-color:white;font-family:Consolas,\'Lucida Console\',\'Courier New\',monospace;" '+`id="HelperfshSettings" name="fshSettings">${JSON.stringify(e)}</textarea>`+'<br><input id="HelperLoadSettings" class="custombutton" type="submit" value="Load Settings!" /></center>',t)}(l,o),$("#HelperLoadSettings").on("click",g)}
//# sourceMappingURL=load-bb294ccf.js.map
