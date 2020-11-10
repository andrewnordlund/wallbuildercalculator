var dbug = false;
if (dbug) console.log ("Loading wallbuildercalculator.js");

var materialCostControls = {
	"studs":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"safeNSound":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"battInsulation":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"rc":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"Sonopan":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"drywall12":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"drywall58":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"silentFX":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"ggComp":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"ggSealant":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"drywallScrews":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"drywallCompound":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"drywallTape":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
	"paint":{"FS":null, "unit":null,"psd":null, "psf":null, "Chk":null},
}

var builderControls = {"sizeNum":null, "rcChk":null, "ggChk":null,"results":null};

var materials = {
	"studs" : {"costPerUnit":6.40, "costPerDrywall": 4, "costPerSF":0.80, "link":[{"text":"Home Depot - Framing Lumber", "url":"https://www.homedepot.ca/product/hdg-2x4x92-5-8-framing-lumber/1000112105"}]}, 
	"safeNSound" : {"costPerUnit":57.29, "costPerDrywall": 0.536, "costPerSF":0.96, "link":[{"text":"ROCKWOOL \"Safe'n'Sound\" Insulation 196204 | RONA", "url":"https://www.rona.ca/en/rockwool-safensound-insulation-196204-0708002"}]}, 
	"battInsulation" : {"costPerUnit":53.50, "costPerDrywall": 0.327, "costPerSF":0.55, "link":[{"text":"Owens Corning R-12 EcoTouch 15\"x47\"x3.5\" PINK FIBERGLAS Insulation | Home Depot", "url":"https://www.homedepot.ca/product/owens-corning-r-12-ecotouch-15-inch-x-47-inch-x-3-5-inch-pink-fiberglas-insulation-spacesaver-97-9-sq-ft-/1000406679"}]}, 
	"rc" : {"costPerUnit":6.47, "costPerDrywall": 1, "costPerSF":0.54, "link":[{"text":"Bailey Metal Products RC Plus 12 ft. Resilient Channel | Home Depot", "url":"https://www.homedepot.ca/product/bailey-metal-products-rc-plus-12-ft-resilient-channel/1000165782"}]},
	"Sonopan" : {"costPerUnit":29.76, "costPerDrywall": 1, "costPerSF":0.93, "link":[{"text":"SONOpan Soundproofing Panels | Home Depot", "url":"https://www.homedepot.ca/product/sonopan-soundproofing-panels/1000441119"}]},
	"drywall12" : {"costPerUnit":21.19, "costPerDrywall": 1, "costPerSF":0.66, "link":[{"text":"CertainTeed Easi-Lite Drywall - 1/2\"x4'x8' 145476 | RONA", "url":"https://www.rona.ca/en/certainteed-easi-lite-drywall-1-2-x-4-x-8-145476-61635035"}]}, 
	"drywall58":{"costPerUnit":21.98, "costPerDrywall": 1, "costPerSF":0.69, "link":[{"text":"CGC Sheetrock 5/8\"x4'x8'. Firecode Core (Type X) Drywall Panel | Home Depot", "url":"https://www.homedepot.ca/product/cgc-sheetrock-5-8-in-x-4-ft-x-8-ft-firecode-core-type-x-drywall-panel/1000115029"}]}, 
	"silentFX": {"costPerUnit":89.99, "costPerDrywall": 1, "costPerSF":2.81, "link":[{"text":"CertainTeed SilentFX Drywall (1/2\"x4'x8') | Lowe's Canada", "url":"https://www.lowes.ca/product/drywall-boards/certainteed-silentfx-drywall-12-in-x-4-ft-x-8-ft-790379"}]},
	"ggComp" : {"costPerUnit":19.67, "costPerDrywall": 2, "costPerSF":0.20, "link":[{"text":"Green Glue Noise proofing Compound | Home Depot", "url":"https://www.homedepot.ca/product/green-glue-noise-proofing-compound/1000837170"}]}, 
	"ggSealant" : {"costPerUnit":16.90, "costPerDrywall": .01, "costPerSF":0.20, "link":[{"text":"Green Glue Noise proofing Compound | Home Depot", "url":"https://www.homedepot.ca/product/green-glue-noise-proofing-sealant/1000837169"}]}, 
	"drywallScrews" : {"costPerUnit":19.78, "costPerDrywall":0.0319, "costPerSF":0, "link":[{"text":"Paulin #6 x 1-1/4\" Flat Head Phillips Drive Coarse Thread Drywall Screws - 1000pcs | Home Depot", "url":"https://www.homedepot.ca/product/paulin--6-x-1-1-4-inch-flat-head-phillips-drive-coarse-thread-drywall-screws-1000pcs/1000179917"}]},
	"drywallCompound" : {"costPerUnit":20.20, "costPerDrywall": 0.0634, "costPerSF":0.04, "link":[{"text":"CGC Sheetrock All Purpose-Lite Drywall Compound, Ready-Mixed, 17 L Carton | Home Depot", "url":"https://www.homedepot.ca/product/cgc-sheetrock-all-purpose-lite-drywall-compound-ready-mixed-17-l-carton/1000511934"}]}, 
	"drywallTape" : {"costPerUnit":6.98, "costPerDrywall":0.0315, "costPerSF":0, "link":[{"text":"Sheetrock CGC Paper Drywall Tape, 2-1/16\" x 500'. Roll | Home Depot", "url":"https://www.homedepot.ca/product/sheetrock-cgc-paper-drywall-tape-2-1-16-in-x-500-ft-roll/1000117375?rrec=true"}]},
	"paint" : {"costPerUnit":39.97, "costPerDrywall":0.08, "costPerSF":0, "link":[{"text":"Behr Premium Plus Premium Plus Interior Eggshell Enamel Paint in Ultra Pure White, 3.79 L | Home Depot", "url":"https://www.homedepot.ca/product/behr-premium-plus-premium-plus-interior-eggshell-enamel-paint-in-ultra-pure-white-3-79-l/1000402560"}]}
	}
const HST = 1.13;

function init () {
	if (dbug) console.log ("Initting");
	for (let control in materialCostControls) {
		let id = control + "Txt";
		if (dbug) console.log ("Looking for " + id + " to set price as " + materials[control] + ".");
		materialCostControls[control]["unit"] = document.getElementById(id);
		materialCostControls[control]["psd"] = document.getElementById(id + "psd");
		materialCostControls[control]["psf"] = document.getElementById(id + "psf");
		materialCostControls[control]["Chk"] = document.getElementById(control + "Chk");
		materialCostControls[control]["FS"] = document.getElementById(control + "FS");
		//if (dbug) console.log ("Got " + materialCostControls[control]["unit"]+ ".");
		materialCostControls[control]["unit"].setAttribute("value", (materials[control]["costPerUnit"] * HST).toFixed(2));
		materialCostControls[control]["psd"].setAttribute("value", (materials[control]["costPerUnit"]*materials[control]["costPerDrywall"]*HST).toFixed(2));
		materialCostControls[control]["psf"].setAttribute("value", ((materials[control]["costPerUnit"]*materials[control]["costPerDrywall"]*HST)/32).toFixed(2));

		materialCostControls[control]["unit"].addEventListener("change", calculate, false);
		materialCostControls[control]["psf"].addEventListener("change", calculate, false);
		materialCostControls[control]["Chk"].addEventListener("click", calculate, false);

		if (materials[control]["link"].length > 1) {
			var linkList = document.createHTMLElement("ul");
			for (let i = 0; i < materials[control]["link"].length; i++) {
				var li = document.createElement("li");
				var a = document.createElement("a");
				a.setAttribute("href", materials[control]["link"]["url"]);
				a.setAttribute("target", "_blank");
				a.setAttribute("class", "newwindow");
				a.appendChild(document.createTextNode(materials[control]["link"]["text"]));
				li.appendChild(a);
				linkList.appendChild(li);
			}
			materialCostControls[control]["FS"].appendChild(linkList);
		} else {
			var a = document.createElement("a");
			a.setAttribute("target", "_blank");
			a.setAttribute("class", "newwindow");
			a.setAttribute("href", materials[control]["link"][0]["url"]);
			a.appendChild(document.createTextNode(materials[control]["link"][0]["text"]));
			
			materialCostControls[control]["FS"].appendChild(a);
		}
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
