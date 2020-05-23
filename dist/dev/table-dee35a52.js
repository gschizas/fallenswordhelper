const t=(t,...e)=>(...r)=>e.reduce((t,e)=>e(t),t(...r)),e=(t,r)=>{const s=r||t.length
return(...r)=>{const n=r.length||1
if(s===n)return t(...r)
return e((...e)=>t(...r,...e),s-r.length)}},r=t=>e=>(t(e),e),s=t=>{const e=t.split("."),r=(t={},e=[])=>{const s=t[e.shift()]
return null==s||0===e.length?s:r(s,e)}
return{get:t=>r(t,[...e]),set:(t,r)=>{let s=t
const[n,...a]=e.reverse()
for(const t of a.reverse())void 0===s[t]&&(s[t]={},s=s[t])
return s[n]=r,t}}},n=(t,e)=>t===e?0:void 0===t?1:void 0===e||t<e?-1:1
var a
!function(t){t.ASC="asc",t.DESC="desc",t.NONE="none"}(a||(a={}))
const o=(t,e)=>{const r=s(t).get
return(t,s)=>e(r(t),r(s))},c=t=>{const{pointer:e,direction:r="asc",comparator:s=n}=t
if(!e||"none"===r)return t=>[...t]
const a=o(e,s),c="desc"===r?(i=a,(t,e)=>i(e,t)):a
var i
return t=>[...t].sort(c)}
var i
!function(t){t.BOOLEAN="boolean",t.NUMBER="number",t.DATE="date",t.STRING="string"}(i||(i={}))
var l
!function(t){t.INCLUDES="includes",t.IS="is",t.IS_NOT="isNot",t.LOWER_THAN="lt",t.GREATER_THAN="gt",t.GREATER_THAN_OR_EQUAL="gte",t.LOWER_THAN_OR_EQUAL="lte",t.EQUALS="equals",t.NOT_EQUALS="notEquals",t.ANY_OF="anyOf"}(l||(l={}))
const g=t=>e=>!t(e),u=t=>e=>Object.is(t,e),E=t=>e=>e<t,f=t=>e=>e>t,d=t=>e=>t===e,A={includes:t=>e=>e.includes(t),is:u,isNot:t(u,g),lt:E,gte:t(E,g),gt:f,lte:t(f,g),equals:d,notEquals:t(d,g),anyOf:t=>e=>t.includes(e)},p=t=>(...e)=>t.every(t=>t(...e)),h=({value:e="",operator:r="includes",type:s})=>{const n=(e=>{switch(e){case i.BOOLEAN:return Boolean
case i.NUMBER:return Number
case i.DATE:return t=>new Date(t)
case i.STRING:return t(String,t=>t.toLowerCase())
default:return t=>t}})(s),a=t(n,A[r])(e)
return t(n,a)},b=e=>{const r=(t=>{const e={}
return Object.keys(t).filter(e=>Array.isArray(t[e])).forEach(r=>{const s=t[r].filter(t=>""!==t.value)
s.length>0&&(e[r]=s)}),e})(e),n=Object.keys(r).map(e=>{const n=s(e).get,a=r[e].map(h)
return t(n,p(a))}),a=p(n)
return t=>t.filter(a)}
function C(t,...e){let r=N(t.raw[0])
for(const[s,n]of e.entries()){if(n instanceof RegExp)r+=n.source
else{if("string"!=typeof n)throw new Error("Illegal substitution: "+n)
r+=n.replace(/[\\^$.*+?()[\]{}|=!<>:-]/g,"\\$&")}r+=N(t.raw[s+1])}let s=""
if(r.startsWith("/")){const t=r.lastIndexOf("/")
if(0===t)throw new Error("If the `re` string starts with a slash, it must end with a second slash and zero or more flags: "+r)
s=r.slice(t+1),r=r.slice(1,t)}return new RegExp(r,s)}function N(t){return t.replace(/\\`/g,"`")}const y=t=>{const{value:e,scope:r=[],escape:n=!1,flags:a=""}=t,o=r.map(t=>s(t).get)
if(0===r.length||!e)return t=>t
const c=!0===n?C`/${e}/${a}`:new RegExp(e,a)
return t=>t.filter(t=>o.some(e=>c.test(String(e(t)))))},S=t=>({emitter:e})=>{const r={},s={off:t=>(t||Object.keys(r).forEach(t=>s.off(t)),r[t]&&e.off(t,...r[t]),s)}
for(const n of Object.keys(t)){const a=t[n]
r[n]=[],s[a]=function(...t){return r[n]=r[n].concat(t),e.on(n,...t),s}}return s},O=({page:t=1,size:e}={page:1})=>(r=[])=>{const s=e||r.length,n=(t-1)*s
return r.slice(n,n+s)}
var G
!function(t){t.TOGGLE_SORT="TOGGLE_SORT",t.DISPLAY_CHANGED="DISPLAY_CHANGED",t.PAGE_CHANGED="CHANGE_PAGE",t.EXEC_CHANGED="EXEC_CHANGED",t.FILTER_CHANGED="FILTER_CHANGED",t.SUMMARY_CHANGED="SUMMARY_CHANGED",t.SEARCH_CHANGED="SEARCH_CHANGED",t.EXEC_ERROR="EXEC_ERROR"}(G||(G={}))
const _=t=>{const{get:r,set:n}=s(t)
return{get:r,set:e(n)}},R=({sortFactory:s,tableState:n,data:a,filterFactory:o,searchFactory:c})=>{let i=a.length,l=a
const g=(()=>{const t={},e={on:(r,...s)=>(t[r]=(t[r]||[]).concat(s),e),dispatch(r,...s){const n=t[r]||[]
for(const t of n)t(...s)
return e},off(r,...s){if(void 0===r)Object.keys(t).forEach(t=>e.off(t))
else{const e=t[r]||[]
t[r]=s.length?e.filter(t=>!s.includes(t)):[]}return e}}
return e})(),u=_("sort"),E=_("slice"),f=_("filter"),d=_("search")
g.on("SUMMARY_CHANGED",({filteredCount:t})=>{i=t})
const A=t=>Object.assign({},t),p=e(g.dispatch,2),h=t=>(l=t,p("SUMMARY_CHANGED",{page:n.slice.page,size:n.slice.size,filteredCount:t.length})),b=e((e,s,a)=>t(A,r(p(s)),e.set(n))(a)),C=()=>b(E,"CHANGE_PAGE",Object.assign({},E.get(n),{page:1})),N=(e,r)=>{const s=t(b(e,r),C,()=>g.exec())
return(t={})=>s(t)},y={sort:N(u,"TOGGLE_SORT"),filter:N(f,"FILTER_CHANGED"),search:N(d,"SEARCH_CHANGED"),slice:t(b(E,"CHANGE_PAGE"),()=>g.exec()),exec:({processingDelay:e=20}={processingDelay:20})=>{g.dispatch("EXEC_CHANGED",{working:!0}),setTimeout(()=>{try{const e=o(f.get(n)),i=c(d.get(n)),l=s(u.get(n)),A=O(E.get(n)),p=t(e,i,r(h),l,A)(a)
g.dispatch("DISPLAY_CHANGED",p.map(t=>({index:a.indexOf(t),value:t})))}catch(t){g.dispatch("EXEC_ERROR",t)}finally{g.dispatch("EXEC_CHANGED",{working:!1})}},e)},async eval(e=n){const r=s(u.get(e)),i=c(d.get(e)),l=o(f.get(e)),g=O(E.get(e))
return t(l,i,r,g)(a).map(t=>({index:a.indexOf(t),value:t}))},onDisplayChange(t){g.on("DISPLAY_CHANGED",t)},getTableState:()=>JSON.parse(JSON.stringify(n)),getMatchingItems:()=>[...l]},S=Object.assign(g,y)
return Object.defineProperties(S,{filteredCount:{get:()=>i},length:{get:()=>a.length}}),S},T=S({FILTER_CHANGED:"onFilterChange"})
var m
!function(t){t.BOOLEAN="boolean",t.NUMBER="number",t.DATE="date",t.STRING="string"}(m||(m={}))
const D=({table:t,pointer:e,operator:r="includes",type:s="string"})=>{const n=T({emitter:t})
return Object.assign({filter(n){const a=this.state()
return void 0===n?delete a[e]:Object.assign(a,{[e]:[{value:n,operator:r,type:s}]}),t.filter(a)},state:()=>t.getTableState().filter||{}},n)},H=S({SEARCH_CHANGED:"onSearchChange"}),v=({table:t,scope:e=[]})=>{const r=H({emitter:t})
return Object.assign(r,{search:(r,s={})=>t.search(Object.assign({},{value:r,scope:e},s)),state:()=>t.getTableState().search},r)},L=S({CHANGE_PAGE:"onPageChange",SUMMARY_CHANGED:"onSummaryChange"}),F=({table:t})=>{let{slice:{page:e,size:r}}=t.getTableState(),s=t.filteredCount,n=r?Math.ceil(s/r):1
const a=L({emitter:t}),o={selectPage:e=>t.slice({page:e,size:r}),selectNextPage:()=>o.selectPage(e+1),selectPreviousPage:()=>o.selectPage(e-1),changePageSize:e=>t.slice({page:1,size:e}),isPreviousPageEnabled:()=>e>1,isNextPageEnabled:()=>n>e,state:()=>Object.assign(t.getTableState().slice,{filteredCount:s,pageCount:n})},c=Object.assign(o,a)
return c.onSummaryChange(({page:t,size:a,filteredCount:o})=>{e=t,r=a,s=o,n=r?Math.ceil(s/r):1}),c},P=S({TOGGLE_SORT:"onSortToggle"}),j=["asc","desc"],w=({pointer:t,table:e,cycle:r=!1,debounceTime:s=0})=>{const n=!0===r?["none"].concat(j):[...j].reverse(),a=((t,e)=>{let r=null
return(...s)=>{null!==r&&clearTimeout(r),r=setTimeout(()=>t(...s),e)}})(e.sort,s)
let o=0
const c=P({emitter:e}),i=Object.assign({toggle(){o++
const e=n[o%n.length]
return a({pointer:t,direction:e})},state:()=>e.getTableState().sort},c)
i.onSortToggle(({pointer:e})=>{o=t!==e?0:o})
const{pointer:l,direction:g="asc"}=i.state()
return o=l===t?"asc"===g?1:2:0,i},I=S({EXEC_CHANGED:"onExecutionChange"}),x=({sortFactory:t=c,filterFactory:e=b,searchFactory:r=y,tableState:s={sort:{},slice:{page:1},filter:{},search:{}},data:n=[]}={sortFactory:c,filterFactory:b,searchFactory:y,tableState:{sort:{},slice:{page:1},filter:{},search:{}},data:[]},...a)=>{const o=R({sortFactory:t,filterFactory:e,tableState:s,data:n,searchFactory:r})
return a.reduce((a,c)=>Object.assign(a,c({sortFactory:t,filterFactory:e,searchFactory:r,tableState:s,data:n,table:o})),o)},M=({table:t,el:e})=>{const r=(({table:t})=>I({emitter:t}))({table:t})
return r.onExecutionChange((function({working:t}){e.classList.remove("st-working"),!0===t&&e.classList.add("st-working")})),r},U=({el:t,table:e,conf:r={}})=>{const s=r.pointer||t.getAttribute("data-st-sort"),n=r.cycle||t.hasAttribute("data-st-sort-cycle"),a=w({pointer:s,table:e,cycle:n})
a.onSortToggle(({pointer:e,direction:r})=>{if(t.classList.remove("st-sort-asc","st-sort-desc"),s===e&&"none"!==r){const e="asc"===r?"st-sort-asc":"st-sort-desc"
t.classList.add(e)}})
return t.addEventListener("click",()=>a.toggle()),a}
function k(t,e){let r
return s=>{r&&clearTimeout(r),r=setTimeout((function(){t(s)}),e)}}const Y=({table:t,el:e,delay:r=400,conf:s={}})=>{const n=s.pointer||e.getAttribute("data-st-filter"),a=s.operator||e.getAttribute("data-st-filter-operator")||"includes",o=e.hasAttribute("type")?e.getAttribute("type"):"string"
let c=s.type||e.getAttribute("data-st-filter-type")
c||(c=["date","number"].includes(o)?o:"string")
const i=D({table:t,pointer:n,type:c,operator:a}),l=k(t=>i.filter(e.value),r)
return e.addEventListener("input",l),"SELECT"===e.tagName&&e.addEventListener("change",l),i},z=({el:t,table:e,delay:r=400,conf:s={}})=>{const n=s.scope||(t.getAttribute("data-st-search")||"").split(",").map(t=>t.trim()),a=s.flags||t.getAttribute("data-st-search-flags")||"",o=v({table:e,scope:n}),c=k(()=>{o.search(t.value,{flags:a})},r)
t.addEventListener("input",c)},X=({el:t,table:e})=>{const r=(r,s)=>Array.from(t.querySelectorAll(s)).forEach(t=>r({el:t,table:e}))
return r(U,"[data-st-sort]"),r(M,"[data-st-loading-indicator]"),r(z,"[data-st-search]"),r(Y,"[data-st-filter]"),e}
export{v as a,F as p,x as s,X as t}
//# sourceMappingURL=table-dee35a52.js.map
