import * as React from "react";
import * as ReactDOM from "react-dom";
//import * as _ from "lodash";
//const BEMBlock = require("bem-cn");

import {
  SearchBox,
  Hits,
  HitsStats,
  RefinementListFilter,
  Pagination, PaginationSelect,
  ResetFilters,
  MenuFilter,
  SelectedFilters,
  HierarchicalMenuFilter,
  NumericRefinementListFilter,
  SortingSelector,
  SearchkitComponent,
  SearchkitProvider,
  SearchkitManager,
  NoHits,
  RangeFilter,
  InitialLoader,
  ViewSwitcherToggle,
  ViewSwitcherHits,
  Layout, LayoutBody, LayoutResults,
  SideBar, TopBar,
  ActionBar, ActionBarRow,
  DynamicRangeFilter, InputFilter
} from "../../../../../src"

import {MovieHitsListItem, SearchTerm} from "./components";

import "./style/main.scss";
import "./style/midea_queries.scss";

class App extends React.Component<any, any> {

  searchkit:SearchkitManager

  constructor(props) {
    super(props)
    // host
    const host = "http://demo.searchkit.co/api"

    // indexes
    const indexes = ["movies"];

    // Manager
    this.searchkit = new SearchkitManager(host+"/"+indexes.join(","),{
      searchOnLoad:false
    });
  }

  render(){
    return (
      <SearchkitProvider searchkit={this.searchkit}>
        <Layout>
          <TopBar>
            <div className="my-logo"></div>
	          <SearchBox
	            translations={{"searchbox.placeholder":"search"}}
	            autofocus={true}
	            searchOnChange={false}
	            queryFields={["_all"]}
              blurAction="none"
              queryOptions={{default_operator:"and"}}
	          />
          </TopBar>
          <div className="my-tabs"></div>
          <LayoutBody>
            <SideBar>
              <h3>Filter Results</h3>
              <HierarchicalMenuFilter fields={["type.raw", "genres.raw"]} title="Categories" id="categories"/>
              <DynamicRangeFilter field="metaScore" id="metascore" title="Metascore" rangeFormatter={(count)=> count + "*"}/>
              <RangeFilter min={0} max={10} field="imdbRating" id="imdbRating" title="IMDB Rating" showHistogram={true}/>
              <InputFilter id="writers" searchThrottleTime={500} title="Writers" placeholder="Search writers" searchOnChange={true} queryFields={["writers"]} />
              <RefinementListFilter id="actors" title="Actors" field="actors.raw" size={10}/>
              <RefinementListFilter translations={{"facets.view_more":"View more writers"}} id="writers" title="Writers" field="writers.raw" operator="OR" size={10}/>
              <RefinementListFilter id="countries" title="Countries" field="countries.raw" operator="OR" size={10}/>
              <NumericRefinementListFilter id="runtimeMinutes" title="Length" field="runtimeMinutes" options={[
                {title:"All"},
                {title:"up to 20", from:0, to:20},
                {title:"21 to 60", from:21, to:60},
                {title:"60 or more", from:61, to:1000}
              ]}/>
            </SideBar>
  	      	<LayoutResults>
  	          <ActionBar>
                <ActionBarRow>
          			  <HitsStats />
                </ActionBarRow>
  	          </ActionBar>
              <SearchTerm/>
  	          <Hits 
                hitsPerPage={10}
                mod="sk-hits-list"
                sourceFilter={['*']}
                highlightFields={["title","plot"]} 
                itemComponent={MovieHitsListItem}
              />  
  	          <NoHits />

  	      		<Pagination showNumbers={true} pageScope={3}/>
  	      	</LayoutResults>
        	</LayoutBody>
          <div className="footer">
            <h5>Developed by <a href="http://www.searchkit.co" target="_blank">DEVELOP</a></h5>
          </div>
    	</Layout>
		</SearchkitProvider>
	)}
}

ReactDOM.render(<App/>, document.getElementById("root"))