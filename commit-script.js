const simpleGit = require("simple-git");
const git = simpleGit();
const fs = require("fs");
const path = require("path");

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

async function createCommit(date, message) {
  const fileName = `file_${date.getTime()}.txt`;
  const filePath = path.join(__dirname, fileName);

  fs.writeFileSync(filePath, `Commit date ${date}`);

  await git.add(filePath);

  await git.commit(message, filePath, { "--date": date.toISOString() });

  fs.unlinkSync(filePath);
}

async function main() {
  const numCommits = Math.floor(Math.random() * 15) + 1; // range of commits (0 - 15)

  // Put your dates below (yy--mm--dd)
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2024-01-01");

  for (let i = 0; i < numCommits; i++) {
    const commitDate = getRandomDate(startDate, endDate);
    const commitMessage = `Commit number ${i + 1}, date - ${commitDate.toISOString()}`;

    await createCommit(commitDate, commitMessage);

    console.log(`Commit: ${commitMessage}`);
  }

  await git.push("origin", "main");
}

main().catch((err) => console.error(err));
