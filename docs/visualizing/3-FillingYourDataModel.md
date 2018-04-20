



# Filling Your Data Model
---
Now that we've defined a data model, we can begin to populate it with information from the `DataView`. This is the time when you should apply any transformations you want to apply to the incoming data before it gets sent to the visual generation code. Once the data leaves `dataExtraction()` it should only ever be read, unless you have split your extraction and your transformation steps into separate functions.

In our case, we don't need to do any transformations, so we will just do our extraction in `dataExtraction()`. We want to create a `Category` object for each entry in our DataView. First though, we should check that all of the data roles we are expecting to be filled are filled. Since we are expecting there to be entries in both `categories` and `values`, we will check those. We also want to be sure that we have the same number of values in both `categories` and in `values`. We will do so as such:

```typescript
private dataExtraction(dataView: DataView) {

    ...

    if (categoryValues.length < 1 || valueValues.length !== categoryValues.length) {
        //TODO: Handle missing or incompatible data
    }
}
```

Now let's setup an empty `Categories` for when all the data we want is not there, and change `dataExtraction()` so it returns a `Categories`.

```typescript
private dataExtraction(dataView: DataView): Categories {

    ...

    if (categoryValues.length < 1 || valueValues.length !== categoryValues.length) {
        return {
            slices: [],
            sumOfMeasures: 0
        };
    }
}
```

Now to load the data into our data model. Something to watch out for is that all of the values you pull out of the `DataView` will have the type `PrimitiveValue`, so you will have to cast them to the types you defined in your data model. To do this, you should take the `.valueOf()` the `PrimitiveValue` and then cast it using the TypeScript `as DATATYPE`.

```typescript
private dataExtraction(dataView: DataView): Pi {

    ...

    let pieSlices = [];
    let sumOfMeasures = 0;
    for (let i = 0; i < categoryValues.length; i++) {
        let category = categoryValues[i].valueOf() as string | number;
        let measure = valueValues[i].valueOf() as number;
        sumOfMeasures += measure;

        let pieSlice = {
            category,
            measure
        }
        pieSlices.push(pieSlice);
    }
}
```

Now that we've built the components of our `Pie` object, we can put it all together and return a `Pie` to our visual generation code.

```typescript
private dataExtraction(dataView: DataView): Pie {

    ...

    return {
        slices: pieSlices,
        sumOfMeasures: sumOfMeasures
    }
}
```

---
## **[Continue to the next section, Building Your Visual](../visualizing/4-BuildingYourVisual.md)**
---




