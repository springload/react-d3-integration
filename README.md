react-d3-integration
==============

>[Demo site](https://springload.github.io/react-d3-integration/)

## Installation

```sh
git clone git@github.com:springload/react-d3-integration.git
cd react-d3-integration
npm install
```

## Working on the project

> Everything mentioned in the installation process should already be done.

```sh
# Start the server and the development tools.
npm run start
# Builds frontend assets.
npm run build
# Runs tests.
npm run test
```

## Deploying the project

```sh
# First make sure your master is up to date.
cd react-d3-integration
git fetch --all
git checkout master
git pull
git push origin master
# Then push the new changes
git checkout gh-pages
git merge master
npm run build
git add .
git commit -m 'Release new version'
git push origin gh-pages
# And get back to master!
git checkout master
```
