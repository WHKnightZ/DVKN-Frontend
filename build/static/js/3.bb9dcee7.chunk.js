(this["webpackJsonpDVKN-frontend"]=this["webpackJsonpDVKN-frontend"]||[]).push([[3],{526:function(e,t,a){"use strict";a.d(t,"e",(function(){return m})),a.d(t,"c",(function(){return b})),a.d(t,"a",(function(){return u})),a.d(t,"f",(function(){return y})),a.d(t,"d",(function(){return x})),a.d(t,"b",(function(){return I}));var n,i,c=a(5),r="0",l="1",s="2",d="3",o="4",m=(n={},Object(c.a)(n,r,"Kim"),Object(c.a)(n,l,"M\u1ed9c"),Object(c.a)(n,s,"Th\u1ed5"),Object(c.a)(n,d,"Th\u1ee7y"),Object(c.a)(n,o,"H\u1ecfa"),n),b=Object.keys(m).map((function(e){return{value:e,label:m[e]}})),u={CIVILIAN:"0",WORKER:"1",DIGNITARY:"2",DIVINE:"3",WILD:"4",INVADER:"5",DEMON:"6"},j=u.CIVILIAN,h=u.WORKER,f=u.DIGNITARY,O=u.DIVINE,p=u.WILD,v=u.INVADER,g=u.DEMON,y=(i={},Object(c.a)(i,j,"D\xe2n th\u01b0\u1eddng"),Object(c.a)(i,h,"S\u1ea3n xu\u1ea5t"),Object(c.a)(i,f,"Ch\u1ee9c s\u1eafc"),Object(c.a)(i,O,"Th\u1ea7n t\u1ed9c"),Object(c.a)(i,p,"Hoang d\xe3"),Object(c.a)(i,v,"Gi\u1eb7c"),Object(c.a)(i,g,"Ma t\u1ed9c"),i),x=Object.keys(y).map((function(e){return{value:e,label:y[e]}})),I={id:"",name:"",type:j,element:r,thumbnail:"",imgThumbnail:null,probability_register:"100",description:"",attack:"50",defend:"50",army:"50"}},527:function(e,t,a){},528:function(e,t,a){"use strict";var n,i=a(16),c=a(11),r=a(519),l=a(451),s=a(25),d=a(120),o=a(0),m=a(5),b=a(526),u=!1,j=0,h={elementMetal:"element-metal",elementWood:"element-wood",elementEarth:"element-earth",elementWater:"element-water",elementFire:"element-fire",star:"star",frame:"frame",typeCivilian:"type-civilian",typeWorker:"type-worker",typeDignitary:"type-dignitary",typeDivine:"type-divine",typeWild:"type-wild",typeInvader:"type-invader",typeDemon:"type-demon",typeFrame:"type-frame"},f=Object.keys(h).length,O=function(){(j+=1)===f&&(u=!0)},p={};Object.keys(h).forEach((function(e){var t="img".concat(e[0].toUpperCase()).concat(e.slice(1));p[t]=new Image,p[t].src="/create-card/".concat(h[e],".png"),p[t].onload=O}));var v,g,y=p.imgElementMetal,x=p.imgElementWood,I=p.imgElementEarth,N=p.imgElementWater,T=p.imgElementFire,w=p.imgStar,E=p.imgFrame,k=p.imgTypeCivilian,D=p.imgTypeWorker,R=p.imgTypeDignitary,C=p.imgTypeDivine,W=p.imgTypeWild,S=p.imgTypeInvader,V=p.imgTypeDemon,A=p.imgTypeFrame,F=[y,x,I,N,T],L=b.a.CIVILIAN,_=b.a.WORKER,K=b.a.DIGNITARY,M=b.a.DIVINE,G=b.a.WILD,H=b.a.INVADER,q=b.a.DEMON,B=(n={},Object(m.a)(n,L,k),Object(m.a)(n,_,D),Object(m.a)(n,K,R),Object(m.a)(n,M,C),Object(m.a)(n,G,W),Object(m.a)(n,H,S),Object(m.a)(n,q,V),n),z=a(47),P=a(24),Y=a(84),J=(a(109),a(53)),U=a(121),Q=(a(527),a(22)),X=a(1),Z=function(e){var t=e.canvas,a=e.rank,n=void 0===a?4:a,i=e.thumbnail,c=e.element,r=void 0===c?0:c,l=e.type,s=void 0===l?b.a.CIVILIAN:l,d=t.getContext("2d");d.clearRect(0,0,P.d,P.b),d.drawImage(F[r],0,0),i&&d.drawImage(i,17,17,275,374);for(var o=0;o<=n;o+=1)d.drawImage(w,94+32*o,398);d.drawImage(E,0,0),d.drawImage(B[s],13,375),d.drawImage(A,9,374)},$=function(e){return U.a().shape({name:U.b().trim().required("T\xean l\xe1 b\xe0i kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng"),id:U.b().trim().required("Id kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng").notOneOf([e.value],e.text),thumbnail:U.b().required("\u1ea2nh kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng")})};t.a=function(e){var t=e.id,a=Object(Y.b)(),n=a.apiGet,m=a.request,j=Object(Q.g)(),h=Object(o.useState)(u),f=Object(c.a)(h,2),O=f[0],p=f[1],y=Object(o.useState)(!1),x=Object(c.a)(y,2),I=x[0],N=x[1],T=Object(o.useState)({value:"",text:""}),w=Object(c.a)(T,2),E=w[0],k=w[1],D=Object(o.useRef)(!!t),R=Object(o.useRef)(),C=Object(o.useRef)(null);Object(o.useEffect)((function(){var e;return g=!t,O||(e=setInterval((function(){u&&(p(!0),clearInterval(e))}),100)),function(){clearInterval(e)}}),[]);var W=Object(d.c)({initialValues:b.b,enableReinitialize:!0,validationSchema:$(E),onSubmit:function(e,a){var n=e.name,i=e.id,c=e.type,r=e.element,l=e.description,s=e.attack,d=e.defend,o=e.army,b=e.probability_register,u=a.validateForm;N(!0),r=Number(r),s=Number(s),d=Number(d),o=Number(o),b=Number(b);var h=document.createElement("canvas");h.width=P.d,h.height=P.b;var f=document.createElement("canvas");f.width=P.c,f.height=P.a;var O=f.getContext("2d"),p=function(){m(t?"put":"post",J.b.cards(t),{id:t?void 0:i,name:n,description:l,type:c,element:r,attack:s,defend:d,army:o,probability_register:b},(function(e){var t=e.id,a=e.status,n=e.text;N(!1),a?j.push("/admin/the-bai"):"3"===t&&(k({value:i||"",text:n}),u())}))};if(g){g=!1;for(var y=[],x=0,I=function(e){Z({canvas:h,thumbnail:U,rank:e,type:c,element:r}),null===O||void 0===O||O.drawImage(h,0,0,P.c,P.a),f.toBlob((function(t){var a=new File([t],"".concat(i,"/").concat(e,".png"));y.push({file:a,name:a.name}),5===(x+=1)&&(y.push({file:v,name:"".concat(i,"/thumbnail.png")}),function(e){var t=e.files,a=e.prefix,n=e.onSuccess,i=e.contentType;Y.a.post("/api/v1/upload",{prefix:a,file_names:t.map((function(e){return e.name}))},(function(e){var a=e.status,c=e.data;if(a){var r=new Headers;r.append("x-amz-acl","public-read"),i&&r.append("content-type",i);var l=0,s=c.length;c.forEach((function(e,a){var i=e.upload_link,c={method:"PUT",headers:r,body:t[a].file,redirect:"follow"};fetch(i,c).then((function(e){return e.text()})).then((function(){(l+=1)===s&&(null===n||void 0===n||n())})).catch((function(e){return console.log("error",e)}))}))}}))}({files:y,prefix:"cards",onSuccess:p,contentType:"image/png"}))}),"image/png",.85)},T=0;T<5;T+=1)I(T)}else p()}}),S=W.handleSubmit,V=W.getFieldProps,A=W.values,F=W.setFieldValue,L=W.setValues,_=W.handleChange,K=W.isSubmitting,M=W.touched,G=W.errors,H=A.name,q=A.type,B=A.thumbnail,U=A.imgThumbnail,ee=A.element;return Object(o.useEffect)((function(){t&&n(J.b.cards(t),{},(function(e){var a=e.status,n=e.data;a&&L({id:t,name:n.name,type:""+n.type,element:""+n.element,thumbnail:n.thumbnail,imgThumbnail:null,probability_register:""+n.probability_register,description:n.description,attack:""+n.attack,defend:""+n.defend,army:""+n.army})}))}),[t]),Object(o.useEffect)((function(){C.current&&O&&Z({canvas:C.current,thumbnail:U,type:q,element:ee})}),[C,O,q,U,ee]),Object(o.useEffect)((function(){if(B){var e=new Image;e.src=B,e.onload=function(){F("imgThumbnail",e)}}}),[B]),Object(X.jsxs)(X.Fragment,{children:[!!t&&Object(X.jsxs)(s.l,{children:["Th\u1ebb b\xe0i ",H||t]}),Object(X.jsx)(d.b,{value:W,children:Object(X.jsxs)(d.a,{className:"row pd-big",autoComplete:"off",noValidate:!0,onSubmit:S,children:[Object(X.jsx)("div",{className:"col-8",children:Object(X.jsxs)(r.a,{style:{paddingBottom:0},children:[Object(X.jsxs)("div",{className:"row",children:[Object(X.jsxs)("div",{className:"col-6 form-stack",children:[Object(X.jsx)("div",{className:"form-title",children:"Th\xf4ng tin"}),Object(X.jsx)(s.d,Object(i.a)(Object(i.a)({inputRef:R,label:"T\xean th\u1ebb b\xe0i"},V("name")),{},{onBlur:function(){var e;if(!D.current){var t=(null===(e=R.current)||void 0===e?void 0:e.value)||"";t&&(F("id",Object(z.b)(t)),D.current=!0)}},disabled:I,maxLength:36,error:G.name,errorEmpty:K||M.name})),Object(X.jsx)(s.d,Object(i.a)(Object(i.a)({label:"ID th\u1ebb b\xe0i"},V("id")),{},{onChange:function(e){_(e),D.current=!0},maxLength:36,error:G.id,errorEmpty:K||M.id,errorFocused:!!E.value&&A.id===E.value,disabled:!!t})),Object(X.jsx)(s.j,{fullWidth:!0,label:"Nh\xf3m",data:b.d,selected:q,setSelected:function(e){g=!0,F("type",e)}}),Object(X.jsx)(s.j,{fullWidth:!0,label:"H\u1ec7",data:b.c,selected:ee,setSelected:function(e){g=!0,F("element",e)}}),Object(X.jsx)(s.d,Object(i.a)(Object(i.a)({label:"T\u1ec9 l\u1ec7 xu\u1ea5t hi\u1ec7n"},V("probability_register")),{},{InputProps:{endAdornment:Object(X.jsx)(l.a,{position:"end",children:"%"})}})),Object(X.jsx)(s.d,Object(i.a)({label:"Th\xf4ng tin",rows:3,multiline:!0},V("description")))]}),Object(X.jsxs)("div",{className:"col-6 d-f ai-c fd-c",style:{marginBottom:0},children:[Object(X.jsx)("div",{className:"form-title",children:"\u1ea2nh th\u1ebb b\xe0i"}),Object(X.jsx)(s.b,{image:B,onChosen:function(e,t){v=t,g=!0,F("thumbnail",e)},className:"AdminCards-chooseThumbnail",error:(K||M.thumbnail)&&G.thumbnail}),Object(X.jsx)("div",{className:"form-title mt-2",children:"Ch\u1ec9 s\u1ed1"}),Object(X.jsxs)("div",{className:"row jc-c",style:{width:"75%"},children:[Object(X.jsx)("div",{className:"col-6",children:Object(X.jsx)(s.d,Object(i.a)({label:"C\xf4ng"},V("attack")))}),Object(X.jsx)("div",{className:"col-6",children:Object(X.jsx)(s.d,Object(i.a)({label:"Th\u1ee7"},V("defend")))}),Object(X.jsx)("div",{className:"col-6",children:Object(X.jsx)(s.d,Object(i.a)({label:"L\xednh"},V("army")))})]})]})]}),Object(X.jsx)("div",{className:"form-title mt-1",children:"K\u1ef9 n\u0103ng"}),Object(X.jsxs)("div",{className:"row",children:[Object(X.jsx)("div",{className:"col-6 form-stack",children:Object(X.jsx)(s.d,Object(i.a)({label:"Tr\u01b0\u1edfng t\xe0i",rows:3,multiline:!0},V("primary_skill")))}),Object(X.jsx)("div",{className:"col-6 form-stack",children:Object(X.jsx)(s.d,Object(i.a)({label:"Hi\u1ec7u t\xe0i",rows:3,multiline:!0},V("secondary_skill")))})]})]})}),Object(X.jsxs)("div",{className:"col-4",children:[Object(X.jsx)(r.a,{className:"d-f ai-c jc-c",children:Object(X.jsx)("canvas",{ref:C,width:P.d,height:P.b,style:{borderRadius:8}})}),Object(X.jsx)("div",{className:"mt-3 d-f jc-c",children:Object(X.jsxs)(s.a,{type:"submit",variant:"contained",style:{fontSize:15,fontWeight:"600",width:160,height:38},loading:I,children:[t?"S\u1eeda":"Th\xeam"," th\u1ebb b\xe0i"]})})]})]})})]})}},533:function(e,t,a){"use strict";a.r(t);a(0);var n=a(528),i=a(1);t.default=function(){return Object(i.jsx)(n.a,{})}}}]);