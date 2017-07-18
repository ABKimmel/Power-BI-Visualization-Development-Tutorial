#Data Extraction
---
We've already covered the basics of data extraction in the [tutorial](/docs/visualizing/1-ExtractingYourData.md), but only for the `categorical` mapping. In this appendix, we will cover extracting data from `single`, `table`, and `matrix` mappings.

##Single Mapping
---
Accessing your data from a `single` data mapping is very simple. Since there is only ever one entry, you can access it like so:

```typescript
public update(options: VisualUpdateOptions) {

    ...

    let singleMeasureValue = options.dataViews[0].single.value;

    ...

}
```

Once you've pulled out the value, you're set!

There is a simple demonstration visualization for the `single` data mappinig available in the [SingleDemo]() folder. If you want to review the concept of a `single` data mapping, check out its [coverage](/docs/appendices/dataViewMappings.md#single) in the [DataView Mappings](/docs/appendices/dataViewMappings.md) appendix.

##Table Mapping
---

Accessing your data from a `table` mapping can be more difficult than you expect, due to the fact that you are not guaranteed the columns will come back in the order you specify in `capabilities.json`. If you want to determine which columns are which in the data rows, you will have to parse through the `metadata` property of the DataView to determine which column is which. If you just want to access rows, without caring about column identifiers they are simple to access:

```typescript
public update(options: VisualUpdateOptions) {

    ...

    let rows = options.dataViews[0].table.rows;
    ...

}
```

You should also keep in mind that the rows will not be in any particular order unless you have specified a `sorting` property.

If you want to identify the columns of the DataView before accessing the data, you will need to write a function similar to this:

```typescript
private findColumns(columns: DataViewMetadataColumn[]) {
    //iterate over defined column names
    for (let i = 0; i < this.columnIndices.length; i++) {
        //defining name value from our preconstructed map of names
        let name = this.columnIndices[i].name;
        //now iterate over available columns, note that not all columns may be assigned a data field yet
        for (let j = 0; j < columns.length; j++) {
            //defining the role attribute of the current column, more info in the data view appendix
            let columnRoles = columns[j].roles;
            //column name is the property name, so looking in there
            if (Object.keys(columnRoles).indexOf(name) >= 0) {
                //setting the index of the column name to the index of the role
                this.columnIndices[i].index = j;
                break;
            }
        }
    }
}
```

You will also have to define and initialize the field `columnIndices` as so:

```typescript
private columnIndices: { "name": string, "index", number}[];
```

Initialize it by filling in the **internal** names of your data roles.

Once you have the indices of your columns, you can access the row data with certainty about what information you are getting.
