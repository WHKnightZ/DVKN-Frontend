(this["webpackJsonpDVKN-frontend"]=this["webpackJsonpDVKN-frontend"]||[]).push([[7],{529:function(t,a,e){},534:function(t,a,e){"use strict";e.r(a);var c=e(11),r=e(507),n=e(41),f=e(0),o=e(22),s=(e(529),e(1)),i=1200,u=5*(n.c+10)-10,h=new Image;h.src="https://tdhv.s3.ap-southeast-1.amazonaws.com/tdhv/background-battle.jpg";var d=new Image;d.src="https://tdhv.s3.ap-southeast-1.amazonaws.com/cards/rip/4.png";var l=-1,g=-1,b=0,v=0,m=0,j=[{cards:[]},{cards:[]}],p=[];a.default=function(){var t=Object(o.h)().state,a=Object(f.useState)({begin:!1,loading:!0}),e=Object(c.a)(a,2),O=e[0],x=e[1],w=Object(f.useRef)(null),y=Object(f.useRef)(),I=function(){if(w.current){var t=w.current.getContext("2d");if(t.drawImage(h,0,0,i,640),j.forEach((function(a,e){a.cards.forEach((function(a,c){e===l&&c===b||t.drawImage(a.hp>0?a.imageObject:d,Math.floor(a.x+a.offsetX),Math.floor(a.y+a.offsetY),n.c,n.a)}))})),-1!==l){var a=j[l].cards[b];t.drawImage(a.imageObject,Math.floor(a.x+a.offsetX),Math.floor(a.y+a.offsetY),n.c,n.a),j.forEach((function(a,e){a.cards.forEach((function(a){if(a.hp>0){t.lineWidth=3,t.strokeStyle="#333",t.fillStyle="#0f0";var c=a.y+(1===e?-28:10+n.a);t.fillRect(a.x,c,n.c*(Math.max(a.hp,0)/a.max_hp),16),t.strokeRect(a.x,c,n.c,16)}}))}))}}},M=function t(){if(!((m+=1)>p.length+1)){b=p[m-1].atk_card,v=p[m-1].def_card,g=1-(l=1-m%2);var a=j[l].cards[b],e=j[g].cards[v];setTimeout((function(){!function(t,a,e,c,r,n,f,o){var s=c-a,i=e-t,u=50+6*Math.abs(n-r),h=Math.floor(u/2),d=0;y.current=setInterval((function(){if((d+=1)>h){var t=function(t){if(t<.1)return 0;var a=(t-.1)/.9;return a*a}((d-h)/h);f.offsetX=i-t*i,f.offsetY=s-t*s}else{var a=function(t){return t*t*t}(d/h);f.offsetX=a*i,f.offsetY=a*s}if(d===h){var e=j[l].cards;j[g].cards[n].hp-=e[r].atk}I(),d===u&&(setTimeout((function(){o()}),200),clearInterval(y.current))}),15)}(a.x,a.y,e.x,e.y+(l?-1:1)*Math.floor(n.a)/2,b,v,j[l].cards[b],t)}),100)}};return Object(f.useEffect)((function(){var a=t;p=a.battle_result,j=a.players;var e=0;return j.forEach((function(t,a){t.cards.forEach((function(t,c){t.imageObject=new Image,t.imageObject.src=t.image,t.imageObject.onload=function(){t.x=(i-u)/2+c*(n.c+10),t.y=1===a?48:592-n.a,t.offsetX=0,t.offsetY=0,10===(e+=1)&&(x({begin:!0,loading:!1}),m=0,M())}}))})),function(){clearInterval(y.current)}}),[]),Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("div",{className:"Battle d-f ai-c jc-c h-100",children:O.loading?Object(s.jsx)(r.a,{}):Object(s.jsx)("canvas",{ref:w,width:i,height:640})})})}}}]);