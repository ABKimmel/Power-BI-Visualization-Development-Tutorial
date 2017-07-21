[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._

#Data Roles
---
Data roles are how you define the fields into which your visualization will accept data.

![Image of the data fields](/img/DataFields.png)

Each of the fields there has a data role that is defined under the `dataRoles` attribute of `capabilities.json`.

##Anatomy of a Data Role
You can see an example of the minimal data role in the default visual if you look at `capabilities.json`.
A complete data role will look like this:

```json
"dataRoles": [
    {
      "displayName": "DisplayName",
      "name": "displayname",
      "kind": "Grouping|Measure|GroupingOrMeasure",
      "requiredTypes": [ { ... }, ... ],
      "description": "This is an example field."
    },
    { ... },

    ...

]
```

###`displayName`
Required. This is the name that will be presented to the user. It should be short and precise.

###`name`
Required. This is the internal name for the data field. We will use this name to reference the data field in the future. As such, it must be unique, and should be easily identifiable. Keep in mind that any references to it will be case sensitive.

###`description`
Optional. A brief description of what the field does and/or what kinds of data should be given to it. It will be a tooltip, so it should be short.

###`kind`
Required. This defines what kind of field you are describing. There are three different kinds: `Measure`, `Grouping`, and `GroupingOrMeasure`. Contrary to what the official documentation says, you must use one of those three string enums, rather than the old `0`, `1`, `2` integer enums.

Each kind fills a different purpose:

`Measure`: These are numeric fields. This means that any field put into this role will be aggregated. This is things like sale data, profits, volume, etc.

`Grouping`: These are fields that do not get aggregated and are used for grouping the `Measure` fields. Things like category names, latitude or longitude values, ID numbers, etc.

`GroupingOrMeasure`: These can be either. In general, it is best to give your data roles one of `Grouping` or `Measure`, but if you truly must be both, use this kind.

###`requiredTypes`
Optional. Defines the types of data that will be accepted. An example looks like:

```json
"requiredTypes": [
    {
      "numeric": true
    }
]
```

The possible types you can use are listed in `.api/schema.capabilities.json`, around line 766 at the time of writing, and a list is transposed below:
*   `bool`
*   `enumeration`
*   `fill`
*   `formatting`
*   `integer`
    *   In my testing of `integer`, it appears to accept decimal numbers, so use with caution.
*   `numeric`
*   `filter`
*   `operations`
*   `text`
    *   `text` is a very permissive choice, since it will accept any `FORMAT()` result, anything with a text hierarchy (dates, locations, etc.), and regular old text.
*   `scripting`
*   `geography`

In general, you will probably only use the primitive types. You can also say `"type": false` in your requiredTypes list, but this will prevent you from putting any values into the field, unless you also have a `"type": true` specified. This makes `"type": false` effectively worthless.

It is also possible to specify that a data role can be one of a number of types, like this:

```json
"requiredTypes": [
    {
      "numeric": true
    },
    {
        "text": true
    }, ...
]
```

##samplePieChart Data Roles
Since we are building a pie chart, we only have two fields for now. We need a category field and a measure field. Let's start with the bare bones for the category field:

```json
{
  "displayName": "Category",
  "name": "mycategory",
  "kind": "Grouping"
}
```

Remember that we are choosing `Grouping` for `kind` because we want to group our measure field on our category field. Next, let's add our required types:

```json
{
  "displayName": "Category",
  "name": "mycategory",
  "kind": "Grouping",
  "requiredTypes": [
      {
          "text": true
      },
      {
          "numeric": true
      }
  ]
}
```

Since we want our category to be able to handle both category names and ID numbers, we give it both acceptable types. Lastly we will add a description.

```json
{
  "displayName": "Category",
  "name": "mycategory",
  "kind": "Grouping",
  "requiredTypes": [
      {
          "text": true
      },
      {
          "numeric": true
      }
  ],
  "description": "The key on which to group Measure values."
}
```

Now the same for our measure field:

```json
{
  "displayName": "Measure",
  "name": "mymeasure",
  "kind": "Measure",
  "description": "The value on which to aggregate around Category."
}
```

You can see that we've changed a couple of things:
1.   The names, so that the user and we are clear on the difference between the fields.
2.   The `kind` is now `Measure`, since we are going to group this field.
3.   We removed `requiredTypes`, since we don't care what kind of data gets put in this field, as Power BI will aggregate it all for us, regardless of type. This is the behavior of `Measure` fields.
4.   The description has been updated to reflect what this field does.

**Note that at this point, the visual is not functional.** We will fix this in the DataViewMapping section.

---
The official documentation for data roles is available [here](https://github.com/Microsoft/PowerBI-visuals/blob/master/Capabilities/Capabilities.md#define-the-data-fields-your-visual-expects---dataroles). Be warned that some of it is out of date and was very limited to begin with.


---
##**[Continue to the next section, DataView Mappings](../capabilities/2-DataViewMappings.md)**
---

[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._
