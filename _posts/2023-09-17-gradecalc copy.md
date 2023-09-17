---
toc: true
comments: true
layout: post
title:  Grade Input Calculator
subtitle: Katelyn Gelle
cover-img: /images/swordplaylink.gif
description: My modification of the JS Grade Input Calculator!
type: hacks
courses: { csse: {week: 5} }
categories: [C1.4]
---

<div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
  <img src="{{site.baseurl}}/images/canyouhearmelink.gif" alt="Zelda's Crystal, The Legend of Zelda: Skyward Sword" />
</div>  

%%html

<!-- Help Message -->
<h3>Input scores, press tab to add each new number.</h3>
<!-- Totals -->
<ul>
    <li>
        Total : <span id="total">0.0</span>
        Count : <span id="count">0.0</span>
        Average : <span id="average">0.0</span>
    </li>
</ul>
<!-- Rows added using scores ID -->
<div id="scores">
    <!-- javascript generated inputs -->
</div>

<style>
    /* Add CSS for color coding */
    .red {
        background-color: red;
        color: white;
    }
    
    .yellow {
        background-color: yellow;
    }
    
    .green {
        background-color: green;
        color: white;
    }
</style>

<script>
// Keep track of the current index
var currentIndex = 1;

// Executes on input event and calculates totals
function calculator(event) {
    var key = event.key;
    // Check if the pressed key is the "Tab" key (key code 9) or "Enter" key (key code 13)
    if (key === "Tab" || key === "Enter") { 
        event.preventDefault(); // Prevent default behavior (tabbing to the next element)
   
        var array = document.getElementsByName('score'); // setup array of scores
        var total = 0;  // running total
        var count = 0;  // count of input elements with valid values

        for (var i = 0; i < array.length; i++) {  // iterate through array
            var value = array[i].value;
            if (parseFloat(value)) {
                var parsedValue = parseFloat(value);
                total += parsedValue;  // add to running total
                count++;
            }
        }

        // update totals
        document.getElementById('total').innerHTML = total.toFixed(2); // show two decimals
        document.getElementById('count').innerHTML = count;

        if (count > 0) {
            document.getElementById('average').innerHTML = (total / count).toFixed(2);
        } else {
            document.getElementById('average').innerHTML = "0.0";
        }

        // adds newInputLine, only if all array values satisfy parseFloat 
        if (count === document.getElementsByName('score').length) {
            newInputLine(); // make a new input line
        }
    }
}

// Deletes an input line
function deleteInputLine(index) {
    var scoreElement = document.getElementById(index);
    var labelElement = document.querySelector('label[for="' + index + '"]');
    var brElement = document.querySelector('br[for="' + index + '"]');

    if (scoreElement) {
        scoreElement.remove();
    }

    if (labelElement) {
        labelElement.remove();
    }

    if (brElement) {
        brElement.remove();
    }

    calculator({ key: "Tab" }); // Recalculate totals
}

// Function to set the input field's color based on the entered value
function setColor(index) {
    var scoreElement = document.getElementById(index);
    if (scoreElement) {
        var value = parseFloat(scoreElement.value);
        if (isNaN(value)) {
            scoreElement.className = ''; // Reset the class
        } else if (value < 60) {
            scoreElement.className = 'red';
        } else if (value >= 60 && value <= 80) {
            scoreElement.className = 'yellow';
        } else {
            scoreElement.className = 'green';
        }
    }
}

// Event listener for input changes
function handleInputChange(event) {
    var key = event.key;
    if (key === "Tab" || key === "Enter") {
        calculator(event);
        var index = event.target.id;
        setColor(index);
    }
}

// Creates a new input box
function newInputLine() {
    // Add a delete button for each score element
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function () {
        deleteInputLine(currentIndex);
    };
    document.getElementById("scores").appendChild(deleteButton);

    // Add a label for each score element
    var title = document.createElement('label');
    title.htmlFor = currentIndex;
    title.innerHTML = currentIndex + ". ";    
    document.getElementById("scores").appendChild(title); // add to HTML

    // Setup score element and attributes
    var score = document.createElement("input"); // input element
    score.id =  currentIndex;  // id of input element
    score.onkeydown = calculator // Each key triggers event (using function as a value)
    score.type = "number"; // Use text type to allow typing multiple characters
    score.name = "score";  // name is used to group all "score" elements (array)
    score.style.textAlign = "right";
    score.style.width = "5em";
    document.getElementById("scores").appendChild(score);  // add to HTML

    // Create and add blank line after input box
    var br = document.createElement("br");  // line break element
    document.getElementById("scores").appendChild(br); // add to HTML

    // Set focus on the new input line
    document.getElementById(currentIndex).focus();

    // Increment the current index for the next input
    currentIndex++;
}

// Creates 1st input box on Window load
newInputLine();

</script>
