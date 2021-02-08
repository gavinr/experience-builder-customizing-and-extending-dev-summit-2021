/** @jsx jsx */
import { React, AllWidgetProps, jsx, FormattedMessage } from 'jimu-core';
import { IMConfig } from '../config';
import defaultMessages from './translations/default'
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";

interface IState {
  jimuMapView: JimuMapView;
}

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, IState> {
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

  render() {
    return (
      <div className="widget-demo jimu-widget m-2">
        <p><FormattedMessage id="pleaseSelect" defaultMessage={defaultMessages.pleaseSelect} /></p>

        <p>{this.state.jimuMapView && this.state.jimuMapView.view.map.layers.map(x => x.id)}</p>

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