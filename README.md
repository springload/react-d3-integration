[react-d3-integration](https://springload.github.io/react-d3-integration/) [![Build Status](https://travis-ci.org/springload/react-d3-integration.svg?branch=master)](https://travis-ci.org/springload/react-d3-integration)
==============

> An example on how to integrate D3 into React.

>[Basic demo](https://springload.github.io/react-d3-integration/) – [Bigger demo in our `reusable-d3-charts` showcase](https://springload.github.io/reusable-d3-charts/)

## Why

This approach is inspired by a [blog post from Nicolas Hery](http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/). It has also been taken for a spin by [the folks at sift science](http://blog.siftscience.com/blog/2015/4/6/d-threeact-how-sift-science-made-d3-react-besties).

We find it very suitable to our needs, because it clearly separates concerns between D3 (rendering the chart) and React (managing the data & lifecycle). If you've never used React, you'll still be able to create a nice chart. If you've never used D3, you won't have to worry about it nor SVG when building your React components.

> Use this approach if you value the ability to use the chart outside of React and idiomatic D3 code over the performance gains you'll have by using React's virtual DOM for SVG.

Other approaches worth having a look at:

- https://ericbullington.com/blog/2014/11/16/react-d3-charts/
- https://github.com/codesuki/react-d3-components
- https://github.com/bgrsquared/d3-react-squared

## Installation

```sh
git clone git@github.com:springload/react-d3-integration.git
cd react-d3-integration
nvm install
npm install
```

## Working on the project

> Everything mentioned in the installation process should already be done.

```sh
# Use the right node version
nvm use
# Start the server and the development tools.
npm run start
# Builds frontend assets for production.
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
# Then build the project
npm run build
# Follow the instructions in the build command
git commit -am "Save local changes"
git checkout -B gh-pages
git add -f build
git commit -am "Rebuild website"
git filter-branch -f --prune-empty --subdirectory-filter build
git push -f origin gh-pages
git checkout -
```

## Case studies

### [Disc](http://hughsk.io/disc/)

```sh
npm install -g disc
discify public/bundle.js > disc-report.html
# Voilà! Open the file in your browser.
```

Here's an [example report](https://springload.github.io/react-d3-integration/disc-report.html) for this repository.

### [sitespeed.io](https://github.com/sitespeedio/sitespeed.io)

```sh
npm install -g sitespeed.io
sitespeed.io -u https://springload.github.io/react-d3-integration/
# You can now open the report that has been generated in sitespeed-result/.
```

This is an [example report](https://springload.github.io/react-d3-integration/sitespeed-result/springload.github.io/2015-07-27-12-38-44/) for this repository.
