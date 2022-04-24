//find new RER
function RER(type, weight) {
    var RER=0;
    var ty;
    switch(type){
    case (1):
        ty=1.2;  break;
    case (2):
        ty=1.4;  break;
    case (3):
        ty=1.0;  break;
    case (4):
        ty=0.8;  break;
    case (5):
        ty=2.5;  break;
    }
    
    if(weight < 2.6){
    RER=53.7*weight
    } else if (weight > 6.6){
    RER=131.8 *weight
    } else {
    RER=46.8*weight
    }
    RER=(RER*ty)
    RER= parseFloat(RER).toFixed(2);
    return RER;
}

var type=parseInt(msg.type)
var weight=parseFloat(msg.weight).toFixed(2)
msg.RER=parseFloat(RER(type, weight))
return msg;

//find sum RER
var sum=0;
for (var i = 0; i < msg.payload.length; i++) {
    sum+=parseInt(msg.payload[i].amount);
}
msg.sum=sum
return msg

//edit amount
var sum=parseFloat(msg.sum);
var change=msg.RER-msg.sum;
global.set("schecount",msg.payload.length-1);

for (let i = 0; i < msg.payload.length; i++) {
    var oldamount=parseFloat(msg.payload[i].amount)
    var amount=oldamount+(change*(oldamount/sum))
    msg.payload[i].amount=amount.toFixed(2);
    
    const el = msg.payload[i];
    var index=i;
    const entries = Object.entries(el).map(([topic, payload]) => ({ topic, payload, row: (index+1) }));
    
    msg.payload[i].req=msg.req;
    msg.payload[i].res=msg.res;
    msg.payload[i].count=i;
    node.send(msg.payload[i]);
}

//add table
var RER=msg.RER;
var count = RER/30;

global.set("schecount",3);

msg.time="07:00"
msg.amount=(0.2*RER).toFixed(2);
msg.des="morning feeding"
msg.count=0;
node.send(msg);

msg.time="12:00"
msg.amount=(0.3*RER).toFixed(2);
msg.des="afternoon feeding"
msg.count=1;
node.send(msg);

msg.time="17:00"
msg.amount=(0.3*RER).toFixed(2);
msg.des="evening feeding"
msg.count=2;
node.send(msg);

msg.time="22:00"
msg.amount=(0.2*RER).toFixed(2);
msg.des="night feeding"
msg.count=3;
node.send(msg);