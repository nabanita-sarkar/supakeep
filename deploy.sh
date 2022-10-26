#!/usr/bin/env sh

# abort on errors
set -e

# build
pnpm run build

# navigate into the build output directory
cd build

# if you are deploying to a custom domain
echo 'www.supakeep.nabanitasarkar.com' > CNAME

# git init
# git checkout -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:nabanita-sarkar/supakeep.git main:gh-pages

cd -
