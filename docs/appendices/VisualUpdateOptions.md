[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

#`VisualUpdateOptions`

##`dataViews`
`dataViews` is the object that holds all of the data we are trying to visualize, as well as all of the information on the visual's settings. It is an array of `DataView`s. In all cases, there will be only one `DataView` returned, no matter how many `dataViewMappings` you defined in `capabilities.json`.

For more information on the `DataView` object, see the [Anatomy of a `DataView` appendix](/docs/appendices/AnatomyOfADataView.md).

##`editMode`
`editMode` was previously discussed in the section on [advanced edit mode](). It normally comes back as `0` or `undefined`, but when the user activates Edit mode, it will return as `1`. Note that if you receive multiple updates from a single user action, they may not have the same value for `editMode`, so it is up to you to handle that in your visual.

##`type`
`type` indicates the kind of update that happened, and has many possible values. There are 5 key building block update types. They are:

|Value|Meaning|
|--|--|
|`2` |A data update. This kind of update will be sent when a new field is dragged in, an existing field is removed, or there occurs an event where the data changes in any way. This will also be sent when any of the settings of the visual are changed.|
|`4` |A resize update. This kind of update will be sent when the visual is resized, or the viewPort changes.|
|`8` |A `viewMode` update. This kind of update is sent when the `viewMode` changes. This would mean your visual is switching between normal view, edit view, and the focused view. You may see it by itself when you go from focused view back to the full report, but not always. It is not clear what causes it to be sent or not sent.|
|`16` |A style update. This doesn't seem to be sent outside of the `62` type.|
|`32` |A resize end update. This will be sent with `4` for any resize event that isn't scaling the visual in the default view. This includes going to and from focused view, resizes initiated by changing the page size, and any other event that forces the visual to resize that isn't directly caused by the user.|

The `type` property can come back as any one of those building blocks, but can also come back as any combination of them as well. Note that there are many combinations that probably won't ever happen. The most likely combinations are listed below:

|Value|Combination|
|--|--|
|`36`|`4` + `32`|
|`62`|`2` + `4` + `8` + `16` + `32`|

##`viewMode`
`viewMode` indicates what mode the visual is in for the person viewing it. In theory, it will return one of three values:

|Value|View|
|--|--|
|`0`|The standard view.|
|`1`|The standard view, but in editing mode.|
|`2`|The focused view, in editing mode.|

In actuality, `viewMode` will always be `1`, regardless of whether you are in standard or focused view and whether you are editing or not. It is not tied to `editMode`, despite seeming like it should be.

##`viewPort`
`viewPort` is an object that contains three attributes of the visual's viewport. They are:
|Attribute|Meaning|
|--|--|
|`height`|The height of the visual's viewport.|
|`width`|The width of the visual's viewport.|
|`scale`|This attribute will only appear on updates that have a `type` of `36`. It does not appear to be related to the amount of the resize, the ratio of width to height, or to the proportion of the report area it takes up.|

[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)
