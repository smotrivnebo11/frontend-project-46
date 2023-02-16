install:
	npm ci

gendiff -h:
	node bin/gendiff.js -h

publish:
	npm publish --dry-run
	
lint:
	npx eslint .

test:
	npm test
	