/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {

    "use strict";
    export class Visual implements IVisual {
        private svg: d3.Selection<SVGElement>;
        private chartContainer: d3.Selection<SVGElement>;
        private settings: VisualSettings;

        constructor(options: VisualConstructorOptions) {
            this.svg = d3.select(options.element).append('svg');
            this.chartContainer = this.svg.append('g');
        }

        public update(options: VisualUpdateOptions) {
            let pie: Pie;
            if (options.dataViews.length > 0) {
                pie = this.dataExtraction(options.dataViews[0]);
            } else {
                return;
            }

            this.generateVisual(pie, options.viewport);
        }

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

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /*
         * This function extracts the data from the given DataView and passes it into the data model defined in
         * dataInterfaces.ts
         */
        private dataExtraction(dataView: DataView): Pie {
            let categoryColumn = dataView.categorical.categories[0];
            let categoryValues = categoryColumn.values;
            let valueColumn = dataView.categorical.values[0];
            let valueValues = valueColumn.values;
            if (categoryValues.length < 1 || valueValues.length !== categoryValues.length) {
                return {
                    slices: [],
                    sumOfMeasures: 0
                };
            }

            let pieSlices = [];
            let sumOfMeasures = 0;
            for (let i = 0; i < categoryValues.length; i++) {
                let category = categoryValues[i].valueOf() as string | number;
                let measure = valueValues[i].valueOf() as number;
                sumOfMeasures += measure;

                let pieSlice = {
                    category,
                    measure
                }
                pieSlices.push(pieSlice);
            }

            return {
                slices: pieSlices,
                sumOfMeasures: sumOfMeasures
            }
        }

        /**
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
         * objects and properties you want to expose to the users in the property pane.
         *
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}
