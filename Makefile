install:
	npm ci

gendiff -h:
	node bin/gendiff.js -h

publish:
	npm publish --dry-run
	
lint:
	npx eslint .

test:
	npx jest

test-watch:
	npx jest --watch

test-coverage:
	npx jest --bail --coverage --coverageProvider=v8

.PHONY: test