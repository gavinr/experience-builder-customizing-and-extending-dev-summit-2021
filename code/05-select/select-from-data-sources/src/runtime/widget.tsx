/** @jsx jsx */
import { React, AllWidgetProps, jsx, FormattedMessage, DataSourceManager,
  dataSourceUtils,
  QueriableDataSource } from 'jimu-core';
import { IMConfig } from '../config';
import defaultMessages from './translations/default'
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import { MapDataSourceImpl } from "jimu-arcgis/lib/data-sources";
import {Radio, Label } from 'jimu-ui'

interface IState {
  jimuMapView: JimuMapView;
  policyType: PolicyType;
  where_clause: string;
}
enum PolicyType {
  Auto = 'Auto',
  HO3 = 'HO-3',
  HO4 = 'HO-4'
  
  }

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, IState> {
  
  
  constructor (props) {
    super(props)

    this.state = {
      jimuMapView: null,
      policyType: PolicyType.Auto,
      where_clause: "Policy_Type = 'Auto'",
    }
  }

  getFilter = (policyType: PolicyType): string => {
    let queryAttribute = ""; 
    if (policyType ==PolicyType.Auto) {
      queryAttribute = "Policy_Type = 'Auto'";
    }
    if (policyType ==PolicyType.HO3) {
      queryAttribute = "Policy_Type = 'HO-3'";
   }
     if (policyType ==PolicyType.HO4) {
       queryAttribute = "Policy_Type = 'HO-4'";  
     }
     this.setState({
      where_clause: queryAttribute
     
    }, () => {
      this.updateLayer()
      }) 
      return
  }

  updateLayer = () =>{ 
    const query =  this.state.where_clause;
  
    const layer = (this.state.jimuMapView.view.map.layers as any)?.items[0];

    if(layer){
      layer.definitionExpression = query; 
      const dsManager = DataSourceManager.getInstance();
      const mapDs = dsManager.getDataSource(this.state.jimuMapView.datasourceId) as MapDataSourceImpl;
      const layerDs = mapDs.getDataSourceByLayer(layer.id.toString(), dataSourceUtils.getUrlByLayer(layer), layer.id)
      if(layerDs){
        (layerDs as QueriableDataSource).updateQueryParams?.({where:query} as any, this.props.id);
      }
     }  

  }

  onRadioButtonChange = (e) => {
    const policyType = e.target.value
    this.setState({
      policyType: policyType
    },  () => {
      this.getFilter(this.state.policyType);
      })


  }
  activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      this.setState({
        jimuMapView: jmv
      }, () => {
        this.getFilter(this.state.policyType);
       })
  
    }

  };

  render() {
    return (
      <div className="widget-demo jimu-widget m-2">
   
        {this.props.hasOwnProperty("useMapWidgetIds") &&
          this.props.useMapWidgetIds &&
          this.props.useMapWidgetIds.length === 1 && (
            <JimuMapViewComponent
              useMapWidgetIds={this.props.useMapWidgetIds}
              onActiveViewChange={this.activeViewChangeHandler}
            />
          )
        }
        <div>
        <b>{this.props.intl.formatMessage({id: 'selectPolicy', defaultMessage: defaultMessages['selectPolicy']})}</b><br/>
        <Label style={{cursor: 'pointer'}}>
        <Radio 
              style={{ cursor: 'pointer' }} value ={PolicyType.Auto} checked={this.state.policyType === PolicyType.Auto} onChange={this.onRadioButtonChange}
              /> {this.props.intl.formatMessage({id: 'typeAuto', defaultMessage: defaultMessages['typeAuto']})}</Label>
      {' '}
      <Label style={{cursor: 'pointer'}}>
      <Radio 
        style={{ cursor: 'pointer' }} value ={PolicyType.HO3} checked={this.state.policyType === PolicyType.HO3} onChange={this.onRadioButtonChange}
       /> {this.props.intl.formatMessage({id: 'typeHO3', defaultMessage: defaultMessages['typeHO3']})}</Label>
      {' '}
      <Label style={{cursor: 'pointer'}}>  
      <Radio 
        style={{ cursor: 'pointer' }}  value={PolicyType.HO4} checked={this.state.policyType === PolicyType.HO4} onChange={this.onRadioButtonChange}
       /> {this.props.intl.formatMessage({id: 'typeHO4', defaultMessage: defaultMessages['typeHO4']})}</Label>
      <p/>
      </div>  

      </div>
    );
  }
}
