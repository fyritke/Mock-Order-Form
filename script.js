// =====================
//      code by: fy   
//   http://fyritke.us
// =====================

// todo move all calculations for price into a diff fxn called updateTotal; call it from getReceipt and the entire <form>'s onclick property
// todo make it so that receipt stays on same page/loads modal on same page
// todo make it so you can't send the form if all the radio buttons aren't complete; ignore the meat/veg checks
// todo if feeling fancy, make it so they ping the unfinished forms in red or something
// big todo make your own cart and allow adding multiple pizzas

// ===========================================================================
// main function which grabs the receipt and is triggered by Finalize button
// ===========================================================================
function getReceipt() {
     // initialize!
     // ===========================================================================
     
     var subTotal = 0, // cost of order
     receiptText = "", // used to display order to customer
     selectedSize = ["", 0], // selected pizza size, its cost*/
     selectedExtras = [[], 0], // [selected extra options], their total cost
     selectedToppings = [[], 0], // [meatOptions[] + vegOptions[]], total cost of toppings
     allOptions = [], // selectedExtras + selectedToppings
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

     // prepares and formats receipt
     // todo add other options to receipt and adjust code accordingly
     // todo display each item in a table w/ its cost in same row
     // ===========================================================================

     receiptText = "<h3>Your Order:</h3>";  // todo make into a header that always shows with receipt frame and delete this
     receiptText = receiptText + selectedSize[0] + "<br>with "; // todo get rid of 'receiptText + '
     allOptions = selectedExtras[0].concat(selectedToppings[0]);
     for (var m = (allOptions).length; m > 0; m--) {
          if (m > 1) {
               receiptText = receiptText + allOptions[(allOptions).length - m] + ",<br>";
          } else {
               receiptText = receiptText + "and " + allOptions[(allOptions).length - m] + "."
          }
     }
     console.log(receiptText);
     // document.getElementById("showText").innerHTML=txt1; // todo place receipt
};


// ===========================================================================
// fxn to gather and tabulate cost of selected toppings
// ===========================================================================

function tabulateToppings(providedOptions) {
     var toppingCost = 0, // price of chosen options
     selectedTops = [], // names of the chosen options
     returnToppings = [[], 0]; // [names of chosen options], cost

     // ascertain chosen options
     for (var j = 0; j < providedOptions.length; j++) {
          if (providedOptions[j].checked) {
               selectedTops.push(providedOptions[j].value);
          }
     }

     // one free topping from either category; each further option adds $1
     if (selectedTops.length > 1) {
          toppingCost = (selectedTops.length - 1);
     } else {
          toppingCost = 0;
     }
     
     returnToppings = [selectedTops, toppingCost];
     console.log(returnToppings);
     return returnToppings;
};