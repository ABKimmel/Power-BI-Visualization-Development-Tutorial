



# `VisualObjectInstance`
---

When you are [enumerating your settings](../advanced/SettingsEnumeration.md), you must initialize a `VisualObjectInstance` for each setting you want to show the user. This is a breakdown of all fields available for you to specify.

|Field|Type|Value|
|---|---|---|
|`objectName`|`string`|The name of the object being defined by this `VisualObjectInstance`. This should match an object you have defined in `capabilities.json`.|
|`displayName`|`string`|The name you want to be displayed to the user.|
|`properties`|`object`|The properties you wish to define. See below.|
|`selector`|`Selector`|The selector that identifies a data point. See below.|
|`validValues`|`object`|Optional. Defines a valid range of values for the given properties. See below.|
|`containerIdx`|`number`|Optional. The index of this object in the external `VisualObjectInstanceEnumeration` or array of `VisualObjectInstance`|

The basic usage of `VisualObjectInstance` is as such:

```typescript
{
    displayName: displayNameVariable|"displayName"
    objectName: objectNameVariable|"objectName",
    selector: (selectionID as powerbi.visuals.ISelectionId).getSelector()|null,
    containerIdx: indexOfThisObject,
    properties: { ... },
    validValues: { ... }
    }

}
```

## `selector`
The selector identifies which data point the object is tied to. You can retrieve the `Selector` object like so:

```typescript
(datapoint.selectionId as powerbi.visuals.ISelectionId).getSelector()
```

In addition, you can always set the value to `null`, and should if the property does not need to be bound to a specific data point.

Also, remember that you can currently only generate selection IDs if you are using a `categorical` mapping.

## `properties`
`properties` specifies the nature of the properties you wish to define. You can specify a single property or multiple properties with this field. A property definition looks much like the [definitions in `capabilities.json`](../advanced/SettingsDefinitions.md). A single definition could look like:

```typescript
properties: {
    fill: {
        solid: {
            color: someColorVariable|"#F0F0F0"
        }
    }
}
```

If you want multiple properties, it is as simple as adding multiple objects below `properties`.

```typescript
properties: {
    fill: {
        solid: {
            color: someColorVariable|"#F0F0F0"
        }
    },
    borderWeight: {
        numeric: currentBorderWeight|someConstant
    }
}
```

## `validValues`
The `validValues` property allows you to specify a range of valid values for a numeric property. Usage is as so:

```typescript
validValues: {
    myPropertyName: {
        numberRange: {
            min: minValueVariable|someConstant,
            max: maxValueVariable|someConstant
        }
    }
}
```




