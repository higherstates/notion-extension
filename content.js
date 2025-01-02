function showToast(message) {
  // Check if toast container exists, otherwise create it
  let toastContainer = document.getElementById('notion-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'notion-toast-container';
    toastContainer.classList.add('toast-container');
    document.body.appendChild(toastContainer);
  }

  // Create a new toast message
  const toast = document.createElement('div');
  toast.innerText = message;
  toast.classList.add('toast-message');

  // Add the toast to the container
  toastContainer.appendChild(toast);

  // Remove the toast after 3 seconds
  setTimeout(() => {
    toast.classList.add('toast-fade-out');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}



function addCopyButtonForTasks() {
	const rows = document.querySelectorAll('[role="row"]');
	rows.forEach((row) => {
		const idLabelNode = Array.from(row.childNodes).find(
			(child) => child.innerText && child.innerText.trim() === "ID"
		);

		if (idLabelNode && !row.querySelector(".custom-copy-button")) {
			const copyButton = document.createElement("button");
			copyButton.className = "custom-copy-button show-on-hover copy-button-on-task";
			copyButton.setAttribute("title", "Copy Task URL");
			const svgContent = `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
				<path transform="translate(4, 4)" d="M7.69922 10.8945L8.73828 9.84863C7.91797 9.77344 7.34375 9.51367 6.91992 9.08984C5.76465 7.93457 5.76465 6.29395 6.91309 5.14551L9.18262 2.87598C10.3379 1.7207 11.9717 1.7207 13.127 2.87598C14.2891 4.04492 14.2822 5.67188 13.1338 6.82031L11.958 7.99609C12.1768 8.49512 12.2451 9.10352 12.1289 9.62988L14.0908 7.6748C15.7725 6 15.7793 3.62109 14.084 1.92578C12.3887 0.223633 10.0098 0.237305 8.33496 1.91211L5.95605 4.29785C4.28125 5.97266 4.26758 8.35156 5.96289 10.0469C6.36621 10.4434 6.90625 10.7441 7.69922 10.8945ZM8.30078 5.13184L7.26855 6.17773C8.08203 6.25293 8.66309 6.51953 9.08008 6.93652C10.2422 8.09863 10.2422 9.73242 9.08691 10.8809L6.81738 13.1504C5.66211 14.3057 4.03516 14.3057 2.87305 13.1504C1.71094 11.9883 1.71777 10.3545 2.87305 9.20605L4.04199 8.03027C3.83008 7.53125 3.75488 6.92969 3.87109 6.39648L1.91602 8.35156C0.234375 10.0264 0.227539 12.4121 1.92285 14.1074C3.61816 15.8027 5.99707 15.7891 7.67188 14.1143L10.0439 11.7354C11.7256 10.0537 11.7324 7.6748 10.0371 5.98633C9.64062 5.58301 9.10059 5.28223 8.30078 5.13184Z"></path>
			</svg>`;
			copyButton.innerHTML = svgContent;

			copyButton.addEventListener("click", (event) => {
				event.stopPropagation();
				event.preventDefault();			
				const taskId = idLabelNode.nextElementSibling?.textContent.trim();
				if (taskId) {
					const baseUrl = "https://www.notion.so/resola/";
					const fullUrl = `${baseUrl}${taskId}`;
					navigator.clipboard.writeText(fullUrl);
					showToast("Copied task URL to clipboard");
				} else {
					console.error("Task ID not found!");
				}
				return false;
			});

			idLabelNode.parentElement.appendChild(copyButton);
		}
	});
}

function addCopyButtonForBoardView() {
	// Select all task columns on the sprint board
	const boardColumns = document.querySelectorAll(".notion-board-group");

	boardColumns.forEach((column) => {
		// Select all tasks within the column
		const tasks = column.querySelectorAll(
			".notion-selectable.notion-page-block.notion-collection-item"
		);

		tasks.forEach((task) => {
			// Ensure no duplicate button
			// Find the task ID node (adjust if necessary)
			if (task.querySelector(".custom-copy-button-on-board")) {
				return;
			}
			const taskIdNode = task.querySelector(
				'div[style*="line-height: 1.5; white-space: nowrap; word-break: normal;"]'
			);

			if (taskIdNode) {
				const taskId = taskIdNode.textContent.trim(); // Extract the task ID
				if (taskId.startsWith("TK-")) {
					// Find the <a> tag inside the task
					const link = task.querySelector('a[role="link"]');

					// Only add the icon if the <a> tag exists
					if (link) {
						// Create a container for the SVG icon
						const copyIconContainer = document.createElement("div");
						copyIconContainer.className = "custom-copy-button custom-copy-button-on-board";
						copyIconContainer.setAttribute("title", "Copy Task URL");

						// Add click event to copy the task URL
						copyIconContainer.addEventListener("click", (event) => {
							// Prevent the click event from propagating to the <a> tag
							event.stopPropagation();
							event.preventDefault();

							if (taskId) {
								const baseUrl = "https://www.notion.so/resola/";
								const fullUrl = `${baseUrl}${taskId}`;
								navigator.clipboard.writeText(fullUrl);
								showToast("Copied task URL to clipboard");
							} else {
								console.error("Task ID not found!");
							}
							return false;
						});

						// Inline SVG
						const svgContent = `
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
								<path transform="translate(5, 5)" d="M7.69922 10.8945L8.73828 9.84863C7.91797 9.77344 7.34375 9.51367 6.91992 9.08984C5.76465 7.93457 5.76465 6.29395 6.91309 5.14551L9.18262 2.87598C10.3379 1.7207 11.9717 1.7207 13.127 2.87598C14.2891 4.04492 14.2822 5.67188 13.1338 6.82031L11.958 7.99609C12.1768 8.49512 12.2451 9.10352 12.1289 9.62988L14.0908 7.6748C15.7725 6 15.7793 3.62109 14.084 1.92578C12.3887 0.223633 10.0098 0.237305 8.33496 1.91211L5.95605 4.29785C4.28125 5.97266 4.26758 8.35156 5.96289 10.0469C6.36621 10.4434 6.90625 10.7441 7.69922 10.8945ZM8.30078 5.13184L7.26855 6.17773C8.08203 6.25293 8.66309 6.51953 9.08008 6.93652C10.2422 8.09863 10.2422 9.73242 9.08691 10.8809L6.81738 13.1504C5.66211 14.3057 4.03516 14.3057 2.87305 13.1504C1.71094 11.9883 1.71777 10.3545 2.87305 9.20605L4.04199 8.03027C3.83008 7.53125 3.75488 6.92969 3.87109 6.39648L1.91602 8.35156C0.234375 10.0264 0.227539 12.4121 1.92285 14.1074C3.61816 15.8027 5.99707 15.7891 7.67188 14.1143L10.0439 11.7354C11.7256 10.0537 11.7324 7.6748 10.0371 5.98633C9.64062 5.58301 9.10059 5.28223 8.30078 5.13184Z"></path>
							</svg>`;
						copyIconContainer.innerHTML = svgContent;

						// Append the icon container to the <a> tag
						link.appendChild(copyIconContainer);
						console.log("Added button for task " + taskId);
					}
					
				}
			}
		});
	});
}

// Combined function to handle both tasks and sprints
function addCopyButtons() {
	addCopyButtonForTasks();
	addCopyButtonForBoardView();
}

const observer = new MutationObserver(() => {
	addCopyButtons();
});

observer.observe(document.body, { childList: true, subtree: true });
