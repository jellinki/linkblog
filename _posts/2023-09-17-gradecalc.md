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
  <img src="{{site.baseurl}}/images/championslink.gif" alt="The Champions, The Legend of Zelda: Age of Calamity" />
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
            if (value !== '' && parseFloat(value)) {
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

// Deletes an input line or clears its value (only clears the first cell)
function deleteInputLine(index) {
    var scoreElement = document.getElementById(index);
    var inputElement = document.querySelector('input[id="' + index + '"]');
    var deleteButton = document.querySelector('button[for="' + index + '"]');
    var labelElement = document.querySelector('label[for="' + index + '"]');
    var brElement = document.querySelector('br[for="' + index + '"]');

    if (index === 1) {
        if (inputElement) {
            inputElement.value = ''; // Clear the input value of the first cell
            inputElement.className = ''; // Reset the background color
            // Reset the total, count, and average when the first cell is cleared
            document.getElementById('total').innerHTML = '0.0';
            document.getElementById('count').innerHTML = '0.0';
            document.getElementById('average').innerHTML = '0.0';
        }
    } else {
        if (scoreElement) {
            scoreElement.remove();
        }

        if (inputElement) {
            inputElement.remove();
        }

        if (deleteButton) {
            deleteButton.remove();
        }

        if (labelElement) {
            labelElement.remove();
        }

        if (brElement) {
            brElement.remove();
        }

        // Decrement the current index
        currentIndex--;

        // Reassign IDs and labels to remaining input elements
        for (var i = index + 1; i <= currentIndex; i++) {
            var prevIndex = i - 1;
            document.getElementById(i).id = prevIndex;
            document.querySelector('label[for="' + i + '"]').htmlFor = prevIndex;
            document.querySelector('br[for="' + i + '"]').setAttribute('for', prevIndex);
            document.querySelector('button[for="' + i + '"]').setAttribute('for', prevIndex);
        }

        // Recalculate totals when cells are deleted
        calculator({ key: "Tab" });

        // Automatically focus on the next input cell (if it exists)
        var nextIndex = index + 1;
        var nextInput = document.getElementById(nextIndex);

        if (nextInput) {
            nextInput.focus();
        }
    }
}

// Function to set the input field's color based on the entered value
function setColor(input) {
    var value = parseFloat(input.value);
    if (isNaN(value)) {
        input.className = ''; // Reset the class
    } else if (value <= 60) {
        input.className = 'red';
    } else if (value <= 80) {
        input.className = 'yellow';
    } else {
        input.className = 'green';
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
        deleteInputLine(currentIndex - 1);
    };
    deleteButton.setAttribute('for', currentIndex); // Add this line to set the "for" attribute

    document.getElementById("scores").appendChild(deleteButton);

    // Add a label for each score element
    var title = document.createElement('label');
    title.htmlFor = currentIndex;
    title.innerHTML = currentIndex + '. '; // Update cell labeling
    document.getElementById("scores").appendChild(title); // add to HTML

    // Setup score element and attributes
    var score = document.createElement("input"); // input element
    score.id = currentIndex;  // id of input element
    score.onkeydown = calculator; // Each key triggers event (using function as a value)
    score.type = "number"; // Use text type to allow typing multiple characters
    score.name = "score";  // name is used to group all "score" elements (array)
    score.style.textAlign = "right";
    score.style.width = "5em";

    // Add an input event listener to update the color as the user types
    score.addEventListener('input', function () {
        setColor(score);
    });

    document.getElementById("scores").appendChild(score);  // add to HTML

    // Create and add a line break after the input box
    var br = document.createElement("br");  // line break element
    br.setAttribute('for', currentIndex); // Set the "for" attribute for the line break
    document.getElementById("scores").appendChild(br); // add to HTML

    // Set focus on the new input line
    document.getElementById(currentIndex).focus();

    // Increment the current index for the next input
    currentIndex++;
}

// Call setColor for existing input elements when the page loads
document.addEventListener("DOMContentLoaded", function () {
    for (var i = 1; i <= currentIndex; i++) {
        var input = document.getElementById(i);
        if (input) {
            setColor(input);
        }
    }
});

// Creates 1st input box on Window load
newInputLine();

</script>