install:
	npm ci

gendiff -h:
	node bin/gendiff.js -h

publish:
	npm publish --dry-run
	
lint:
	npx eslint .

test:
		NODE_OPTIONS=--experimental-vm-modules npx jest

test-watch:
		npx jest --watch

test-coverage:
		NODE_OPTIONS=--experimental-vm-modules npx jest --bail --coverage