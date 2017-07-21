[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._

# Sorting and Other Configurations
---

## Sorting
Power BI provides users the ability to sort the data sent to the visual, and you can control that through the optional `sorting` parameter of `capabilities.json`. There are three possible settings for `sorting`: `default`, `implicit`, and `custom`. If you do not provide a `sorting` property, then Power BI will not offer the user the option of sorting the data, and will provide the data in whatever order it pleases. Settings are deployed as follows:

```json
capabilities.json:
    {
        "dataRoles": [ ... ],
        "dataViewMappings": [ ... ],
        "sorting": { ... }
    }
```

### `default`
This is the base setting that most visuals in Power BI use. It lets the user sort by any of the currently filled data roles. To enable default sorting, add the following to your `capabilities.json`:

```json
"sorting": {
    "default": {}
}
```

The `default` object takes no additional properties.

### `implicit`
The `implicit` setting allows you to define a permanent sorting scheme that the user cannot change. The `implicit` declaration contains multiple clauses, each of which defines the direction of the sort on a column. The `implicit` declaration looks like:

```json
"sorting": {
    "implicit": {
        "clauses": [
            {
                "role": "myDataRole",
                "direction": 1|2
            },
            {
                "role": "myDataRole2",
                "direction": 1|2
            },
            ...
        ]
    }
}
```

#### `role`
`role` defines the data role to which the ordering applies.

#### `direction`
`direction` determines the direction of the sort, and is an enum of `1` and `2`. `1` indicates an ascending ordering, while `2` indicates a descending ordering.

### `custom`
The `custom` setting in theory indicates that the visual will provide its own mechanism for sorting the data. In practice it is indistinguishable from not adding a `sorting` property to `capabilities.json`. There may be uses internal to Power BI for having the `custom` setting, but they are undocumented. The `custom` setting looks like:

```json
"sorting": {
    "custom": {}
}
```

The `custom` object takes no additional properties.

## Adding `sorting` to Sample Pie Chart
Since we are creating a pie chart, it will be useful for the data to be sorted by the category of the data, so we will define an implicit sort there:

```json
"sorting": {
    "implicit": {
        "clauses": [
            {
                "role": "mycategory",
                "direction": 1
            }
        ]
    }
}
```

## Highlighting
By default, when a user selects an element of a visualization, the dataset will narrow to those selected entries. In your custom visual, this change is transparent to the visual, as it will look like a smaller data set. If you want to still recieve the full data set, and highlight the relevant data yourself, you can specify the optional `supportsHighlight` property in your `capabilities.json`. This will tell Power BI to pass you the full data set, as well as an additional property, `highlights`, that contains the filtered values. You can add it to your `capabilities.json` like so:

```json
capabilities.json:
    {
        "dataRoles": [ ... ],
        "dataViewMappings": [ ... ],
        "sorting": { ... },
        "supportsHighlight": true|false
    }
```

If you leave the property off, it is the same as specifying it as false.

We are not going to implement highlighting in our Pi chart, so we will add it with the `false` value, as such:

```json
"supportsHighlight": false
```

## Advanced Edit mode
If you have complex controls you want to add to your visual, it may be best to hide them under the advanced edit mode. Advanced edit mode is mostly what you make of it, since the only mechanism provided is that the update call comes in with the `editMode` property of the `VisualUpdateOptions` object set to `1`, instead of the normal `0`. Advanced edit mode will always have an `editMode` of 1, while normal edit mode will always have an `editMode` of `0`. Be careful while using advanced edit mode, as sometimes `editMode` will be `undefined`. Users can activate advanced edit mode by clicking the Edit button in the visual's dropdown.

Adding advanced edit mode to `capabilities.json` is done like so:
```json
capabilities.json:
    {
        "dataRoles": [ ... ],
        "dataViewMappings": [ ... ],
        "sorting": { ... },
        "supportsHighlight": ...,
        "advancedEditModeSupport": 0|1|2
    }
```

### `0`
Specifying `0` means that advanced edit mode is not supported. This is the same as not specifying an `advancedEditModeSupport` property. In this setting, the Edit button will not be displayed.

### `1`
Specifying `1` means that advanced edit mode is supported in both the report view and in the focused view. In limited testing of this setting, it does not appear that there is a way to switch out of advanced edit mode once it has been turned on, so proceed with caution.

### `2`
Specifying `2` means that advanced edit mode is supported in only the focused view. If the user clicks the edit button while not in the focused view, it will take them to the focused view. When the user leaves focused mode, the `editmode` property will return to the normal `0`.

We are not going to implement advanced edit mode in our Pi chart, so we will add it with a value of `0`, as such:

```json
"advancedEditModeSupport": 0
```

---
## **[Continue to the next section, Extracting Your Data](../visualizing/1-ExtractingYourData.md)**
---

[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._
