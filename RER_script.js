var type=parseInt(msg.type)
var weight=parseFloat(msg.weight).toFixed(2)
var RER;
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
}
case (5):
    ty=2.5;  break;
}

if(weight < 2.6){
RER=53.7*weight
} else if (x > 6.6){
RER=131.8 *weight
} else {
RER=46.8*weight
}
RER=(RER*ty)
RER= parseFloat(RER).toFixed(2);


var change=msg.RER-msg.sum;
var oldamount=parseFloat(msg.payload[i].amount)
for (let i = 0; i < msg.payload.length; i++) {
    var amount=oldamount+(change*(oldamount/sum))
    msg.payload[i].amount=amount;
    const el = msg.payload[i];
    const entries = Object.entries(el).map(([topic, payload]) => ({ topic, payload, row: (i+1) }));
    node.send(msg.payload[i]);
}

var RER=msg.RER;

msg.payload.time="7:00"
msg.payload.amount=0.2*RER;
msg.payload.des="morning feeding"
node.send(msg.payload[i]);

msg.payload.time="12:00"
msg.payload.amount=0.3*RER;
msg.payload.des="afternoon feeding"
node.send(msg.payload[i]);

msg.payload.time="17:00"
msg.payload.amount=0.3*RER;
msg.payload.des="eveing feeding"
node.send(msg.payload[i]);

msg.payload.time="22:00"
msg.payload.amount=0.2*RER;
msg.payload.des="night feeding"
node.send(msg.payload[i]);