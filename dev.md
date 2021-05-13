# dll

```
git clone --depth 1 --branch v27.0.0 https://github.com/ckeditor/ckeditor5.git
cd ckeditor5
```


# get ckeditor5-dll.manifest.json and ckeditor5-dll.js
```
npm install
```

In scripts\dll\build-packages-dlls.js
replace
```JavaScript
const subprocess = childProcess.spawnSync( 'yarn', yarnArguments, {
```
by
```JavaScript
const subprocess = childProcess.spawnSync( 'npm', yarnArguments, {
```

replace
```JavaScript
const packages = childProcess.execSync( 'ls -1 packages', {
```
by
```JavaScript
const packages = childProcess.execSync( 'dir /b packages', {
```

and
```JavaScript
} ).toString().trim().split( '\n' );
```
by
```JavaScript
} ).toString().trim().split( '\r\n' );
```

```
npm run dll:build
```
