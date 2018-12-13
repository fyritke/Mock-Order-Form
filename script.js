// =====================
//      code by: fy   
//   http://fyritke.us
// =====================

// todo move all calculations for price into a diff fxn called updateTotal; call it from getReceipt and the entire <form>'s onclick property

function getReceipt() {
     // initialize!
     // ===========================================================================
     var subTotal = 0, // cost of order
     receiptText = "", // used to display order to customer
     selectedSize = ["", 0], // selected pizza size, its cost*/
     selectedExtras = [[], 0], // [selected extra options], their total cost
     selectedToppings = [[], 0], // [meatOptions[] + vegOptions[]], total cost of toppings
     toppingInfo = [[], []]; // [meatOptions[], meatCost], [vegOptions[], vegCost]

     // find all pizza options selected by customer
     // ===========================================================================
     var sizeOptions = document.getElementsByName("optsize"),
     extraOptions = document.getElementsByClassName("extra3"), // $3 extra items
     meatOptions = document.getElementsByName("optmeat"),
     vegOptions = document.getElementsByName("optveg");

     // determine size of the pizza and set base cost
     // ===========================================================================
     for (var i = 0; i < sizeOptions.length; i++) {
          if (sizeOptions[i].checked) {
               selectedSize = [sizeOptions[i].parentElement.innerText, Number(sizeOptions[i].value)]; // gets name of size option from its parent label, records its cost [in this case it's .value]
          }
     }

     // determine which/how many $3 extras there are
     // ===========================================================================
     for (var l = 0; l < extraOptions.length; l++) {
          if (extraOptions[l].checked) {
               selectedExtras[0].push(extraOptions[l].value);
          }
     }
     selectedExtras[1] = Number(selectedExtras[0].length) * 3; // fine for now bc every extra is $3
     console.log("size - " + selectedSize[0]);
     console.log("extras - " + selectedExtras[0]);

     // gather toppings together as one and tabulate their total cost
     // ===========================================================================
     toppingInfo = [tabulateToppings(meatOptions), tabulateToppings(vegOptions)];
     selectedToppings[0] = toppingInfo[0][0].concat(toppingInfo[1][0]); // names of toppings
     selectedToppings[1] = Number(toppingInfo[0][1] + toppingInfo[1][1]); // cost of toppings
     console.log("toppings - " + selectedToppings[0] + selectedToppings[1]);

     // calculate total price
     // ===========================================================================
     subTotal = selectedSize[1] + selectedExtras[1] + selectedToppings[1];
     document.getElementById("subtotal").innerHTML = "$" + subTotal + ".00";  // todo not working properly
     console.log("total - $" + subTotal + ".00");

     // prepare receipt
     // todo add other options to receipt and adjust code accordingly
     // todo display each item in a table w/ its cost in same row
     // ===========================================================================
     receiptText = "<h3>You Ordered:</h3>";  // todo make into a header that always shows with receipt frame and delete this
     receiptText = receiptText + selectedSize[0] + "<br>with "; // todo get rid of 'receiptText + '
     //      receipt = receipt + stuffedCrust.value;
     //      if (!extraCheese) {
     //           receipt = receipt + " and<br>";
     //      } else {
     //           receipt = receipt + ", ";
     //      }
     //      console.log("stuffed crust = " + stuffedCrust)
     // }

     // document.getElementById("showText").innerHTML=txt1; // receipt

     // todo - order like:
     // collect size, extra3s, and toppings
     // call tabulateOrder
          // tabOrder decides the price based on all the options
     // format and return receipt

     // todo make it so that receipt stays on same page/loads modal on same page
     // todo make it so you can't send the form if all the radio buttons aren't complete; ignore the meat/veg checks
     // todo if feeling fancy, make it so they ping the unfinished forms in red or something

};

// gathers and tabulates cost of selected meat toppings
// ===========================================================================
function getMeat(meatOptions) {
     var meatCost = 0, // price of meat options
     selectedMeats = [], // names of the chosen meat options
     meatInfo = [[], 0]; // [names of meat options], cost

     // ascertain chosen meat options
     for (var j = 0; j < meatOptions.length; j++) {
          if (meatOptions[j].checked) {
               selectedMeats.push(meatOptions[j].value);
          }
     }

     // one free meat topping; each further meat option adds $1
     if (selectedMeats.length > 1) {
          meatCost = (selectedMeats.length - 1);
     } else {
          meatCost = 0;
     }
     
     meatInfo = [selectedMeats, meatCost];
     console.log(meatInfo);
     return meatInfo;
};

// // gathers and tabulates cost of selected toppings
// // ===========================================================================
// function tabulateToppings(providedOptions) {
//      var toppingCost = 0, // price of chosen options
//      selectedTops = [], // names of the chosen options
//      returnToppings = [[], 0]; // [names of chosen options], cost

//      // ascertain chosen options
//      for (var j = 0; j < providedOptions.length; j++) {
//           if (providedOptions[j].checked) {
//                selectedTops.push(providedOptions[j].value);
//           }
//      }

//      // one free topping from either category; each further option adds $1
//      if (selectedTops.length > 1) {
//           toppingCost = (selectedTops.length - 1);
//      } else {
//           toppingCost = 0;
//      }
     
//      returnToppings = [selectedTops, toppingCost];
//      console.log(returnToppings);
//      return returnToppings;
// };

// gathers and tabulates cost of selected vegetable toppings
// ===========================================================================
function getVeg(vegOptions) { // tabulates cost of selected veggie addon options
     var vegCost = 0, // price of veggie options
     selectedVeggies = [], // names of the chosen veggie options
     vegInfo = [[], 0]; // [names of veggie options], cost

     // ascertain chosen veggie options
     for (var k = 0; k < vegOptions.length; k++) {
          if (vegOptions[k].checked) {
               selectedVeggies.push(vegOptions[k].value);
          }
     }

     // one free veggie topping; each further veg option adds $1
     if (selectedVeggies.length > 1) {
          vegCost = (selectedVeggies.length - 1);
     } else {
          vegCost = 0;
     }
     
     vegInfo = [selectedVeggies, vegCost];
     console.log(vegInfo);
     return vegInfo;
};