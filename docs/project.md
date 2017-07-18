#Sample Pie Chart Project
---
This documentation will walk you through the creation of a pie chart visualization. We'll start with setting up the project, then pause and look at the files in the default project for a little bit. After that, we'll cover using external libraries in your visualizations.

Once all of that setup is completed, we will move on to actually creating the visualization. The first thing to do when creating a visualization is to figure out what your data bindings are going to look like. We will spend quite a bit of time discussisng what your options are, when they are appropriate, and how best to use them.

Next, we'll talk about accessing your data based on how you've set up your data bindings. This is relatively straight forward, so we won't linger too long on it. After we've accessed the data, we'll create the visual. Since the visual itself isn't the focus of the project, this will be copy and paste for those of you following along at home, but if you were creating your own visual, you would probably spend a fair bit of time writing this out. We will also talk about coloring your visual in this section.

After the basic visual is sorted out, we'll look at more advanced features you can add to your visualization. This includes adding settings to allow users to customize their experience, adding tooltips to convey additional information and then a brief discussion of performance.

You will also find a large set of appendices that contain a lot of information we didn't touch in the step-by-step tutorial. If you don't see something covered in the step-by-step, look through the appendices for the information you want. If you can't find it there, submit an issue and I'll look into adding the desired information as soon as I can.

##Table of Contents
*   ###Setup
    *   [Setting Up Your Project](/docs/setup/1-Setup.md)
    *   [Anatomy of a Visualization](/docs/setup/2-AnatomyOfAVisualization.md)
    *   [Adding External Libraries](/docs/setup/3-ExternalLibraries.md)
*   ###Capabilities
    *   [Data Roles](/docs/capabilities/1-DataRoles.md)
    *   [DataView Mappings](/docs/capabilities/2-DataViewMappings.md)
    *   [Sorting and Other Configurations](/docs/capabilities/3-AdditionalSettings.md)
*   ###Visualizing Your Data
    *   [Extracting Your Data](/docs/visualizing/1-ExtractingYourData.md)
    *   [Defining Your Data Model](/docs/visualizing/2-DefiningYourDataModel.md)
    *   [Filling Your Data Model](/docs/visualizing/3-FillingYourDataModel.md)
    *   [Building a Visual](/docs/visualizing/4-BuildingYourVisual.md)
    *   [Coloring Your Visual](/docs/visualizing/5-ColoringYourVisual.md)
*   ###Advanced Features
    *   [Adding Settings](/docs/advanced/SettingsDefinitions.md)
    *   [Adding Tooltips](/docs/advanced/)
*   ###Appendices
    *   [Anatomy of a `DataView`](/docs/appendices/AnatomyOfADataView.md)
    *   [`dataViewMappings`](/docs/appendices/dataViewMappings.md)
    *   [`VisualUpdateOptions`](/docs/appendices/VisualUpdateOptions.md)
    *   [Data Extraction](/docs/appendices/DataExtraction.md)

---
If you have any questions or find an error, please open an issue. I will try to answer questions and fix errors as soon as I can. If you want to elaborate on something, feel free to open a pull request, and I will review it as soon as I can.
