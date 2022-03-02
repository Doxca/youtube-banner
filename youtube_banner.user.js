// ==UserScript==
// @name         youtube banner
// @namespace    https://github.com/Doxca/youtube-banner
// @version      0.1
// @description  simply help you to get a youtube banner
// @author       Doxca
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

let load_bank=[];
console.log("[*] Waiting for page to load...");
let i=0;
setInterval(()=>{
if(i==0){
if(document.querySelectorAll("img.style-scope,img.yt-img-shadow") && document.querySelectorAll("img.style-scope,img.yt-img-shadow").length>16){
document.querySelectorAll("img.style-scope,img.yt-img-shadow").forEach(c=>{
if(!load_bank.includes(c.src)){
try{
fetch(c.src).then(response=>response.text()).then(d=>{
load_bank.push(c.src);
});
}catch(e){}
}
});
if(load_bank.length>=document.querySelectorAll("img.style-scope,img.yt-img-shadow").length){
if(i==0){
i=1
loaded();
}
}}}
},1);

async function loaded(){
console.log("[+]Done loading");
let public_bank=[];
let oc=0;
document.querySelectorAll("ytd-thumbnail").forEach(c=>{
if(c.querySelector("img").src){
let link=c.querySelector("img").src;
if(!public_bank.includes(link)){
public_bank.push(link);

c.addEventListener("contextmenu",async(e)=>{
e.preventDefault();
c = e.currentTarget;
link = c.querySelector("img").src;
link=link.split("?")[0].replace("default","720");
try{
await fetch(link).then(response=>{
if(response.status==404){
link=link.split("?")[0].replace("720","default");
}
});
}catch(e){
}
let box=document.createElement("button");
box.innerText="getBanner";
box.id=btoa("getbanner_button");
box.style=`
display:flex;
position:fixed;
left:${e.clientX}px;
top:${e.clientY}px;
background:black;
color:white;
border:0;
padding:1vw;
cursor:pointer;
`;
box.className=link;
box.addEventListener('click',(e)=>{
oc=1;
window.open(e.currentTarget.className);
e.currentTarget.remove();
});
document.addEventListener('click',(e)=>{
if(document.getElementById(btoa("getbanner_button"))){
document.getElementById(btoa("getbanner_button")).remove();
}
});

if(document.getElementById(btoa("getbanner_button"))){
document.getElementById(btoa("getbanner_button")).remove();
}
document.body.appendChild(box);
});
}}
})}
