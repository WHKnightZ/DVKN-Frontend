(this["webpackJsonpDVKN-frontend"]=this["webpackJsonpDVKN-frontend"]||[]).push([[8],{526:function(t,e,n){"use strict";n.d(e,"e",(function(){return s})),n.d(e,"c",(function(){return d})),n.d(e,"a",(function(){return f})),n.d(e,"f",(function(){return y})),n.d(e,"d",(function(){return D})),n.d(e,"b",(function(){return N}));var a,c,i=n(5),r="0",u="1",o="2",b="3",l="4",s=(a={},Object(i.a)(a,r,"Kim"),Object(i.a)(a,u,"M\u1ed9c"),Object(i.a)(a,o,"Th\u1ed5"),Object(i.a)(a,b,"Th\u1ee7y"),Object(i.a)(a,l,"H\u1ecfa"),a),d=Object.keys(s).map((function(t){return{value:t,label:s[t]}})),f={CIVILIAN:"0",WORKER:"1",DIGNITARY:"2",DIVINE:"3",WILD:"4",INVADER:"5",DEMON:"6"},h=f.CIVILIAN,j=f.WORKER,O=f.DIGNITARY,m=f.DIVINE,p=f.WILD,g=f.INVADER,I=f.DEMON,y=(c={},Object(i.a)(c,h,"D\xe2n th\u01b0\u1eddng"),Object(i.a)(c,j,"S\u1ea3n xu\u1ea5t"),Object(i.a)(c,O,"Ch\u1ee9c s\u1eafc"),Object(i.a)(c,m,"Th\u1ea7n t\u1ed9c"),Object(i.a)(c,p,"Hoang d\xe3"),Object(i.a)(c,g,"Gi\u1eb7c"),Object(i.a)(c,I,"Ma t\u1ed9c"),c),D=Object.keys(y).map((function(t){return{value:t,label:y[t]}})),N={id:"",name:"",type:h,element:r,thumbnail:"",imgThumbnail:null,probability_register:"100",description:"",attack:"50",defend:"50",army:"50"}},535:function(t,e,n){"use strict";n.r(e);var a=n(13),c=n(11),i=n(0),r=n(50),u=n(35),o=n(41),b=n(23),l=n(109),s=n(526),d=n(22),f=n(1);e.default=function(){var t=Object(r.b)(),e=t.apiGet,n=t.apiDelete,h=Object(l.b)(),j=h.showModalConfirm,O=h.hideModalConfirm,m=Object(d.g)(),p=Object(i.useState)({items:[],loading:!0,total:0}),g=Object(c.a)(p,2),I=g[0],y=g[1],D=Object(i.useRef)(1),N=Object(i.useState)(""),v=Object(c.a)(N,2),C=v[0],w=v[1],x=Object(i.useState)(o.f),T=Object(c.a)(x,2),k=T[0],E=T[1],R=function(t){return y((function(e){return Object(a.a)(Object(a.a)({},e),{},{loading:t})}))},S=Object(i.useCallback)((function(){R(!0),e(u.b.cards(),{page:D.current,page_size:k,keyword:C},(function(t){var e=t.status,n=t.data;e?y(Object(a.a)(Object(a.a)({},n),{},{loading:!1})):R(!1)}))}),[C,k]),V=Object(i.useCallback)((function(t){R(!0),n(u.b.adminCards(t),{},(function(t){t.status?S():R(!1)}))}),[S]),A={id:{label:"Id",style:{width:"18%"},maxLine:1},name:{label:"T\xean",style:{width:"22%"},maxLine:1},thumbnail:{label:"\u1ea2nh",style:{width:"16%"},type:"image-ver"},type:{label:"Nh\xf3m",style:{width:"16%"},renderContent:function(t){var e=t.type;return s.f[e]}},element:{label:"H\u1ec7",style:{width:"16%"},renderContent:function(t){var e=t.element;return s.e[e]}},actions:{style:{width:"12%"},actions:[{icon:"pencil-alt",action:function(t){var e=t.id;return m.push("/admin/the-bai/".concat(e))},title:"S\u1eeda"},{icon:"trash",action:function(t){var e=t.id,n=t.name;return j({title:"X\xf3a Th\u1ebb b\xe0i",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a th\u1ebb b\xe0i *".concat(n,"* kh\xf4ng?"),confirm:{action:function(){O(),V(e)},text:"X\xf3a"},cancel:{action:O,text:"H\u1ee7y"},center:!0,small:!0})},title:"X\xf3a"}]}};Object(i.useEffect)((function(){D.current=1,S()}),[C,k]);var L=I.items,M=I.loading,K=I.total;return Object(f.jsx)("div",{className:"AdminCards",children:Object(f.jsx)(b.c,{items:L,fields:A,loading:M,createButton:{text:"Th\xeam Th\u1ebb b\xe0i",action:function(){return m.push("/admin/the-bai/them-moi")}},headerLeft:Object(f.jsx)(f.Fragment,{children:Object(f.jsx)(b.f,{style:{minWidth:120,width:200},onSearch:function(t){return w(t)},disabled:M})}),pagination:{total:K,pageSize:k,page:D.current,onPageChange:function(t){D.current=t,S()},onPageSizeChange:E}})})}}}]);