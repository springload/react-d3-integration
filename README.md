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

### Upgrading to React `0.14`

>[React 0.14.0-rc1 release notes](https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html)

There are now two packages:

```sh
npm install --save react@0.14.0-rc1
npm install --save react-dom@0.14.0-rc1
```

After upgrading, the project compiles as usual, but there are deprecation warnings in the browser console. The warnings now use `console.error` instead of `console.warn` so that browsers show a full stack trace in the console:

```
Warning: React.render is deprecated. Please use ReactDOM.render from require('react-dom') instead. warning
@ warning.js:45newFn
@ deprecated.js:32[...]/src/js/site.js../components/app
@ site.js:7s
warning.js:45 Warning: React.findDOMNode is deprecated. Please use ReactDOM.findDOMNode from require('react-dom') instead.
[...]
```

This project is quite small so the porting was quite easy. You can view the changes in the following commit: [ddda10d](https://github.com/springload/react-d3-integration/commit/ddda10d6d45d18941faffab40794fb9ac404e44f).

Facebook created a codemod script for [jscodeshift](https://github.com/facebook/jscodeshift) to make this migration even more simple.
