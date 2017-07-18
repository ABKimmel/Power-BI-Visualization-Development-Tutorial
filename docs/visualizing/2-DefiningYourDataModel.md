#Defining a Data Model
We want to define a set of objects that will represent our data to our visualization generation code. This allows us to change our data extraction code and our data model as much as we want, without having to re-write our visualization code each time we make a change. To do this, we will define a series of TypeScript interfaces and export them. We can do this in either `visual.ts` or in a new file. Since we don't want to clutter `visual.ts` with type definitions, we will make a new file `datainterfaces.ts`. Since we added a new `.ts` file, don't forget that we have to add it to `tsconfig.json`.

Start by adding the license and the module definition to `dataInterfaces.ts`:

```typescript
/*License*/
module powerbi.extensibility.visual {

}
```

Next, we will add an interface to describe a single category:

```typescript
/*License*/
module powerbi.extensibility.visual {

    export interface PieSlice {
        category: string | number,
        measure: number
    }

}
```

And finally, an interface to describe the entire data set:

```typescript
/*License*/
module powerbi.extensibility.visual {

    ...

    export interface Pi {
        slices: PieSlice[],
        sumOfMeasures: number
    }
}
```

Now that we've defined our data model, you might be worrying about importing the types from `dataInterfaces.ts` into `visual.ts`, but there is no need to worry. At compile time, the TypeScript compiler will concatenate all of the files listed under `tsconfig.json`, so there is no need to import any of the types. Now let's fill in our data model.

---
##**[Continue to the next section, Filling Your Data Model](/docs/visualizing/3-FillingYOurDataModel)**
---
