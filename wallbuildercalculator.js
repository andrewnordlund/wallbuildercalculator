console.log ("Loading wallbuildercalculator.js");

var dbug = true;
var materialCostControls = {"rc":{"unit":null,"psf":null}, "ggComp":{"unit":null,"psf":null}, "drywall12":{"unit":null,"psf":null}, "drywall58":{"unit":null,"psf":null}, "silentFX":{"unit":null,"psf":null}, "drywallCompound":{"unit":null,"psf":null}, "studs":{"unit":null,"psf":null}, "safeNSound":{"unit":null,"psf":null},"battInsulation":{"unit":null,"psf":null},"Sonopan":{"unit":null,"psf":null}}

var builderControls = {"size":null};

var materials = {"rc" : {"costPerUnit":6.47, "costPerSF":0.54}, "ggComp" : {"costPerUnit":19.67, "costPerSF":0.20}, "drywall12" : {"costPerUnit":21.19, "costPerSF":0.66}, "drywall58":{"costPerUnit":21.98, "costPerSF":0.69}, "silentFX": {"costPerUnit":89.99, "costPerSF":2.81}, "drywallCompound" : {"costPerUnit":20.20, "costPerSF":0.04}, "studs" : {"costPerUnit":6.40, "costPerSF":0.80}, "safeNSound" : {"costPerUnit":57.29, "costPerSF":0.96}, "battInsulation" : {"costPerUnit":53.50, "costPerSF":0.55}, "Sonopan" : {"costPerUnit":29.76, "costPerSF":0.93}};
const HST = 1.13;

function init () {
	console.log ("Initting");
	for (let control in materialCostControls) {
		let id = control + "Txt";
		if (dbug) console.log ("Looking for " + id + " to set price as " + materials[control] + ".");
		materialCostControls[control]["unit"] = document.getElementById(id);
		materialCostControls[control]["psf"] = document.getElementById(id + "psf");
		//if (dbug) console.log ("Got " + materialCostControls[control]["unit"]+ ".");
		materialCostControls[control]["unit"].setAttribute("value", (materials[control]["costPerUnit"] * HST).toFixed(2));
		materialCostControls[control]["psf"].setAttribute("value", (materials[control]["costPerSF"] * HST).toFixed(2));
	}
	for (let control in builderControls) {
		let id = control + "Txt";
		builderControls[control] = document.getElementById(id);
	}

}

document.addEventListener("DOMContentLoaded", init, false);
console.log ("Loaded wallbuildercalculator.js");
