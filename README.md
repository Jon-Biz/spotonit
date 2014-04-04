spotonit
========

This technical test for spoton is currently incomplete, due to time constraints.

Installation
------------

After cloning the repo, don't forget to run `npm install`, or `npm install -dev` if you want to run the test suites.

Tests
-----

The test suites includes both unit and integration tests which access the underlying libraries to retreive pages from the web. 

Requirements
------------

The tests require a global install of jasmine-node.
`npm install -g jasmine-node`
Additionally, the integration tests also require a properly installed global version of Phantomjs, and an internet connection.
`npm install -g phantomjs`

Make sure that phantomjs's Path is specified correctly in your OS.

Due to limitations of the Spookyjs library, the integration tests will not run on windows. 

Running the Tests
-----------------
To run the unit tests type:
`jasmine-node tests/unit`

To run the integration tests, type:
jasmine-node tests/integration

To run all the tests, type:
`jasmine-node tests/`
