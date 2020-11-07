var dbug = false;
if (dbug) console.log ("Loading wallbuildercalculator.js");

var materialCostControls = {"rc":{"unit":null,"psf":null, "Chk":null}, "ggComp":{"unit":null,"psf":null, "Chk":null}, "drywall12":{"unit":null,"psf":null, "Chk":null}, "drywall58":{"unit":null,"psf":null, "Chk":null}, "silentFX":{"unit":null,"psf":null, "Chk":null}, "drywallCompound":{"unit":null,"psf":null, "Chk":null}, "studs":{"unit":null,"psf":null, "Chk":null}, "safeNSound":{"unit":null,"psf":null, "Chk":null},"battInsulation":{"unit":null,"psf":null, "Chk":null},"Sonopan":{"unit":null,"psf":null, "Chk":null}}

var builderControls = {"sizeNum":null, "rcChk":null, "ggChk":null,"results":null};

var materials = {"rc" : {"costPerUnit":6.47, "costPerDrywall": 0, "costPerSF":0.54, "link"{"text":null, "url":null}}, "ggComp" : {"costPerUnit":19.67, "costPerDrywall": 0, "costPerSF":0.20, "link"{"text":null, "url":null}}, "drywall12" : {"costPerUnit":21.19, "costPerDrywall": 0, "costPerSF":0.66, "link"{"text":null, "url":null}}, "drywall58":{"costPerUnit":21.98, "costPerDrywall": 0, "costPerSF":0.69, "link"{"text":null, "url":null}}, "silentFX": {"costPerUnit":89.99, "costPerDrywall": 0, "costPerSF":2.81, "link"{"text":null, "url":null}}, "drywallCompound" : {"costPerUnit":20.20, "costPerDrywall": 0, "costPerSF":0.04, "link"{"text":null, "url":null}}, "studs" : {"costPerUnit":6.40, "costPerDrywall": 0, "costPerSF":0.80, "link"{"text":null, "url":null}}, "safeNSound" : {"costPerUnit":57.29, "costPerDrywall": 0, "costPerSF":0.96, "link"{"text":null, "url":null}}, "battInsulation" : {"costPerUnit":53.50, "costPerDrywall": 0, "costPerSF":0.55, "link"{"text":null, "url":null}}, "Sonopan" : {"costPerUnit":29.76, "costPerDrywall": 0, "costPerSF":0.93, "link"{"text":null, "url":null}}};
const HST = 1.13;

function init () {
	if (dbug) console.log ("Initting");
	for (let control in materialCostControls) {
		let id = control + "Txt";
		if (dbug) console.log ("Looking for " + id + " to set price as " + materials[control] + ".");
		materialCostControls[control]["unit"] = document.getElementById(id);
		materialCostControls[control]["psf"] = document.getElementById(id + "psf");
		materialCostControls[control]["Chk"] = document.getElementById(control + "Chk");
		//if (dbug) console.log ("Got " + materialCostControls[control]["unit"]+ ".");
		materialCostControls[control]["unit"].setAttribute("value", (materials[control]["costPerUnit"] * HST).toFixed(2));
		materialCostControls[control]["psf"].setAttribute("value", (materials[control]["costPerSF"] * HST).toFixed(2));

		materialCostControls[control]["unit"].addEventListener("change", calculate, false);
		materialCostControls[control]["psf"].addEventListener("change", calculate, false);
		materialCostControls[control]["Chk"].addEventListener("click", calculate, false);
	}
	for (let control in builderControls) {
		let id = control;
		builderControls[control] = document.getElementById(id);
	}
	builderControls["sizeNum"].addEventListener("change", calculate, false);
	calculate();

} // End of init

function calculate (e) {
	if (dbug) console.log ("Calculating");
	let total = 0;
	for (let control in materialCostControls) {
		if (dbug) console.log ("Checking for value of control: " + control + ".");
		if (materialCostControls[control]["Chk"].checked) total = total + materialCostControls[control]["psf"].value * builderControls["sizeNum"].value;
		if (dbug) console.log ("Total " + total + ".");
	}
	builderControls["results"].innerHTML = total.toFixed(2);
} // End of calculate

document.addEventListener("DOMContentLoaded", init, false);
if (dbug) console.log ("Loaded wallbuildercalculator.js");
