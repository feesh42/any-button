const prHeader = document.querySelector(".js-issue-title");
const issueId = prHeader?.textContent.trim().split(":")[0] ?? null;
const repo = document.querySelector(".AppHeader-context-item-label")?.textContent.trim() ?? null;

if (issueId !== null && repo !== null) {
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

    // Create VS Code button
    const ideButton = document.createElement("button");
    ideButton.textContent = "💻";
    ideButton.style.border = "none";
    ideButton.style.backgroundColor = "transparent";
    ideButton.style.cursor = "pointer";
    ideButton.style.font = "1.5rem";

    ideButton.onclick = () => {
        if (issueId && repo) {
            chrome.runtime.sendMessage({
                type: "open-ide",
                repo,
                issueId
            });
        }
    };

    prHeader.appendChild(jiraButton);
    prHeader.appendChild(ideButton);
}
