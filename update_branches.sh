#!/bin/bash

# Fetch the latest changes from the remote repository
git fetch

# Iterate over all local branches
for branch in $(git branch --format="%(refname:short)");
do
  # Check out the branch
  git checkout $branch
  
  # Pull changes from the remote main branch
  git pull origin main
done