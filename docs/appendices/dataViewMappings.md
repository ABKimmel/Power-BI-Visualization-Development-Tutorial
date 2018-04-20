



# Additional `dataViewMappings`
---
## `single`
`single` is the simplest of all the data mappings. `single` takes a single measure data role, and provides you the sum or count of items in the first data field. A `single` data mapping looks like:

```json
{
    "conditions": [ ... ],
    "single": {
        "role": "myDataRole"
    }
}
```
The main use case for this is things like the built-in Card visual.

## `table`
The `table` data mapping is quite simple. If you want to have rows of data to access, you will want to use the `table` data mapping. In the `table` data mapping, you specify the `rows` of data you want, like such:

```json
{
    "conditions": [ ... ],
    "table": {
        "rows": { ... },
        "rowCount": { ... }
    }
}
```

### `rows`
Rows is where you specify the data roles that will make up the rows of the table DataView. In effect, each data role you bind here will define a column. Each row will then be formed by selecting related data from the roles you bound. A `rows` definition looks like:

```json
"rows": {
    "for|bind": { ... },
    "dataReductionAlgorithm": { ... }
}
```

or

```json
"rows": {
    "select": [
        {"for|bind": { ... }},
        {"for|bind": { ... }},
        ...
    ],
    "dataReductionAlgorithm": { ... }
}
```

It is important to note that the data you get from the DataView will not be in any particular order, meaning you cannot look to your data mapping to determine which columns fit which data roles. We will talk more about this in [Accessing Your Data](../visualizing/1-ExtractingYourData.md).

You have three options for what to specify inside of `rows`: `for`, `bind`, and `select`. These are the same as for a `categorical` mapping.

#### `bind`
`bind` tells Power BI to return the single field in the specified role as part of the rows property of the DataView object. Note that you should only `bind` data roles if they allow a maximum of one data field. Bindings look like:

```json
"rows": {
    "bind": {
        "to":"mySingleDataRole"
    }
}
```

#### `for`
`for` is much the same as `bind`. It tells Power BI that the fields in the role should be returned as part of the rows property of the DataView object. It differs from `bind` in that you can use it on data roles that allow more than one field within them. All the fields will be included in the DataView object. `for` looks like:

```json
"rows": {
    "for": {
        "in":"myMultipleDataRole"
    }
}
```
#### `select`
`select` allows you to have more than one data role in your `rows` definition. It can contain any number of Usage is:

```json
"rows": {
    "select":[
        {"for|bind": { ... }},
        {"for|bind": { ... }},
        ...
    ]
}
```

### `rowCount`
`rowCount` allows you to define the number of rows that the visual supports. This is an optional property. It has two properties, `preferred` and `supported`. `preferred` sets the preferred range for the number of rows the visual can handle. `supported` sets a hard range for number of rows supported by the visual, and defaults to the `preferred` values if not specified. Example usage is below.

```json
"rowCount":{
    "preferred": {
        "min": 100,
        "max": 200
    },
    "supported": {
        "min": 0,
        "max": 300
    }
}
```

Note that you should use the `dataReductionAlgorithm` to limit your entries, instead of using `rowCount`.

## `matrix`
The only documentation covering the `matrix` data mapping is in `schema.capabilities.json`, and there was not enough time to figure it out, so we will not be providing coverage at this time. If there is more documentation provided in the future or there is time to figure out `matrix`, documentation will be provided. If you can provide quality documentation, please open a pull request.

## `scriptResult`
The only documentation covering the `scriptResult` data mapping is in `schema.capabilities.json`, and there was not enough time to figure it out, so we will not be providing coverage at this time. If there is more documentation provided in the future or there is time to figure out `scriptResult`, documentation will be provided. If you can provide quality documentation, please open a pull request.




