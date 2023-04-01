let maxRes = 8;
let img;
let tr;
let tn=[];
let tn2 =[];
let mediaT=[];
let res = [];
let cn = [];
let cdes = [];
let pageNum=1;
let nextP;
let prevP;
let api_Path = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults='+maxRes;

let api_Key1 = '&key=AIzaSyAB5TK7hjPVsQ4fUV9qMCV4fy0P0Pvehro';
let api_Key2 = '&key=AIzaSyCAj0I1yTQfmFajgTPrwDMJ9O5VjW0pSHk';

let inpu;

function setup() {
  createCanvas(window.innerWidth,1100);
  
  let button = select('#q');
  button.mousePressed(search);
  
  
  let button2 = select('#next');
  button2.mousePressed(nextPage);
  
  let button3 = select('#prev');
  button3.mousePressed(prevPage);
  
  let button4 = select('#next2');
  button4.mousePressed(nextPage);
  
  let button5 = select('#prev2');
  button5.mousePressed(prevPage);
  
  inpu = select('#Search');
  
  
  function search(){
    pageNum=1;
    inpu2 = "&q=" + inpu.value();
    let url = api_Path+inpu2+api_Key2;
    loadJSON(url, getData);
  
  }
  
  
  function nextPage(){
    pageNum++;
    inpu2 = "&q=" + inpu.value();
    nextp2 = "&pageToken="+nextP;
    let url = api_Path+nextp2+inpu2+api_Key2;
    loadJSON(url, getData);
  
  }
  function prevPage(){
    pageNum--;
    if(pageNum<=0){
      pageNum++;
    }
    inpu2 = "&q=" + inpu.value();
    prevp2 = "&pageToken="+prevP;
    let url = api_Path+prevp2+inpu2+api_Key2;
    loadJSON(url, getData);
  }
}

function getData(data){
  
  tr = data.pageInfo.totalResults;
  
  nextP = data.nextPageToken;
  if(data.prevPageToken){
    prevP=data.prevPageToken;
  }
  
  for(let i=0;i<maxRes;i++){
    res.push(data.items[i].snippet.title);
  }
  if(res.length>=10){
    for(let i=0;i<maxRes;i++){
      res.shift();
    }
  }
  for(let i=0;i<maxRes;i++){
    mediaT.push(data.items[i].id.kind);
  }
  if(mediaT.length>=10){
    for(let i=0;i<maxRes;i++){
      mediaT.shift();
    }
  }
  for(let i=0;i<maxRes;i++){
    tn.push("https://api.allorigins.win/raw?url="+data.items[i].snippet.thumbnails.default.url);
  }
  if(tn.length>=10){
    for(let i=0;i<maxRes;i++){
      tn.shift();
    }
  }
   
  for(let i=0;i<maxRes;i++){
    cn.push(data.items[i].snippet.channelTitle);
  }
  if(cn.length>=10){
    for(let i=0;i<maxRes;i++){
      cn.shift();
    }
  }
  
  for(let i=0;i<maxRes;i++){
    tn2[i]=loadImage(tn[i]);
  }
  if(tn2.length>=10){
    for(let i=0;i<maxRes;i++){
      tn2.shift();
    }
  }
}

function draw() {
  background(255);
  fill(0);
  textSize(20);
  if(tr){
  text("Amount of Results: " + tr + "  Page: " + pageNum,15,25);
  }
  if(res[1] !== undefined){
    fill(100);
    let media;
     for(let i=0;i<maxRes;i++){
       if(mediaT[i] == "youtube#video"){
          media="Video";
         text("Created By: "+cn[i],30,85+130*i);
         let cI=tn2[i].get(0, 12, 150, tn2[i].height - 30);
         image(cI,30,95+130*i,150, 67);
          }
       if(mediaT[i]=="youtube#channel"){
          media="Channel";
         
         image(tn2[i],30,68+130*i,100,100);
          }
       let t = res[i];
       t = t.replace("&#39;","'");
       t = t.replace("&#39;:","'");
       t = t.replace("&amp;","&");
       t = t.replace("&quot;","'");
       t = t.replace("&quot;","'");
       if(t.length>=105){
         t=t.substring(0,110)+"...";
       }
    text(media +" - "   +t,15,60+130*i);
      
  }
  }
}