
window.addEventListener("load",mainFunction);

function mainFunction(){


    var item_arr = ["div1","div2","div3","div4","div5","div6","div7","div8","div9"];
    var flag_turn = 1;
    var player1pos = [];
    var player2pos = [];
    var player_won;
    var winningPos = [
                      [0,1,2],
                      [3,4,5],
                      [6,7,8],
                      [0,3,6],
                      [1,4,7],
                      [2,5,8],
                      [0,4,8],
                      [2,4,6]
                    ];
    var resObj = 
               {
                win_flag:false,
                count:0
                 };

    var circle_img = '<img src="circle.png" class="fill-box-img" id="circle-img"></img>';
    var cross_img = '<img src ="cross.png" class="fill-box-img" id ="cross-img"></img>';
    var win_flag = false;
    var flexDiv = document.getElementById("game-field");
    var flagSpanEle  = document.getElementById("player-turn-value");
    var resetBtn = document.getElementById("reset-btn");
    resetBtn.addEventListener("click",resetHandler);
    flexDiv.addEventListener("click",divClickAction);


    function resetHandler(){
       console.log("resetBtn is clicked");
       flagSpanEle.innerHTML="1";
      for(let i =0;i<item_arr.length;i++){
        document.getElementById(item_arr[i]).innerHTML="";
      }
      player1pos = [];
      player2pos = [];

    }
    
     

    function divClickAction(event){
        console.log(event.target.innerHTML);
       
        //filling out the div 
        //check if div already aving some inner tml or not
        console.log(event.target.id);
        let target_id = event.target.id;
        let arr_ind = parseInt(target_id.charAt(target_id.length-1))-1;
        if(isPositionEmpty(arr_ind)){
            resObj.count+=1;
          if(flag_turn == 1){
            event.target.innerHTML=cross_img;
            player1pos[arr_ind]=true; 
              
          }
          else{
            event.target.innerHTML=circle_img;
            player2pos[arr_ind]=true;
          }
       
          setTimeout(checkWinOrNot,200);
          setTimeout(function(){
            if(resObj.win_flag){
                //alert(`player ${flag_turn} win`);
            
                document.getElementById("popup-div").style.visibility="visible";
            
                document.getElementById("winner-data").innerHTML=`player ${flag_turn} won, please refresh window to play again`;
                resObj = {
                win_flag:false,
                count:0
                 };

              }
              else{
                if(resObj.win_flag==false && resObj.count==9){
                    document.getElementById("popup-div").style.visibility="visible";
                    document.getElementById("winner-data").innerHTML="Match Tied, please refresh window to play again";
                    document.getElementById("gif-img").setAttribute("src","oh-no.gif");
                    resObj = {
                        win_flag:false,
                        count:0
                    };

                }
                updateFlagTurnValue();

              }
          },300);
          
        }

       
    
      
    }

    function checkWinOrNot(){
        console.log("ceck Win or Not Funcction");
        for(let i =0;i<winningPos.length;i++){
            
           if(player1pos[winningPos[i][0]]==true && player1pos[winningPos[i][1]] && player1pos[winningPos[i][2]])
           {
                resObj.win_flag=true;
                player_won = 1;
                break;
            }
            else if(player2pos[winningPos[i][0]]==true && player2pos[winningPos[i][1]] && player2pos[winningPos[i][2]]){
                resObj.win_flag=true;
                player_won = 2;
                break;
            }
            else{

                resObj.win_flag=false;
            
            }
        }
       
    }

    function updateFlagTurnValue(){
        console.log("ceck update Turn Value Function");
        if(flag_turn==1){
            flag_turn=2;
           
        }
        else{
            flag_turn = 1;
        }
       
        console.log(`player ${flag_turn} turn`);
        flagSpanEle.innerHTML=flag_turn;
    }

    function isPositionEmpty(arr_ind){
     return (player1pos[arr_ind]!=true || player2pos[arr_ind]!=true);
    }
}