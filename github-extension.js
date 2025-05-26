function addButtons() {
    const prHeader = document.querySelector(".js-issue-title");

    const issueId = document.querySelector(".js-issue-title").textContent.trim().split(":")[0] ?? null;

    const branch = document
        .querySelector(".commit-ref.css-truncate.user-select-contain.expandable.head-ref")
        ?.getElementsByTagName("a")[0]
        .getElementsByTagName("span")[0]
        .textContent.trim();

    const repoHeaders = document.querySelectorAll(".AppHeader-context-item-label");
    const repoHeader = repoHeaders[repoHeaders.length - 1];
    const repo = repoHeader?.textContent.trim() ?? null;

    if (issueId !== null) {
        // Create Jira button
        const jiraButton = document.createElement("button");
        jiraButton.textContent = "🔗";
        jiraButton.id = "jira-link-button";
        jiraButton.style.border = "none";
        jiraButton.style.backgroundColor = "transparent";
        jiraButton.style.cursor = "pointer";
        jiraButton.style.font = "1.5rem";
        jiraButton.style.marginLeft = "10px";

        jiraButton.onclick = () => {
            if (issueId) {
                const jiraUrl = `https://vizrt.atlassian.net/browse/${issueId}`;
                window.open(jiraUrl, "_blank");
            }
        };

        prHeader.appendChild(jiraButton);
    }

    if (branch !== null && repo !== null) {
        // Create VS Code button
        const ideButton = document.createElement("button");
        ideButton.textContent = "💻";
        ideButton.style.border = "none";
        ideButton.style.backgroundColor = "transparent";
        ideButton.style.cursor = "pointer";
        ideButton.style.font = "1.5rem";

        ideButton.onclick = () => {
            if (branch && repo) {
                chrome.runtime.sendMessage({
                    type: "open-ide",
                    ide: "vscode",
                    repo,
                    issueId: branch
                });
            }
        };

        prHeader.appendChild(ideButton);
    } else {
        return false;
    }
    return true;
}

const buttonsAdded = addButtons();
if (!buttonsAdded) {
    window.addEventListener("load", () => {
        const retryInterval = setInterval(() => {
            if (addButtons()) {
                clearInterval(retryInterval);
            }
        }, 100);
    });
}
