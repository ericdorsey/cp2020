/*
 Items to add?
 > test for Javascript in browser
 > Way to report issues / problems / feedback
 > Tie to a database?
 > Option to randomize everything
 > Instructions - can click radio buttons again to refresh / or change to buttons?
 > Run; add a convert to feet field
 > Cleanup console.log debugging
 > Scrolling (eased scrolling?) with dynamic forms popping in below
    http://stackoverflow.com/questions/5007530/how-do-i-scroll-to-an-element-using-javascript
    element = document.getElementById("divFirst")
    alignWithTop = true;
    element.scrollIntoView(alignWithTop);
 > Convert kg to lbs function? (inside updateBodyDerived())
 > Don't allow zero values in statistics fields
 > After get lucky stuff, in disaster, on betray started using methods there.. go back and fix the rest
 > Make the disaster strikes stuff affect main statistics
 > Track money gained / lost from life events
 > Add Age instructions (minimum 17, max 99)
 > Life Events: fix "make an enemy" row .. <td colspan="2"> ?
 > Make updating stats fields affect rolls remaining?
 */

function getRandomInt(min,max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function enableForms() {
    "use strict";
    /*
    Only enable forms after choosing Random or Manual roll method
    We don't disable Run, Leap & Lift because they are derived
    */

    //Statistics fields
    var int = document.getElementById("int");
    var ref = document.getElementById("ref");
    var tech = document.getElementById("tech");
    var cl = document.getElementById("cl");
    var att = document.getElementById("att");
    var lk = document.getElementById("lk");
    var ma = document.getElementById("ma");
    var bt = document.getElementById("bt"); //body type stat
    var emp = document.getElementById("emp");

    var formArr = [int, ref, tech, cl, att, lk, ma, bt, emp];
    for (var i = 0; i < formArr.length; i++) {
        formArr[i].removeAttribute("disabled");
        //formArr[i].onchange = characterMeta.statChange; //re-enable to implement checking stats against roll remaining
    }
}

function updateRun() {
    //set the run derived field
    "use strict";
    var ma = document.getElementById("ma");
    var runDerived = parseInt(ma.value) * 3;
    var run = document.getElementById("run");
    run.value = runDerived;
    updateLeap();
}

function updateLeap() {
    "use strict";
    var run = document.getElementById("run");
    var leapDerived = parseInt(run.value) / 4;
    var leap = document.getElementById("leap");
    leap.value = leapDerived;
}

function updateBodyDerived() {
    "use strict";
    var bt = document.getElementById("bt"); //body type stat
    var bodyTypeInt = parseInt(bt.value); //Convert body type string from field to int
    //console.log(bodyTypeInt + " " + typeof bodyTypeInt);
    var lift = document.getElementById("lift");
    var carry = document.getElementById("carry");
    var liftLBs = document.getElementById("liftLBs");
    var carryLBs = document.getElementById("carryLBs");
    var bodyType = document.getElementById("bodyType"); //derived body type
    var btm = document.getElementById("btm"); //body type modifier

    lift.value = bodyTypeInt * 40;
    carry.value = bodyTypeInt * 10;
    liftLBs.value = parseInt(lift.value) * 2.2046; //Convert kg to lbs
    carryLBs.value = parseInt(carry.value) * 2.2046;

    if (bodyTypeInt <= 2) {
        bodyType.value = "Very Weak";
        btm.value = -0;
    } else if (bodyTypeInt >= 3 && bodyTypeInt <= 4) {
        bodyType.value = "Weak";
        btm.value = -1;
    } else if (bodyTypeInt >= 5 && bodyTypeInt <= 7) {
        bodyType.value = "Average";
        btm.value = -2;
    } else if (bodyTypeInt >= 8 && bodyTypeInt <= 9) {
        bodyType.value = "Strong";
        btm.value = -3;
    } else if (bodyTypeInt === 10) {
        bodyType.value = "Very Strong";
        btm.value = -4;
    } else if (bodyTypeInt >= 11) {
        bodyType.value = "Cybernetically Enhanced";
        btm.value = -5;
    }
}

function rollStyleClick() {
    "use strict";
    //Clothes, Hair, Affectations Selection Dropdowns
    var manualClothesSelect = document.getElementById("manualClothesSelect");
    var manualHairSelect = document.getElementById("manualHairSelect");
    var manualAffecSelect = document.getElementById("manualAffecSelect");

    manualClothesSelect.style.display = "none";
    manualHairSelect.style.display = "none";
    manualAffecSelect.style.display = "none";

    var clothesRoll = getRandomInt(1,10); //clothes Object
    var hairRoll = getRandomInt(1,10); //hairStyle Object
    var affecRoll = getRandomInt(1,10); //affectations Object

    //Output fields for Clothes, Hair, Affectations
    var clothesField = document.getElementById("clothesField");
    var hairField = document.getElementById("hairField");
    var affecField = document.getElementById("affecField");

    clothesField.value = clothes[clothesRoll];
    hairField.value = hairStyle[hairRoll];
    affecField.value = affectations[affecRoll];
}

function manualStyleClick() {
    "use strict";
    //Clothes, Hair, Affectations Selection Dropdowns
    var manualClothesSelect = document.getElementById("manualClothesSelect");
    var manualHairSelect = document.getElementById("manualHairSelect");
    var manualAffecSelect = document.getElementById("manualAffecSelect");

    manualClothesSelect.style.display = "block";
    manualHairSelect.style.display = "block";
    manualAffecSelect.style.display = "block";

    var clothesLength = Object.keys(clothes).length;
    var hairStyleLength = Object.keys(hairStyle).length;
    var affecLength = Object.keys(affectations).length;

    //Build the clothes selection dropdown
    for (var i = 1; i <= clothesLength; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = clothes[i];
        manualClothesSelect.appendChild(opt);
    }

    //Build the hair selection dropdown
    for (var iter2 = 1; iter2 <= hairStyleLength; iter2++) {
        var opt2 = document.createElement("option");
        opt2.value = iter2;
        opt2.textContent = hairStyle[iter2];
        manualHairSelect.appendChild(opt2);
    }

    //Build the affectatons selection dropdown
    for (var iter3 = 1; iter3 <= affecLength; iter3++) {
        var opt3 = document.createElement("option");
        opt3.value = iter3;
        opt3.textContent = affectations[iter3];
        manualAffecSelect.appendChild(opt3);
    }

    //Update each clothes, hair, affec output text field at time of clicking Manual radio button
    manualClothesSelectChange();
    manualHairSelectChange();
    manualAffecSelectChange();
}

function manualClothesSelectChange() {
    "use strict";
    var clothesField = document.getElementById("clothesField");
    var manualClothesSelect = document.getElementById("manualClothesSelect");
    clothesField.value = manualClothesSelect.options[manualClothesSelect.selectedIndex].text;
}

function manualHairSelectChange() {
    "use strict";
    var hairField = document.getElementById("hairField");
    var manualHairSelect = document.getElementById("manualHairSelect");
    //Get the actual text of the selected dropdown
    hairField.value = manualHairSelect.options[manualHairSelect.selectedIndex].text;
}

function manualAffecSelectChange() {
    "use strict";
    var affecField = document.getElementById("affecField");
    var manualAffecSelect = document.getElementById("manualAffecSelect");
    affecField.value = manualAffecSelect.options[manualAffecSelect.selectedIndex].text;
}

function rollEthClick() {
    "use strict";
    var manualEthSelect = document.getElementById("manualEthSelect");
    var manualLangSelect = document.getElementById("manualLangSelect");

    manualEthSelect.style.display = "none";
    manualLangSelect.style.display = "none";

    var ethRoll = (getRandomInt(1,10) - 1);
    //console.log("\nethRoll: " + ethRoll);
    var langLength = ethnic.origins[ethRoll].languages.length;
    var langChoice = Math.floor(Math.random() * langLength);
    //console.log("langChoice: " + langChoice);
    //console.log("langLength: " + langLength);
    var ethField = document.getElementById("ethField");
    var ethLang = document.getElementById("ethLang");

    ethField.value = ethnic.origins[ethRoll].origin;
    ethLang.value = ethnic.origins[ethRoll].languages[langChoice];
}

function manualEthClick() { //Manual ethnicity radio button clicked
    "use strict";
    //console.log("manualEthClick() fired");
    var manualEthSelect = document.getElementById("manualEthSelect");
    var manualLangSelect = document.getElementById("manualLangSelect");

    manualEthSelect.style.display = "block";
    manualLangSelect.style.display = "block";
    //var langLength = ethnic.origins[ethRoll].languages.length;
    var ethLength = ethnic.origins.length;

    //Build the Ethnicity dropdown
    for (var i = 1; i <= ethLength; i++) {
        var counter = i -1;
        //console.log("i is: " + i);
        //console.log("counter: " + counter);
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = ethnic.origins[counter].origin;
        manualEthSelect.appendChild(opt);
    }
    updateLang();
    manualLangSelectChange();
}

function clearLang() {
    "use strict";
    var manualLangSelect = document.getElementById("manualLangSelect");
    //console.log("\n** clearLang() fired; begin **");

    //Clean (clear) the languages dropdown
    while (manualLangSelect.firstChild) { //Remove all children (options) from manualLangSelect
        manualLangSelect.removeChild(manualLangSelect.firstChild);
    }
    //console.log("** clearLang() fired; end **");
}

function updateLang() { //update the languages dropdown based on ethnicity selection
    "use strict";
    clearLang();
    var manualLangSelect = document.getElementById("manualLangSelect");
    var manualEthSelect = document.getElementById("manualEthSelect");

    //Get the index value of selected Ethnicity dropdown
    var ethCurrIndex = manualEthSelect.options[manualEthSelect.selectedIndex].value;
    ethCurrIndex = ethCurrIndex - 1; //offset by -1 for ref. length of languages array
    //console.log(ethCurrIndex);
    var currLangLength = ethnic.origins[ethCurrIndex].languages.length;
    //console.log(currLangLength);

    //Build the languages dropdown
    for (var i = 1; i <= currLangLength; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = ethnic.origins[ethCurrIndex].languages[i - 1];
        //console.log("opt.textContent: " + opt.textContent);
        manualLangSelect.appendChild(opt);
    }

    //Update the ethnicity and language output
    manualEthSelectChange();
    manualLangSelectChange();
}

function manualEthSelectChange() {
    "use strict";
    var ethField = document.getElementById("ethField");
    var manualEthSelect = document.getElementById("manualEthSelect");
    ethField.value = manualEthSelect.options[manualEthSelect.selectedIndex].text;
}

function manualLangSelectChange() {
    "use strict";
    var ethLang = document.getElementById("ethLang");
    var manualLangSelect = document.getElementById("manualLangSelect");
    ethLang.value = manualLangSelect.options[manualLangSelect.selectedIndex].text;
}

function randFamClick() {
    "use strict";
    //console.log("randFamClick() fired");
    var manualFamSelect = document.getElementById("manualFamSelect");
    manualFamSelect.style.display = "none";

    var famRankField = document.getElementById("famRankField");
    var randFamRoll = getRandomInt(1,10);
    famRankField.value = famRank[randFamRoll];
}

function manualFamClick() {
    "use strict";
    //console.log("manualFamClick() fired");
    var manualFamSelect = document.getElementById("manualFamSelect");
    manualFamSelect.style.display = "block";

    var famRankLength = Object.keys(famRank).length;
    //Build the Family Rank dropdown
    //console.log("famRank.length: " + famRankLength);
    for (var i=1; i <= famRankLength; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = famRank[i];
        manualFamSelect.appendChild(opt);
    }
    //auto populate the famRankField on first build of Family Rank dropdown
    manualFamSelectChange();
}

function manualFamSelectChange() {
    "use strict";
    var manualFamSelect = document.getElementById("manualFamSelect");
    var famRankField = document.getElementById("famRankField");
    famRankField.value = manualFamSelect.options[manualFamSelect.selectedIndex].text;
}

function randParentsClick() {
    "use strict";
    var randParents = document.getElementById("randParents");
    var manualParents = document.getElementById("manualParents");
    var parentStatusField = document.getElementById("parentStatusField");
    var manualParentSelect = document.getElementById("manualParentSelect");
    var parentSomethingHappened = document.getElementById("parentSomethingHappened");
    var parentSomethingHappenedField = document.getElementById("parentSomethingHappenedField");

    var parentsOkayRadio = document.getElementById("parentsOkayRadio");
    var parentsIssuesRadio = document.getElementById("parentsIssuesRadio");
    var parentsOkayRadio_label = document.getElementById("parentsOkayRadio_label");
    var parentsIssuesRadio_label = document.getElementById("parentsIssuesRadio_label");

    manualParentSelect.style.display = "none";
    parentsOkayRadio.style.display = "none";
    parentsIssuesRadio.style.display = "none";
    parentsOkayRadio_label.style.display = "none";
    parentsIssuesRadio_label.style.display = "none";
    parentSomethingHappened.style.display = "none";
    parentSomethingHappenedField.style.display = "none"; //hide this initially

    console.log("randParentsClick() fired");
    var randParentRoll = getRandomInt(1,10);
    console.log("randParentRoll: " + randParentRoll);
    if (randParentRoll <= 6) {
        parentStatusField.value = parentStatus.okay;
    } else if (randParentRoll >= 7) {
        //parentSomethingHappened.style.display = "block";
        parentSomethingHappened.style.display = "block";
        parentSomethingHappenedField.style.display = "block";
        //famTragedyHeader.style.display = "block";
        parentStatusField.value = parentStatus.somethingHappened;
        var parentTragedyRoll = getRandomInt(1,10);
        parentSomethingHappenedField.value = parentTragedy[parentTragedyRoll];
    }
}

function manualParentsClick() {
    "use strict";
    var randParents = document.getElementById("randParents");
    var manualParents = document.getElementById("manualParents");
    var parentStatusField = document.getElementById("parentStatusField");
    var manualParentSelect = document.getElementById("manualParentSelect");
    var parentSomethingHappened = document.getElementById("parentSomethingHappened");
    var parentSomethingHappenedField = document.getElementById("parentSomethingHappenedField");

    var parentsOkayRadio = document.getElementById("parentsOkayRadio");
    var parentsIssuesRadio = document.getElementById("parentsIssuesRadio");
    var parentsOkayRadio_label = document.getElementById("parentsOkayRadio_label");
    var parentsIssuesRadio_label = document.getElementById("parentsIssuesRadio_label");

    parentStatusField.value = ""; //clear this if previous selections (manual or random)
    parentsOkayRadio.style.display = "inline";
    parentsIssuesRadio.style.display = "inline";
    parentsOkayRadio_label.style.display = "block";
    parentsIssuesRadio_label.style.display = "block";
    parentSomethingHappened.style.display = "none";
    parentSomethingHappenedField.style.display = "none"; //hide this initially
    console.log("manualParentsClick() fired");
    //Build the manual parent select
    var parentTragedyLength = Object.keys(parentTragedy).length;
    for (var i = 1; i <= parentTragedyLength; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = parentTragedy[i];
        manualParentSelect.appendChild(opt);
    }
}

function parentsOkayRadioClick() {
    "use strict";
    var manualParentSelect = document.getElementById("manualParentSelect");
    var parentSomethingHappened = document.getElementById("parentSomethingHappened");
    var parentSomethingHappenedField = document.getElementById("parentSomethingHappenedField");
    var parentStatusField = document.getElementById("parentStatusField");

    manualParentSelect.style.display = "none";
    parentSomethingHappened.style.display = "none";
    parentSomethingHappenedField.style.display = "none";
    parentStatusField.value = parentStatus.okay;

}

function parentsIssuesRadioClick() {
    "use strict";
    var manualParentSelect = document.getElementById("manualParentSelect");
    var parentSomethingHappened = document.getElementById("parentSomethingHappened");
    var parentSomethingHappenedField = document.getElementById("parentSomethingHappenedField");
    var parentStatusField = document.getElementById("parentStatusField");

    manualParentSelect.style.display = "block"; //Show the issues w/ parents dropdown
    parentSomethingHappened.style.display = "block";
    parentSomethingHappenedField.style.display = "block";
    parentStatusField.value = parentStatus.somethingHappened; //update Status of Parents output
    manualParentSelectChange();
}

function manualParentSelectClick() {
    "use strict";
    var manualParentSelect = document.getElementById("manualParentSelect");
    var parentStatusField = document.getElementById("parentStatusField");
    parentStatusField.value = manualParentSelect.options[manualParentSelect.selectedIndex].text;
}

function manualParentSelectChange() {
    "use strict";
    var manualParentSelect = document.getElementById("manualParentSelect");
    var parentStatusField = document.getElementById("parentStatusField");
    var parentSomethingHappenedField = document.getElementById("parentSomethingHappenedField");
    parentSomethingHappenedField.value = manualParentSelect[manualParentSelect.selectedIndex].text;
}

function randFamilyStatusClick() {
    "use strict";
    var manualFamDanger = document.getElementById("manualFamDanger");
    var manualFamDanger_label = document.getElementById("manualFamDanger_label");
    var manualFamOkay = document.getElementById("manualFamOkay");
    var manualFamOkay_label = document.getElementById("manualFamOkay_label");
    var familyTragedyOutput = document.getElementById("familyTragedyOutput");
    var familyTragedyOutput_label = document.getElementById("familyTragedyOutput_label");
    var familyTragedySelect = document.getElementById("familyTragedySelect");
    var famTragedyHeader = document.getElementById("famTragedyHeader");
    var familyStatus = document.getElementById("familyStatus");

    //console.log(manualFamDanger);
    manualFamDanger.style.display = "none";
    manualFamDanger_label.style.display = "none";
    manualFamOkay.style.display = "none";
    manualFamOkay_label.style.display = "none";
    famTragedyHeader.style.display = "none";
    familyTragedySelect.style.display = "none";
    famTragedyHeader.style.display = "none";

    var famStatusRoll = getRandomInt(1,10);
    if (famStatusRoll <= 6) {
        famTragedyHeader.style.display = "block";
        familyStatus.value = familyStatusOptions.danger;
        familyTragedyOutput.style.display = "inline";
        familyTragedyOutput_label.style.display = "inline";

        var famTragedyRoll = getRandomInt(1,10);
        familyTragedyOutput.value = familyTragedy[famTragedyRoll];
    } else if (famStatusRoll >= 7) {
        familyStatus.value = familyStatusOptions.okay;
        familyTragedyOutput.style.display = "none";
        familyTragedyOutput_label.style.display = "none";
        //familyTragedySelect.style.display = "none";
    }
}

function manualFamilyStatusClick() {
    "use strict";
    var familyStatus = document.getElementById("familyStatus");
    var familyTragedyOutput = document.getElementById("familyTragedyOutput");
    var manualFamDanger = document.getElementById("manualFamDanger");
    var manualFamDanger_label = document.getElementById("manualFamDanger_label");
    var manualFamOkay = document.getElementById("manualFamOkay");
    var manualFamOkay_label = document.getElementById("manualFamOkay_label");
    var famTragedyHeader = document.getElementById("famTragedyHeader");

    familyStatus.value = "";
    familyTragedyOutput.value = "";
    manualFamDanger.style.display = "inline";
    manualFamDanger_label.style.display = "inline";
    manualFamOkay.style.display = "inline";
    manualFamOkay_label.style.display = "inline";
    famTragedyHeader.style.display = "none";
}

function manualFamDangerClick() {
    "use strict";
    var familyStatus = document.getElementById("familyStatus");
    var familyTragedyOutput = document.getElementById("familyTragedyOutput");
    var familyTragedyOutput_label = document.getElementById("familyTragedyOutput_label");
    var familyTragedySelect = document.getElementById("familyTragedySelect");

    familyStatus.value = familyStatusOptions.danger;
    familyTragedyOutput.style.display = "inline";
    familyTragedyOutput_label.style.display = "inline";
    familyTragedySelect.style.display = "inline";

    //Remove all children (options) from familyTragedySelect
    while (familyTragedySelect.firstChild) {
        familyTragedySelect.removeChild(familyTragedySelect.firstChild);
    }

    //Build the family tragedy selection dropdown
    var familyTragedyLength = Object.keys(familyTragedy).length;
    for (var i = 1; i <= familyTragedyLength; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = familyTragedy[i].substring(0,30).concat("...");
        familyTragedySelect.appendChild(opt);
    }
    familyTragedySelectChange(); //push to familyTragedyOutput on first choosing
}

function manualFamOkayClick() {
    "use strict";
    var familyStatus = document.getElementById("familyStatus");
    var familyTragedyOutput = document.getElementById("familyTragedyOutput");
    var familyTragedyOutput_label = document.getElementById("familyTragedyOutput_label");
    var familyTragedySelect = document.getElementById("familyTragedySelect");
    var famTragedyHeader = document.getElementById("famTragedyHeader");

    familyStatus.value = familyStatusOptions.okay;
    familyTragedyOutput.style.display = "none";
    familyTragedyOutput_label.style.display = "none";
    famTragedyHeader.style.display = "none";
    familyTragedySelect.style.display = "none";
}

function familyTragedySelectChange() {
    "use strict";
    var familyTragedyOutput = document.getElementById("familyTragedyOutput");
    var famTragedyHeader = document.getElementById("famTragedyHeader");
    var familyTragedySelect = document.getElementById("familyTragedySelect");

    famTragedyHeader.style.display = "block";
    var famTragedyTemp = familyTragedySelect[familyTragedySelect.selectedIndex].value;
    //console.log(famTragedyTemp);
    familyTragedyOutput.value = familyTragedy[famTragedyTemp];
}

function randChildEnvClick() {
    "use strict";
    var childEnvOutput = document.getElementById("childEnvOutput");
    var manualChildSelect = document.getElementById("manualChildSelect");

    manualChildSelect.style.display = "none";
    var randChildRoll = getRandomInt(1,10);
    childEnvOutput.value = childEnv[randChildRoll];
}

//MANUAL CHILDHOOD ENVIRONMENT
function manualChildEnvClick() {
    "use strict";
    var childEnvOutput = document.getElementById("childEnvOutput");
    var manualChildSelect = document.getElementById("manualChildSelect");
    manualChildSelect.style.display = "inline";

    //Remove all children (options) from manualChildSelect
    while (manualChildSelect.firstChild) {
        manualChildSelect.removeChild(manualChildSelect.firstChild);
    }

    //childEnvOutput.value = "";
    //Build the manual child select dropdown
    for (var i = 1; i <= Object.keys(childEnv).length; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = childEnv[i];
        manualChildSelect.appendChild(opt);
    }
    manualChildSelectChange();
}

function manualChildSelectChange() {
    "use strict";
    var childEnvOutput = document.getElementById("childEnvOutput");
    var manualChildSelect = document.getElementById("manualChildSelect");
    childEnvOutput.value = manualChildSelect[manualChildSelect.selectedIndex].text;
}

function removeElementsByClass(className) {
    "use strict";
    //http://stackoverflow.com/questions/4777077/removing-elements-by-class-name
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function killChildren(myNode) {
    "use strict";
    //var myNode = document.getElementById("foo");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function removeElementById(id) {
    "use strict";
    var removeID = document.getElementById(id);
    //console.log(removeID);
    if (removeID) {
        console.log("found a matching # id to remove");
        removeID.parentNode.removeChild(removeID);
    } else {
        console.log("couldn't find matching #id to remove");
    }

}

function randSiblingsClick() {
    "use strict";
    var numSiblings = getRandomInt(1,10);
    var siblingsOutput = document.getElementById("siblingsOutput");
    killChildren(siblingsOutput);
    var manualSiblingSelect = document.getElementById("manualSiblingSelect");
    manualSiblingSelect.style.display = "none";
    //removeElementById("manualSiblingSelect");

    //var numSiblings = 3;
    var haveSiblings = document.getElementById("haveSiblings");
    //console.log("numSiblings: " + numSiblings);
    if (numSiblings <= 7) {
        haveSiblings.value = "You have ".concat(numSiblings.toString()).concat(" siblings");
        for (var i = 1; i <= numSiblings; i++) {

            var siblingGender = getRandomInt(1,2);
            var siblingAge = getRandomInt(1,10);
            var siblingFeel = getRandomInt(1,10);

            var siblingLabelPar = document.createElement("p");
            var siblingLabelText = "Sibling ";
            siblingLabelText = siblingLabelText + i.toString();
            var siblingLabel = document.createTextNode(siblingLabelText);
            siblingLabelPar.appendChild(siblingLabel);
            console.log(siblingLabelPar);
            siblingLabelPar.setAttribute("class", "dynamicPar");

            //var siblingsOutput = document.getElementById("siblingsOutput");
            siblingsOutput.appendChild(siblingLabelPar);

            var label = document.createElement("label");
            label.innerHTML = "gender";
            label.setAttribute("class", "dynamicGender_label");
            var textBox = document.createElement("input");
            textBox.type = "text";
            textBox.setAttribute("disabled", "true");
            textBox.setAttribute("class", "dynamicGender");
            textBox.value = siblingGenders[siblingGender];

            siblingsOutput.appendChild(label);
            siblingsOutput.appendChild(textBox);

            appendBR(siblingsOutput);
            //var br = document.createElement("br");
            //br.setAttribute("class", "dynamicBR");
            //siblingsContainer.appendChild(br);

            var label2 = document.createElement("label");
            label2.innerHTML = "age";
            label2.setAttribute("class", "dynamicAge_label");
            var textBox2 = document.createElement("input");
            textBox2.type = "text";
            textBox2.setAttribute("disabled", "true");
            textBox2.setAttribute("class", "dynamicAge");
            if (siblingAge <= 5) {
                textBox2.value = siblingAges[1];
            } else if (siblingAge >= 6 && siblingAge <= 9) {
                textBox2.value = siblingAges[2];
            } else if (siblingAge === 10) {
                textBox2.value = siblingAges[3];
            }
            //textBox2.value = siblingGenders[siblingGender];

            siblingsOutput.appendChild(label2);
            siblingsOutput.appendChild(textBox2);

            appendBR(siblingsOutput);

            var label3 = document.createElement("label");
            label3.innerHTML = "feels about you";
            label3.setAttribute("class", "dynamicFeeling_label");
            var textBox3 = document.createElement("input");
            textBox3.type = "text";
            textBox3.setAttribute("disabled", "true");
            textBox3.setAttribute("class", "dynamicFeeling");
            //textBox3.value = siblingGenders[siblingGender];
            if (siblingFeel <= 2) {
                textBox3.value = siblingFeelings[1];
            } else if (siblingFeel >= 3 && siblingFeel <= 4) {
                textBox3.value = siblingFeelings[2];
            } else if (siblingFeel >= 5 && siblingFeel <= 6) {
                textBox3.value = siblingFeelings[3];
            } else if (siblingFeel >= 7 && siblingFeel <= 8) {
                textBox3.value = siblingFeelings[4];
            } else if (siblingFeel >= 9) {
                textBox3.value = siblingFeelings[5];
            }

            siblingsOutput.appendChild(label3);
            siblingsOutput.appendChild(textBox3);

            //Scroll window to bottom
            window.scrollTo(0, document.body.scrollHeight);
        }
    } else if (numSiblings >= 8) {
        haveSiblings.value = "Only child; no siblings";
    }
}

function appendBR (toParent) {
    "use strict";
    var br = document.createElement("br");
    br.setAttribute("class", "dynamicBR");
    toParent.appendChild(br);
}

function prependBR (beforeNode) {
    "use strict";
    var br = document.createElement("br");
    br.setAttribute("class", "dynamicBR");
    beforeNode.parentNode.insertBefore(br, beforeNode);
}

function manualSiblingsClick () {
    "use strict";
    var siblingsOutput = document.getElementById("siblingsOutput");
    killChildren(siblingsOutput);
    //removeElementById("manualSiblingSelect");
    var haveSiblings = document.getElementById("haveSiblings");
    var manualSiblingSelect = document.getElementById("manualSiblingSelect");
    manualSiblingSelect.style.display = "block";

    //Remove all children (options) from manualSiblingSelect
    while (manualSiblingSelect.firstChild) {
        manualSiblingSelect.removeChild(manualSiblingSelect.firstChild);
    }
    //Populate the manual siblings selection dropdown
    for (var i = 1; i <= Object.keys(manualSiblingsList).length; i ++) {
        var opt = document.createElement("option");
        //console.log(manualSiblingsList[i])
        opt.value = i;
        opt.textContent = manualSiblingsList[i];
        manualSiblingSelect.appendChild(opt);
    }
    manualSiblingSelect.onchange = manualSiblingSelectChange;
    manualSiblingSelectChange();
}

function manualSiblingSelectChange() {
    "use strict";
    var siblingsOutput = document.getElementById("siblingsOutput");
    killChildren(siblingsOutput);
    console.log("manualSiblingSelectChange() fired");
    var manualSiblingSelect = document.getElementById("manualSiblingSelect");
    var haveSiblings = document.getElementById("haveSiblings");

    //manualSiblingSelect.onchange = manualSiblingSelectChange;

    //haveSiblings.value = manualSiblingSelect[manualSiblingSelect.selectedIndex].text;
    var numSiblings = manualSiblingSelect[manualSiblingSelect.selectedIndex].text;
    //console.log("type of numSiblings is: " + typeof numSiblings);
    //console.log("type of numSiblings is: " + typeof parseInt(numSiblings));


    if (numSiblings === "only child") {
        haveSiblings.value = "You have no siblings";
    } else if (parseInt(numSiblings) === 1) {
        haveSiblings.value = "You have one sibling";
    } else if (parseInt(numSiblings) >= 2) {
        haveSiblings.value = "You have ".concat(numSiblings.toString()).concat(" siblings");
    }

    if (numSiblings !== "only child") {
        numSiblings = parseInt(numSiblings);
        //console.log("numSiblings: " + numSiblings);
        //console.log("typeof numSiblings " + typeof numSiblings);
        for (var i = 1; i <= numSiblings; i++ ) {

            var siblingLabelPar = document.createElement("p");
            var siblingLabelText = "Sibling ";
            siblingLabelText = siblingLabelText + i.toString();
            var siblingLabel = document.createTextNode(siblingLabelText);
            siblingLabelPar.appendChild(siblingLabel);
            //console.log(siblingLabelPar);
            var labelID = "sibling" + i.toString();
            siblingLabelPar.setAttribute("id", labelID);
            //var siblingsOutput = document.getElementById("siblingsOutput");
            siblingsOutput.appendChild(siblingLabelPar);

            var label = document.createElement("label");
            label.innerHTML = "gender";
            var genderID_label = "gender" + i.toString() + "_label";
            label.setAttribute("id", genderID_label);
            var textBox = document.createElement("input");
            textBox.type = "text";
            var genderID = "gender" + i.toString();
            textBox.setAttribute("disabled", "true");
            textBox.setAttribute("id", genderID);
            //textBox.value = siblingGenders[siblingGender];
            siblingsOutput.appendChild(label);
            siblingsOutput.appendChild(textBox);


            var genderSelect = document.createElement("select");
            var genderSelectID = "gender" + i.toString() + "Select";
            //console.log("genderSelectID is: " + genderSelectID);
            //console.log(siblingGenders.length);
            genderSelect.setAttribute("id", genderSelectID);
            //console.log(siblingGenders.length);
            for (var j = 1; j <= Object.keys(siblingGenders).length; j++) {
                //console.log(siblingGenders[j]);
                var opt = document.createElement("option");
                opt.value = j;
                opt.textContent = siblingGenders[j];
                genderSelect.appendChild(opt);
            }
            siblingsOutput.appendChild(genderSelect);
            //Set the value of the gender field to the initial dropdown selection
            textBox.value = genderSelect[genderSelect.selectedIndex].text;

            appendBR(siblingsOutput);

            var label2 = document.createElement("label");
            label2.innerHTML = "age";
            var ageID_label = "age" + i.toString() + "_label";
            label2.setAttribute("id", ageID_label);
            var textBox2 = document.createElement("input");
            textBox2.type = "text";
            var ageID = "age" + i.toString();
            textBox2.setAttribute("disabled", "true");
            textBox2.setAttribute("id", ageID);
            //textBox.value = siblingGenders[siblingGender];
            siblingsOutput.appendChild(label2);
            siblingsOutput.appendChild(textBox2);

            var ageSelect = document.createElement("select");
            var ageSelectID = "age" + i.toString() + "Select";
            ageSelect.setAttribute("id", ageSelectID);
            //console.log(siblingGenders.length);
            for (var k = 1; k <= Object.keys(siblingAges).length; k++) {
                //console.log(siblingAges[k]);
                var opt2 = document.createElement("option");
                opt2.value = k;
                opt2.textContent = siblingAges[k];
                ageSelect.appendChild(opt2);
            }
            siblingsOutput.appendChild(ageSelect);
            //Set the value of the age field to the initial dropdown selection
            textBox2.value = ageSelect[ageSelect.selectedIndex].text;

            appendBR(siblingsOutput);

            var label3 = document.createElement("label");
            label3.innerHTML = "feels about you";
            var feelsID_label = "feels" + i.toString() + "_label";
            label3.setAttribute("id", feelsID_label);
            var textBox3 = document.createElement("input");
            textBox3.type = "text";
            var feelsID = "feels" + i.toString();
            textBox3.setAttribute("disabled", "true");
            textBox3.setAttribute("id", feelsID);
            //textBox.value = siblingGenders[siblingGender];
            siblingsOutput.appendChild(label3);
            siblingsOutput.appendChild(textBox3);

            var feelsSelect = document.createElement("select");
            var feelsSelectID = "feels" + i.toString() + "Select";
            feelsSelect.setAttribute("id", feelsSelectID);
            //console.log(siblingGenders.length);
            for (var l = 1; l <= Object.keys(siblingFeelings).length; l++) {
                //console.log(siblingFeelings[l]);
                var opt3 = document.createElement("option");
                opt3.value = l;
                opt3.textContent = siblingFeelings[l];
                feelsSelect.appendChild(opt3);
            }
            siblingsOutput.appendChild(feelsSelect);
            //Set the value of the sibling feelings field to the initial dropdown selection
            textBox3.value = feelsSelect[feelsSelect.selectedIndex].text;
        }


        //Add siblingOutputSelectsChange event listener to all dynamic select dropdowns
        // gender1Select, age1Select, feels1Select, etc.
        var siblingOutputSelects = siblingsOutput.getElementsByTagName("select");
        for (var m = 0; m < siblingOutputSelects.length; m++) {
            console.log(siblingOutputSelects[m].id);
            siblingOutputSelects[m].onchange = siblingOutputSelectsChange;
        }

    }
}

//Dynamically get the changed select option and apply it's text to the text field
function siblingOutputSelectsChange(eventObj) {
    "use strict";
    console.log("siblingOutputSelectsChange() fired");
    var theSelect = eventObj.target;
    var name = theSelect.id;
    console.log(name);
    var theID = name.replace("Select", "");
    console.log(theID);
    //console.log(eventObj.id);
    //console.log(eventObj.target);
    var theField = document.getElementById(theID);
    theField.value = theSelect[theSelect.selectedIndex].text;
}

function randPersTraitsClick() {
    "use strict";
    console.log("randPersTraitsClick fired");
    var persTraitsSelect = document.getElementById("persTraitsSelect");
    persTraitsSelect.style.display = "none";

    var persTraitsField = document.getElementById("persTraitsField");
    var persRoll = getRandomInt(1,10);
    persTraitsField.value = persTraits[persRoll];

}

function manualPersTraitsClick() {
    "use strict";
    var persTraitsField = document.getElementById("persTraitsField");
    var persTraitsSelect = document.getElementById("persTraitsSelect");
    persTraitsSelect.style.display = "block";

    //Remove all children (options) from persTraitsSelect
    while (persTraitsSelect.firstChild) {
        persTraitsSelect.removeChild(persTraitsSelect.firstChild);
    }

    for (var i = 1; i <= Object.keys(persTraits).length; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = persTraits[i];
        persTraitsSelect.appendChild(opt);
    }
    persTraitsSelect.onchange = persTraitsSelectChange;
    persTraitsField.value = persTraitsSelect[persTraitsSelect.selectedIndex].text;

}

function persTraitsSelectChange() {
    "use strict";
    var persTraitsField = document.getElementById("persTraitsField");
    var persTraitsSelect = document.getElementById("persTraitsSelect");
    persTraitsField.value = persTraitsSelect[persTraitsSelect.selectedIndex].text;
}

function randPersValueClick() {
    "use strict";
    var persValSelect = document.getElementById("persValSelect");
    persValSelect.style.display = "none";
    var persValRoll = getRandomInt(1,10);
    var persValField = document.getElementById("persValField");
    persValField.value = persValued[persValRoll];
}

function manualPersValueClick() {
    "use strict";
    var persValSelect = document.getElementById("persValSelect");
    persValSelect.style.display = "block";
    var persValField = document.getElementById("persValField");

    //Remove all children (options) from persValSelect
    while (persValSelect.firstChild) {
        persValSelect.removeChild(persValSelect.firstChild);
    }

    for (var i = 1; i <= Object.keys(persValued).length; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = persValued[i];
        persValSelect.appendChild(opt);
    }
    persValSelect.onchange = persValSelectChange;
    persValField.value = persValSelect[persValSelect.selectedIndex].text;

}

function persValSelectChange() {
    "use strict";
    var persValSelect = document.getElementById("persValSelect");
    var persValField = document.getElementById("persValField");
    persValField.value = persValSelect[persValSelect.selectedIndex].text;
}

function randYouValueClick() {
    "use strict";
    var youValSelect = document.getElementById("youValSelect");
    youValSelect.style.display = "none";
    var youValRoll = getRandomInt(1,10);
    var youValField = document.getElementById("youValField");
    youValField.value = youValue[youValRoll];
}

function manYouValueClick() {
    "use strict";
    var youValSelect = document.getElementById("youValSelect");
    youValSelect.style.display = "block";
    var youValField = document.getElementById("youValField");

    //Remove all children (options) from youValSelect
    while (youValSelect.firstChild) {
        youValSelect.removeChild(youValSelect.firstChild);
    }

    for (var i = 1; i <= Object.keys(youValue).length; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = youValue[i];
        youValSelect.appendChild(opt);
    }
    youValSelect.onchange = youValSelectChange;
    youValField.value = youValSelect[youValSelect.selectedIndex].text;
}

function youValSelectChange() {
    "use strict";
    var youValSelect = document.getElementById("youValSelect");
    var youValField = document.getElementById("youValField");
    youValField.value = youValSelect[youValSelect.selectedIndex].text;
}

function randYouFeelClick() {
    "use strict";
    var youFeelSelect = document.getElementById("youFeelSelect");
    youFeelSelect.style.display = "none";
    var youFeelRoll = getRandomInt(1,10);
    var youFeelField = document.getElementById("youFeelField");
    youFeelField.value = howFeel[youFeelRoll];
}

function manYouFeelClick() {
    "use strict";
    var youFeelSelect = document.getElementById("youFeelSelect");
    youFeelSelect.style.display = "block";
    var youFeelField = document.getElementById("youFeelField");

    //Remove all children (options) from youFeelSelect
    while (youFeelSelect.firstChild) {
        youFeelSelect.removeChild(youFeelSelect.firstChild);
    }

    for (var i = 1; i <= Object.keys(howFeel).length; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = howFeel[i];
        youFeelSelect.appendChild(opt);
    }
    youFeelSelect.onchange = youFeelSelectChange;
    youFeelField.value = youFeelSelect[youFeelSelect.selectedIndex].text;
}

function youFeelSelectChange() {
    "use strict";
    var youFeelSelect = document.getElementById("youFeelSelect");
    var youFeelField = document.getElementById("youFeelField");
    youFeelField.value = youFeelSelect[youFeelSelect.selectedIndex].text;
}

function randPosClick() {
    "use strict";
    var posSelect = document.getElementById("posSelect");
    posSelect.style.display = "none";
    var posRoll = getRandomInt(1,10);
    var posField = document.getElementById("posField");
    posField.value = valuedPos[posRoll];
}

function manPosClick() {
    "use strict";
    var posSelect = document.getElementById("posSelect");
    posSelect.style.display = "block";
    var posField = document.getElementById("posField");

    //Remove all children (options) from posSelect
    while (posSelect.firstChild) {
        posSelect.removeChild(posSelect.firstChild);
    }

    for (var i = 1; i <= Object.keys(valuedPos).length; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = valuedPos[i];
        posSelect.appendChild(opt);
    }
    posSelect.onchange = ManPosSelectChange;
    posField.value = posSelect[posSelect.selectedIndex].text;
}

function ManPosSelectChange() {
    "use strict";
    var posSelect = document.getElementById("posSelect");
    var posField = document.getElementById("posField");
    posField.value = posSelect[posSelect.selectedIndex].text;
}

function randAgeClick() {
    "use strict";
    //var age = 0;

    //Remove all children from lifeTable
    var lifeTable = document.getElementById("lifeTable");
    lifeTable.style.display = "block";
    var rowCount = lifeTable.rows.length;
    for (var i = rowCount -1; i > 0 ;i--) {
        lifeTable.deleteRow(i);
    }

    var ageField = document.getElementById("ageField");
    ageField.setAttribute("disabled", "true");
    var ageRoll1 = getRandomInt(1,6);
    var ageRoll2 = getRandomInt(1,6);
    //console.log(ageRoll1, ageRoll2);
    var numEvents = ageRoll1 + ageRoll2;
    //console.log("numEvents: " + typeof numEvents, numEvents);
    var age = numEvents + 16;
    ageField.value = age;
    var lifeEventStart = 17;

    //Life Events
    for (var j = lifeEventStart; j <= age; j++) {
        //console.log(j);
        randLifeEvent(j);
    }
}

function manAgeClick() {
    "use strict";
    var ageField = document.getElementById("ageField");
    ageField.removeAttribute("disabled");
    ageField.className = "";
    ageField.value = "";

    //Remove all children from lifeTable
    var lifeTable = document.getElementById("lifeTable");
    lifeTable.style.display = "block";
    var rowCount = lifeTable.rows.length;
    for (var i = rowCount -1; i > 0 ;i--) {
        lifeTable.deleteRow(i);
    }

}

function ageCheck() {
    "use strict";
    //Remove all children from lifeTable
    var lifeTable = document.getElementById("lifeTable");
    var rowCount = lifeTable.rows.length;
    for (var i = rowCount -1; i > 0 ;i--) {
        lifeTable.deleteRow(i);
    }

    console.log("ageCheck() fired");
    var ageField = document.getElementById("ageField");
    ageField.className = "";
    var ageFieldValue = ageField.value;
    //console.log(parseInt(ageFieldValue));
    var errorOut = document.createElement("span");
    errorOut.setAttribute("id", "errorOut");
    errorOut.setAttribute("class", "red");
    var errorDetailText = "";
    var ageField_label = document.getElementById("ageField_label");
    //errorOut.appendChild(document.createTextNode(errorDetailText));
    /*
    if (isNaN(parseInt(ageFieldValue))) {
        console.log("Not a number");
        ageField.className = "redBack";
        ageField.focus();
        errorDetailText = "Must enter a number between 17 and 99.";
        errorOut.appendChild(document.createTextNode(errorDetailText));
        //ageField.parentNode.appendChild(errorOut);
        ageField.parentNode.appendChild(errorOut);

    }*/
    if ((ageFieldValue < 17 || ageFieldValue > 99) || (isNaN(parseInt(ageFieldValue)))) {
        console.log("cant be < 17 or > 99");
        ageField.className = "redBack";
        ageField.focus();
        errorDetailText = "Must enter a number between 17 and 99.";
        var tempErr = document.getElementById("errorOut");
        if (!tempErr) {
            errorOut.appendChild(document.createTextNode(errorDetailText));
            ageField.parentNode.appendChild(errorOut);
        }
    } else {
        var tempErr2 = document.getElementById("errorOut");
        if (tempErr2) {
            tempErr2.parentNode.removeChild(tempErr2);
        }
        var lifeEventStart = 17;
        var age = ageField.value;
        var numEvents = age - lifeEventStart;
        //Life Events
        for (var j = lifeEventStart; j <= age; j++) {
            console.log(j);
            randLifeEvent(j);
        }
    }

}

function addLifeRowEnemy(td1Val, td2Val, td3Val) {
    "use strict";
    var lifeTable = document.getElementById("lifeTable");
    var tBody = lifeTable.getElementsByTagName("tbody");
    var newRow = document.createElement("tr");

    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    td3.setAttribute("colspan", "2");

    td1.innerHTML = td1Val;
    td2.innerHTML = td2Val;
    td3.appendChild(td3Val);

    newRow.appendChild(td1);
    newRow.appendChild(td2);
    newRow.appendChild(td3);
    //newRow.appendChild(td4);

    tBody[0].appendChild(newRow);
}

function addLifeRow(td1Val, td2Val, td3Val, td4Val) {
    //example usage: addLifeRow(age, eventType, enemy.enemyGender[age], enemyDetailTable);
    "use strict";
    //Adds the row for the lifeTable table
    /*
    if (!td1Val || !td2Val || !td3Val || !td4Val) {
        throw new Error("addLifeRow() missing a required parameter!");
    }
    */

    //console.log(td1Val, td2Val, td3Val, td4Val);
    //console.log(typeof td1Val, typeof td2Val, typeof td3Val, typeof td4Val);

    var lifeTable = document.getElementById("lifeTable");
    var tBody = lifeTable.getElementsByTagName("tbody");
    //console.log(tBody);

    var newRow = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");

    td1.innerHTML = td1Val;
    td2.innerHTML = td2Val;
    td3.innerHTML = td3Val;
    td4.innerHTML = td4Val;

    newRow.appendChild(td1);
    newRow.appendChild(td2);
    newRow.appendChild(td3);
    newRow.appendChild(td4);

    tBody[0].appendChild(newRow);

}

function randLifeEvent(age) {
    "use strict";

    //Main Life Event: Problem/Win, Friend/Enemy, Romance, Nothing
    var lifeEventRoll = getRandomInt(1,10);
    //var lifeEventRoll = 7; //

    var secondLifeRoll = getRandomInt(1,10);
    //var secondLifeRoll = 8;

    var thirdLifeRoll = getRandomInt(1,10);
    //var thirdLifeRoll = 1;

    var fourthLifeRoll = getRandomInt(1,10);
    //var fourthLifeRoll = 1;

    //console.log(secondLifeRoll);


    var eventType = "";
    var connection = "";
    var amount = "";

    if (lifeEventRoll <= 3) {
        //console.log("secondLifeRoll: " + secondLifeRoll);
        //Big Problem or Win
        if ((secondLifeRoll % 2 === 0) === true) {
            //Even, Big Score
            eventType = "You Get Lucky";
            //console.log(getLucky[thirdLifeRoll].title);
            //console.log(getLucky[thirdLifeRoll].detail);

            //Arguments that are duplicated a lot / used a lot, passed by .apply(null, dupAgrs) to functions
            var dupArgs = [age, eventType, getLucky[thirdLifeRoll].title, getLucky[thirdLifeRoll].detail];

            if (thirdLifeRoll === 1) {
                if (fourthLifeRoll <= 4) {
                    connection = getLuckyConnection[1];
                } else if (fourthLifeRoll >= 5 && fourthLifeRoll <= 7) {
                    connection = getLuckyConnection[2];
                } else if (fourthLifeRoll >= 8) {
                    connection = getLuckyConnection[3];
                }
                connection = "You made a connection " + connection;
                //console.log("connection: " + connection);
                addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, connection);
            } else if (thirdLifeRoll === 2) {
                //console.log(getLucky[thirdLifeRoll].title);
                //console.log(getLucky[thirdLifeRoll].detail);
                //console.log(getLucky.windfallAmount);
                //getLucky = addWindfall(getLucky, age);
                addWindfall(getLucky, age);
                //console.log(getLucky.windfallAmount);
                amount = "Amount: " + getLucky.windfallHistory[age] + " eb";
                addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, amount);
            } else if (thirdLifeRoll === 3) {
                //console.log(getLucky.scoreHistory);
                addScore(getLucky, age);
                //var amount = "Score Amount: " +
                amount = amount.concat("Amount: ", getLucky.scoreHistory[age], " eb");
                //console.log(getLucky.scoreHistory);
                addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, amount);
            } else if (thirdLifeRoll === 4) {
                //console.log(getLucky);
                addSensei(getLucky, age);
                addLifeRow.apply(null, dupArgs);
                //addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, getLucky[thirdLifeRoll].detail);
                //console.log(getLucky);
            } else if (thirdLifeRoll === 5) {
                //console.log(getLucky);
                addTeacher(getLucky, age);
                //console.log(getLucky);
                addLifeRow.apply(null, dupArgs);
                //addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, getLucky[thirdLifeRoll].detail);
            } else if (thirdLifeRoll === 6) {
                addCorpFavor(getLucky, age);
                //console.log(getLucky);
                addLifeRow.apply(null, dupArgs);
                //addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, getLucky[thirdLifeRoll].detail);
            } else if (thirdLifeRoll === 7) {
                addNomadFavor(getLucky, age);
                //console.log(getLucky);
                addLifeRow.apply(null, dupArgs);
                //addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, getLucky[thirdLifeRoll].detail);
            } else if (thirdLifeRoll === 8) {
                addPoliceFriend(getLucky, age);
                //console.log(getLucky);
                addLifeRow.apply(null, dupArgs);
                //addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, getLucky[thirdLifeRoll].detail);
            } else if (thirdLifeRoll === 9) {
                addBoosterFriend(getLucky, age);
                //console.log(getLucky);
                addLifeRow.apply(null, dupArgs);
                //addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, getLucky[thirdLifeRoll].detail);
            } else if (thirdLifeRoll === 10) {
                addCombatTeacher(getLucky, age);
                addLifeRow.apply(null, dupArgs);
                //addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, getLucky[thirdLifeRoll].detail);
            }
        } else if ((secondLifeRoll % 2 ===0) === false) {
            //Uneven,  Disaster
            //console.log("disaster");
            eventType = "Disaster Strikes";
            if (thirdLifeRoll === 1) {
                //Financial loss
                addDebt(disaster, age);
                amount = "Amount: ".concat(disaster.debtHistory[age], " eb");
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, amount);
            } else if (thirdLifeRoll === 2) {
                //Imprisonment
                addPrison(disaster, age);
                amount = "Time imprisoned / held hostage: ".concat(disaster.prisonHistory[age], " months");
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, amount);
            } else if (thirdLifeRoll === 3) {
                //Illness / addiction
                addIllness(disaster, age);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster[thirdLifeRoll].detail);
            } else if (thirdLifeRoll === 4) {
                //Betrayal
                disaster.addBetray(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.betrayDetail[age]);
            } else if (thirdLifeRoll === 5) {
                disaster.addAccident(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.accidentDetail[age]);
            } else if (thirdLifeRoll === 6) {
                disaster.loverKilled(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.loverKilledDetail[age]);
            } else if (thirdLifeRoll === 7) {
                disaster.addFalseAccused(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.falseAccuseDetail[age]);
            } else if (thirdLifeRoll === 8) {
                disaster.addLawHunted(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.lawHuntedDetail[age]);
            } else if (thirdLifeRoll === 9) {
                disaster.addCorpHunted(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.corpHuntedDetail[age]);
            } else if (thirdLifeRoll === 10) {
                disaster.addIncap(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.incapDetail[age]);
            }
        }
    } else if (lifeEventRoll >= 4 && lifeEventRoll <= 6) {
        //Friend / enemy
        //console.log("Friends & Enemies");
        if (secondLifeRoll <= 5) {
            //Make a friend
            console.log("make friend");
            eventType = "Make a Friend";
            friendMade.addFriend(age, thirdLifeRoll, fourthLifeRoll);
            addLifeRow(age, eventType, friendMade[thirdLifeRoll], friendMade.friendMadeGender[age]);
        } else if (secondLifeRoll >= 6) {
            //Make an enemy
            console.log("Make enemy");
            eventType = "Make an Enemy";
            enemy.addEnemy(age, thirdLifeRoll, fourthLifeRoll);
            var enemyDetailTable = addEnemyTable(
                enemy.enemyGender[age],
                enemy.enemyWhoIsIt[age],
                enemy.enemyCauseIs[age],
                enemy.enemyWhoMad[age],
                enemy.enemyWhatDo[age],
                enemy.enemyWhatThrow[age]
            );
            console.log(enemyDetailTable);
            enemyDetailTable.setAttribute("class", "enemyDetailTable");

            //console.log(typeof enemyDetailTable);
            //addLifeRow(age, eventType, enemy.enemyGender[age], enemyDetailTable);
            addLifeRowEnemy(age, eventType, enemyDetailTable);
        }
    } else if (lifeEventRoll >= 7 && lifeEventRoll <= 8) {
        //Romantic involvement
        //console.log("Romantic involvement: ");
        var metaEventType = "Romance: ";
        if (secondLifeRoll <= 4) {
            eventType = metaEventType.concat("Happy Love Affair");
            //console.log("happy");
            romance.addHappyAffair(age);
            //console.log(romance);
            addLifeRow(age, eventType, romance.happyHistory[age], romance.happyDetail[age]);
        } else if (secondLifeRoll === 5) {
            eventType = metaEventType.concat("Tragic Love Affair");
            //console.log("tragic");
            romance.addTragic(age, thirdLifeRoll);
            //console.log(romance);
            addLifeRow(age, eventType, romance.tragicHistory[age], romance.tragicDetail[age]);
        } else if (secondLifeRoll >= 6 && secondLifeRoll <= 7) {
            eventType = metaEventType.concat("Love Affair With Problems");
            //console.log("love affair with problems");
            romance.addProblem(age, thirdLifeRoll, fourthLifeRoll);
            //console.log(romance);
            addLifeRow(age, eventType, romance.problemHistory[age], romance.problemDetail[age]);
        } else if (secondLifeRoll >= 8) {
            eventType = metaEventType.concat("Fast Affairs / Hot Dates");
            //console.log("fast affairs");
            romance.addFast(age);
            addLifeRow(age, eventType, romance.fastHistory[age], romance.fastDetail[age]);
        }
    } else if (lifeEventRoll >= 9) {
        //Nothing
        eventType = nothing.nothingResult;
        //console.log("nothing");
        nothing.addNothing(age);
        addLifeRow(age, eventType, nothing.nothingDetail[age], nothing.nothingDetail[age]);

    }
}

function addEnemyTable(tdVal1, tdVal2, tdVal3, tdVal4, tdVal5, tdVal6) {
    "use strict";
    console.log(tdVal1, tdVal2, tdVal3, tdVal4, tdVal5, tdVal6);

    var enemyDetailTable = document.createElement("table");

    var enemyDetailHeader = document.createElement("tr");
    enemyDetailHeader.setAttribute("class", "enemyDetailTableHeader");
    var head1 = document.createElement("td");
    var head2 = document.createElement("td");
    var head3 = document.createElement("td");
    var head4 = document.createElement("td");
    var head5 = document.createElement("td");
    var head6 = document.createElement("td");

    head1.innerHTML = "Enemy Gender";
    head2.innerHTML = "Who is this Enemy?";
    head3.innerHTML = "Cause";
    head4.innerHTML = "Who's Angry?";
    head5.innerHTML = "Reaction If You See Them?";
    head6.innerHTML = "What Can They Throw At You?";


    enemyDetailHeader.appendChild(head1);
    enemyDetailHeader.appendChild(head2);
    enemyDetailHeader.appendChild(head3);
    enemyDetailHeader.appendChild(head4);
    enemyDetailHeader.appendChild(head5);
    enemyDetailHeader.appendChild(head6);

    enemyDetailTable.appendChild(enemyDetailHeader);


    var enemyDetailRow = document.createElement("tr");
    var enemyTD1 = document.createElement("td");
    var enemyTD2 = document.createElement("td");
    var enemyTD3 = document.createElement("td");
    var enemyTD4 = document.createElement("td");
    var enemyTD5 = document.createElement("td");
    var enemyTD6 = document.createElement("td");


    enemyTD1.innerHTML = tdVal1;
    enemyTD2.innerHTML = tdVal2;
    enemyTD3.innerHTML = tdVal3;
    enemyTD4.innerHTML = tdVal4;
    enemyTD5.innerHTML = tdVal5;
    enemyTD6.innerHTML = tdVal6;

    //console.log(enemyTD1, enemyTD2, enemyTD3, enemyTD4, enemyTD5);

    enemyDetailRow.appendChild(enemyTD1);
    enemyDetailRow.appendChild(enemyTD2);
    enemyDetailRow.appendChild(enemyTD3);
    enemyDetailRow.appendChild(enemyTD4);
    enemyDetailRow.appendChild(enemyTD5);
    enemyDetailRow.appendChild(enemyTD6);

    enemyDetailTable.appendChild(enemyDetailRow);
    //enemyDetailTable.setAttribute("id", )
    return enemyDetailTable;
}



var clothes = {
    1: "Biker leathers",
    2: "Blue jeans",
    3: "Corporate suits",
    4: "Jumpsuits",
    5: "Miniskirts",
    6: "High Fashion",
    7: "Cammos",
    8: "Normal clothes",
    9: "Nude",
    10: "Bag lady chic"
};

var hairStyle = {
    1: "Mohawk",
    2: "Long & Ratty",
    3: "Short & Spiked",
    4: "Wild & all over",
    5: "Bald",
    6: "Striped",
    7: "Tinted",
    8: "Neat, short",
    9: "Short, curly",
    10: "Long, straight"
};

var affectations = {
    1: "Tattoos",
    2: "Mirroshades",
    3: "Ritual Scars",
    4: "Spiked gloves",
    5: "Nose Rings",
    6: "Earrings",
    7: "Long fingernails",
    8: "Spike heel boots",
    9: "Weird contact lenses",
    10: "Fingerless gloves"
};

var ethnic = {
    origins: [
        {origin: "Anglo-American", languages: ["English"]},
        {origin: "African", languages: ["Bantu", "Fante", "Kongo","Ashanti","Zulu","Swahili"]},
        {origin: "Japanese/Korean", languages: ["Japanese", "Korean"]},
        {origin: "Central European/Soviet", languages: ["Bulgarian", "Russian", "Czech", "Polish", "Ukranian", "Slovak"]},
        {origin: "Pacific Islander", languages: ["Micronesian", "Tagalog", "Polynesian", "Malayan", "Sudanese", "Indonesian", "Hawaiian"]},
        {origin: "Chinese/Southeast Asian", languages: ["Burmese", "Cantonese", "Mandarin","Thai", "Tibetan", "Vietnamese"]},
        {origin: "Black American", languages: ["English", "Blackfolk"]},
        {origin: "Hispanic/American", languages: ["Spanish", "English"]},
        {origin: "Central/South American", languages: ["Spanish", "Portuguese"]},
        {origin: "Eurpean", languages: ["French", "German", "Enlgish", "Spanish", "Italian", "Greek", "Danish", "Dutch", "Norwegian", "Swedish"]}
    ]
};

var famRank = {
    1: "Corporate Executive",
    2: "Corporate Manager",
    3: "Corporate Technician",
    4: "Nomad Pack",
    5: "Pirate Fleet",
    6: "Gang family",
    7: "Crime Lord",
    8: "Combat Zone Poor",
    9: "Urban homeless",
    10: "Arcology family"
};

var parentStatus = {
    okay: "Both parents are living",
    somethingHappened: "Something happened to one or both parents"
};

var parentTragedy = {
    1: "Your parent(s) died in warefare",
    2: "Your parent(s) died in an accident",
    3: "Your parent(s) were murdered",
    4: "Your parent(s) have amnesia and don't remember you",
    5: "You never knew your parent(s)",
    6: "Your parent(s) are in hiding to protect you",
    7: "You were left with relatives for safekeeping",
    8: "You grew up on the street and never had parents",
    9: "Your parent(s) gave you up for adoption",
    10: "Your parent(s) sold your for money"
};

var familyStatusOptions = {
    danger: "Family status in danger, and you risk losing everything",
    okay: "Family status is OK, even if parents are missing or dead"
};

var familyTragedy = {
    1: "Family lost everything through betrayal",
    2: "Family lost everything through bad management",
    3: "Family exiled or otherwise driven from their original home/ nation/ corporation",
    4: "Family is imprisoned and you alone escaped",
    5: "Family vanished. You are the only remaining member",
    6: "Family was murdered/ killed and you were the only survivor",
    7: "Family is involved in a longterm conspiracy, organization or assocation, such as a crime family or revolutionary group",
    8: "Your family was scattered to the winds due to misfortune",
    9: "Your family is cursed with a hereditary feud that has lasted for generations",
    10: "You are the inheritor of a family debt; you must honor this debt before moving on with your life"
};

var childEnv = {
    1: "Spent on the Street, with no adult supervision",
    2: "Spent in a safe Corporate Suburbia",
    3: "In a Nomad Pack moving from town to town",
    4: "In a decarying, once upscale neighborhood",
    5: "In a defended Corporate Zone in the central City",
    6: "In the heart of the Combat Zone",
    7: "In a small village or town far from the City",
    8: "In a large archology city",
    9: "In an aquatic Pirate Pack",
    10: "On a Corporate controlled Farm or Research Facility"
};

var siblingGenders = {
    1: "male",
    2: "female"
};

var siblingAges = {
    1: "older",
    2: "younger",
    3: "twin"
};

var siblingFeelings = {
    1: "sibling dislikes you",
    2: "sibling likes you",
    3: "sibling neutral",
    4: "sibling hero worships you",
    5: "sibling hates you"
};

var manualSiblingsList = {
    1: "only child",
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7
};

var persTraits = {
    1: "Shy and secretive",
    2: "Rebellious, antisocial, violent",
    3: "Arrogant, proud, aloof",
    4: "Moody, rash and headstrong",
    5: "Picky, fussy and nervous",
    6: "Stable and serious",
    7: "Silly and fluffheaded",
    8: "Sneaky and deceptive",
    9: "Intellectual and detached",
    10: "Friendly and outgoing"
};

var persValued = {
    1: "A parent (or guardian)",
    2: "Brother or sister",
    3: "Lover",
    4: "Friend",
    5: "Yourself",
    6: "A pet",
    7: "Teacher or mentor",
    8: "Public figure",
    9: "A personal hero",
    10: "No one"
};

var youValue = {
    1: "Money",
    2: "Honor",
    3: "Your word",
    4: "Honesty",
    5: "Knowledge",
    6: "Vengeance",
    7: "Love",
    8: "Power",
    9: "Having a good time",
    10: "Friendship"
};

var howFeel = {
    1: "Neutral",
    2: "Neutral",
    3: "I like almost everyone",
    4: "I hate almost everyone",
    5: "People are tools. Use them for your own goals and discard them.",
    6: "Every person is a valuable individual",
    7: "People are obstacles to be destroyed if they cross me",
    8: "People are untrustworthy. Don't depend on anyone",
    9: "Wipe 'em all out and give the place to the cockroaches",
    10: "People are wonderful"
};

var valuedPos = {
    1: "A weapon",
    2: "A tool",
    3: "A piece of clothing",
    4: "A photograph",
    5: "A book or diary",
    6: "A recording",
    7: "A musical instrument",
    8: "A piece of jewelry",
    9: "A toy",
    10: "A letter"
};

var lifeEvent = {
    1: "Big Problems, Big wins",
    2: "Friends & Enemies",
    3: "Romantic Involvement",
    4: "Nothing Happened This Year"
};

//so disaster is designed to hold data earlier things aren't, should they
var disaster = {
    debtAmount: 0,
    debtHistory: {},
    prisonTime: 0,
    prisonHistory: {},
    illnessTime: 0,
    illnessHistory: {},
    betrayalAmount: 0,
    betrayalHistory: {},
    betrayDetail: {},
    addBetray: function(age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.betrayalHistory[age] = this[thirdLifeRoll].title;
        this.betrayalAmount += 1;
        //console.log("betrayalAmount: " + this.betrayalAmount);
        //console.log("betrayHistory: " + this.betrayalHistory[age]);
        if (fourthLifeRoll <= 3) {
            this.betrayDetail[age] = " You are being blackmailed.";
        } else if (fourthLifeRoll >= 4 && fourthLifeRoll <= 7) {
            this.betrayDetail[age] = " A secret was exposed.";
        } else if (fourthLifeRoll >= 8 && fourthLifeRoll <= 10) {
            this.betrayDetail[age] = " Betrayed by close friend in romance or career (you choose)";
        }
    },
    accidentAmount: 0,
    accidentHistory: {},
    accidentDetail: {},
    addAccident: function(age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        //console.log(age, thirdLifeRoll, fourthLifeRoll);
        this.accidentHistory[age] = this[thirdLifeRoll].title;
        this.accidentAmount += 1;
        var randInt = getRandomInt(1,10);
        if (fourthLifeRoll <= 4) {
            this.accidentDetail[age] = "Terribly disfigured. Subtract -5 from ATT.";
        } else if (fourthLifeRoll >= 5 && fourthLifeRoll <= 6) {
            this.accidentDetail[age] = "Hospitalized for " + randInt + " months this year";
        } else if (fourthLifeRoll >= 7 && fourthLifeRoll <= 8) {
            this.accidentDetail[age] = "You have lost " + randInt + " months of memory this year";
        } else if (fourthLifeRoll >= 9) {
            this.accidentDetail[age] = "You constantly relive nightmares ".concat(
                "(8 in 10 chance each night) of the accident and wake up screaming");
        }
    },
    loverKilledAmount: 0,
    loverKilledHistory: {},
    loverKilledDetail: {},
    loverKilled: function(age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.loverKilledAmount += 1;
        this.loverKilledHistory[age] = this[thirdLifeRoll].title;
        if (fourthLifeRoll <= 5) {
            this.loverKilledDetail[age] = "They died accidentally";
        } else if (fourthLifeRoll >= 6 && fourthLifeRoll <= 8) {
            this.loverKilledDetail[age] = "They were murdered by unknown parties";
        } else if (fourthLifeRoll >=9) {
            this.loverKilledDetail[age] = "They were murderd; you know who did it. You just need proof";
        }
    },
    falseAccuseAmount: 0,
    falseAccuseHistory: {},
    falseAccuseDetail: {},
    addFalseAccused: function(age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.falseAccuseAmount += 1;
        this.falseAccuseHistory[age] = this[thirdLifeRoll].title;
        if (fourthLifeRoll <= 3) {
            this.falseAccuseDetail[age] = "The accusation is theft.";
        } else if (fourthLifeRoll >= 4 && fourthLifeRoll <= 5) {
            this.falseAccuseDetail[age] = "The accusation is cowardice.";
        } else if (fourthLifeRoll >= 6 && fourthLifeRoll <= 8) {
            this.falseAccuseDetail[age] = "The accusation is murder";
        } else if (fourthLifeRoll === 9) {
            this.falseAccuseDetail[age] = "The accusation is rape";
        } else if (fourthLifeRoll === 10) {
            this.falseAccuseDetail[age] = "The accusation is lying or betrayal";
        }
    },
    lawHuntedAmount: 0,
    lawHuntedHistory: {},
    lawHuntedDetail: {},
    addLawHunted: function(age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.lawHuntedAmount += 1;
        this.lawHuntedHistory[age] = this[thirdLifeRoll].title;
        if (fourthLifeRoll <= 3) {
            this.lawHuntedDetail[age] = "Only a couple local cops want you.";
        } else if (fourthLifeRoll >= 4 && fourthLifeRoll <= 6) {
            this.lawHuntedDetail[age] = "The entire local police force wants you.";
        } else if (fourthLifeRoll >= 7 && fourthLifeRoll <= 8) {
            this.lawHuntedDetail[age] = "the State Police or militia wants you.";
        } else if (fourthLifeRoll >= 9) {
            this.lawHuntedDetail[age] = "the FBI or equivalent national police force wants you.";
        }
        console.log(this.lawHuntedAmount, this.lawHuntedHistory[age], this.lawHuntedDetail[age]);
    },
    corpHuntedAmount: 0,
    corpHuntedHistory: {},
    corpHuntedDetail: {},
    addCorpHunted: function(age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        //console.log(typeof fourthLifeRoll, fourthLifeRoll);
        this.corpHuntedAmount += 1;
        this.corpHuntedHistory[age] = this[thirdLifeRoll].title;
        if (fourthLifeRoll <= 3) {
            this.corpHuntedDetail[age] = "Small local firm is hunting you";
        } else if (fourthLifeRoll >= 4 && fourthLifeRoll <= 6) {
            console.log("4 to 6");
            this.corpHuntedDetail[age] = "Larger corporation with offices statewide hunting you";
        } else if (fourthLifeRoll >= 7 && fourthLifeRoll <= 8) {
            this.corpHuntedDetail[age] = "Big, national corporation with agents in major cities nationwide hunting you";
        } else if (fourthLifeRoll >= 9) {
            this.corpHuntedDetail[age] = "Huge multinational corporation hunting you; they have armies, ninjas and spies everywhere";
        }
        //console.log(this.corpHuntedAmount, this.corpHuntedHistory[age], this.corpHuntedDetail[age]);
    },
    incapAmount: 0,
    incapHistory: {},
    incapDetail: {},
    addIncap: function(age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.incapAmount += 1;
        this.incapHistory[age] = this[thirdLifeRoll].title;
        if (fourthLifeRoll <= 3) {
            this.incapDetail[age] = "It's some type of nervous disorder, probably from a bioplague -- Lose 1 pt. REF";
        } else if (fourthLifeRoll >= 4 && fourthLifeRoll <= 7) {
            this.incapDetail[age] = "It's some kind of mental problem; you suffer from anxiety".concat(
                "attacks and phobias. Lose 1 pt. from your CL stat.");
        } else if (fourthLifeRoll >= 8) {
            this.incapDetail[age] = "It's a major psychosis. You hear voices, are violent,".concat(
                "irrational, depressive. Lose 1pt from CL, 1pt from REF");
        }
        console.log(this.incapAmount, this.incapHistory[age], this.incapDetail[age]);
    },
    1: {title: "Financial Loss or Debt", detail: "Roll 1D10x100." +
        "You have lost this much in Eurodollars. If you can't pay this now," +
        " you have a debt to pay, in cash--or blood."},
    2: {title: "Imprisonment", detail: "You have been in prison, or possibly held hostage" +
        " (your choice). Roll 1D10 for length of imprisonment in months."},
    3: {title: "Illness or addiction", detail: "You have contracted either an illness or" +
        " drug habit in this time. Lose 1 point of REF permanently as a result."},
    4: {title: "Betrayal. You have been backstabbed in some manner.", detail:
        "Roll another 1D10. 1-3, you are being blackmailed. 4-7 a secret was".concat( /*+*/
        " exposed. 8-10, you were betrayed by a close friend in either romance",
        " or career (your choice).")},
    5: {title: "Accident", detail: "You were in some kind of terrible accident. Roll" +
        " 1D10. 1-4, you were terribly disfigured and must subtract -5 from your ATT." +
        " 5-6 you were hospitalized for 1D10 months that year. 7-8, you have lost" +
        " 1D10 months of memory that year. 9-10, you constantly relive nightmares" +
        " (8 in 10 chance each night) of the accident and wake up screaming"},
    6: {title: "Lover, friend or relative killed", detail: "You lost someone you" +
        " really cared about. 1-5, they died accidentally. 6-8 they were murdered" +
        " by unknown parties. 9-10, they were murdered and you know who did it. You" +
        " just need the proof."},
    7: {title: "False Accusation", detail: "You were set up. Roll 1D10. 1-3, the" +
        " accusation is theft. 4-5 it's cowardice. 6-8 it's murder. 9 it's rape" +
        " 10, it's lying or betrayal"},
    8: {title: "Hunted by the law", detail: "You are hunted by the law for crimes" +
        " you may or may not have committed (your choice). Roll 1D10. 1-3 only" +
        " a couple cops want you. 4-6 it's the entire local force. 7-8, it's the" +
        " State police or Militia. 9-10 it's the FBI or equivalent national police force."},
    9: {title: "Hunted by a Corporation", detail: "You have angered some corporate" +
        " honcho. Roll 1D10. 1-3 it's a small, local firm. 4-6 it's a larger corp with offices" +
        "statewide. 7-8 it's a big, national corp with agents in major cities nationwide." +
        "9-10; it's a huge multinational with armies, ninja and spies everywhere."},
    10: {title: "Mental or physical incapacitation", detail: "You have experienced" +
        " some type of mental or physical breakdown. Roll 1D10. 1-3 it's some type"+
        " of nervous disorder, probably from a bioplague -- lose 1pt REF. 4-7 it's" +
        " some kind of mental problem; you suffer anxiety attacks and phobias. Lose" +
        " 1pt from your CL stat. 8-10 it's a major psychosis. You hear voices" +
        " are violent, irrational, depressive. Lose 1pt from CL, 1pt from REF"}
};

function addDebt(disaster, age) {
    "use strict";
    var newDebt = getRandomInt(1,10) * 100;
    disaster.debtHistory[age] = newDebt;
    disaster.debtAmount = disaster.debtAmount + newDebt;
    return disaster;
}

function addPrison(disaster, age) {
    "use strict";
    var prisonTerm = getRandomInt(1,10);
    disaster.prisonHistory[age] = prisonTerm;
    disaster.prisonTime = disaster.prisonTime + prisonTerm;
    return disaster;
}

function addIllness(disaster, age) {
    "use strict";
    var illnessLength = getRandomInt(1, 10);
    disaster.illnessHistory[age] = illnessLength;
    disaster.illnessTime = disaster.illnessTime + illnessLength;
}

var getLucky = {
    windfallAmount: 0,
    windfallHistory: {},
    scoreAmount: 0,
    scoreHistory: {},
    senseiFound: 0,
    senseiHistory: {},
    teacherFound: 0,
    teacherHistory: {},
    corpFavor: 0,
    corpFavorHistory: {},
    nomadFavor: 0,
    nomadFavorHistory: {},
    policeFriend: 0,
    policefriendHistory: {},
    boosterFriend: 0,
    boosterFriendHistory: {},
    combatTeacher: 0,
    combatTeacherHistory: {},
    1: {title: "Make a Powerful Connection in City Government", detail: "Roll 1D10" +
        " 1-4 it's the Police. 5-7 it's in DA office. 8-10 its the Mayor"},
    2: {title: "Financial Windfall", detail: "Roll 1D10x100 for amount in Euros"},
    3: {title: "Big Score", detail: "Roll 1D10x100 for amount"},
    4: {title: "Find a Sensei (Teacher)", detail: "Begin a new Martial Art at +2, or add +1 to an existing Martial Art"},
    5: {title: "Find a Teacher", detail: "Add +1 to any INT based skill, or begin new at +2"},
    6: {title: "Favor with a Powerful Corporate Executive", detail: "They owe you a favor"},
    7: {title: "Local Nomad Pack Befriends You", detail: "Call on them for one favor a month" +
       " equivalent to Family special ability +2"},
    8: {title: "Make Friend on Police Force", detail: "You may use them for information at".concat(/*+*/
        " a level of +2 Streetwise on any police related situation.")},
    9: {title: "Local Boostergang likes you", detail: "Who knows why. You can call on them for" +
        " one favor a month, equivalent to Family specialy ability of +2. Don't push it"},
    10: {title: "Find a combat teacher", detail: "Add +1 to any weapon skill w/ exception" +
        " of Martial Arts or Brawling, or begin a new combat skill at +2"}
};

var getLuckyConnection = {
    1: "in the Police department",
    2: "in the District Attorney's Office",
    3: "in the Mayor's office"
};

function addWindfall(getLucky, age) {
    "use strict";
    var newWindfall = getRandomInt(1,10) * 100;
    getLucky.windfallHistory[age] = newWindfall;
    getLucky.windfallAmount = getLucky.windfallAmount + newWindfall;
    return getLucky;
}

function addScore(getLucky, age) {
    "use strict";
    var newScore = getRandomInt(1,10) * 100;
    getLucky.scoreHistory[age] = newScore;
    getLucky.scoreAmount = getLucky.scoreAmount + newScore;
    return getLucky;
}

function addSensei(getLucky, age) {
    "use strict";
    getLucky.senseiHistory[age] = "Find a Sensei";
    getLucky.senseiFound = getLucky.senseiFound + 1;
    return getLucky;
}

function addTeacher(getLucky, age) {
    "use strict";
    getLucky.teacherHistory[age] = "Find a teacher";
    getLucky.teacherFound = getLucky.teacherFound + 1;
    return getLucky;
}

function addCorpFavor(getLucky, age) {
    "use strict";
    getLucky.corpFavorHistory[age] = "Corp Exec owes you a favor";
    getLucky.corpFavor = getLucky.corpFavor + 1;
    return getLucky;
}

function addNomadFavor(getLucky, age) {
    "use strict";
    getLucky.nomadFavorHistory[age] = "Develop friendship with a nomad pack";
    getLucky.nomadFavor = getLucky.nomadFavor + 1;
    return getLucky;
}

function addPoliceFriend(getLucky, age) {
    "use strict";
    getLucky.policefriendHistory[age] = "Friend on Police Force";
    getLucky.policeFriend = getLucky.policeFriend + 1;
    return getLucky;
}

function addBoosterFriend(getLucky, age) {
    "use strict";
    getLucky.boosterFriendHistory[age] = "Local Boostergang likes you";
    getLucky.boosterFriend = getLucky.boosterFriend + 1;
    return getLucky;
}

function addCombatTeacher(getLucky, age) {
    "use strict";
    getLucky.combatTeacherHistory[age] = "Find combat teacher";
    getLucky.combatTeacher = getLucky.combatTeacher + 1;
    return getLucky;
}

var enemy = {
    enemyAmount: 0,
    enemyGender: {},
    enemyWhoIsIt: {},
    enemyCauseIs: {},
    enemyWhoMad: {},
    enemyWhatDo: {},
    enemyWhatThrow: {},
    addEnemy: function(age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.enemyAmount += 1;
        //var gender = getRandomInt(1,10);
        var causeRoll = getRandomInt(1,10);
        var whoIsMadRoll = getRandomInt(1,10);
        var whatDoRoll = getRandomInt(1,10);
        var whatThrowRoll = getRandomInt(1,10);

        //var enGender = "Enemy gender: ";

        if ((fourthLifeRoll % 2 === 0) === true) {
            this.enemyGender[age] = "male";
        } else if ((fourthLifeRoll % 2 === 0) === false) {
            this.enemyGender[age] = "female";
        }
        //this.enemyGender
        this.enemyWhoIsIt[age] = this.enemyMade[thirdLifeRoll]; //who are they
        this.enemyCauseIs[age] = this.enemyCause[causeRoll]; //what is the cause
        if (whoIsMadRoll <= 4) { //Who's mad
            this.enemyWhoMad[age] = this.whoIsAngry[1];
        } else if (whoIsMadRoll >= 5 && whoIsMadRoll <= 7) {
            this.enemyWhoMad[age] = this.whoIsAngry[2];
        } else if (whoIsMadRoll >= 8 && whoIsMadRoll <= 10) {
            this.enemyWhoMad[age] = this.whoIsAngry[3];
        }
        if (whatDoRoll <= 2) { //Whatcha gonna do about it
            this.enemyWhatDo[age] = this.whatDo[1];
        } else if (whatDoRoll >= 3 && whatDoRoll <= 4) {
            this.enemyWhatDo[age] = this.whatDo[2];
        } else if (whatDoRoll >= 5 && whatDoRoll <= 6) {
            this.enemyWhatDo[age] = this.whatDo[3];
        } else if (whatDoRoll >= 7 && whatDoRoll <= 8) {
            this.enemyWhatDo[age] = this.whatDo[4];
        } else if (whatDoRoll >= 9 && whatDoRoll <= 10) {
            this.enemyWhatDo[age] = this.whatDo[5];
        }
        if (whatThrowRoll <=3) { //What can they trhow against you
            this.enemyWhatThrow[age] = this.whatThrow[1];
        } else if (whatThrowRoll >= 4 && whatThrowRoll <= 5) {
            this.enemyWhatThrow[age] = this.whatThrow[2];
        } else if (whatThrowRoll >= 6 && whatThrowRoll <= 7) {
            this.enemyWhatThrow[age] = this.whatThrow[3];
        } else if (whatThrowRoll === 8) {
            this.enemyWhatThrow[age] = this.whatThrow[4];
        } else if (whatThrowRoll === 9) {
            this.enemyWhatThrow[age] = this.whatThrow[5];
        } else if (whatThrowRoll === 10) {
            this.enemyWhatThrow[age] = this.whatThrow[6];
        }

        //this.enemyWhatDo[age] = this.whatDo[whatDoRoll]; //what they gonna do about it
        //this.enemyWhatThrow[age] = this.whatThrow[whatThrowRoll]; //what can they throw against you

    },
    enemyMade: {
        1: "Ex friend",
        2: "Ex lover",
        3: "Relative",
        4: "Childhood enemy",
        5: "Person working for you",
        6: "Person you work for",
        7: "Partner or co-worker",
        8: "Booster gang member",
        9: "Corporate Executive",
        10: "Government Official"
    },
    enemyCause: {
        1: "Caused the other to lose face or status",
        2: "Caused the loss of a lover, friend or relative",
        3: "Caused a major humliation",
        4: "Accused the other of cowardice or other personal flaw",
        5: "Caused a physical disability",
        6: "Deserted or betrayed the other",
        7: "Turned down the other's offer of job or romantic involvement",
        8: "Just didn't like each other",
        9: "Was a romantic rival",
        10: "Foiled plans of the other"
    },
    whoIsAngry: {
        1: "They hate you",
        2: "You hate them",
        3: "The feeling's mutual"
    },
    whatDo: {
        1: "Go into a murderous killing rage",
        2: "Avoid the scum",
        3: "Backstab them indirectly",
        4: "Ingore them",
        5: "Rip into them verbally"
    },
    whatThrow: {
        1: "Just themselves",
        2: "Them and a few friends",
        3: "An entire gang",
        4: "A small corporation",
        5: "A Large corporation",
        6: "An entire government agency"
    }
};

var friendMade = {
    1: "Like a big brother/sister to you",
    2: "Like a kid sister/brother to you",
    3: "A teacher or mentor",
    4: "A partner or coworker",
    5: "An old lover (choose which one)",
    6: "An old enemy (choose which one",
    7: "Like a foster parent to you",
    8: "A relative",
    9: "Reconnect with an old childhood friend",
    10: "Met through a common interest",
    friendMadeAmount: 0,
    friendMadeHistory: {},
    friendMadeGender: {},
    addFriend: function(age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.friendMadeAmount += 1;
        this.friendMadeHistory[age] = this[thirdLifeRoll];
        if ((fourthLifeRoll % 2 === 0) === true) {
            this.friendMadeGender[age] = "gender: male";
        } else if ((fourthLifeRoll % 2 === 0) === false) {
            this.friendMadeGender[age] = "gender: female";
        }

    }
};

var romance = {
    happyCount:0,
    happyDetail: {},
    happyHistory: {},
    addHappyAffair: function(age) {
        "use strict";
        this.romanceCount +=1;
        this.happyHistory[age] = this.romanceEvent[1];
        this.happyDetail[age] = "n/a";
    },
    tragicCount: 0,
    tragicDetail: {},
    tragicHistory: {},
    addTragic: function(age, thirdLifeRoll) {
        "use strict";
        this.tragicCount += 1;
        this.tragicHistory[age] = this.romanceEvent[2];
        this.tragicDetail[age] = this.romanceTragic[thirdLifeRoll];
    },
    problemCount: 0,
    problemDetail: {},
    problemHistory: {},
    addProblem: function(age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.problemCount += 1;
        this.problemHistory[age] = this.romanceProblems[thirdLifeRoll];
        this.problemDetail[age] = this.romanceMutalFeel[fourthLifeRoll];
    },
    fastCount: 0,
    fastDetail: {},
    fastHistory: {},
    addFast: function(age) {
        "use strict";
        this.fastCount += 1;
        this.fastHistory[age] = this.romanceEvent[4];
        this.fastDetail[age] = "n/a";
    },
    romanceEvent: {
        1: "Happy Love Affair",
        2: "Tragic Love Affair",
        3: "Love Affair With Problems",
        4: "Fast affairs and Hot Dates"
    },
    romanceTragic: {
        1: "Lover died in an accident",
        2: "Lover mysteriously vanisehd",
        3: "It didnt work out",
        4: "A personal goal or vendetta came between you",
        5: "Lover kidnapped",
        6: "Lover went insane",
        7: "Lover committed suicide",
        8: "Lover killed in a fight",
        9: "Rival cut you out of the action",
        10: "Lover imprisoned or exiled"
    },
    romanceProblems: {
        1: "Your lover's friends/family hate you",
        2: "Your lover's friends/family would use any means to get rid of you",
        3: "Your friends/family hate your lover",
        4: "One of you has a romantic rival",
        5: "You are seperated in some way",
        6: "You fight constantly",
        7: "You're professional rivals",
        8: "One of you is insanely jealous",
        9: "One of you is messing around",
        10: "You have conflicting backgrounds and families"
    },
    romanceMutalFeel: {
        1: "They still love you",
        2: "You still love them",
        3: "You still love each other",
        4: "You hate them",
        5: "They hate you",
        6: "You hate each other",
        7: "You're friends",
        8: "No feelings either way; its over",
        9: "You like them, they hate you",
        10: "They like you, you hate them"
    }

};

var nothing = {
    nothingCount: 0,
    nothingDetail: {},
    nothingHistory: {},
    addNothing: function(age) {
        "use strict";
        this.nothingCount += 1;
        this.nothingHistory[age] = "Nothing Happened This Year";
        this.nothingDetail[age] = "n/a";
    },
    nothingResult: "Nothing Happened This Year"
    //nothingResult: "n/a"
};

var skills = {
    special: {
        name: "Special Abilities",
        Cop: "Authority",
        Rocker: "Charismatic Leadership",
        Solo: "Combat Sense",
        Media: "Credibility",
        Nomad: "Family",
        Netrunner: "Interface",
        Techie: "Jury Rig",
        MedTechie: "Medical Tech",
        Corp: "Resources",
        Fixer: "Streetdeal"
    },
    attr: {
        name: "Attractiveness Skills",
        attr01: "Personal Grooming",
        attr02: "Wardrobe & Style"
    },
    body: {
        name: "Body Skills",
        body01: "Endurance",
        body02: "Strength Feat",
        body03: "Swimming"
    },
    cool: {
        name: "Cool / Will Skills",
        cool01: "Interrogation",
        cool02: "Intimidate",
        cool03: "Oratory",
        cool04: "Resist Torture/Drugs",
        cool05: "Streetwise"
    },
    emp: {
        name: "Empathy Sills",
        emp01: "Human Perception",
        emp02: "Interview",
        emp03: "Leadership",
        emp04: "Seduction",
        emp05: "Social",
        emp06: "Persuasion and Fast Talk",
        emp07: "Perform"
    },
    int: {
        name: "Intelligence Skills",
        int01: "Accounting",
        int02: "Anthropology",
        int03: "Awareness / Notice",
        int04: "Biology",
        int05: "Botany",
        int06: "Chemistry",
        int07: "Composition",
        int08: "Diagnose Illness",
        int09: "Education & General Knowledge",
        int10: {main: "Expert", sub: ""},
        int11: "Gamble",
        int12: "Geology",
        int13: "Hide/Evade",
        int14: "History",
        int15: {main: "Know Language: ", sub: ""},
        int16: "Library Search",
        int17: "Mathematics",
        int18: "Physics",
        int19: {main: "Programming: ", sub: ""},
        int20: "Shadow/Track",
        int21: "Stock Market",
        int22: "System Knowledge",
        int23: "Teaching",
        int24: "Wildnerness Survival",
        int25: "Zoology"
    },
    ref: {
        name: "Reflex Skills",
        ref01: "Archery",
        ref02: "Athletics",
        ref03: "Brawling",
        ref04: "Dance",
        ref05: "Dodge & Escape",
        ref06: "Driving",
        ref07: "Fencing",
        ref08: "Handgun", //Handgun
        ref09: "Heavy Weapons",
        ref10: {main: "Martial Art: ", sub: ""},
        ref11: "Melee",
        ref12: "Motorcycle",
        ref13: "Operate Heavy Machinery",
        ref14: "Pilot Gyro",
        ref15: "Pilot Fixed Wing",
        ref16: "Pilot Dirigible",
        ref17: "Pilot Vect. Thrust Vehicle",
        ref18: "Rifle",
        ref19: "Stealth",
        ref20: "Submachinegun"
    },
    tech: {
        name: "Tech Skills",
        tech01: "Aero Tech",
        tech02: "AV Tech",
        tech03: "Basic Tech",
        tech04: "Cryotank Operation",
        tech05: "Cyberdeck Design",
        tech06: "CyberTech",
        tech07: "Demolitions",
        tech08: "Disguise",
        tech09: "Electronics",
        tech10: "Electronic Security",
        tech11: "First Aid",
        tech12: "Forgery",
        tech13: "Gyro Tech",
        tech14: "Paint or Draw",
        tech15: "Photo & Film",
        tech16: "Pharmaceuticals",
        tech17: "Pick Lock",
        tech18: "Pick Pocket",
        tech19: "Play Instrument",
        tech20: "Weaponsmith"
    }
};

var career = {
    solo: {
        1: skills.special.Solo,
        2: skills.int.int03,
        3: skills.ref.ref08,
        4: skills.ref.ref03,
        5: skills.ref.ref10.main,
        6: skills.ref.ref11,
        7: skills.tech.tech20,
        8: skills.ref.ref18,
        9: skills.ref.ref02,
        10: skills.ref.ref20,
        11: skills.ref.ref19
    },
    corp: {
        1: skills.special.Corp,
        2: skills.int.int03,
        3: skills.emp.emp01,
        4: skills.int.int09,
        5: skills.int.int16,
        6: skills.emp.emp05,
        7: skills.emp.emp06,
        8: skills.int.int21,
        9: skills.attr.attr02,
        10: skills.attr.attr01
    },
    media: {
        1: skills.special.Media,
        2: skills.int.int03,
        3: skills.int.int07,
        4: skills.int.int09,
        5: skills.emp.emp06,
        6: skills.emp.emp01,
        7: skills.emp.emp05,
        8: skills.cool.cool05,
        9: skills.tech.tech15
    },
    nomad: {
        1: skills.special.Nomad,
        2: skills.int.int03,
        3: skills.body.body01,
        4: skills.ref.ref11,
        5: skills.ref.ref18,
        6: skills.ref.ref06,
        7: skills.tech.tech03,
        8: skills.int.int24,
        9: skills.ref.ref03,
        10: skills.ref.ref02
    },
    techie: {
        1: skills.special.Techie,
        2: skills.int.int03,
        3: skills.tech.tech03,
        4: skills.tech.tech06,
        5: skills.int.int23,
        6: skills.int.int09,
        7: skills.tech.tech09,
        8: skills.tech.tech01,
        9: skills.tech.tech02,
        10: skills.tech.tech20,
        11: skills.tech.tech10,
        12: skills.tech.tech13
    },
    cop: {
        1: skills.special.Cop,
        2: skills.int.int03,
        3: skills.ref.ref08,
        4: skills.emp.emp01,
        5: skills.ref.ref02,
        6: skills.int.int09,
        7: skills.ref.ref03,
        8: skills.ref.ref11,
        9: skills.cool.cool01,
        10: skills.cool.cool05
    },
    rocker: {
        1: skills.special.Rocker,
        2: skills.int.int03,
        3: skills.emp.emp07,
        4: skills.attr.attr02,
        5: skills.int.int07,
        6: skills.ref.ref03,
        7: skills.tech.tech19,
        8: skills.cool.cool05,
        9: skills.emp.emp06,
        10: skills.emp.emp04
    },
    med: {
        1: skills.special.MedTechie,
        2: skills.int.int03,
        3: skills.tech.tech03,
        4: skills.int.int08,
        5: skills.int.int09,
        6: skills.tech.tech04,
        7: skills.int.int16,
        8: skills.tech.tech16,
        9: skills.int.int25,
        10: skills.emp.emp01
    },
    fixer: {
        1: skills.special.Fixer,
        2: skills.int.int03,
        3: skills.tech.tech12,
        4: skills.ref.ref08,
        5: skills.ref.ref03,
        6: skills.ref.ref11,
        7: skills.tech.tech17,
        8: skills.tech.tech18,
        9: skills.cool.cool02,
        10: skills.emp.emp06
    },
    net: {
        1: skills.special.Netrunner,
        2: skills.int.int03,
        3: skills.tech.tech03,
        4: skills.int.int09,
        5: skills.int.int22,
        6: skills.tech.tech06,
        7: skills.tech.tech05,
        8: skills.int.int07,
        9: skills.tech.tech09,
        10: skills.int.int19.main
    }
};

function rollMethodClick() {
    "use strict";
    console.log("rollMethodClick() fired");
    var rollMethod = document.getElementById("rollMethod");
    var whatClicked = rollMethod.options[rollMethod.selectedIndex].value;
    console.log(whatClicked);
    characterMeta.rollStyle = whatClicked;
    enableForms();
    if (whatClicked === "random") {
        characterMeta.randomPoints();
    } else if (whatClicked === "fast") {
        characterMeta.fastPoints();
    } else if (whatClicked === "cineMajorHero" ||
    whatClicked ===  "cineMajorSupp" ||
    whatClicked === "cineMinorHero" ||
    whatClicked === "cineMinorSupp" ||
    whatClicked === "Average")  {
        characterMeta.cinematicChar(whatClicked);
    }

}

var characterMeta = {
    charPoints: 0,
    charPointsRemain: 0,
    careerSkillPointsRemain: 0,
    pickupSkillPointsRemain: 0,
    rollStyle: "",
    randRolls: [],
    randTotal: 0,
    randRemain: 0,
    randomPoints: function() {
        "use strict";
        this.randRolls.length = 0;
        this.randTotal = 0;
        var roll = 0;
        for (var i = 1; i <= 9; i++) {
            roll = getRandomInt(1,10);
            this.randRolls.push(roll);
        }
        console.log(this.randRolls);
        var rollOutput = document.getElementById("rollOutput");
        while (rollOutput.firstChild) { //Remove all children from rollOutput
            rollOutput.removeChild(rollOutput.firstChild);
        }

        for (var j = 0; j < this.randRolls.length; j++) {
            this.randTotal = this.randTotal + this.randRolls[j];
        }
        rollOutput.appendChild(document.createTextNode("Roll Method: Random"));
        rollOutput.appendChild(document.createElement("br"));
        rollOutput.appendChild(document.createTextNode("Roll Total: ".concat(this.randTotal.toString())));

    },
    fastRolls: [],
    fastTotal: 0,
    fastPoints: function() {
        "use strict";

        this.fastTotal = 0;
        this.fastRolls.length = 0;
        var roll = 0;
        for (var i = 0; i <= 9; i++) {
            roll = getRandomInt(2,10);
            this.fastRolls.push(roll);
        }
        console.log(this.fastRolls);
        var rollOutput = document.getElementById("rollOutput");
        while (rollOutput.firstChild) { //Remove all children from rollOutput
            rollOutput.removeChild(rollOutput.firstChild);
        }

        rollOutput.appendChild(document.createTextNode("Roll Method: Fast"));
        rollOutput.appendChild(document.createElement("br"));
        rollOutput.appendChild(document.createTextNode("Rolls: ".concat(this.fastRolls)));

    },
    cinematicChar: function(whatClicked) {
        "use strict";
        var rollOutput = document.getElementById("rollOutput");
        while (rollOutput.firstChild) { //Remove all children from rollOutput
            rollOutput.removeChild(rollOutput.firstChild);
        }
        console.log(whatClicked);
        var points = 0;
        var cine = "";
        if (whatClicked === "cineMajorHero") {
            points = 80;
            cine = "Major Hero";
        } else if (whatClicked === "cineMajorSupp") {
            points = 75;
            cine = "Major Supporting Character";
        } else if (whatClicked === "cineMinorHero") {
            points = 70;
            cine = "Minor Hero";
        } else if (whatClicked === "cineMinorSupp") {
            points = 60;
            cine = "Minor Supporting Character";
        } else if (whatClicked === "Average") {
            points = 50;
            cine = "Average";
        }
        rollOutput.appendChild(document.createTextNode("Cinematic Method: ".concat(cine)));
        rollOutput.appendChild(document.createElement("br"));
        rollOutput.appendChild(document.createTextNode("Points: ".concat(points.toString())));


    },
    statChange: function() { //Flush this out if verifying rolls/totals when stats updated
        "use strict";
        console.log("stat changed");
        var rollMethod = document.getElementById("rollMethod");
        var whatClicked = rollMethod.options[rollMethod.selectedIndex].value;
        console.log(whatClicked);
        if (whatClicked === "random") {
            //characterMeta.randomPoints();
            console.log("random in statChange");
        }
    }
};

function roleSelectPopulate() {
    "use strict";
    var roleSelect = document.getElementById("roleSelect");
    var rolesLength = Object.keys(skills.special).length;
    var roles = Object.keys(skills.special);
    console.log(rolesLength);
    for (var i = 1; i < rolesLength; i++) {
        var option = document.createElement("option");
        console.log(roles[i]);
        option.value = i;
        option.textContent = roles[i];
        roleSelect.appendChild(option);
        //console.log(Object.keys(skills.special[i]));
    }
}

function randRoleClick() {
    "use strict";
    var roleSelect = document.getElementById("roleSelect");
    var roleSelect_label = document.getElementById("roleSelect_label");
    roleSelect.style.display = "none";
    roleSelect_label.style.display = "none";

    var randRoll = getRandomInt(1,10);
    var roleField = document.getElementById("roleField");
    var roles = Object.keys(skills.special);
    //console.log(roles);
    roleField.value = roles[randRoll];

    createCareerSkills(roleField.value);

}

function manRoleclick() {
    "use strict";
    var roleSelect = document.getElementById("roleSelect");
    var roleField = document.getElementById("roleField");
    var roleSelect_label = document.getElementById("roleSelect_label");
    roleSelect.style.display = "inline";
    roleSelect_label.style.display = "inline";
    roleSelectPopulate();

    roleField.value = roleSelect.options[roleSelect.selectedIndex].text;
    createCareerSkills(roleField.value);
}

function manualRoleSelectChange() {
    "use strict";
    var roleField = document.getElementById("roleField");
    var roleSelect = document.getElementById("roleSelect");
    roleField.value = roleSelect.options[roleSelect.selectedIndex].text;
    createCareerSkills(roleField.value);
}

function createCareerSkills(role) {
    "use strict";
    console.log(role);

    var careerSkillTable = document.getElementById("careerSkillTable");
    while (careerSkillTable.firstChild) { //Remove all children (options) from careerSkillTable
        careerSkillTable.removeChild(careerSkillTable.firstChild);
    }

    var skills;

    if (role === "Solo") {
        skills = career.solo;
    } else if (role === "Corp") {
        skills = career.corp;
    } else if (role === "Media") {
        skills = career.media;
    } else if (role === "Nomad") {
        skills = career.nomad;
    } else if (role === "Techie") {
        skills = career.techie;
    } else if (role === "Cop") {
        skills = career.cop;
    } else if (role === "Rocker") {
        skills = career.rocker;
    } else if (role === "MedTechie") {
        skills = career.med;
    } else if (role === "Fixer") {
        skills = career.fixer;
    } else if (role === "Netrunner") {
        skills = career.net;
    }

    var numSkills = Object.keys(skills).length;
    console.log(numSkills);
    for (var i = 1; i <= numSkills; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var td2 = document.createElement("td");

        var textField = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = skills[i];

        //appendBR(careerSkills);
        td.appendChild(label);
        td2.appendChild(textField);
        tr.appendChild(td);
        tr.appendChild(td2);
        careerSkillTable.appendChild(tr);

    }


}

window.onload = init;
function init() {
    "use strict";

    //Temp scroll to bottom for dev
    window.scrollTo(0, document.body.scrollHeight);

    //Roll method elements
    //var randomMethod = document.getElementById("randomMethod");
    //var fastMethod = document.getElementById("fastMethod");
    var rollMethod = document.getElementById("rollMethod");

    //Statistic fields
    var ma = document.getElementById("ma");
    var bt = document.getElementById("bt"); //body type stat

    //Statistics event handlers
    //randomMethod.onclick = randomClick;
    //fastMethod.onclick = fastClick;
    //rollMethod.onclick = rollMethodClick;
    //rollMethod.onchange = rollMethodClick;
    rollMethod.onclick = rollMethodClick;



    ma.onchange = updateRun;
    bt.onchange = updateBodyDerived;

    var randRole = document.getElementById("randRole");
    var manRole = document.getElementById("manRole");
    var roleSelect = document.getElementById("roleSelect");

    randRole.onclick = randRoleClick;
    manRole.onclick = manRoleclick;
    roleSelect.onchange = manualRoleSelectChange;

    //roleSelectPopulate();

    //Personal Style (Random or manual) radio buttons
    var rollStyle = document.getElementById("rollStyle"); //random
    var manualStyle = document.getElementById("manualStyle"); //manual

    //Clothes, Hair, Affectations Selection Dropdowns
    var manualClothesSelect = document.getElementById("manualClothesSelect");
    var manualHairSelect = document.getElementById("manualHairSelect");
    var manualAffecSelect = document.getElementById("manualAffecSelect");


    //Style event handlers
    rollStyle.onclick = rollStyleClick; //Choose styles randomly
    manualStyle.onclick = manualStyleClick; //Choose styles manually
    manualClothesSelect.onchange = manualClothesSelectChange;
    manualHairSelect.onchange = manualHairSelectChange;
    manualAffecSelect.onchange = manualAffecSelectChange;

    //Origin (random or manual) radio buttons
    var rollEth = document.getElementById("rollEth");
    var manualEth = document.getElementById("manualEth");

    //Origin selects / dropdowns
    var manualEthSelect = document.getElementById("manualEthSelect");
    var manualLangSelect = document.getElementById("manualLangSelect");

    //Origin event handlers
    rollEth.onclick = rollEthClick; //Choose ethnic origins randomly
    manualEth.onclick = manualEthClick; //Choose ethnic origins manually
    manualEthSelect.onchange = updateLang;
    manualLangSelect.onchange = manualLangSelectChange;

    //Family ranking elements
    var randFam = document.getElementById("randFam");
    var manualFam = document.getElementById("manualFam");
    var manualFamSelect = document.getElementById("manualFamSelect");

    //Family ranking event handlers
    randFam.onclick = randFamClick;
    manualFam.onclick = manualFamClick;
    manualFamSelect.onchange = manualFamSelectChange;

    //Parents elements
    var randParents = document.getElementById("randParents");
    var manualParents = document.getElementById("manualParents");
    var parentStatusField = document.getElementById("parentStatusField");
    var manualParentSelect = document.getElementById("manualParentSelect");
    var parentSomethingHappened = document.getElementById("parentSomethingHappened");

    var parentsOkayRadio = document.getElementById("parentsOkayRadio");
    var parentsIssuesRadio = document.getElementById("parentsIssuesRadio");
    var parentsOkayRadio_label = document.getElementById("parentsOkayRadio_label");
    var parentsIssuesRadio_label = document.getElementById("parentsIssuesRadio_label");

    //Parents event handlers
    randParents.onclick = randParentsClick;
    manualParents.onclick = manualParentsClick;

    parentsOkayRadio.onclick = parentsOkayRadioClick;
    parentsIssuesRadio.onclick = parentsIssuesRadioClick;
    manualParentSelect.onoclick = manualParentSelectClick;
    manualParentSelect.onchange = manualParentSelectChange;

    //Family status elements
    var randFamilyStatus = document.getElementById("randFamilyStatus");
    var manualFamilyStatus = document.getElementById("manualFamilyStatus");
    var manualFamDanger = document.getElementById("manualFamDanger");
    var manualFamOkay = document.getElementById("manualFamOkay");
    var familyTragedySelect = document.getElementById("familyTragedySelect");
    //Family status event handlers
    randFamilyStatus.onclick = randFamilyStatusClick;
    manualFamilyStatus.onclick = manualFamilyStatusClick;
    manualFamDanger.onclick = manualFamDangerClick;
    manualFamOkay.onclick = manualFamOkayClick;
    familyTragedySelect.onchange = familyTragedySelectChange;

    //Childhood env elements
    var randChildEnv = document.getElementById("randChildEnv");
    var manualChildEnv = document.getElementById("manualChildEnv");
    var manualChildSelect = document.getElementById("manualChildSelect");
    //Childhood event handlers
    randChildEnv.onclick = randChildEnvClick;
    manualChildEnv.onclick = manualChildEnvClick;
    manualChildSelect.onchange = manualChildSelectChange;

    //Siblings elements
    var randSiblings = document.getElementById("randSiblings");
    var manualSiblings = document.getElementById("manualSiblings");
    //Siblings event handlers
    randSiblings.onclick = randSiblingsClick;
    manualSiblings.onclick = manualSiblingsClick;

    //Personality elements
    var randPersTraits = document.getElementById("randPersTraits");
    var manualPersTraits = document.getElementById("manualPersTraits");
    //Personality event handlers
    randPersTraits.onclick = randPersTraitsClick;
    manualPersTraits.onclick = manualPersTraitsClick;

    //Person valued elements
    var randPersValue = document.getElementById("randPersValue");
    var manualPersValue = document.getElementById("manualPersValue");
    //Person valued event handlers
    randPersValue.onclick = randPersValueClick;
    manualPersValue.onclick = manualPersValueClick;

    //You value elements
    var randYouValue = document.getElementById("randYouValue");
    var manYouValue = document.getElementById("manYouValue");
    //You value event handlers
    randYouValue.onclick = randYouValueClick;
    manYouValue.onclick = manYouValueClick;

    //How feel elements
    var randYouFeel = document.getElementById("randYouFeel");
    var manYouFeel = document.getElementById("manYouFeel");
    //How feel event handlers
    randYouFeel.onclick = randYouFeelClick;
    manYouFeel.onclick = manYouFeelClick;

    //Valued Possession elements
    var randPos = document.getElementById("randPos");
    var manPos = document.getElementById("manPos");
    //Possession event handlers
    randPos.onclick = randPosClick;
    manPos.onclick = manPosClick;

    //Age elements
    var randAge = document.getElementById("randAge");
    var manAge = document.getElementById("manAge");
    var ageField = document.getElementById("ageField");

    //Age event handlers
    randAge.onclick = randAgeClick;
    manAge.onclick = manAgeClick;
    ageField.onchange = ageCheck;
    //ageField.onblur = ageCheck;

}