#Defining Settings In Capabilities
---

Settings are critical to the experience your visualization provides to the developers that will use it, as well as the end consumer. They allow developers to customize the visual to fit there practical needs, as well as their stylization needs. Consumers are then presented with consistent interfaces and visuals that present the information they need.

If you look at the default `capabilities.json` that is created when you make a new visualization project, you will see a section called `objects`. The `objects` section is where you will specify the settings that are associated with your visual. If you look at the formatting section of the Power BI visualizations pane, this is where the objects you define will eventually show up.

You should plan on defining an `object` for each element of your visualization that you want the user to be able to customize. You will have to balance giving your users the granularity to make the visual look like they want, without bogging them down in hundreds of options.

##Databound objects
Each object we create under the `objects` property is a databound object. Each represents one of the accordions on that formatting pane. Power BI will also provide some generic settings as long as you have specified an `objects` property. These settings are listed in the [Genereic Settings](/docs/appendices/GenericSettings.md) appendix. The minimal definition for Power BI to provide the basic settings is:

```json
"objects":{}
```

The basic schema for `objects` is:

```json
"objects": {
    "myObject1": { ... },
    "myObject2": { ... },

    ...

}
```

The name you give the object (in this case, `myObject1` and `myObject2`), is the internal name that will be used to refer to it from this point onwards.

Each object has a schema as follows:

```json
"objects": {
    "myObject1": {
        "displayName": "My Object One",
        "displayNameKey": "ObjectKeyOne",
        "description": "My Object One does X",
        "properties": { ... }
    },

    ...

}
```

The `displayName` is what will show up as the header on the accordion. `displayNameKey` is the key that gets used if you are localizing your visual. `description` defines the tooltip definition of the object. Each property you specify beneath `properties` will be a new section on the object's menu. The property schema looks like this:

```json
"properties": {
    "myFirstProperty": {
        "displayName": "firstPropertyName",
        "displayNameKey": "firstPropertyKey",
        "description": "My First Property",
        "placeHolderText": "Please fill the blank",
        "suppressFormatPainterCopy": true!false,
        "type": ValueTypeDescriptor|StructuralTypeDescriptor
    }
}
```

`displayName`, `displayNameKey`, and `description` are as described in the previous paragraph. `placeHolderText` defines the placeholder text for the property, should it be a field in which the user can enter data. `suppressFormatPainterCopy` tells the Format Painter to ignore this field if set to true. Type has two options: `ValueTypeDescriptor` and `StructuralTypeDescriptor`. `ValueTypeDescriptor` is used when want to specify a simple primitive field for the user to specify. it looks like:

```json
"myFirstProperty": {
    ...

    "type": {
        "text|numeric|bool": true
    }
}
```

`StructuralTypeDescriptor` is used when you have a more complex setting you want to specify. There are a couple of ways you can specify this. The first is as an `enumeration`:

```json
"myFirstProperty": {
    ...

    "type": {
        "enumeration": [
            {
                "displayName": "Enumeration entry 1",
                "displayNameKey": "enumerationEntryOneKey",
                "value": "InternalValue"
            },
            { ... },

            ...

        ]
    }
}
```

`displayName` and `displayNameKey` are the same as they usually are: name for the user and key for localization, respectively. `value` is a string that represents the internal value. `enumeration`s are presented as dropdown lists. Another `StructuralTypeDescriptor` you are likely to use is the `fill` property. The `fill` property defines colors to be used in your visualization.

```json
"myFirstProperty": {
    ...

    "type": {
        "fill": {
            "solid": {
                "color": true|{"nullable":true|false}
            }
        }
    }
}
```

`solid` defines a solid color picker. `color` can either be `true`, which enables the color picker, or it can be an object with the property `nullable`. If `nullable` is set to true, the user can pick 'no fill' as the color from the color picker. The last type you are likely to use is the `formatting` type.

```json
"myFirstProperty": {
    ...

    "type": {
        "formatting": {
            "labelDisplayUnits|alignment|fontSize": true|false
        }
    }
}
```

`formatting` should be used to define some of the properties of your text. It provides three kinds of property. `labelDisplayUnits` displays a dropdown with common display units (None, Thousands, Millions, etc). `alignment` displays a set of buttons that allow the user to pick left, center or right alignment. `fontSize` gives the user a slider and entrybox to set the font size.

There is also a single reserved property name, `show`. The `show` propewrty adds the off/on toggle to the header of the accordion menu.

```json
"properties": {
    "show": {
        "displayName": "My Object Switch",
        "type": {"bool": true}
    }
}
```

##Adding settings to SamplePieChart
Now that you have an understanding of how Databound objects are created, we'll start adding settings to our SamplePieChart. We'll add the defaults provided by Power BI, then settings to allow users to pick the colors of their pie slices and a setting to set the opacity of the whole chart.

First, we'll make an object that will wrap our chart opacity setting:

```json
"objects": {
    "chartOpacity": {
        "displayName": "Chart Opacity",
        "description": "Defines the transparency of the chart as a percentage."
        "properties": {
            "opacity": {
                "displayName": "Opacity",
                "type": {
                    "numeric": true
                }
            }
        }
    }
}
```

Now let's define an object for the colors of our pie slices. Now this one is a little tricky, since we won't know the number or names of the categories we want to color until runtime. This means we will need to add our `properties` at runtime, which will be covered in the next section. However, we do need to set up a filler property that will look like the properties we are going to fill in. To that end we ill define our `categoryColors` as such:

```json
"objects": {

    ...

    "categoryColors": {
        "displayName": "Category Colors",
        "description": "Define the colors of your categories.",
        "properties": {
            "fill": {
                "displayName": "Fill",
                "type": {
                    "fill": {
                        "solid": {
                            "color": true
                        }
                    }
                }
            }
        }
    }
}
```

You may have noticed that your settings have not yet appeared on the visualizations pane, and that is to be expected. You will have to ennumerate the settings before they appear on the visualizations pane.

---
##**[Continue to the next section, Enumerating Settings](/docs/advanced/SettingsEnumeration.md)**
---
