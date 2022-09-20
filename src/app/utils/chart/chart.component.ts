import {
  Component,
  Inject,
  NgZone,
  PLATFORM_ID,
  OnInit,
  Input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { familyData } from 'src/app/constants/family/family.constant';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  private chart: am4charts.XYChart = {} as am4charts.XYChart;

  @Input() chartData: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone
  ) {}

  ngOnInit(): void {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      /* Chart code */
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      let chart = am4core.create(
        'chartdiv',
        am4plugins_forceDirected.ForceDirectedTree
      );
      let networkSeries = chart.series.push(
        new am4plugins_forceDirected.ForceDirectedSeries()
      );

      chart.data = this.chartData;

      networkSeries.dataFields.value = 'value';
      networkSeries.dataFields.name = 'name';
      networkSeries.dataFields.children = 'children';
      networkSeries.nodes.template.tooltipText = '{name}:{relation}';
      networkSeries.nodes.template.fillOpacity = 1;

      networkSeries.nodes.template.label.text = '{name}';
      networkSeries.fontSize = 10;

      networkSeries.links.template.strokeWidth = 1;

      let hoverState = networkSeries.links.template.states.create('hover');
      hoverState.properties.strokeWidth = 3;
      hoverState.properties.strokeOpacity = 1;

      networkSeries.nodes.template.events.on('over', function (event) {
        event.target.dataItem.childLinks.each(function (link) {
          link.isHover = true;
        });
        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = true;
        }
      });

      networkSeries.nodes.template.events.on('out', function (event) {
        event.target.dataItem.childLinks.each(function (link) {
          link.isHover = false;
        });
        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = false;
        }
      });
    });
  }

}
