#Adding External Libraries
---
For our project, we will be uisng the D3.js library to render our visualization. Since this is not included in the default project, we will have to import it ourselves. For this project we will use npm to manage our external dependencies. We will also cover adding something that is not available on npm.

##Adding npm Dependency
All of our npm dependencies will be listed in `package.json` under the "dependencies" property. Documentation on the dependencies portion of `package.json` is available [here](https://docs.npmjs.com/files/package.json#dependencies). In short, you will add an attribute with the name of the package you want imported, and the value will be the version you want. Since we don't have to maintain any level of compatibility, we are going to ask npm for the most recent version of D3.

```
"d3":">1.0.0"
```

The `>` indicates that we want a version greater than `1.0.0` and that we don't have compatibility requirements, so npm gives us the most recent version.
