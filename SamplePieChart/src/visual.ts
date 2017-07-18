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
        private colorPalette: IColorPalette;
        private host: IVisualHost;
        private selectionManager: ISelectionManager;
        private pie: Pie;
        private opacity: number = 100;

        private static CategoryColorsPropertyIdentifiers: DataViewObjectPropertyIdentifier = {
            objectName: "categoryColors",
            propertyName: "fill"
        }
        private static ChartOpacityPropertyIdentifiers: DataViewObjectPropertyIdentifier = {
            objectName: "chartOpacity",
            propertyName: "opacity"
        }

        constructor(options: VisualConstructorOptions) {
            this.svg = d3.select(options.element).append('svg');
            this.chartContainer = this.svg.append('g');
            this.host = options.host;
            this.colorPalette = this.host.colorPalette;
            this.selectionManager = this.host.createSelectionManager();
        }

        public update(options: VisualUpdateOptions): void {
            if (options.dataViews.length > 0) {
                this.pie = this.dataExtraction(options.dataViews[0]);
                this.updateSettings(options.dataViews[0]);
            } else {
                return;
            }
            this.generateVisual(this.pie, options.viewport);
        }

        private updateSettings(dataView: DataView): void {
            let metadata = dataView.metadata;
            let metadataObjects = metadata.objects;

            if (metadataObjects) {
                let chartOpacity = metadataObjects[Visual.ChartOpacityPropertyIdentifiers.objectName];
                this.opacity = chartOpacity[Visual.ChartOpacityPropertyIdentifiers.propertyName] as number;
            }

            let categories = dataView.categorical.categories;
            let categoryObjects = categories[0].objects;

            if (categoryObjects) {
                for (let i = 0; i < categoryObjects.length; i++) {
                    if (categoryObjects[i]) {
                        let chartColorObject = categoryObjects[i][Visual.CategoryColorsPropertyIdentifiers.objectName];
                        let chartColorProperty = chartColorObject[Visual.CategoryColorsPropertyIdentifiers.propertyName];
                        let color = (chartColorProperty as any).solid.color;
                        this.pie.slices[i].color = color;
                    }
                }
            }
        }

        private generateVisual(data: Pie, viewport: IViewport): void {
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
            let selectionManager = this.selectionManager;

            //adding the new slices
            let path = this.chartContainer.selectAll('path')
                .data(angles(<any>data.slices))
                .enter()
                .append('path')
                .attr('d', <any>arc)
                .attr('fill', function(d) { return (d.data as any).color })
                .on('click', function(d) {
                    selectionManager.select((d.data as any).selectionID);
                    d3.select(this).attr("fill", "#F0F0F0");
                });

            this.chartContainer.attr("opacity", this.opacity / 100);
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
                let color = this.colorPalette.getColor(category as string).value;
                sumOfMeasures += measure;

                let pieSlice = {
                    category,
                    measure,
                    color,
                    selectionID: this.host.createSelectionIdBuilder()
                        .withCategory(categoryColumn, i)
                        .createSelectionId()
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
            let instanceEnumeration: VisualObjectInstanceEnumeration = [];

            if (options.objectName === Visual.ChartOpacityPropertyIdentifiers.objectName) {
                this.enumerateChartOpacity(instanceEnumeration);
            } else if (options.objectName === Visual.CategoryColorsPropertyIdentifiers.objectName) {
                this.enumerateCategoryProperties(instanceEnumeration);
            }
            return instanceEnumeration;
        }

        private enumerateCategoryProperties(instanceEnumeration: VisualObjectInstance[]): void {
            let slices = this.pie.slices;
            if (!slices || slices.length < 1) {
                return;
            }

            slices.forEach((slice: PieSlice) => {
                let selectionID: ISelectionId = slice.selectionID;
                let displayName: string = "" + slice.category;

                instanceEnumeration.push({
                    displayName,
                    objectName: Visual.CategoryColorsPropertyIdentifiers.objectName,
                    selector: (selectionID as powerbi.visuals.ISelectionId).getSelector(),
                    properties: {
                        fill: {
                            solid: {
                                color: slice.color
                            }
                        }
                    }

                })

            })
        }

        private enumerateChartOpacity(instanceEnumeration: VisualObjectInstance[]): void {
            instanceEnumeration.push({
                displayName: "Opacity",
                objectName: Visual.ChartOpacityPropertyIdentifiers.objectName,
                selector: null,
                properties: {
                    opacity: {
                        numeric: this.opacity
                    }
                },
                validValues: {
                    opacity: {
                        numberRange: {
                            min: 10,
                            max: 100
                        }
                    }
                }
            })
        }

    }
}
