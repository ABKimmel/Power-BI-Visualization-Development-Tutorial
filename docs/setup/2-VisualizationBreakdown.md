[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._

# Anatomy of a Visualization
---

## File Structure
The file structure of the default plugin as of 7/5/2017. This is also after `npm install` has been run.

```
+-- samplePieChart
|   +-- .api
    |   +-- v1.7.0
        |   +-- PowerrBI-visuals.d.ts
        |   +-- schema.capabilities.json
        |   +-- schema.dependencies.json
        |   +-- schema.pbiviz.json
        \   +-- schema.stringResources.json
|   +-- .vscode
    |   +-- launch.json
    \   +-- settings.json
|   +-- assets
    \   +-- icon.png
|   +-- node_modules
    |   +-- powerbi-visuals-utils-dataviewutils
    \   +-- ...other installed node modules...
|   +-- src
    |   +-- settings.ts
    \   +-- visual.ts
|   +-- style
    \   +-- visual.less
|   +-- .npmignore
|   +-- capabilities.json
|   +-- package.json
|   +-- pbiviz.json
|   +-- tsconfig.json
\   +-- tslint.json
```

### `.api`
You should not need to change anything in this folder. It contains module and schema definitions for the packager to use in constructing your `samplePieChart.pbiviz`.

*   `PowerBI-visuals.d.ts`: The declaration file for the Power BI TypeScript components. If you are unfamiliar with the concept of a declaration file, documentation is available [here](https://www.typescriptlang.org../handbook/declaration-files/introduction.html).
*   `schema.capabilities.json`: Defines the legal schema for `capabilities.json`.
*   `schema.dependencies.json`: Defines the legal schema for the optional `dependencies.json`. `dependencies.json` is used for defining CRAN dependencies if you are using R. Usinng R is outside the scope of this tutorial, and this will not be covered.
*   `schema.pbiviz.json`: Defines the legal schema for `pbiviz.json`.
*   `schema.stringResources.json`: Defines the legal syntax for the optional stringResource files. These are used in localization and are outside the scope of this tutorial.

### `.vscode`
You should not need to change anything in this folder. Contains configuration files for Visual Studio Code.

*   `launch.json`: The configuration for the preferred debugger. For more information on debugger settings, see the documentation [here](https://code.visualstudio.com../editor/debugging)
*   `settings.json`: Custom workspace settings for the project. For more information on workspace settings, see the documentation [here](https://code.visualstudio.com../getstarted/settings).

### `assets`
You will add things to this folder and should replace the starting file. All your assets for the visualization should be here. This includes the icon, any background images or other similar files.

*   `icon.png`: The icon that appears under the Visualizations tab of Power BI. You should change this to something more representative of your visualization.

### `node_modules`
This contains all of your dependencies managed by npm. You should not modify anything in this folder. You may have to reference files here in other configuration files, but otherwise you should not do anything with this folder.

### `src`
This is where you will write the majority of your code. You can add as many files as you want in this folder and can rename or remove any of the existing files (which will be covered later). However, in this tutorial, we will be using the files provided to us to build our visualization.

*   `settings.ts`: The starting file for managing your visualization's settings. You can handle this task anywhere, but having a separate file will make maintaining the code easier in the long run.
*   `visual.ts`: The starting file for generating your visualization. you can rename this file, but you will have to change some configurations.

### `style`
This is where you will provide any styling your visualization needs. The styling language is [Less](http://lesscss.org/), meaning you can also provide raw CSS. You can add additional files, though you will have to import them into `visual.less` or its equivalent, since the packager only accepts a single style file.

*   `visual.less`: The provided file for styling your visualization. You can rename this file, just be sure to update the entry in `pbiviz.json`.

### root
Files on the root of your project are all configuration files of one sort or another. You should not change any of the filenames in this directory, though feel free to add additional files as needed.

*   `.npmignore`: The npmignore for the directory. For more information on npmignore, see the documentation [here](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package).
*   `capabilities.json`: Defines everything about your data binding. You will extensively modify this for most projects. We will talk about this quite a bit in the section on data binding.
*   `package.json`: Defines external dependencies you want npm to install, as well as scripts that run after various events. We will talk about this more when we talk about using external libraries. This is a feature of npm, so documentation is available [here](https://docs.npmjs.com/files/package.json).
*   `pbiviz.json`: The configuration file for the `pbiviz package` process. Contains information about visualization name, version, and all of the various components that go into packaging a `.pbiviz`.
*   `tsconfig.json`: Defines the options and files that should be fed to the TypeScript compiler. When you add additional `.ts` files, you will need to add them to `tsconfig.json`. For more information on configuring the TypeScript compiler, see the documentation [here](https://www.typescriptlang.org../handbook/tsconfig-json.html).
*   `tslint.json`: Defines which rules get run by the linter. Feel free to modify as you see fit. More documentation is available [here](https://palantir.github.io/tslint/usage/tslint-json/).


---
## **[Continue to the next section, Adding External Libraries](../setup/3-AddingExternalLibraries.md)**
---

[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._
