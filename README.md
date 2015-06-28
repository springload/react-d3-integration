react-d3-integration
==============

> An example on how to integrate D3 into React.

>[Demo site](https://springload.github.io/react-d3-integration/)

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
export NODE_ENV=production; npm run build
git add .
git commit -m 'Release new version'
git push origin gh-pages
# And get back to master!
git checkout master
```
