#Accessing Your Data
---
Now that we have completed our `capabilities.json`, we need to figure out how to access our data inside of `visual.ts`. This is a process we will break down into two steps: Extracting Your Data and Defining a Data Models. But before we get to that, let's take a quick look at the things you must implement in your `visual.ts`.

##`visual.ts`
Your `visual.ts`, or equivalent file, must contain a class that implements the [IVisual](https://github.com/Microsoft/PowerBI-visuals/blob/master/Visual/IVisualApi.md) interface. The name of this class is up to you, though it must be reflected in the `visualClassName` property of `pbiviz.json`.

The only method you are strictly required to implement is the `update()` method. This will be called anytime the data in your visual is changed, or the visual is resized or moved. If you look at your visualization in its stock form, it will have a counter that updates whenever `update()` is called. All of our Pi chart's rendering will be done in `update()` or in helper methods, and you should follow that guideline as well. The other place you may want to add rendering code is in the constructor if you have one-time setup operations.

Note that the visual may receive multiple `update()` calls for what looks like a single event to the user. For instance, going to focused view makes four `update()` calls, and returning to normal view makes three `update()` calls.

##`VisualUpdateOptions`
The first step to accessing your data is to extract the `DataView` from the `VisualUpdateOptions` that `update()` is passed. If you log the `VisualUpdateOptions` object to the console (which is already done for you in the default code), you can see that it is made up of five properties. In brief, the properties are as follows:

*   `dataViews`
*   `editMode`
*   `type`
*   `viewMode`
*   `viewPort`

**If you want more information on the properties of `VisualUpdateOptions`, see the [`VisualUpdateOptions` appendix](/docs/appendices/VisualUpdateOptions.md).**

**Reading the [Anatomy of a `DataView` appendix](/docs/appendices/AnatomyOfADataView.md) will make the next section easier to understand.**


##Extracting Your Data
Now that we have an understanding of the `VisualUpdateOptions` object, we can go about extracting our data. For this, we will need to extract our `DataView`. Let's start by defining a new function `dataExtraction()`, so that we can encapsulate our data processing. For now, let's not worry about a return type, though we will add one in the next step. Since we only need the `DataView` to access the data, set `dataExtraction()` up to take a `DataView` object. This should give you:

```
private dataExtraction(dataView : DataView) {
    console.log("DataView", dataView);
}
```

Now we need to pass this function a `DataView`. In general, we need to do this every time the visual is updated, so we will call `dataExtraction()` from `update()`. We can retrieve the `DataView` from the `VisualUpdateOptions` parameter by getting the first entry in the `dataViews` property. We may also want to check to ensure the `DataView` exists before we pass it on to `dataExtraction()`. If we remove the starting code from `update()` we will get:

```
public update(options: VisualUpdateOptions) {
    if (options.dataViews.length > 0) {
        this.dataExtraction(options.dataViews[0]);
    } else {
        return;
    }
}
```

If you run your visual now, you will see the `DataView` being logged every time the visual updates. This is great and all, but we want more granular access to the data. Since the `DataView` is an object, and we know the schema, we can easily get to the information we want. If you haven't read the [Anatomy of a `DataView` appendix](/docs/appendices/AnatomyOfADataView), this will make more sense if you do. We'll start by extracting the category and value information.

```
private dataExtraction(dataView : DataView) {
    let categoryColumn = dataView.categorical.categories[0];
    let categoryValues = categoryColumn.values;
    let valueColumn = dataView.categorical.values[0];
    let valueValues = valueColumn.values;
    console.log("categories", categoryValues, "values", valueValues);
}
```

Before we go any further with this, we want to think about defining a data model for our data.

**If you want more information and examples of how to extract your data from other data mappings, see the [Data Extraction appendix](/docs/appendices/DataExtraction.md).**

---
##**[Continue to the next section, Defining Your Data Model]()**
---
