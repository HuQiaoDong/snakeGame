let map=document.querySelector(".map");
let span=document.getElementsByClassName("start");
let mask=document.querySelector(".mask");
let body=document.querySelector("body");
timer=null;
/************************************/
// let theMap=new Object();
// theMap.arrMap=new Array();
// theMap.mapRow=25;
// theMap.mapColumn=25;
// theMap.arrRow=new Array();
// theMap.arrColumn=new Array();
/************************************/
//地图对象实例
let theMap={
    "arrMap": Array(0),
    "arrColumn": Array(0),
    "mapRow": 25,
    "mapColumn":25,
    "create_map":function(row,column){
            for(let i=0;i<row;i++){
                //这里在每次进入外循环需要将数组清空
                this.arrColumn=[];
                //创建25个ul元素
                let ul=document.createElement("ul");
                for(let j=0;j<column;j++){
                    //创建625个li元素
                    let li=document.createElement("li");
                    //将25组25个的li元素放入25个ul元素中作为子节点
                    ul.appendChild(li);
                    //将创建的25个li元素节点放入arrRow数组保存起来
                    this.arrColumn.push(li);
                }
                //将25个ul元素节点作为class为map的div子节点
                map.appendChild(ul);
                //将25个存放25个li元素子节点的一维数组放入另一个一维空数组中，构成有25个一维数组的二维数组
                this.arrMap.push(this.arrColumn);
            }
            console.log(theMap);
            console.log(this.arrMap[1][1]);
            console.log("存放地图格子的二维数组",this.arrMap);
            console.log("打印保存地图行列的数组",this.arrColumn);
            //console.log(document.querySelector("body"));
    }
  //  Function
}
//封装蛇相关属性和方法的对象
let snake={
    //头部坐标
    "X":4,
    "Y":0,
    //移动方向
    "direction":"right",
    "arrSnake": Array(0),
    //绘制蛇身
    "theBody": function(length){
        for(let i=0;i<length;i++){
            theMap.arrMap[i][0].className="snake";
            this.arrSnake.push(theMap.arrMap[i][0]);
        }
        console.log(this.arrSnake);
    },
}

let food={
    "eggX":5,
    "eggY":10,
    "drawFood":function(){
        theMap.arrMap[this.eggX][this.eggY].className="egg";
    }, 
    "randomCreate":function(rowmax,columnmax){
        this.eggX=Math.floor(Math.random()*Math.floor(rowmax));
        this.eggY=Math.floor(Math.random()*Math.floor(columnmax));
        theMap.arrMap[this.eggX][this.eggY].className="egg";
        console.log(this.eggX,this.eggY);
    } 
}

let options={
    "mask":0
}
//蛇的移动
function move(){
         
        // snake.X++;
        // if(snake.X==25){
        //     snake.X=5;
        // }
        if(snake.direction=="left"){
            snake.X--;
    //        console.log("turn-left");
        }
        if(snake.direction=="right"){
            snake.X++;
    //       console.log("turn-right");
        }
        if(snake.direction=="up"){
            snake.Y--;
    //        console.log("turn-up");
        }
        if(snake.direction=="down"){
            snake.Y++; 
    //        console.log("turn-down");
        }
        //判断蛇是否撞到地图边界，撞到为死亡
        if(snake.X>=theMap.mapRow||snake.Y>=theMap.mapColumn||snake.X<0||snake.Y<0){
            clearInterval(timer);
            body.className="animated hinge fadeOut";
            setTimeout(function(){
                alert("你挂了！");
                window.location.href="index.html";
                return;
            },1200);   
        }
        //自撞检测
        for(let j=0;j<snake.arrSnake.length;j++){
            if(snake.arrSnake[j]==theMap.arrMap[snake.X][snake.Y]){
                body.className="animated hinge fadeOut";           
                clearInterval(timer);
                setTimeout(function(){
                    alert("你挂了！");
                    window.location.href="index.html";
                    return;
                },1200); 
            }
        }
        //检测蛇头是否碰到食物，碰到则食物重新随机生成
        if(theMap.arrMap[snake.X][snake.Y]==theMap.arrMap[food.eggX][food.eggY]){
            //吃到食物，重新生成食物
            food.randomCreate(theMap.mapRow-1,theMap.mapColumn-1);
            //蛇身+1
            snake.arrSnake.push(theMap.arrMap[snake.X][snake.Y]);
            //分数+1
            options.mask++;
            mask.innerHTML="分数:"+options.mask;
   //       console.log(snake.arrSnake);
            //随机生成的食物位于蛇身处的处理
            for(let k=0;k<snake.arrSnake.length;k++){
                if(snake.arrSnake[k]==theMap.arrMap[food.eggX][food.eggY]){
                    food.randomCreate(theMap.mapRow-1,theMap.mapColumn-1);
                    snake.arrSnake.push(theMap.arrMap[snake.X][snake.Y]);
                    options.mask++;
                    mask.innerHTML="分数:"+options.mask;
                }
            }
        }
        //对应方向前一个li进行蛇样式添加
        theMap.arrMap[snake.X][snake.Y].className="snake"; 
        //蛇身尾部li元素清除渲染
        snake.arrSnake[0].className="";
        //存放蛇身体元素块的队列首出队
        snake.arrSnake.shift();
        //将蛇的头部元素入栈蛇身数组
        snake.arrSnake.push(theMap.arrMap[snake.X][snake.Y]);
        //
        setTimeout("move",50);       
}
//玩家键盘动作
onkeydown=function(){
    //向左移动情况下按下向右按键无效
    if(event.keyCode==37&&snake.direction=="right"){
        return ;
    }
    //向上移动情况下按下向下按键无效
    if(event.keyCode==38&&snake.direction=="down"){
        return ;
    }
    //向右移动情况下按下向左按键无效
    if(event.keyCode==39&&snake.direction=="left"){
        return ;
    }
    //向下移动情况下按下向上按键无效
    if(event.keyCode==40&&snake.direction=="up"){
        return ;
    }
    //判断事件总线中虚拟键盘是否按下相应键值码的按键
    switch(event.keyCode){
        case 37:
            snake.direction="left";
            break;
        case 38:
            snake.direction="up";
            break;
        case 39:
            snake.direction="right";
            break;
        case 40:
            snake.direction="down";
            break;
        // case 32:
        //     timer=setInterval(move,100);
        //     span[0].innerHTML="";
        //     break;
    }
}
//画出地图
theMap.create_map(theMap.mapRow,theMap.mapColumn);
map.style.width=25*theMap.mapRow+"px";
map.style.height=25*theMap.mapColumn+"px";
//绘制初始蛇身
snake.theBody(5);
//绘制食物
food.drawFood();
//1s调用一次Move方法
timer=setInterval(move,100);


