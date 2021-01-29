/** @jsx jsx */
import { React, AllWidgetProps, jsx, FormattedMessage } from 'jimu-core';
import { IMConfig } from '../config';
import defaultMessages from './translations/default'
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, any> {
  state = {
    jimuMapView: null
  };

  activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      this.setState({
        jimuMapView: jmv
      });

    }
  };

  onSelectChangeHandler = (evt: any) => {
    console.log('evt', evt.target.value);
  }

  render() {
    return (
      <div className="widget-demo jimu-widget m-2">
        <p>
          <FormattedMessage id="pleaseSelect" defaultMessage={defaultMessages.pleaseSelect} />:
          <select onChange={this.onSelectChangeHandler}>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
          </select>
        </p>


        {this.props.hasOwnProperty("useMapWidgetIds") &&
          this.props.useMapWidgetIds &&
          this.props.useMapWidgetIds.length === 1 && (
            <JimuMapViewComponent
              useMapWidgetIds={this.props.useMapWidgetIds}
              onActiveViewChange={this.activeViewChangeHandler}
            />
          )
        }
      </div>
    );
  }
}