[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._

# Adding External Libraries
---
For our project, we will be using the D3.js library to render our visualization. Since this is not included in the default project, we will have to import it ourselves. For this project, we will use npm to manage our external dependencies. We will also cover adding something that is not available on npm.

## Adding npm Dependency
All of our npm dependencies will be listed in `package.json` under the "dependencies" property. Documentation on the dependencies portion of `package.json` is available [here](https://docs.npmjs.com/files/package.json#dependencies). In short, you will add an attribute with the name of the package you want imported, and the value will be the version you want. In an ideal world, we wouldn't have to worry about compatibility issues, but Power BI is fairly broken when it comes to [external](https://github.com/Microsoft/PowerBI-visuals/issues/98) [libraries](https://github.com/Microsoft/PowerBI-visuals/issues/99). Since we do have issues with compatibility, we are going to ask npm for a specific version of D3.

`"d3": "3.5.5"`

At this point, you will see that when you run `npm install`, you have the D3 package installed in `/node_modules`, but that TypeScript is throwing an error when you try to access the `d3` namespace. This is because we have not yet installed the typings for D3. Because TypeScript is strongly-typed JavaScript, we need to install the files that will tell the TypeScript compiler what the D3 code is doing.

### Manually Installing Types
As of TypeScript 2.0, you can install typings directly with npm. For more information on the installation of types, see [this](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/) MSDN blog. Typings are installed as such:

`npm install @types/package-name`

So, to install D3, navigate to the root of the project then run:

`npm install @types/d3`

Once your types are installed, you should be able to use them right away. As of TypeScript 2.0, the compiler looks in `./node_modules/@types` for typing information by default. For more information about it, see the `tsconfig.json` documentation [here](https://www.typescriptlang.org../handbook/tsconfig-json.html#types-typeroots-and-types).

Now you should be able to see the `d3` namespace in your TypeScript.

### Handle Typings Automatically
A better way to handle your typing needs is with `package.json`. This way, if you hand off your source code to someone else, all of the configuration is handled when `npm install` runs for the first time. All you have to do is add the D3 types to your dependencies:

`"@types/d3": "3.5.36"`

## Adding a Non-npm Dependency
We won't be using any dependencies that aren't available on npm, but let's say that you have some internal code that isn't on npm that you want to use in your visualization. This is a fairly simple task. Start by creating an external folder:

`samplePieChart/external`

Next, add your `internalcode.ts` to the newly created `external` folder. You will want to be sure the `external` folder is included in your `tsconfig.json`. If you have a `.js` file, feel free to add that, just be sure you've installed typings for it. Last we have to add the file to `pbiviz.json`. To do this, simply add the path from the root of the project to your external dependency to the `externalJS` attribute of `pbiviz.json`, like so:

`"external/internalcode.ts"`

## Adding to `pbiviz.json`
The last step in importing any library is to add it to the `externalJS` section of `pbiviz.json`. In our case, this looks like:

`"node_modules/d3/d3.js"`


**Don't forget to run `npm install` whenever you change `package.json`**

---
## **[Continue to the next section, Data Roles](../capabilities/1-DefiningDataRoles.md)**
---

[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._
