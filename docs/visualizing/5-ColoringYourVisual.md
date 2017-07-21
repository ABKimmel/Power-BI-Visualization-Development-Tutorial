[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._

# Coloring Your Visual
---
We are going to start coloring our visual by modifying our `PieSlice` data interface to add a property for color.

```typescript
export interface PieSlice {
    category: string | number,
    measure: number,
    color: string
}
```

This will allow us to specify a color when we create the `PieSlice` that will stick with the object. Next, we need to change the `fill` property of the path to reflect the value in our `PieSlice`.

```typescript

...

let path = this.chartContainer.selectAll('path')
    .data(angles(<any>data.slices))
    .enter()
    .append('path')
    .attr('d', <any>arc)
    .attr('fill', function(d) { return (d.data as any).color });

...

```
Next, we need to extract the `colorPalette` from the constructor options. Start by adding a field for it.

```typescript
export class Visual implements IVisual {
    private colorPalette: IColorPalette;

    ...

}
```

Then extract it from the constructor options:

```typescript
constructor(options: VisualConstructorOptions) {

    ...

    this.colorPalette = options.host.colorPalette;
}
```

Finally, we will use the colorPalette to add colors to our visuals.

```typescript
private dataExtraction(dataView: DataView): Pie {

    ...

    for (let i = 0; i < categoryValues.length; i++) {

        ...

        let color = this.colorPalette.getColor(category as string).value;

        let pieSlice = {
            category,
            measure,
            color
        }

        ...

    }

    ...

}
```

The `IColorPalette` has a single method, `getColor()` that takes a `string` value. `IColorPalette` uses that string as a key. If it doesn't have a record associated with that key, it creates a new record and assigns it a color. If it does have a record for the at key, it will pass out the previously assigned color, helping you maintain visual consistency. If you change the category data set, either by updating its values or changing the data field source, `IColorPalette` will restart the color assignment. The results of `getColor()` come back as an object with a single property, `value`, so don't forget to extract the actual value of the object.

Once you've done all that you should end up with pie chart that looks something like this.

![A colorful pie chart.](/img/ColoredPieChart.png).

Obviously, our visual is very simple and is missing a lot of features you would want to put on a visual you are giving to users, but we've covered all the basics at this point. If you are interested in learning about adding user-controlled settings or tooltips to your visualization as well as other advanced topics, feel free to proceed to the advanced section.

---
## **[Continue to the advanced topics](../advanced/1-AdvancedTopics.md)**
---

[![DMI Logo](/img/DMI_Logo.png)](https://dminc.com/)

_If you are interested in engaging the services of DMI, please contact me at [bkimmel@dminc.com](mailto:bkimmel@dminc.com)._
