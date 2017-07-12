#DataView Mappings
---
The `dataViewMappings` property of `capabilities.json` does two different things: define how your individual data roles relate to each other, and let you provide some conditions for your data roles.

A full DataViewMapping will look like:

```
"dataViewMappings":[
    {
        "conditions": [ ... ],
        "categorical|single|table|matrix": { ... }
    }
]
```

**Note that in the `dataViewMapping` property, or anywhere else from this point on, when you want to refer to a data role by name, you should use the internal name you defined. This is the `name` property**


##`conditions`
Conditions allow you to specify the number of data fields that can be placed in a particular data role. An example mapping for our SamplePieChart might look like:

```
"conditions": [
{
    "mycategory":
    {
        "max": 1
    },
    "mymeasure":
    {
        "min": 1
    }
} ]
```

You can specify both a `min` and a `max` for each data role. You are not required to specify any conditions for a data role, so you can specify for some roles, but not others.

Something very important to keep in mind is that the conditions must be valid **at all times**. This means that if you specify two or more roles with a `min` greater than 0, you will never be able to enter data into the visual. Since, at best, you can be putting data into one of the roles with a minimum, the other will not be meeting its condition, so the first role will reject the data, since it is not a valid configuration. This means that you can only have one `min` in your set of conditions.

You can also specify multiple sets of `conditions` that are valid. In this case, only one of the configurations has to be valid at any time. For example:

```
"conditions": [
{
    "mycategory":
    {
        "max": 1
    },
    "mymeasure":
    {
        "min": 1
    }
}, {
    "mycategory":
    {
        "max": 1,
        "min": 1
    },
    "mymeasure":
    {
        "max": 1
    }
}]
```

##Data Mappings
Data mappings are how we define the structure of the data in the DataViews we get from Power BI. We will only talk about `categorical` in this section, but there are four other types. Each has its own applications and use cases where it is most relevant. All your data roles should be present in your data mapping definition.

**If you would like information about the other kinds of `dataViewMappings`, please see the [`dataViewMappings` appendix](/docs/appendices/dataViewMappings.md).**

###`categorical`
`categorical` is the data mapping you will probably use the most. It provides a mapping for things that are grouped into categories. This is great for any data you want to group in your visualization. When you define a `categorical` data mapping, you must define both the categories you are mapping onto, and the values you are mapping. A simple `categorical` data mapping looks like this:

```
{
    "conditions": [ ... ],
    "categorical": {
        "categories": { ... },
        "values": { ... }
    }
}
```

####`categories`
`categories` sets which data roles will be used to define categories in the DataView for grouping the data. These data roles should all have the `kind` `Grouping`. A typical `categories` definition will look like:

```
"categories": {
    "for|bind": { ... },
    "dataReductionAlgorithm": { ... }
}
```

or

```
"categories": {
    "select":[
        {"for|bind": { ... }},
        {"for|bind": { ... }},
        ...
    ],
    "dataReductionAlgorithm": { ... }
}
```

You have three options for what to specify inside of categories: `for`, `bind`, and `select`. This is also where you will specify the `dataReductionAlgorithm`, which is covered further down the page.

#####`bind`
`bind` tells Power BI to return the single field in the specified role as part of the categories property of the DataView object. Note that you should only `bind` data roles if they allow a maximum of one data field. Bindings look like:

```
"categories": {
    "bind": {
        "to":"mySingleDataRole"
    }
}
```

#####`for`
`for` is much the same as `bind`. It tells Power BI that the fields in the role should be returned as part of the categories property of the DataView object. It differs from `bind` in that you can use it on data roles that allow more than one field within them. All the fields will be included in the DataView object. `for` looks like:

```
"categories": {
    "for": {
        "in":"myMultipleDataRole"
    }
}
```
#####`select`
`select` allows you to have more than one data role in your `categories` definition. It can contain any number of Usage is:

```
"categories": {
    "select":[
        {"for|bind": { ... }},
        {"for|bind": { ... }},
        ...
    ]
}
```

####`values`
`values` sets the data roles that will be grouped by the roles in `categories`. These data roles should be `Measure`s. Values look like:

```
"values":
{
    "for|bind": { ... }
}
```

or

```
"values":
{
    "select": [
        {"for|bind": { ... }},
        {"for|bind": { ... }},
        ...
    ]
}
```

`for`, `bind`, and `select` are as above. The values here will show up in the values property of the DataView object.

##`dataReductionAlgorithm`
The `dataReductionAlgorithm` allows you limited control to specify the behavior of Power BI when there are more records than a certain threshold. THis lets you set the threshold and the behavior to a limited extent. There are four reduction algorithms from which you can choose. The algorithms are `top`, `bottom`, `sample`, and `window`. Please note that no matter what you specify for `count`, Power BI will not return more than 30,000 entries to your visual. A `dataReductionAlgorithm` definition looks like:

```
"dataReductionAlgorithm": {
    "top|bottom|sample|window": {
        "count": 10
    }
}
```

###`top`
`top` tells Power BI to return the top `count` entries from the query.

##`bottom`
`bottom` tells Power BI to return the bottom `count` entries from the query.

####`sample`
`sample` tells Power BI to return a sample of `count` entries from the query. It is not clear whether the sampling algorithm is their new [high density sampling algorithm](https://powerbi.microsoft.com/en-us/documentation/powerbi-desktop-high-density-sampling/), the older algorithm, or even a different algorithm.

###`window`
`window` tells Power BI to return a window of `count` entries from the query. In theory, this allows you to circumvent the 30,000-entry limit Power BI imposes on your visual. That said, there is no documentation on how to access windows beyond the first, and at the time of writing, no one had figured out how to do it.

It is important to specify a `dataReductionAlgorithm`, because if you do not, it will use this default `dataReductionAlgorithm`:

```
"dataReductionAlgorithm": {
    "top": {
        "count": 1000
    }
}
```


##samplePieChart Data Bindings
On the `conditions` side of things, we are only expecting one data field in each role, so our roles should be limited to a max of one field each. This gives us:

```
"conditions": [
{
    "mycategory":
    {
        "max": 1
    },
    "mymeasure":
    {
        "max": 1
    }
} ]
```

We are going to use a `categorical` data mapping, since we want to group our measure by whatever categories we get. Since we are grouping on 'mycategory' our `categories` section will look like:

```
"categories": {
    "bind": {
        "to":"mycategory"
    },
    "dataReductionAlgorithm": {
        "top": {
            "count": 30000
        }
    }
}
```

Remember that we are using `bind` because the role is limited to one field. Next, our values:

```
"values":
{
    "bind": {
        "to": "mymeasure"
    }
}
```

---
##**[Continue to the next section, Additional Settings]()**
---
