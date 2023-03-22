function Load(set,map){
    for(var i=0;i<map.length;i++){
        for(var j=0;j<map[i].length;j++){
            var id=map[i][j];
            switch(id){
                case 'B':
                    set.push(new Block(j*50,i*50,1,1));
                break;
                case 'X':
                    set.push(new Block(j*50,i*50,2));
                break;
                case 'C':
                    set.push(new Block(j*50,i*50,3));
                break;
                case 'S':
                    set.push(new Block(j*50,i*50,4));
                break;
                case 'P':
                    player.x=j*50;
                    player.y=i*50;
                    player.respawn.x=j*50;
                    player.respawn.y=i*50;
                break;
                case 'c':
                    set.push(new Block(j*50,i*50,5));
                break;
            }
        }
    }
}