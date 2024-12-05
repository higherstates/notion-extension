function addCopyButton() {
	// Select all rows with role="row"
	const rows = document.querySelectorAll('[role="row"]');
	console.log("Rows detected:", rows);

	rows.forEach((row) => {
		// Look for a child node with the text content "ID"
		const idLabelNode = Array.from(row.childNodes).find(
			(child) => child.innerText && child.innerText.trim() === "ID"
		);

		if (idLabelNode) {
			console.log("Found ID label node:", idLabelNode);

			// Check if a button already exists to avoid duplicates
			if (!row.querySelector(".custom-copy-button")) {
				// Create the new Copy button
				const copyButton = document.createElement("button");
				copyButton.textContent = "Copy URL";
				copyButton.className = "custom-copy-button";

				// Add click event to copy the formatted link
				copyButton.addEventListener("click", () => {
					const taskId = idLabelNode.nextElementSibling?.textContent.trim(); // Assuming the ID value is in the next sibling
					if (taskId) {
						const baseUrl = "https://www.notion.so/resola/";
						const fullUrl = `${baseUrl}${taskId}`;
						navigator.clipboard.writeText(fullUrl);

						// Change button text to "Copied!"
						copyButton.textContent = "Copied!";

						// Reset button text back to "Copy URL" after 2 seconds
						setTimeout(() => {
							copyButton.textContent = "Copy URL";
						}, 2000);
					} else {
						alert("Task ID not found!");
					}
				});

				// Append the button next to the ID label
				idLabelNode.parentElement.appendChild(copyButton);
			}
		}
	});
}

// Observe for dynamic content and ensure buttons are added
const observer = new MutationObserver(() => {
	addCopyButton();
});

observer.observe(document.body, { childList: true, subtree: true });
