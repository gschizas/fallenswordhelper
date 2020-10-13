import{g as e}from"./getInventory-6f87e502.js"
function n(e,n){return n.is_in_st&&(e.fshHasST=!0),e[n.inv_id]=n,e}function t(e){return{items:e.items.reduce(n,{}),folders:e.folders}}function r(){return e().then(t)}export{r as g}
//# sourceMappingURL=getInventoryById-6fa4cb8c.js.map
