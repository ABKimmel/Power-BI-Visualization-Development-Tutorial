



# Interactivity
---
Adding interactivity to your visual is very important, since it gives your consumers a sense of control over their visualizations. TypeScript obviously gives you many ways to interact with a visual internally, but if you want to interact with other visuals and their data sets, you will have to use the provided selection ID infrastructure.

## Selection IDs
Adding selection IDs to your visual is fairly easy. Unfortunately, at the time of writing (API v1.7.0), adding selection IDs is only supported for categorical data mappings.

The first step to adding selection IDs to your visual is to update your data model, so that each data point can store its own selection ID. In our case that means modify ing `pieSlice` to look like:

```typescript
export interface PieSlice {
    category: string | number,
    measure: number,
    color: string,
    selectionID: ISelectionId
}
```

Since the selection ID is just another property of `PieSlice`, we will add it in `dataExtraction()` when we generate the rest of the object. The `host` property of the `VisualConstructorOptions` object provides us with the method `createSelectionIdBuilder()` that we will use to generate our IDs. This means that our first step is to save the `host` object as a field of our visual, then initialize it in the constructor.

```typescript

...

private host: IVisualHost;

constructor(options: VisualConstructorOptions) {

    ...

    this.host = options.host;

    ...

}
```

Once we have a reference to the host object, we can create the selection ID in `dataExtraction()`. Note that you have to use a new instance of `ISelectionIdBuilder` every time you create a new selection ID.

```typescript
private dataExtraction(dataView: DataView): Pie {
    let categoryColumn = dataView.categorical.categories[0];

    ...

    for (let i = 0; i < categoryValues.length; i++) {

        ...

        let pieSlice = {
            category,
            measure,
            color,
            selectionID: this.host.createSelectionIdBuilder()
                .withCategory(categoryColumn, i)
                .createSelectionId()
        }

        ...

    }

    ...

}
```

Here we are using just the `withCategory()` definition, but you can also use `withSeries()` and `withMeasure()`. Once you have added all of the definitions you want, call `createSelectionId()`.

#### Method Information

|Method|Use Case|
|---|---|
|withCategory(categoryColumn: DataViewCategoryColumn, index: number)|Tells the selection ID builder to use the specific entry in the category column as the identifier. Effectively lets you select by category.|
|withMeasure(measureID: string)|Tells the builder to use the provided string as the measure. TODO: flesh out|
|withSeries(values: DataViewValueColumns, seriesGroup: DataViewValueColumnGroup)|If you have specified a `group` attribute in your data mapping, you can use this to add it to the selection ID generation.|

Once you have added a selectionID to all your data points, you now have to do something with it. The `host` object we saved earlier provides the `createSelectionManager()` method, which will create an `ISelectionManager`. The `ISelectionManager` communicates to Power BI what is selected in our visual. You only need one instance per instance of your visual, so we can make it a field.

```typescript

...

private selectionManager: ISelectionManager;

constructor(options: VisualConstructorOptions) {

    ...

    this.host = options.host;
    this.selectionManager = this.host.createSelectionManager();
}

...

```

Once you have a reference to the `ISelectionManager` saved, we need to add the actual interactivity to our visual. We're going to add our interaction as a click listener on our pie slices, but you can add interactivity however best suits your visual.

```typescript
private generateVisual(data: Pie, viewport: IViewport) {

    ...

    let selectionManager = this.selectionManager;

    //adding the new slices
    let path = this.chartContainer.selectAll('path')
        .data(angles(<any>data.slices))
        .enter()
        .append('path')
        .attr('d', <any>arc)
        .attr('fill', function(d) { return (d.data as any).color })
        .on('click', function(d) { selectionManager.select((d.data as any).selectionID) });
}
```

Now, if you click on a pie slice, you will see that the data has been filtered to the category of that slice. It's also important to note that the visual will not recive a call to `update()`, so you will have to explicitly update your visual if you must.

You can also pass `ISelectionManager` an array of selection IDs if you want to enable multiple selection.

The next step is to add visual feedback. It is very important for the consumer to know right away that they've selected a subsection of the data. I've implemented this in a very crude manner, so you should put much more thought into how you provide visual feedback for your visuals.

```typescript
private generateVisual(data: Pie, viewport: IViewport) {

    ...

    //adding the new slices
    let path = this.chartContainer.selectAll('path')
        .data(angles(<any>data.slices))
        .enter()
        .append('path')
        .attr('d', <any>arc)
        .attr('fill', function(d) { return (d.data as any).color })
        .on('click', function(d) {
            selectionManager.select((d.data as any).selectionID);
            d3.select(this).attr("fill", "#F0F0F0");
        });
}
```




