#Sorting and Other Configurations
---

##Sorting
Power BI provides users the ability to sort the data sent to the visual, and you can control that through the optional `sorting` parameter of `capabilities.json`. There are three possible settings for `sorting`: `default`, `implicit`, and `custom`. If you do not provide a `sorting` property, then Power BI will not offer the user the option of sorting the data, and will provide the data in whatever order it pleases. Settings are deployed as follows:

```
capabilities.json:
    {
        "dataRoles": [ ... ],
        "dataViewMappings": [ ... ],
        "sorting": { ... }
    }
```

###`default`
This is the base setting that most visuals in Power BI use. It lets the user sort by any of the currently filled data roles. To enable default sorting, add the following to your `capabilities.json`:

```
"sorting": {
    "default": {}
}
```

The `default` object takes no additional properties.

###`implicit`
The `implicit` setting allows you to define a permanent sorting scheme that the user cannot change. The `implicit` declaration contains multiple clauses, each of which defines the direction of the sort on a column. The `implicit` declaration looks like:

```
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

####`role`
`role` defines the data role to which the ordering applies.

####`direction`
`direction` determines the direction of the sort, and is an enum of `1` and `2`. `1` indicates an ascending ordering, while `2` indicates a descending ordering.

###`custom`
The `custom` setting in theory indicates that the visual will provide its own mechanism for sorting the data. In practice it is indistinguishable from not adding a `sorting` property to `capabilities.json`. There may be uses internal to Power BI for having the `custom` setting, but they are undocumented. The `custom` setting looks like:

```
"sorting": {
    "custom": {}
}
```

The `custom` object takes no additional properties.

##Adding `sorting` to Sample Pi Chart
Since we are creating a Pi chart, it will be useful for the data to be sorted by the category of the data, so we will define an implicit sort there:

```
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
