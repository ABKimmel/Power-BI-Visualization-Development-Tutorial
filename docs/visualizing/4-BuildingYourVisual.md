



# Building Your Visual
---
Now that we have a well-defined data model, we need to take it into `update()` and build a visualization with it.
```typescript
public update(options: VisualUpdateOptions) {
    let pie: Pie;
    if (options.dataViews.length > 0) {
        pie = this.dataExtraction(options.dataViews[0]);
    } else {
        return;
    }
}
```

Next, let's create a separate function for creating our pie chart.

```typescript
public update(options: VisualUpdateOptions) {

    ...

    this.generateVisual(pie, options.viewport);
}

private generateVisual(data: Pie, viewport: IViewport) {
//TODO: Generate a visual
}
```

Now we'll add the code to generate our pie chart. This section is adapted from [this tutorial](http://zeroviscosity.com/d3-js-step-by-step/step-1-a-basic-pie-chart).

Start by adding some fields to our `Visual` class:

```typescript
export class Visual implements IVisual {
    private svg: d3.Selection<SVGElement>;
    private chartContainer: d3.Selection<SVGElement>;

    ...

}
```

Then we need to initialize our container elements in our constructor.
```typescript
constructor(options: VisualConstructorOptions) {
    this.svg = d3.select(options.element).append('svg');
    this.chartContainer = this.svg.append('g');
}
```

Finally, we will add the code for generating our pie chart.
```typescript
private generateVisual(data: Pie, viewport: IViewport) {
    //making pie chart full size of visual viewport
    let width = viewport.width;
    let height = viewport.height;
    let radius = Math.min(width, height) / 2;

    //defining the vector element and centering the chart
    this.svg.attr('width', width)
        .attr('height', height);
    this.chartContainer.attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    //defining the circle
    let arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(radius);

    //trying casting to any to fix compilation error
    let angles = d3.layout.pie()
        .value(<any>function(d) { return d.measure })
        .sort(null);

    //removing the old pie chart slices
    this.chartContainer.selectAll("*").remove();

    //adding the new slices
    let path = this.chartContainer.selectAll('path')
        .data(angles(<any>data.slices))
        .enter()
        .append('path')
        .attr('d', <any>arc)
        .attr('fill', 'gray');
}
```

![A very gray Pie chart.](/img/UncoloredPieChart.png)

As you can see, we've got ourselves a very gray pie chart. That's not very helpful, now, is it? In the next section, we'll cover adding theme colors to your visual.

---
## **[Continue to the next section, Coloring Your Visual](../visualizing/5-ColoringYourVisual.md)**
---




