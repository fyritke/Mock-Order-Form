// =====================
//      code by: fy   
//   http://fyritke.us
// =====================
// todo if feeling fancy, make it so they ping the unfinished forms in red or something
// big todo make your own cart and allow adding multiple pizzas

tabBill();

// ===========================================================================
// main function which grabs the receipt and is triggered by Finalize button
// ===========================================================================
function getReceipt() {
     // prepares and formats receipt
     // ===========================================================================
     var recTotal = 0, // cost of order
     recSize = ["", 0], // [selected pizza size, its cost]
     recCrust = ["", 0], // [selected crust, its cost]
     recSauce = "", // selected sauce
     recCheese = ["", 0], // [selected cheese, its cost]
     recToppings = [[], 0], // [[meatOptions[] + vegOptions[]], total cost of toppings]
     formatToppings = ""; // reusable text for formatting toppings
     
     var tabInfo = [/*[], [], [], [], [], []*/]; // holds the bill
     tabInfo = tabBill();
     recTotal = tabInfo[0];
     recSize = tabInfo[1];
     recCrust = tabInfo[2];
     recSauce = tabInfo[3];
     recCheese = tabInfo[4];
     recToppings = tabInfo[5];

     // hook details of pizza to modal
     // ===========================================================================
     $("#ordrSize").html(recSize[0]);
     $("#ordrCrust").html(recCrust[0] + " Crust");
     $("#ordrSauce").html(recSauce + " Sauce");
     $("#ordrCheese").html(recCheese[0] + " Cheese");
     for (var o = 0; o < recToppings[0].length; o++) {
          formatToppings = formatToppings + recToppings[0][o] + "<br>";
     }
     $("#ordrToppings").html(formatToppings);

     // hook subtotals of items to modal
     // ===========================================================================
     $("#ordrSizeST").html("$" + recSize[1]);
     if (recCrust[1] != 0) {
          $("#ordrCrustST").html("$" + recCrust[1]);
     } else {
          $("#ordrCrustST").html("");
     }
     if (recCheese[1] != 0) {
          $("#ordrCheeseST").html("$" + recCheese[1]);
     } else {
          $("#ordrCheeseST").html("");
     }
     if (recToppings[1] != 0) {
          $("#ordrToppingsST").html("$" + recToppings[1]);
     } else {
          $("#ordrToppingsST").html("");
     }

     // finally, update total, reset order form, and call modal
     // ===========================================================================
     $("#ordrTtl").html("$" + recTotal + ".00");
     clearOrder();
     $('#modalReceipt').modal('show');
};

// ===========================================================================
// records entire bill and updates the total
// ===========================================================================
function tabBill() {
     console.log("executing");
     // find all pizza options selected by customer
     // ===========================================================================
     var subTotal = 0, // cost of order
     selectedSize = ["", 0], // [selected pizza size, its cost]*/
     selectedCrust = ["", 0], // selected Crust
     selectedSauce = "", // selected Sauce
     selectedCheese = ["", 0], // selected Cheese
     selectedToppings = [[], 0], // [[meatOptions[] + vegOptions[]], total cost of toppings]
     toppingInfo = [[], []]; // [meatOptions[], meatCost], [vegOptions[], vegCost]

     var sizeOptions = document.getElementsByName("optsize"),
     crustOptions = document.getElementsByName("optcrust"),
     sauceOptions = document.getElementsByName("optsauce"),
     cheeseOptions = document.getElementsByName("optcheese"),
     meatOptions = document.getElementsByName("optmeat"),
     vegOptions = document.getElementsByName("optveg");

     // record size of pizza and base cost
     // ===========================================================================
     for (var i = 0; i < sizeOptions.length; i++) {
          if (sizeOptions[i].checked) {
               selectedSize = [sizeOptions[i].parentElement.innerText, Number(sizeOptions[i].value)]; // gets name of size option from its parent label, records its cost [in this case it's .value]
          }
     }

     // record crust and cost
     // ===========================================================================
     for (var l = 0; l < crustOptions.length; l++) {
          if (crustOptions[l].checked) {
               selectedCrust[0] = crustOptions[l].parentElement.innerText;
               if (crustOptions[l].classList.contains("extra3")) {
                    selectedCrust[1] = 3;
               }
          }
     }

     // record which sauce was chosen
     // ===========================================================================
     for (var k = 0; k < sauceOptions.length; k++) {
          if (sauceOptions[k].checked) {
               selectedSauce = sauceOptions[k].parentElement.innerText;
               if (selectedSauce == "None") {
                    selectedSauce = "No";
               }
          }
     }

     // record cheese and cost
     // ===========================================================================
     for (var m = 0; m < cheeseOptions.length; m++) {
          if (cheeseOptions[m].checked) {
               selectedCheese[0] = cheeseOptions[m].parentElement.innerText;
               if (cheeseOptions[m].classList.contains("extra3")) {
                    selectedCheese[1] = 3;
               }
          }
     }

     toppingInfo = [tabulateToppings(meatOptions), tabulateToppings(vegOptions)];
     selectedToppings[0] = toppingInfo[0][0].concat(toppingInfo[1][0]); // names of toppings
     selectedToppings[1] = Number(toppingInfo[0][1] + toppingInfo[1][1]); // cost of toppings

     // calculate total price and update
     // ===========================================================================
     subTotal = selectedSize[1] + selectedCrust[1] + selectedCheese[1] + selectedToppings[1];
     $("#subtotal").html("$" + subTotal + ".00");
     return [subTotal, selectedSize, selectedCrust, selectedSauce, selectedCheese, selectedToppings];
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
     // console.log(returnToppings);
     return returnToppings;
};

// ===========================================================================
// wipes order clean
// ===========================================================================
function clearOrder() {
     $('#frmOrder').trigger("reset");
     tabBill();
};