const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", input => {
    conseole.log("Received input:", input);
    const message = JSON.parse(input);
    const repo = message.repo;
    const issueId = message.issueId;

    const { exec } = require("child_process");

    // Adjust this path to your repo
    const repoPath = "/Users/ekl/Documents/" + repo;

    const command = `cd "${repoPath}" && git checkout ${issueId} && code .`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            process.stdout.write(JSON.stringify({ success: false, error: stderr }) + "\n");
        } else {
            process.stdout.write(JSON.stringify({ success: true, output: stdout }) + "\n");
        }
    });
});
