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
        private target: HTMLElement;
        private updateCount: number;
        private columnIndices: {};

        constructor(options: VisualConstructorOptions) {
            this.target = options.element;
            this.updateCount = 0;
            this.columnIndices = [];
            for (let i = 1; i < 5; i++) {
                let name = "c" + i;
                this.columnIndices[name] = 0;
            }
        }

        public update(options: VisualUpdateOptions) {
            this.findColumns(options.dataViews[0].metadata.columns);
            let rows = options.dataViews[0].table.rows;

            let table = "<table> <thead>";
            table += "<tr> <th>Column One</th> <th>Column Two</th> <th>Column Three</th> <th>Column Four</th> </tr>";
            table += "</thead> <tbody>";
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                table += this.makeRowHTML(row, this.columnIndices["c1"], this.columnIndices["c2"], this.columnIndices["c3"], this.columnIndices["c4"]);
            }
            table += "</tbody> </table>";
            this.target.innerHTML = table;
        }

        private makeRowHTML(row: any[], c1Index: number, c2Index: number, c3Index: number, c4Index: number): string {
            return `<tr><td>${(row[c1Index])}</td> <td>${(row[c2Index])}</td> <td>${(row[c3Index])}</td> <td>${(row[c4Index])}</td></tr>`
        }

        private findColumns(columns: DataViewMetadataColumn[]) {
            //iterate over defined column names
            for (let name in this.columnIndices) {
                //now iterate over available columns, note that not all columns may be assigned a data field yet
                for (let j = 0; j < columns.length; j++) {
                    //defining the role attribute of the current column, more info in the data view appendix
                    let columnRoles = columns[j].roles;
                    //column name is the property name, so looking in there
                    if (Object.keys(columnRoles).indexOf(name) >= 0) {
                        //setting the index of the column name to the index of the role
                        this.columnIndices[name] = j;
                        break;
                    }
                }
            }
        }

    }
}
