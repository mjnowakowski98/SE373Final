addEventListener("load", () => {
	let selectedTile = null;
	let selectedTileRowInput = document.querySelector("#selectedTileRow");
	let selectedTileColInput = document.querySelector("#selectedTileCol");

	let selectedTileColor = document.querySelector("#selectedTileColor");
	let table = document.querySelector("table");
	let exitRow = document.querySelector(`.row${table.dataset.exitRow}`);
	let exitColNdx = table.dataset.exitCol1 - 1;
	let exitTile = exitRow.querySelector(`.col${exitColNdx}`);
	exitTile.classList.add("exittile");

	let vehicleTiles = document.querySelectorAll(".containsVehicle");
	for(let i = 0; i < vehicleTiles.length; i++){
		vehicleTiles[i].addEventListener("click", (evt) => {
			if(selectedTile) selectedTile.classList.remove("selectedTile");
			selectedTile = vehicleTiles[i];
			let color = selectedTile.dataset.color;
			selectedTileColor.textContent = color.charAt(0).toUpperCase() + color.substr(1).toLowerCase();
			selectedTile.classList.add("selectedTile");
			selectedTileRowInput.value = selectedTile.parentElement.parentElement.className.substr(3);
			selectedTileColInput.value = selectedTile.parentElement.className.substr(3);
		});
	}
});