#Accessing Your Data
---
Now that we have completed our `capabilities.json`, we need to figure out how to access our data inside of `visual.ts`. This is a process we will break down into two steps: Extracting Data and Defining Data Models. But before we get to that, let's take a quick look at the things you must implement in your `visual.ts`.

##`visual.ts`
Your `visual.ts` or equivalent file must contain a class that implements the [IVisual](https://github.com/Microsoft/PowerBI-visuals/blob/master/Visual/IVisualApi.md) interface. The name of this class is up to you, though it must be reflected in the `visualClassName` property of `pbiviz.json`.

The only method you are strictly required to implement is the `update` method. This will be called anytime the data in your visual is changed, or the visual is resized or moved. If you look at your visualization in its stock form, it will have a counter that updates whenever `update` is called. All of our Pi chart's rendering will be done in `update` or in helper methods, and you should follow that guideline as well. The other place you may want to add rendering code is in the constructor if you have one-time setup operations.

##Defining Data Model
The first step to accessing your data is to extract the `DataView` from the `VisualUpdateOptions` that `update` is passed. 

##Extracting Data
If you look at the
