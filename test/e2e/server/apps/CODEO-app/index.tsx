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
  ActionBar, ActionBarRow
} from "../../../../../src"

import {MovieHitsListItem, SearchTerm} from "./components";

//import "./../searchkit/theming/theme.scss";
import "./style/main.scss";
import "./style/midea_queries.scss";

class App extends React.Component<any, any> {

  searchkit:SearchkitManager

  constructor(props) {
    super(props)
    // host
    const host = "http://localhost:9250";

    // indexes
    const indexes = ["jurisprudencia_acordao-*", "jurisprudencia_decmono-*"];

    // Manager
    this.searchkit = new SearchkitManager(host+"/"+indexes.join(","),{
      searchOnLoad:false
    });

    // Add queries in post for snippet and highlight
    this.searchkit.setQueryProcessor((plainQueryObject)=>{
      // script for return snippet of field
      // plainQueryObject.script_fields = {
      //   "content": {
      //     "script": "_fields['content'].value.replaceAll(/\n|\t/,'').substring(0,300)"
      //   }
      // };

      // highlight with snippet size
      plainQueryObject.highlight = {
        "number_of_fragments" : 1,
        "fragment_size" : 300,
        "fields": {
          "txtementa": {},
          "txtacordao": {},
          "txtrelatorio": {},
          "competencia": {},
          "textoconclusao":{}
        }
      };
      
      return plainQueryObject
    })
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
	            queryFields={["_all","txtementa","txtrelatorio","txtacordao","competencia","textoconclusao"]}
              blurAction="none"
              queryOptions={{default_operator:"and"}}
	          />
          </TopBar>
          <div className="my-tabs"></div>
          <LayoutBody>
            <SideBar>
              <h3>Filter Results</h3>
               <RefinementListFilter title="Repository" id="type" field="_type" size={10} operator="OR" />
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
                itemComponent={MovieHitsListItem}
              />  
  	          <NoHits />

  	      		<Pagination showNumbers={true} pageScope={3}/>
  	      	</LayoutResults>
        	</LayoutBody>
          <div className="footer">
            <h5>Developed by <a href="http://www.e-storageonline.com.br" target="_blank">E-STORAGE</a></h5>
          </div>
    	</Layout>
		</SearchkitProvider>
	)}
}

ReactDOM.render(<App/>, document.getElementById("root"))