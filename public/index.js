'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database

const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];


const getBar = id => bars.find(bar => bar.id === id)
const getEvent = id => events.find(event => event.id === id)

  const discount = persons => {
    if (persons > 60) {
      return 0.5;
    }

    if (persons > 20) {
      return 0.3;
    }

    if (persons > 10) {
      return 0.1;
    }

    return 0;
  };
events.forEach(event =>{

const barId = event.barId;
const time = event.time;
const persons = event.persons;
const bar = getBar(barId);
const commission = event.commission

event.price = (time * bar.pricePerHour + persons * bar.pricePerPerson)*(1 - discount(persons));
event.commissionprice = event.price * 0.3;
commission.insurance = event.commissionprice * 0.5;
commission.treasury = persons;
commission.privateaser = event.commissionprice - commission.insurance - commission.treasury;

if(event.options.deductibleReduction == true){
event.finalprice = event.price + persons;
commission.afterprivateaser = commission.privateaser + persons;
}
else if(event.options.deductibleReduction == false){
event.finalprice = event.price;
commission.afterprivateaser = commission.privateaser;
}
})

actors.forEach(actor =>{

const eventId = actor.eventId;
const event = getEvent(eventId);
const commission = event.commission;

actor.payment.forEach(payment =>{

if(payment.who == 'booker'){
    payment.amount = event.finalprice;
    }
    else if(payment.who == 'bar'){
        payment.amount = event.price - event.commissionprice;
        }
    else if(payment.who == 'insurance'){
        payment.amount = commission.insurance;
        }
    else if(payment.who == 'treasury'){
        payment.amount = commission.treasury;
        }
    else if(payment.who == 'privateaser'){
        payment.amount = commission.afterprivateaser;
        }

})

})



console.log(bars);
console.log(events);
console.log(actors);
