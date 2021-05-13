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
```
const subprocess = childProcess.spawnSync( 'yarn', yarnArguments, {
```
by
```
const subprocess = childProcess.spawnSync( 'npm', yarnArguments, {
```

replace
```
const packages = childProcess.execSync( 'ls -1 packages', {
```
by
```
const packages = childProcess.execSync( 'dir /b packages', {
```

and
```
} ).toString().trim().split( '\n' );
```
by
```
} ).toString().trim().split( '\r\n' );
```

```
npm run dll:build
```
