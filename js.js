/***** menu start *****/
//global variables
var num = 0; //number of matches
var name1 = ""; //first player
var name2 = ""; //second player
   
//vs computer
function game(number) {
   /***** number of matches *****/
   while(num<=4 || isNaN(num)) {
      num = prompt("Podaj liczbę zapałek (więcej niż 4)");
   }

   if(number==2) {
      /***** first player *****/
      while(name1 == "") {name1 = prompt("Podaj imię pierwszego gracza")}
      document.querySelector("#game2 .player1 > span:first-child").innerHTML = name1;
      /***** second player *****/
      while(name2 == "") {name2 = prompt("Podaj imię drugiego gracza")}
      document.querySelector("#game2 .player2 > span:first-child").innerHTML = name2;
   }
   //css
   document.querySelector("#game"+number+" .game"+number+".amount").innerHTML = num;
   document.querySelector("#game"+number).style.zIndex = 4;
   document.querySelector("#game"+number).style.opacity = 1;
   document.querySelector("#game"+number+" > .game-container").style.height = 60 + "%";
}

//vs computer
document.querySelector("#menu-start > .box:nth-child(2)").addEventListener("click", function() {game(1)});
// vs player
document.querySelector("#menu-start > .box:nth-child(3)").addEventListener("click", function() {game(2)});
/***** /menu start *****/


/***** #AI *****/
function AI_movement() {
   document.querySelector("#game1 .game1.amount").innerHTML = num;
   var AI_num = Math.floor((Math.random()*3)+1);
   if(num>8)
      num=num-AI_num;
   else {
      if(num==8 || num==4) {AI_num=3}
      else if(num==7 || num==3) {AI_num=2}
      else if(num==6 || num==2) {AI_num=1}
      else if(num==5) {AI_num=Math.floor((Math.random()*3)+1)}
      else if(num==1) {
         alert("Komputer przegrał");
         if(confirm("Czy chcesz zagrać jeszcze raz"))
            window.location.reload();
      }
      if(num-AI_num>0)
         num=num-AI_num;
      else
        document.querySelector("#game1 .game1.amount").innerHTML = 0;
   }
   document.querySelector("#game1 .game1.amount").innerHTML = num;
   document.querySelector("#game1 .previous_movement > span:nth-child(4)").innerHTML = AI_num;

   if(AI_num==1)
      document.querySelector("#game1 .previous_movement > span:nth-child(5)").innerHTML = " zapałkę";
   else
      document.querySelector("#game1 .previous_movement > span:nth-child(5)").innerHTML = " zapałki";
}
/***** /#AI *****/


/***** vs computer *****/
function vs_computer(box_num) {
   if(num-box_num>0) {
      num=num-box_num;
      document.querySelector("#game1 .previous_movement > span:first-child").innerHTML = box_num;
      if(box_num==1)
         document.querySelector("#game1 .previous_movement > span:nth-child(2)").innerHTML = " zapałkę";
      else
         document.querySelector("#game1 .previous_movement > span:nth-child(2)").innerHTML = " zapałki";
      AI_movement();
   } else if(num==1 && box_num==1) {
      alert("Komputer wygrał");
      if(confirm("Czy chcesz zagrać jeszcze raz"))
         window.location.reload();
   } else
      alert("Nie możesz zabrać tyle zapałek");
}

document.querySelector("#game1 .game-box:first-child").addEventListener("click", function pass() {vs_computer(1)});
document.querySelector("#game1 .game-box:nth-child(2)").addEventListener("click", function pass() {vs_computer(2)});
document.querySelector("#game1 .game-box:nth-child(3)").addEventListener("click", function pass() {vs_computer(3)});
/***** /vs computer *****/

/***** vs player *****/
var change_player = true;
function multiplayer(box_num) {
   if(num-box_num>0) {
      num=num-box_num;
      if(change_player) {
         change_player=false;
         document.querySelector("#game2 .player1 > span:nth-child(2)").innerHTML = box_num;
      } else {
         change_player=true;
         document.querySelector("#game2 .player2 > span:nth-child(2)").innerHTML = box_num;
      }
      document.querySelector("#game2 .player1 > span:nth-child(3)").innerHTML = " zapałkę";
      document.querySelector(".game2.amount").innerHTML = num;
   } else if(num == 1 && box_num == 1) {
      change_player?alert("Gracz "+name2+" wygrał"):alert("Gracz "+name1+" wygrał");  
      if(confirm("Czy chcesz zagrać jeszcze raz"))
         window.location.reload();
   } else 
      alert("Nie możesz zabrać tyle zapałek");
}

document.querySelector("#game2 .game-box:first-child").addEventListener("click", function() {multiplayer(1)});
document.querySelector("#game2 .game-box:nth-child(2)").addEventListener("click", function() {multiplayer(2)});
document.querySelector("#game2 .game-box:nth-child(3)").addEventListener("click", function() {multiplayer(3)});
/***** /vs player *****/