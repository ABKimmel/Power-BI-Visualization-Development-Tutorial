[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._

#Accessing Settings
---
Accessing the settings is fairly simple. All of the information will be contained in the `DataView` that also has all of the data for rendering the chart. Setting information appears in one of two spots, depending on how you defined the object. If you defined the object without specifying a `selector`, the information will appear in the `metadata` of the DataView. Otherwise, if you did specify a `selector`, the setting will appear in the section of the DataView that contains the data to which you bound the setting.

##Accessing Global Settings
To access a setting you did not define a `selector` for, you will need to extract it from `dataView.metadata`. For example, if we want to extract our `chartOpacity` setting, we would start by defining a new function to handle updating the settings.

```typescript
public update(options: VisualUpdateOptions): void {
    if (options.dataViews.length > 0) {

        ...

        this.updateSettings(options.dataViews[0]);
    }

    ...

}

...

private updateSettings(dataView: DataView): void {
}
```

Next, we'll pull out the `metadata` object from `dataView`. `metadata` will have a property `objects`, and we want to extract that as well. After we have that, we want to ensure it actually has settings before we try to access them, or we'll crash the visual when we first load it up.

```typescript
private updateSettings(dataView: DataView): void {
    let metadata = dataView.metadata;
    let metadataObjects = metadata.objects;

    if (metadataObjects) {
        let chartOpacity = metadataObjects[Visual.ChartOpacityPropertyIdentifiers.objectName];
        this.opacity = chartOpacity[Visual.ChartOpacityPropertyIdentifiers.propertyName] as number;
    }
}
```

As you can see, the next step is to retrieve the object containing the `opacity` property, using the constant we defined in a previous step. Once we have that object, we ask it for the `opacity` property, also using the predefined constant.

All that's left is updating the colors of our categories now. We'll add this code to our `updateSettings()` method:

```typescript
let categories = dataView.categorical.categories;
let categoryObjects = categories[0].objects;

if (categoryObjects) {
    for (let i = 0; i < categoryObjects.length; i++) {

    }
}
```

The first step is getting access to the objects that define your settings. In this case (and in all cases until we get selection IDs on more data mappings), that means retrieving the `categorical` object and then drilling down to the specific data role to which you tied your setting. Then we do some basic checks to ensure we don't error out. Next, we loop over the objects, and handle them like so:

```typescript
for (let i = 0; i < categoryObjects.length; i++) {
    if (categoryObjects[i]) {
        let chartColorObject = categoryObjects[i][Visual.CategoryColorsPropertyIdentifiers.objectName];
        let chartColorProperty = chartColorObject[Visual.CategoryColorsPropertyIdentifiers.propertyName];
        let color = (chartColorProperty as any).solid.color;
        this.pie.slices[i].color = color;
    }
}
```

You'll notice we are checking that the object actually exists, despite the list seemingly being filled out for each of our categories. In actuality, the list will be populated with `undefined`, until you change or fill in the related setting. This means that even if the list is of the expected length, you can have `undefined` values in the middle of the list.

Once we are sure the object is what we want it to be, we pull out the specific object we want, and property using the same method as above. You can always `log` the object for reference on its structure. Lastly, we update the color of the related `PieSlice`. Since we mapped the setting to the datapoint, it will be in the same order as the data we use in `dataExtraction()`.

[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._
