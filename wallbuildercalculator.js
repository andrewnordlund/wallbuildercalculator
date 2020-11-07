console.log ("Loading wallbuildercalculator.js");

var dbug = true;
var materialCostControls = {"rc":null, "ggComp":null, "drywall12":null, "drywall58":null, "silentFX":null, "drywallCompound":null, "studs":null, "safeNSound":null,"battInsulation":null,"Sonopan":null}
var builderControls = {"size":null};
var materials = {"rc" : 6.47, "ggComp" : 19.67, "drywall12" : 21.19, "drywall58":21.98, "silentFX": 89.99, "drywallCompound" : 20.20, "studs" : 5.4, "safeNSound" : 57.29, "battInsulation" : 53.5, "Sonopan" : 29.76};
const HST = 1.13;

function init () {
	console.log ("Initting");
	for (let control in materialCostControls) {
		let id = control + "Txt";
		if (dbug) console.log ("Looking for " + id + " to set price as " + materials[control] + ".");
		materialCostControls[control] = document.getElementById(id);
		if (dbug) console.log ("Got " + materialCostControls[control]+ ".");
		materialCostControls[control].setAttribute("value", (materials[control] * HST).toFixed(2));
	}
	for (let control in builderControls) {
		let id = control + "Txt";
		builderControls[control] = document.getElementById(id);
	}

}

document.addEventListener("DOMContentLoaded", init, false);
console.log ("Loaded wallbuildercalculator.js");
