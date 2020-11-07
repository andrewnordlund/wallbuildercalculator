var dbug = false;
if (dbug) console.log ("Loading wallbuildercalculator.js");

var materialCostControls = {"rc":{"unit":null,"psf":null, "Chk":null}, "ggComp":{"unit":null,"psf":null, "Chk":null}, "drywall12":{"unit":null,"psf":null, "Chk":null}, "drywall58":{"unit":null,"psf":null, "Chk":null}, "silentFX":{"unit":null,"psf":null, "Chk":null}, "drywallCompound":{"unit":null,"psf":null, "Chk":null}, "studs":{"unit":null,"psf":null, "Chk":null}, "safeNSound":{"unit":null,"psf":null, "Chk":null},"battInsulation":{"unit":null,"psf":null, "Chk":null},"Sonopan":{"unit":null,"psf":null, "Chk":null}}

var builderControls = {"sizeNum":null, "rcChk":null, "ggChk":null,"results":null};

var materials = {"rc" : {"costPerUnit":6.47, "costPerSF":0.54}, "ggComp" : {"costPerUnit":19.67, "costPerSF":0.20}, "drywall12" : {"costPerUnit":21.19, "costPerSF":0.66}, "drywall58":{"costPerUnit":21.98, "costPerSF":0.69}, "silentFX": {"costPerUnit":89.99, "costPerSF":2.81}, "drywallCompound" : {"costPerUnit":20.20, "costPerSF":0.04}, "studs" : {"costPerUnit":6.40, "costPerSF":0.80}, "safeNSound" : {"costPerUnit":57.29, "costPerSF":0.96}, "battInsulation" : {"costPerUnit":53.50, "costPerSF":0.55}, "Sonopan" : {"costPerUnit":29.76, "costPerSF":0.93}};
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
