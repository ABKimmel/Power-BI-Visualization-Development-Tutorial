#Accessing Your Data
---
Now that we have completed our `capabilities.json`, we need to figure out how to access our data inside of `visual.ts`. This is a process we will break down into two steps: Extracting Your Data and Defining a Data Models. But before we get to that, let's take a quick look at the things you must implement in your `visual.ts`.

##`visual.ts`
Your `visual.ts`, or equivalent file, must contain a class that implements the [IVisual](https://github.com/Microsoft/PowerBI-visuals/blob/master/Visual/IVisualApi.md) interface. The name of this class is up to you, though it must be reflected in the `visualClassName` property of `pbiviz.json`.

The only method you are strictly required to implement is the `update()` method. This will be called anytime the data in your visual is changed, or the visual is resized or moved. If you look at your visualization in its stock form, it will have a counter that updates whenever `update()` is called. All of our Pi chart's rendering will be done in `update()` or in helper methods, and you should follow that guideline as well. The other place you may want to add rendering code is in the constructor if you have one-time setup operations.

Note that the visual may receive multiple `update()` calls for what looks like a single event to the user. For instance, going to focused view makes four `update()` calls, and returning to normal view makes three `update()` calls.

##`VisualUpdateOptions`
The first step to accessing your data is to extract the `DataView` from the `VisualUpdateOptions` that `update()` is passed. If you log the `VisualUpdateOptions` object to the console (which is already done for you in the default code), you can see that it is made up of five properties. The properties are as follows:

####`dataViews`
`dataViews` is the object that holds all of the data we are trying to visualize, as well as all of the information on the visual's settings. It is an array of `DataView`s. In all cases, there will be only one `DataView` returned, no matter how many `dataViewMappings` you defined in `capabilities.json`.

For more information on the `DataView` object, see [Anatomy of a `DataView`](). In short, each possible `dataViewMapping` has a property, and we will use the one that corresponds to the data mapping we defined in `capabilities,json`.

####`editMode`
`editMode` was previously discussed in the section on [advanced edit mode](). It normally comes back as `0` or `undefined`, but when the user activates Edit mode, it will return as `1`. Note that if you receive multiple updates from a single user action, they may not have the same value for `editMode`, so it is up to you to handle that in your visual.

####`type`
`type` indicates the kind of update that happened, and has many possible values. There are 5 key building block update types. They are:

|Value|Meaning|
|--|--|
|`2` |A data update. This kind of update will be sent when a new field is dragged in, an existing field is removed, or there occurs an event where the data changes in any way. This will also be sent when any of the settings of the visual are changed.|
|`4` |A resize update. This kind of update will be sent when the visual is resized, or the viewPort changes.|
|`8` |A `viewMode` update. This kind of update is sernt when the `viewMode` changes. This would mean your visual is switching between normal view, edit view, and infocus view. You may see it by itself when you go from focused view back to the full report, but not always. It is not clear what causes it to be sent or not sent.|
|`16` |A style update. This doesn't seem to be sent outside of the `62` type.|
|`32` |A resize end update. This will be sent with `4` for any resize event that isn't scaling the visual in the default view. This includes going to and from focused view, resizes initiated by changing the page size, and any other event that forces the visual to resize that isn't directly caused by the user.|

The `type` property can come back as any one of those building blocks, but can also come back as any combination of them as well. Note that there are many combinations that probably won't ever happen. The most likely combinations are listed below:

|Value|Combination|
|--|--|
|`36`|`4` + `32`|
|`62`|`2` + `4` + `8` + `16` + `32`|

####`viewMode`
`viewMode` indicates what mode the visual is in for the person viewing it. In theory, it will return one of three values:

|Value|View|
|--|--|
|`0`|The standard view.|
|`1`|The standard view, but in editing mode.|
|`2`|The focused view, in editing mode.|

In actuality, `viewMode` will always be `1`, regardless of whether you are in standard or focused view and whether you are editing or not. It is not tied to `editMode`, despite seeming like it should be.

####`viewPort`
`viewPort` is an object that contains three attributes of the visual's viewport. They are:
|Attribute|Meaning|
|--|--|
|`height`|The height of the visual's viewport.|
|`width`|The width of the visual's viewport.|
|`scale`|This attribute will only appear on updates that have a `type` of `36`. It does not appear to be related to the amount of the resize, the ratio of width to height, or to the proportion of the report area it takes up.|

##Extracting Your Data
Now that we have an understanding of the `VisualUpdateOptions` object, we can go about extracting our data. For this, we will need to extract our `DataView`. Let's start by defining a new function `dataExtraction()`, so that we can encapsulate our data processing. For now, let's not worry about a return type, though we will add one in the next step. Since we only need the `DataView` to access the data, set `dataExtraction()` up to take a `DataView` object. This should give you:

```
private dataExtraction(dataView : DataView) {
    console.log("DataView", dataView);
}
```

Now we need to pass this function a `DataView`. In general, we need to do this every time the visual is updated, so we will call `dataExtraction()` from `update()`. We can retrieve the dataView from the `VisualUpdateOptions` parameter by getting the first entry in the `dataViews` property. We may also want to check to ensure the dataView exists before we pass it on to `dataExtraction()`. If we remove the starting code from `update()` we will get:

```
public update(options: VisualUpdateOptions) {
    if (options.dataViews.length > 0) {
        this.dataExtraction(options.dataViews[0]);
    }
}
```

If you run your visual now, you will see the `DataView` being logged every time the visual updates. This is great and all, but we want more granular access to the data. Since the `DataView` is an object, and we know the schema, we can easily get to the information we want. We'll start by extracting the category and value information.

```
private dataExtraction(dataView : DataView) {
    let categories = dataView.categorical.categories;
    let values = dataView.categorical.values;
    console.log("categories", categories, "values", values);
}
```

Before we go any further with this, we want to think about defining a data model for our data.
