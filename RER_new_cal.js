//find number of feeding per day
//var CPG=msg.CpG.toFixed(2);
var RER=msg.RER.toFixed(2);
var count = RER/30;
count = Math.floor((count+1)/2)*2;
if (count <= 4){count=4;}
if (count >= 16){count =16;}
global.set("schecount",count);
var RER_P = RER/count;

function get_time(t){
    var str=t.toString();
    if(str.length==1){t="0"+t}
    return t;
}

function Half_Day(h,m,ct){
    var step = 600/((count/2)-1);

    msg.time= get_time(h) + ":" + get_time(m);
    msg.amount=(RER_P).toFixed(2);
    msg.des="feeding no." + (1+ct).toString();
    msg.count=1;
    node.send(msg);

    for (let i = 2; i <= (count/2) ; i++) {
        m+=step;
        h+=Math.floor(m/60);
        m=Math.floor(m%60);
        msg.time= get_time(h) + ":" + get_time(m);
        msg.amount=(RER_P).toFixed(2);
        msg.des="feeding no." + (i+ct).toString();
        msg.count=i;
        node.send(msg);
    }
}

Half_Day(1,0,0)
Half_Day(13,0,count/2)