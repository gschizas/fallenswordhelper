import{bi as t,x as e,A as s,aK as o,y as n,aT as a,aq as r,t as i,G as c,p as l,Y as u}from"./calfSystem-03970067.js"
import{d as f}from"./dialogMsg-9c4f0c44.js"
function g(t,e){u(e,t[e])}function d(){const t=o(n("HelperfshSettings").value)
if(a(t)){const e=t
r(e).forEach(i(g,e)),f("Settings loaded successfully!")}}function p(t,e){return t[e]=c(e),t}export default function(){if(e())return
const o=function(){const e=[],s=new RegExp("^"+t)
for(let o=0,n=window.localStorage.length;o<n;o+=1){const n=window.localStorage.key(o)
n.match(s)&&e.push(n.replace(t,""))}return e}().reduce(p,{})
!function(t,e){s(`<h1>FSH Settings</h1><br><center>The box below is your current settings. Copy it to save your current settings<br>To load saved settings, simply replace the contents of the box with your saved copy and press the button below.<textarea align="center" cols="80" rows="25" style="background-color:white;font-family:Consolas,'Lucida Console','Courier New',monospace;" id="HelperfshSettings" name="fshSettings">${JSON.stringify(e)}</textarea><br><input id="HelperLoadSettings" class="custombutton" type="submit" value="Load Settings!" /></center>`,t)}(l,o),$("#HelperLoadSettings").on("click",d)}
//# sourceMappingURL=load-790e8bca.js.map
