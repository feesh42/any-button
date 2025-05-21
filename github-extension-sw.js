chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message:", message);
    if (message.type === "open-ide") {
        const port = chrome.runtime.connectNative("com.ide_launcher.json");
        port.postMessage({ command: "git checkout", issueId: message.issueId, repo: message.repo });
        port.onMessage.addListener(response => {
            console.log("Received from native app:", response);
        });
        port.onDisconnect.addListener(() => {
            if (chrome.runtime.lastError) {
                console.error("Native host error:", chrome.runtime.lastError.message);
            }
        });
    }
});
