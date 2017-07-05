#Adding External Libraries
---
For our project, we will be uisng the D3.js library to render our visualization. Since this is not included in the default project, we will have to import it ourselves. For this project we will use npm to manage our external dependencies. We will also cover adding something that is not available on npm.

##Adding npm Dependency
All of our npm dependencies will be listed in `package.json` under the "dependencies" property. Documentation on the dependencies portion of `package.json` is available [here](https://docs.npmjs.com/files/package.json#dependencies). In short, you will add an attribute with the name of the package you want imported, and the value will be the version you want. Since we don't have to maintain any level of compatibility, we are going to ask npm for the most recent version of D3.

```
"d3":">1.0.0"
```

The `>` indicates that we want a version greater than `1.0.0` and that we don't have compatibility requirements, so npm gives us the most recent version.

At this point, you will see that when you run `npm install`, you have the D3 package installed in `/node_modules`, but that TypeScript is throwing an error when you try to acces the `d3` namespace. This is because we have not yet installed the typings for D3. Because TypeScript is strongly-typed JavaScript, we need to install the files that will tell the TypeScript compiler what the D3 code is doing.

###Manually Installing Types
As of TypeScript 2.0, you can install typings directly with npm. Typings are installed as such:

`npm install @types/package-name`

So, to install D3, navigate to the root of the project then run:

`npm install @types/d3`

Once your types are installed, you should be able to use them right away. As of TypeScript 2.0, the compiler looks in `./node_modules/@types` for typing information by default. For more information about it, see the `tsconfig.json` documentation [here](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types). If your compiler does not automatically recognize them, you may need to add them to your `tsconfig.json`. To do so, add them to the list of files. For example, to add the D3 typings, you would add the line:

`"node_modules/@types/d3/index.d.ts"`

Now you should be able to see the `d3` namespace in your TypeScript.

###Handle Typings Automatically
A better way to handle your typing needs is with `package.json`. This way, if you hand off your source code to someone else, all of the configuration is handled when `npm install` runs for the first time. All you have to do is add the D3 types to your dependencies:

`"@types/d3": ">1.0.0"`
