[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._

#Anatomy of a `DataView`
---
A `DataView` object has five or six properties:
|Property|Value|
|--|--|
|`metadata`|Contains information about the data fields that have been assigned to the data roles of your visual.|
|`categorical`|Contains the data specified in the `categorical` data mapping you defined in `capabilities.json`|
|`matrix`|Contains the data you specified in the `matrix` data mapping you defined in `capabilities.json`|
|`single`|Contains the data you specified in the `single` data mapping you defined in `capabilities.json`. Will only appear if it was defined in `capabilities.json`.|
|`table`|Contains the data you specified in the `table` data mapping you defined in `capabilities.json`|
|`tree`|Contains a tree representation of the data you are receiveing.|

##`metadata`
`metadata` contains a single object, `columns` that contains an object for each unique field that has been passed to your visual. Each column object has the following properties:
|Property|Value|
|--|--|
|`roles`|This is an object that will have properties that have the internal names of the data roles to which this data field is assigned and the value of `true`. For example: `"mymeasure":true`.|
|`type`|This is an object that contains properties with names of types, and Boolean values of whether the data field conforms to that type. It also contains some functions for comparing that data field to other objects.|
|`format`|A deprecated property. The functionality has been moved to settings objects.|
|`displayName`|The display name of the data field in question. Always a string.|
|`queryName`| This is the query used to get the field. Always a string. Typically either `DataSet.FieldName` or `AGGREGATE(DataSet.FieldName)`.|
|`expr`|An object representing the SQExpr that is represented by this column.|
|`index`|The position of the column in the query to the data model. Integer.|
|`isMeasure`|Whether this column is a measure or not. Boolean.|
|`aggregates`|An object containing the aggregates computed for the column. This attribute will only appear on measures of numeric type. In general, this will have two attributes: `minLocal` and `maxLocal`, which will have the min and max values of the column, respectively.|
|`sort`|The direction of the sort applied on this column. Integer. `1` is ascending, `2` is descending. Only appears on grouping objects.|
|`sortOrder`|The index of this column in the sort order. The lower the index, the earlier in the sequence the sort is applied. Integer. Only appears on grouping objects.|
|`identityExprs`|An object containing the SQExpr expressions that define the identity of this column. Only appears on grouping columns.|

There may be additional properties, depending on your configuration of `capabilities.json` and the data fields assigned. There is limited information on these attributes in `.api/PowerBI-visuals.d.ts`.

##`categorical`
`categorical` is the object that contains the data in the representation you defined in the `categorical` section of `dataViewMappings` in `capabilities.json`.  There are two sub-objects: `categories` and `values`.

###`categories`
This is the data from the data roles you assigned in the `categories` section of the `categorical` definition. It is an array of objects that each represent a unique data field that has been assigned to those data roles. For example, say you had defined two grouping data roles, `mygrouping1` and `mygrouping2`, but the user had assigned the same data field, `datafield1`, to both roles. In this case, there would only be one object in the `categories` array. But if the user then assigns `datafield2` to `mygrouping2`, there would be two objects in the `categories` array, one for each unique data field assigned.

Each object in the `categories` array has the following properties:

|Property|Value|
|--|--|
|`source`|An object containing metadata information about the column in question.|
|`values`|An array of the values of this column.|
|`identity`|An array containing the identities of each of the values.|
|`identityFields`|An array containing the SQExprs that identify this category.|

####`source`
`source` contains the metadata information describing the column in question. Basically the same as the column metadata defined above in `metadata`.
|Property|Value|
|--|--|
|`roles`|This is an object that will have properties that have the internal names of the data roles to which this data field is assigned and the value of `true`. For example: `"mygrouping":true`. If this data field has been assigned to multiple data roles, each data role will appear in this section.|
|`type`|This is an object that contains properties with names of types, and boolean values of whether or not the data field conforms to that type. It also contains some functions for comparing that data field to other objects.|
|`format`|A deprecated property. The functionality has been moved to settings objects.|
|`displayName`|The display name of the data field in question. Always a string.|
|`queryName`| This is the query used to get the field. Always a string. Typically `DataSet.FieldName`.|
|`expr`|An object representing the SQExpr that is represented by this column.|
|`index`|The position of the column in the query to the data model. Integer.|
|`sort`|The direction of the sort applied on this column. Integer. `1` is ascending, `2` is descending. Only appears on grouping objects.|
|`sortOrder`|The index of this column in the sort order. The lower the index, the earlier in the sequence the sort is applied. Integer. Only appears on grouping objects.|
|`identityExprs`|An object containing the SQExpr expressions that define the identity of this column. Only appears on grouping columns.|

###`values`
`values` contains the data from the data roles you assigned in the `values` section of the `categorical` definition. It is an array of objects that each represent a unique data field that has been assigned to those data roles. It behaves the same as `categories` when the user assigns the same data field to multiple data roles.

Each object in the `values` array has the following properties:

|Property|Value|
|--|--|
|`source`|An object containing metadata information about the column in question.|
|`values`|An array of the values of this column.|
|`aggregate`|Each aggregate on the column will have a property of the aggregate name and the value of the result. For example the `minLocal` aggregate might add the property `"minLocal": 0` to the object.|

####`source`
`source` contains the metadata information describing the column in question. Basically the same as the column metadata defined above in `metadata`.
|Property|Value|
|--|--|
|`roles`|This is an object that will have properties that have the internal names of the data roles to which this data field is assigned and the value of `true`. For example: `"mymeasure":true`. If this data field has been assigned to multiple data roles, each data role will appear in this section.|
|`type`|This is an object that contains properties with names of types, and boolean values of whether or not the data field conforms to that type. It also contains some functions for comparing that data field to other objects.|
|`format`|A deprecated property. The functionality has been moved to settings objects.|
|`displayName`|The display name of the data field in question. Always a string.|
|`queryName`| This is the query used to get the field. Always a string. Typically `DataSet.FieldName`.|
|`expr`|An object representing the SQExpr that is represented by this column.|
|`index`|The position of the column in the query to the data model. Integer.|
|`isMeasure`|Whether this column is a measure or not. Boolean.|
|`aggregates`|An object containing the aggregates computed for the column. This attribute will only appear on measures of numeric type. In general, this will have two attributes: `minLocal` and `maxLocal`, which will have the min and max values of the column, respectively.|

**Others to come**

[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._
