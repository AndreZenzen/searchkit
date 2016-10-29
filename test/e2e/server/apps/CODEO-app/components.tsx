import * as React from "react";
//import * as _ from "lodash";
const _ = require("lodash");

import { SearchkitComponent } from "../../../../../src";

function highlight(text,what,spanClass) {
  var content = text,
      pattern = new RegExp('(>[^<.]*)(' + what + ')([^<.]*)','g'),
      replaceWith = '$1<span ' + ( spanClass ? 'class="' + spanClass + '"' : '' ) + '">$2</span>$3',
      highlighted = content.replace(pattern,replaceWith);
  return highlighted
}

export const MovieHitsListItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "http://www.imdb.com/title/" + result._source.imdbId
  const source:any = _.extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("poster")}>
        <img data-qa="poster" src={result._source.poster?result._source.poster:"http://placehold.it/160x180?text=No image"}/>
      </div>
      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank"><h2 className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}></h2></a>
        <h3 className={bemBlocks.item("subtitle")}>Released in {source.year}, rated {source.imdbRating}/10</h3>
        <div className={bemBlocks.item("text")} dangerouslySetInnerHTML={{__html:source.plot}}></div>
      </div>
    </div>
  )
}

export class SearchTerm extends SearchkitComponent<any,any> {
    constructor(props) {
      super(props)
    }
    render(){
      const query = this.searchkit.state && this.searchkit.state.q?this.searchkit.state.q:"";
      return (
        <div className="search_term">
            <h2>Results for {query}</h2>
        </div>
      )
    }
}