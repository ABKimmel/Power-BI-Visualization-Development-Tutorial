#Data Extraction
---
We've already covered the basics of data extraction in the [tutorial](/docs/visualizing/1-ExtractingYourData.md), but only for the `categorical` mapping. In this appendix, we will cover extracting data from `single`, `table`, and `matrix` mappings.

##Single Mapping
---
Accessing your data from a `single` data mapping is very simple. Since there is only ever one entry, you can access it like so:

```
public update(options: VisualUpdateOptions) {

    ...

    let singleMeasureValue = options.dataViews[0].single.value;

    ...

}
```

Once you've pulled out the value, you're set!

There is a simple demonstration visualization for the `single` data mappinig available in the [SingleDemo]() folder. If you want to review the concept of a `single` data mapping, check out its [coverage](/docs/appendices/dataViewMappings.md#single) in the [DataView Mappings](/docs/appendices/dataViewMappings.md) appendix.
