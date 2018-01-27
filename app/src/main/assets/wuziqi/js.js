window.onload=function(){
 
var me=true;
var over=false;
var chessBord=[];
//初始化chessBord数组
for(var i=0; i<15;i++){
chessBord[i]=[];
for(var j=0;j<15;j++){
chessBord[i][j]=0;
}
}
//var me=[true];
//赢法数组
var wins=[];
var computerWin=[];
//赢法的统计数组
var myWin=[];
//初始化3维数组
for(var i=0; i<15; i++){
wins[i]=[];
for(var j=0; j<15; j++){
wins[i][j]=[];
}
}
var count=0;
 for(var i=0;i<15;i++){
 	for(var j=0;j<11;j++){
 	 for(var k=0;k<5;k++){
		wins[i][j+k][count]=true;
 	 }
 	 count++;
 	}
 }
 for(var i=0;i<15;i++){
 	for(var j=0;j<11;j++){
 	 for(var k=0;k<5;k++){
		wins[j+k][i][count]=true;
 	 }
 	 count++;
 	}
 }
 for(var i=0;i<11;i++){
 	for(var j=0;j<11;j++){
 	 for(var k=0;k<5;k++){
		wins[i+k][j+k][count]=true;
 	 }
 	 count++;
 	}
 }
 for(var i=0;i<11;i++){
 	for(var j=14;j>3;j--){
 	 for(var k=0;k<5;k++){
 	 wins[i+k][j-k][count]=true;
 	 }
 	 count++;
 	}
 }
 for(var i=0; i<count; i++){
	  myWin[i]=0;
	  computerWin[i]=0;
 }
   
/**/
var chess=document.getElementById('chess');
var context=chess.getContext('2d');
context.strokeStyle="#BFBFBF";
var logo=new Image();
logo.src="logo.png";
 /**/
logo.onload=function(){
	context.drawImage(logo,150,150,150,150);
	qipan();
}
 /**/
  function qipan(){
    for(var i=0; i<15; i++){
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		context.stroke();
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();
    } 
  }  
/**//*定义onesStep函数来绘制棋子*/
 var oneStep=function(i,j,me){
    context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	if(me){
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636766");
	}else{
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	}
	context.fillStyle=gradient;
	context.fill();
 }  
 
 /**/ 
 chess.onclick=function(e){
   if(over){
   	 return;
   }
   if(!me){
   	 return;
   }
   var x=e.offsetX-15;
   var y=e.offsetY-15;
   if((x/30%1<0.7 && x/30%1>0.3)||(y/30%1<0.7 && y/30%1>0.3)||x<0||y<0){
	   return;
   }
   var i=Math.round(x/30);
   var j=Math.round(y/30);
   if(chessBord[i][j]==0){
      oneStep(i,j,me);
      chessBord[i][j]=1;
       for(var k=0;k<count;k++){
       	  if(wins[i][j][k]){
       	  	myWin[k]++;
       	  	computerWin[k]=6;
       	  	  if(myWin[k]==5){
       	  	  	window.alert("你赢了");
       	  	  	over=true;
       	  	  }
       	  }
       }
       if(!over){
       	  me=!me;
       	  computerAI();
       }
    }
  }
  //定义computerAI函数
 var computerAI=function(){
    var myScore=[];
    var computerScore=[];
    var max=0;
    var u=0, v=0;
    for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
    }
    for(var i=0;i<15;i++){
    for(var j=0; j<15;j++){
    if(chessBord[i][j]==0){
    for(var k=0; k<count;k++){
		if(wins[i][j][k]){
			if(myWin[k]==1){
				myScore[i][j]+=2;
			} else if(myWin[k]==2){
				myScore[i][j]+=4;
			} else if(myWin[k]==3){
				myScore[i][j]+=20;
			} else if(myWin[k]==4){
				myScore[i][j]+=100;
			}
			if(computerWin[k]==1){
				computerScore[i][j]+=2;
			} else if(computerWin[k]==2){
				if(me){
					computerScore[i][j]+=4;
				} else {
					computerScore[i][j]+=4;
				}
			} else if(computerWin[k]==3){
				if(me){
					computerScore[i][j]+=19;
				} else {
					computerScore[i][j]+=21;
				}
			} else if(computerWin[k]==4){
				computerScore[i][j]+=101;
			}
		}
    }
    if(myScore[i][j]>max){
		max=myScore[i][j];
		u=i;
		v=j;
    } else if(myScore[i][j]==max){
		if(computerScore[i][j]>computerScore[u][v]){
			u=i;
			v=j;
		}
    }
    if(computerScore[i][j]>max){
		max=computerScore[i][j];
		u=i;
		v=j;
    } else if(computerScore[i][j]==max){
		if(myScore[i][j]>myScore[u][v]){
			u=i;
			v=j;
		}
    }
    }
    }
    }
    oneStep(u,v,false);
    chessBord[u][v]=2;
    //
     for(var k=0;k<count;k++){
       	  if(wins[u][v][k]){
       	  	computerWin[k]++;
       	  	myWin[k]=6;
       	  	  if(computerWin[k]==5){
       	  	  	window.alert("狗狗赢了");
       	  	  	over=true;
       	  	  }
       	  }
       }
       if(!over){
       	  me=!me; 
       }
    //
  } 
/**/
 
}
 