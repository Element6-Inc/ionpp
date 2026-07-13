#!/usr/bin/env bash
# git-sync.sh — stage, commit and push in one step.
#
# Usage:
#   ./scripts/git-sync.sh "your commit message"
#
# If no message is given, you'll be prompted for one.
# Pushes to the current branch's upstream (origin/<branch> by default).

set -e

BRANCH=$(git rev-parse --abbrev-ref HEAD)

git add -A

if git diff --cached --quiet; then
  echo "Nothing staged — no changes to commit."
  exit 0
fi

MESSAGE="$1"
if [ -z "$MESSAGE" ]; then
  read -rp "Commit message: " MESSAGE
fi

if [ -z "$MESSAGE" ]; then
  echo "Aborted — no commit message provided."
  exit 1
fi

git commit -m "$MESSAGE"
git push origin "$BRANCH"

echo "Pushed to origin/$BRANCH."
