function getReceipt() {
     var txt1 = "<h3>You Ordered:</h3>",
     subTotal = 0,
     sizeCost = 0,
     sizeOptions = document.getElementsByName("optsize");

     for (var i = 0; i < sizeOptions.length; i++) {
          if (sizeOptions[i].checked) {
               var selectedSize = sizeOptions[i].value;
               txt1 = txt1 + selectedSize + "<br>with ";
          }
     }
     
     if (selectedSize === "Personal Pizza") {
          sizeCost = 6;
     } else if (selectedSize === "Medium Pizza") {
          sizeCost = 10;
     } else if (selectedSize === "Large Pizza") {
          sizeCost = 14;
     } else if (selectedSize === "Extra-Large Pizza") {
          sizeCost = 16;
     }

     subTotal = sizeCost;
     console.log(selectedSize + " = $" + sizeCost + ".00");
     console.log("size txt1: " + txt1);
     console.log("subtotal: $" + subTotal + ".00");

     getMeat(subTotal, txt1); 
};

function getMeat(subTotal, txt1) { // might need put in other fxn
     var meatCost = 0,
     selectedMeats = [],
     meatOptions = document.getElementsByName("optmeat"),
     meatCount = 0;

     for (var j = 0; j < meatOptions.length; j++) {
          if (meatOptions[j].checked) {
               selectedMeats.push(meatOptions[j].value);
               console.log("selected meat item: (" + meatOptions[j].value + ")");
               txt1 = txt1 + meatOptions[j].value + "<br>";
          }
     }

     meatCount = selectedMeats.length;

     if (meatCount > 1) {
          meatCost = (meatCount - 1);
     } else {
          meatCost = 0;
     }
     
     subTotal = (subTotal + meatCost);
     console.log("total selected meat items: "+ meatCount);
     console.log(meatCount+" meat - 1 free meat = " + "$"+meatCost+".00");
     console.log("meat txt1: "+ txt1);
     console.log("Purchase Total: "+"$"+subTotal+".00");
     // document.getElementById("showText").innerHTML=txt1; // receipt
     document.getElementById("subtotal").innerHTML = "$" + subTotal + ".00";
};