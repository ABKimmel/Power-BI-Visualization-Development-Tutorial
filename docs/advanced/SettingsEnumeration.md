#Enumerating Settings
---
Now that we have defined the settings we want in our `capabilities.json`, we need to enumerate them so Power BI knows that we want to put them up on the visualizations pane. This also gives us the ability to programatically add and remove settings as we see fit. We are going to leverage this to create settings for the coloration of each of our categories. First though, we are going to get `chartOpacity` to show up, and use the progromatic tools to set bounds on valid values.

##Setting Up Enumeration
Before we get started with the specific enumerations of our settings, we have some work to do. In the default visualization code, there is a method `enumerateObjectInstances()`. This method is called by Power BI at the same time as many calls to `update()`, but not all. `enumerateObjectInstances()` returns either an array of `VisualObjectInstance`s, or a `VisualObjectInstanceEnumerationObject`, which is essentially a wrapper for an array of `VisualObjectInstance`s. This is where we will enumerate our objects as settings.

We are also going to change the way we access our settings, so you should delete the `settings.ts` file and any code that depends on it. This should leave you with just the methods we have explicitly added in our tutorial, `update()`, the constructor, and `enumerateObjectInstances()`. Now let's replace any existing code in `enumerateObjectInstances()`:

```
public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {

    let instanceEnumeration: VisualObjectInstanceEnumeration = [];

    return instanceEnumeration;
}
```

Obviously, we're going to have to flesh this out, but this is a start.

##Enumerating `chartOpacity`
Since we are going to be enumerating our settings differently, we need to know which setting we are enumerating at any given time, since `enumerateObjectInstances()` is called for each object in `capabilities.json`. To do this, we only have to examine the `EnumerateVisualObjectInstancesOptions` object the method is passed. It will have a single property, `objectName`, that tells us which object we should be enumerating. We can then compare to that value to define our control flow.

We also want to avoid using magic data in our ode, so we are going to be responsible and define a `DataViewObjectPropertyIdentifier` for `chart opacity`. We will also want to define field that holds the current opacity of the visual.

```
export class Visual implements IVisual {

    ...

    private opacity: number;

    private static ChartOpacityPropertyIdentifiers: DataViewObjectPropertyIdentifier = {
        objectName: "chartOpacity",
        propertyName: "opacity"
    }

    ...

}
```

Next, we'll split our enumeration of `chartOpacity` off from the rest of our enumeration.

```
public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    let instanceEnumeration: VisualObjectInstanceEnumeration = [];

    if (options.objectName === Visual.ChartOpacityPropertyIdentifiers.objectName) {
        this.enumerateChartOpacity(instanceEnumeration)
    }
    return instanceEnumeration;
}
```

Now let's fill out the function `enumerateChartOpacity()`:

```
private enumerateChartOpacity(instanceEnumeration: VisualObjectInstance[]) {
    instanceEnumeration.push({
        displayName: "Opacity",
        objectName: Visual.ChartOpacityPropertyIdentifiers.objectName,
        selector: null,
        properties: {
            opacity: {
                numeric: this.opacity || 100
            }
        },
        validValues: {
            opacity: {
                numberRange: {
                    min: 10,
                    max: 100
                }
            }
        }
    })
}
```

This method does essentially one thing, and that is make an object that defines the `chartOpacity` setting. Now remember that `instanceEnumeration` requires the `VisualObjectInstance` schema from its members, so our object must be a valid `VisualObjectInstance`. In short, this sets the value of the setting to 100, or, if it is already defined, the current opacity. It also tells Power BI that only values between 10 and 100 inclusive are valid.

**For more information on `VisualObjectInstance`, see the [VisualObjectInstance appendix](/docs/appendices/VisualObjectInstance.md)**

##Enumerating `chartColors`
This may seem quite a bit trickier than the last section, since we don't have these properties already defined, but you will see that it is actually not much more difficult. Let's start by adding the fields we are going to need. First, we will want to define a `DataViewObjectPropertyIdentifier` for `chartColors`. We will also need access to the data model so that we can see the `slice` categories and colors. Let's do that now:

```TypeScript
export class Visual implements IVisual {

    ...

    private pie: Pie;

    private static CategoryColorsPropertyIdentifiers: DataViewObjectPropertyIdentifier = {
        objectName: "categoryColors",
        propertyName: "fill"
    }

    ...

    public update(options: VisualUpdateOptions) {
        if (options.dataViews.length > 0) {
            this.pie = this.dataExtraction(options.dataViews[0]);
        } else {
            return;
        }

        this.generateVisual(this.pie, options.viewport);
    }
}
```

Now that we have all the pieces we need, let's break off the enumeration of `chartColors` from `enumerateObjectInstances()`.

```TypeScript
public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    let instanceEnumeration: VisualObjectInstanceEnumeration = [];

    if (options.objectName === Visual.ChartOpacityPropertyIdentifiers.objectName) {
        this.enumerateChartOpacity(instanceEnumeration);
    } else if (options.objectName === Visual.CategoryColorsPropertyIdentifiers.objectName) {
        this.enumerateCategoryProperties(instanceEnumeration);
    }

    return instanceEnumeration;
}
```

Now to fill in `enumerateCategoryProperties()`:

```TypeScript
private enumerateCategoryProperties(instanceEnumeration: VisualObjectInstance[]): void {
    let slices = this.pie.slices;
    if (!slices || slices.length < 1) {
        return;
    }

    slices.forEach((slice: PieSlice) => {
        let selectionID: ISelectionId = slice.selectionID;
        let displayName: string = "" + slice.category;

        instanceEnumeration.push({
            displayName,
            objectName: Visual.CategoryColorsPropertyIdentifiers.objectName,
            selector: (selectionID as powerbi.visuals.ISelectionId).getSelector(),
            properties: {
                fill: {
                    solid: {
                        color: slice.color
                    }
                }
            }

        })

    })
}
```

As you can see, this is very similar to what we did with `chartOpacity`, except we are doing it for every `PieSlice` in our data model. As long as the properties we are defining have the same `objectName`, they will all appear together.

This covers the process of enumerating your settings. Now, to access them.

---
##**[Continue to the next section, Accessing Settings](/docs/advanced/AccessingSettings.md)**
---
