#Visual Feature List
---

When you are designing and implementing your custom visual, you should keep in mind what makes a visualization useful to both the developers that will use it, and to the people who will consume it. Below are two lists, one of features for other developers, one of features for consumers. These lists are by no means comprehensive, but are aimed at helping you provided the best possible visual.

##Features For Developers
---

*   Appearence Customization
    *   Developers will want to be able to customize as much of the visual theme as possible, so that they can meet expectations about how their reports look. To that end, for as many elements of your visual as possible, you should provide the ability to specify:
        *   Colors
        *   Fonts
        *   Sizing
        *   Visibility
        *   Number Formatting
        *   Positioning
        *   Units
    *   For more information on providing these options, see the [section on settings](/docs/advanced/Settings.md).
*   Clarity In Structure
    *   Developers will want to know how your visual works, and what does what when they are filling it out. It's very frustrating to have to use trial and error to figure out what a visual does. To prevent this from being a problem, you should:
        *   Provide useful descriptions of all data roles. See the [section on data roles](/docs/capabilities/1-DataRoles.md) for how to do this.
        *   Follow a standard, descriptive naming convention.
        *   Provide documentation and examples when you deliver.
        *   Be clear about the limitations of your visual. Things like maximum number of rows accepted, data types required, etc.
*   Testing
    *   As with all products, you should test your visual thouroughly. This means testing with multiple data sets of varying sizes and types. It also means testing on every Power BI platform, from desktop, to mobile.

##Features For Consumers
---
*   Performance
    *   Users will be frustrated if your visual takes long periods of time to render or update. This is also true for developers, since they may get the ire of the consumers for your mistakes. For more information on improving the performance of your visual see the [performance section](/docs/advanced/PerformanceConsiderations.md) of the advanced documentation.
*   Interactivity
    *   Users expect to be able to do the same things with your custom visual as they can with the built-in Microsoft visuals. This means you should provide the ability to select data points in your visual. You may also want to [provide highlighting](/docs/capabilities/3-AdditionalSettings.md#Highlighting) if it seems appropriate for your visual.
*   Interconnectivity
    *   Your visual should respond cleanly to selections in other visuals, filtering, or slicers.
