#!/bin/bash
# Based on https://github.com/discordjs/discord.js-site/blob/master/deploy/deploy.sh

set -e

# For revert or dependabot branches, do nothing
if [[ "$TRAVIS_BRANCH" == revert-* ]] || [[ "$TRAVIS_BRANCH" == dependabot/* ]]; then
  echo -e "\e[36m\e[1mBuild triggered for reversion branch \"${TRAVIS_BRANCH}\" - doing nothing."
  exit 0
fi

# For pull requests, do nothing
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo -e "Not building for a non branch push - building without deploying."
  exit 0
fi

# Only push to webpack if it's a release or master branch
if [ -n "$TRAVIS_TAG" ] || [ $TRAVIS_BRANCH == "master" ]; then
  REPO=$(git config remote.origin.url)
  SHA=$(git rev-parse --verify HEAD)

  # Do the thing once more for webpack
  TARGET_BRANCH="webpack"
  if [ -n "$TRAVIS_TAG" ]; then IDENTIFIER="$TRAVIS_TAG"; else IDENTIFIER="$TRAVIS_BRANCH"; fi
  git clone $REPO out -b $TARGET_BRANCH
  yarn build:browser
  mv webpack/serialized-tags.min.js out/serialized-tags.$IDENTIFIER.min.js

  # Commit and push
  cd out
  git add --all .
  git config user.name "Travis CI"
  git config user.email "$COMMIT_AUTHOR_EMAIL"
  git commit -m "Webpack build: ${SHA}" || true
  git push "https://${GH_TOKEN}@${GH_REF}" $TARGET_BRANCH
fi
