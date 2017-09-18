// data related to player
var player_name = "";
var player_won = 0;
var computer_won = 0;
var dif1ficulty = 'easy';
var countDown = 0;
var lastWonComputer = false;
var triggerFromMainWindow = false;
//end of data related to player


    //AI code
    var player = 'x';
    var computer = 'o';
    function isMoveLeft(b){
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                if(b[i][j]=='_')return true;
            }
        }
        return false;
    }
    
    function evaluate(b){
        //check for same row
        for(var row = 0; row < 3; row++){
            if((b[row][0]==b[row][1])&&(b[row][0]==b[row][2])){
                if(b[row][0]==player)return 10;
                if(b[row][0]==computer)return -10;
            }
        }
        //check for column
        for(var col = 0; col < 3; col++){
            if((b[0][col]==b[1][col])&&(b[1][col]==b[2][col])){
                if(b[0][col]==player)return 10;
                if(b[0][col]==computer)return -10;
            }
        }
        //check for main diagnol
            if((b[0][0]==b[1][1])&&(b[1][1]==b[2][2])){
            if(b[0][0]==player)return 10;
            if(b[0][0]==computer)return -10;
        }
        if((b[0][2]==b[1][1])&&(b[1][1]==b[2][0])){
            if(b[0][2]==player)return 10;
            if(b[0][2]==computer)return -10;
        }

        return 0;
    }

    function miniMax(b,depth,isMax){
        var score = evaluate(b);
        if((score == 10)||(score == -10))return score;
        if(!(isMoveLeft(b)))return 0;
        if(isMax){
            var best = -1000;
            for(var i = 0; i < 3; i++){
                for(var j = 0; j < 3; j++){
                    if(b[i][j]=='_'){
                        b[i][j]=player;
                        best = max(best,miniMax(b,depth+1,!isMax));
                        //console.log(b[0][0] + ' ' + b[0][1] + ' ' + b[0][2] + '\n' + b[1][0] + ' ' + b[1][1] + ' ' + b[1][2] + '\n' + b[2][0] + ' ' + b[2][1] + ' ' + b[2][2] + ' '  + '\tbest = ' + best);
                        b[i][j]='_';
                    }
                }
            }
        
            return best;
        }else{
            var best = 1000;
            for(var i = 0; i < 3; i++){
                for(var j = 0; j < 3; j++){
                    if(b[i][j]=='_'){
                        b[i][j]=computer;
                        best = min(best,miniMax(b,depth+1,!isMax));
                        //console.log(b[0][0] + ' ' + b[0][1] + ' ' + b[0][2] + '\n' + b[1][0] + ' ' + b[1][1] + ' ' + b[1][2] + '\n' + b[2][0] + ' ' + b[2][1] + ' ' + b[2][2] + ' '  + '\tbest = ' + best);
                        b[i][j]='_';
                    }
                }
            }
        return best;        
        }
    }

    function findBestMove(b){
        var bestVal = -1000;
        var bestMove = {row:-1, col:-1};
        for(var i = 0; i < 3; ++i){
            for(var j = 0; j < 3; j++){
                if(b[i][j]=='_'){
                    b[i][j]=player;
                    //console.log(b[0][0] + ' ' + b[0][1] + ' ' + b[0][2] + '\n' + b[1][0] + ' ' + b[1][1] + ' ' + b[1][2] + '\n' + b[2][0] + ' ' + b[2][1] + ' ' + b[2][2]);
                    var moveVal = miniMax(b,0,false);
                    b[i][j]='_';
                    //console.log("MoveVAL = " + moveVal + " i = " + i + " j = " +j);
                    if(moveVal>bestVal){
                        bestMove.row=i;
                        bestMove.col = j;
                        bestVal = moveVal;
                    }
                }
            }
        }
    //console.log("The value of the best move is: "+bestVal);
    return bestMove;
    }

    
function min(a,b){if(a>b)return b; return a;}
function max(a,b){if(a<b)return b; return a;}
// AI code
//code testing 
/*function main(){
    return 0;
    
}*/
var gameRunning = true;
var board = [['_','_','_'],['_','_','_'],['_','_','_']];
var chance = 1;
var player_chance = true;
var first_move_tmp_boolean = true;
$(document).ready(function(){
    $('#s_s').hide();
    $('#s_d').hide();
    $('#playerScore').html('<center>0</center>');
    $('#computerScore').html('<center>0</center>');
    $('#mainWindow').hide();
    $('#modal-launcher').hide();
    $('#first_move_choice').hide();
    $('#difficulty-modal-launcher').hide();
    $('#set_difficulty').on('click',function(){
        $('#s_d').show();
    });
    $('#set_symbol').on('click',function(){
        $('#s_s').show();
    });
    $('#e').on('click',function(){
        difficulty = 'easy';
        $('#s_d').hide();
        board = [['_','_','_'],['_','_','_'],['_','_','_']];
        //$('#resetGame').hide();
        gameRunning = true;
        for(var i = 0; i < 10; ++i){
            $('#_'+i).addClass('compartment');
            $('#_'+i).html('&nbsp');        
        }
        if(lastWonComputer){computer_move('compartment');}
    });
    $('#m').on('click',function(){
        difficulty = 'medium';
        $('#s_d').hide();
        board = [['_','_','_'],['_','_','_'],['_','_','_']];
        //$('#resetGame').hide();
        gameRunning = true;
        for(var i = 0; i < 10; ++i){
            $('#_'+i).addClass('compartment');
            $('#_'+i).html('&nbsp');        
        }
        if(lastWonComputer){computer_move('compartment');}
        
    });
    $('#h').on('click',function(){
        difficulty = 'hard';
        $('#s_d').hide();
        board = [['_','_','_'],['_','_','_'],['_','_','_']];
        //$('#resetGame').hide();
        gameRunning = true;
        for(var i = 0; i < 10; ++i){
            $('#_'+i).addClass('compartment');
            $('#_'+i).html('&nbsp');        
        }
        if(lastWonComputer){computer_move('compartment');}
        
    });
    $('#o_s').on('click',function(){
        player = 'x';
        computer = 'o';
        $('#s_s').hide();
        board = [['_','_','_'],['_','_','_'],['_','_','_']];
        //$('#resetGame').hide();
        gameRunning = true;
        for(var i = 0; i < 10; ++i){
            $('#_'+i).addClass('compartment');
            $('#_'+i).html('&nbsp');        
        }
        if(lastWonComputer){computer_move('compartment');}
        
    });
    $('#x_s').on('click',function(){
        player = 'o';
        computer = 'x';
        $('#s_s').hide();
       board = [['_','_','_'],['_','_','_'],['_','_','_']];
        //$('#resetGame').hide();
        gameRunning = true;
        for(var i = 0; i < 10; ++i){
            $('#_'+i).addClass('compartment');
            $('#_'+i).html('&nbsp');        
        }
        if(lastWonComputer){computer_move('compartment');}
    });
    $('.choice_compartment').on('click',function(){
        if(this.id=='O'){
            player = 'x';
            computer = 'o';
        }else if(this.id=='X'){
            player = 'o';
            computer = 'x';
        }
        $('#show_symbol').html(this.id);
        $('#choice').hide();
        if(!triggerFromMainWindow){
            $('#difficulty-modal-launcher').trigger('click');
        }else{
            resetGamefunction;
            $('#mainWindow').show;
        }
    });
    $('#hard').on('click',function(){
       difficulty = 'hard' 
       $('#show_difficulty').html("Hard");
       if(!triggerFromMainWindow){
           $('#first_move_choice').show();
        }else{
            resetGamefunction();
            $('#mainWindow').show;
        }
    });
    $('#easy').on('click',function(){
        difficulty = 'easy'
        $('#show_difficulty').html("Easy");
        if(!triggerFromMainWindow){
           $('#first_move_choice').show();
        }else{
            resetGamefunction();
            $('#mainWindow').show;
        }
    });
    $('#medium').on('click',function(){
        $('#show_difficulty').html("Medium");
        difficulty = 'medium'
        if(!triggerFromMainWindow){
           $('#first_move_choice').show();
        }else{
            resetGamefunction();
            $('#mainWindow').show;
        }
    });
    $('.firstMove_choice_compartment').on('click',function(){
        if(this.id=='computer' && first_move_tmp_boolean){
            player_chance = false;
            console.log("HELLO WORLD");
            first_move_tmp_boolean = false;
            showTheTurn("Computer");
            $('#first_move_choice').hide();
            $('#mainWindow').show();
            setTimeout(computer_move.bind(null,this.id),900);
            countDown++;
            
        }
        if(this.id=='player'){
            $('#first_move_choice').hide();
            $('#mainWindow').show();
            showTheTurn("Player");
        }
            //  $('#resetGame').hide();
        });
    
    $('#resetGame').on('click',resetGamefunction);
    
    $('.compartment').on('click',function(){
        if(!isFilled(board,parseInt(this.id[1])) && gameRunning && player_chance){
        countDown++;
        player_chance = false;
        $('#'+this.id).removeClass('compartment');
        $('#'+this.id).html('<center>'+computer.toUpperCase()+'</center>');
        board[number_to_ij(parseInt(this.id[1]))[0]][number_to_ij(parseInt(this.id[1]))[1]] = computer;
        if(evaluate(board)== -10){declareWinner(computer.toUpperCase());}
        else{
            if(isMoveLeft(board)){
            showTheTurn("Computer");
            setTimeout(computer_move.bind(null,'compartment'),900);
            }
            else if(!isMoveLeft(board)){
                declareDraw();
            }
        }
        
        }
        //console.log("The Optimal Move is :\n");
        //console.log("ROW: " + bestMove.row +  " COL: " +bestMove.col );
    });
});

function computer_move(a){
    countDown++;
    if(difficulty=='hard'){
        var bestMove = findBestMove(board);
        console.log(bestMove);
        var move = ij_to_number([bestMove.row,bestMove.col]);
        console.log(move);
        $('#_'+move).removeClass('compartment');
        $('#_'+move).html('<center>'+player.toUpperCase()+'</center>');
        board[number_to_ij(parseInt(move))[0]][number_to_ij(parseInt(move))[1]] = player;
        if(evaluate(board)== 10){declareWinner(player.toUpperCase());}
        console.log(board[0] + '   ' + board[1] + '   ' + board[2]);
        if(!isMoveLeft(board)){
        declareDraw();
        }
        if(a=='computer'){
            showTheTurn("Player");
        }
        if(isMoveLeft(board) && gameRunning){
                showTheTurn("Player");            
        }
        player_chance = true;
    }
    else if(difficulty=='medium'){
        var bestMove = findBestMove(board);
        console.log(bestMove);
        var move = ij_to_number([bestMove.row,bestMove.col]);
        if(countDown%6==0){
            var requiredBool = true;
            while(requiredBool){
                move = Math.floor((Math.random()*9)+1);
                if(!isFilled(board,move)){
                    requiredBool = false;
                }
            }
        }
        console.log(move);
        $('#_'+move).removeClass('compartment');
        $('#_'+move).html('<center>'+player.toUpperCase()+'</center>');
        board[number_to_ij(parseInt(move))[0]][number_to_ij(parseInt(move))[1]] = player;
        if(evaluate(board)== 10){declareWinner(player.toUpperCase());}
        console.log(board[0] + '   ' + board[1] + '   ' + board[2]);
        if(!isMoveLeft(board)){
        declareDraw();
        }
        if(a=='computer'){
            showTheTurn("Player");
        }
        if(isMoveLeft(board) && gameRunning){
                showTheTurn("Player");            
        }
        player_chance = true;
    }else if(difficulty == 'easy'){
        //var bestMove = findBestMove(board);
        console.log("Okay till here 1");
        var move = 0; //ij_to_number([bestMove.row,bestMove.col]);
        var requiredBool = true;
        console.log(requiredBool);
        while(requiredBool){
            console.log("BALLE");
            move = Math.floor((Math.random()*9)+1);
            console.log(isFilled(board,move));
            if(!isFilled(board,move)){
                requiredBool = false;
            }
        }
        console.log(move);
        $('#_'+move).removeClass('compartment');
        $('#_'+move).html('<center>'+player.toUpperCase()+'</center>');
        board[number_to_ij(parseInt(move))[0]][number_to_ij(parseInt(move))[1]] = player;
        if(evaluate(board)== 10){declareWinner(player.toUpperCase());}
        console.log(board[0] + '   ' + board[1] + '   ' + board[2]);
        if(!isMoveLeft(board)){
        declareDraw();
        }
        if(a=='computer'){
            showTheTurn("Player");
        }
        if(isMoveLeft(board) && gameRunning){
                showTheTurn("Player");            
        }
        player_chance = true;
    }
}
//code testing


//game code

function number_to_ij(a){
var i = -1;
var j = -1;
switch(a){
    case 1: i = 0; j = 0; break;
    case 2: i = 0; j = 1; break;
    case 3: i = 0; j = 2; break;
    case 4: i = 1; j = 0; break;
    case 5: i = 1; j = 1; break;
    case 6: i = 1; j = 2; break;
    case 7: i = 2; j = 0; break;
    case 8: i = 2; j = 1; break;
    case 9: i = 2; j = 2; break;
}
return [i,j];
}

function ij_to_number(a){
    if(a[0] == 0){
        if(a[1]==0){
            return 1;
        }
        if(a[1]==1){
            return 2;
        }
        if(a[1]==2){
            return 3;
        }
    }
    if(a[0] == 1){
        if(a[1]==0){
            return 4;
        }
        if(a[1]==1){
            return 5;
        }
        if(a[1]==2){
            return 6;
        }
    }
    if(a[0] == 2){
        if(a[1]==0){
            return 7;
        }
        if(a[1]==1){
            return 8;
        }
        if(a[1]==2){
            return 9;
        }
    }
}
//game code
    
function declareDraw(){
    //some code will come here
    //alert('It is draw');
    $('#gameDeclaration').text('This is a draw');
    $('#modal-launcher').trigger('click');
    gameRunning = false;
    player_chance = true;
    showTheTurn("Player");
}

function declareWinner(winner){
    //someCode will come here
    //alert(winner + ' won this game');
    var tmp = "";
    if(winner == computer.toUpperCase()){
        tmp = "Player";
        player_won++;
        $('#playerScore').html('<center>'+player_won+'</center>');
        showTheTurn("Player");
        lastWonComputer = false;
    }else{
        tmp = "Computer";
        computer_won++;
        $('#computerScore').html('<center>'+computer_won+'</center>');
        lastWonComputer = true;
    }
    $('#gameDeclaration').text(tmp+ ' won this game');
    $('#modal-launcher').trigger('click');
    gameRunning = false;
    player_chance = true;
    console.log(winner);

    
}

function resetGamefunction(){
    board = [['_','_','_'],['_','_','_'],['_','_','_']];
    //$('#resetGame').hide();
    gameRunning = true;
    for(var i = 0; i < 10; ++i){
        $('#_'+i).addClass('compartment');
        $('#_'+i).html('&nbsp');        
    }
    if(lastWonComputer){computer_move('compartment');}
}

function isFilled(b,a){
    console.log(b[number_to_ij(a)[0]][number_to_ij(a)[1]]);
    if(b[number_to_ij(a)[0]][number_to_ij(a)[1]]=='_')return false;
    return true;
}


function showTheTurn(a){
    if(a=="Computer")$('#turn_showing_box').html('<center><i class="fa fa-user"></i>  '+a+'\'s Turn... <center>');
    else if(a=="Player")$('#turn_showing_box').html('<center><i class="fa fa-desktop"></i>  '+a+'\'s Turn... <center>');
}
