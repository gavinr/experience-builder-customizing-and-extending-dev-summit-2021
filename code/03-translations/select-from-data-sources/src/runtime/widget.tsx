/** @jsx jsx */
import { React, AllWidgetProps, jsx, FormattedMessage } from 'jimu-core';
import { IMConfig } from '../config';
import defaultMessages from './translations/default'

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="widget-demo jimu-widget m-2">
        <p><FormattedMessage id="pleaseSelect" defaultMessage={defaultMessages.pleaseSelect} /></p>
      </div>
    );
  }
}
