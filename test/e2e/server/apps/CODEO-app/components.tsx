import * as React from "react";
//import * as _ from "lodash";
const _ = require("lodash");
import { SearchkitComponent } from "../../../../../src";

export const MovieHitsListItem = (props) => {
  const {bemBlocks, result} = props;
  const source = result._source;
  const highlight = result.hasOwnProperty("highlight")?result.highlight:{};

  const txtementa = highlight.txtementa? highlight.txtementa:source.txtementa;
  // const txtacordao = highlight.txtacordao? highlight.txtacordao:source.txtacordao;
  // const txtrelatorio = highlight.txtrelatorio? highlight.txtrelatorio:source.txtrelatorio;
  // const competencia = highlight.competencia? highlight.competencia:source.competencia;
  const textoconclusao = highlight.textoconclusao? highlight.textoconclusao:source.textoconclusao;

  const relator = source.desrelator?source.desrelator:"Não Informado"; 

  let hrefProcesso = "http://www.tjse.jus.br/tjnet/consultas/internet/respnumprocesso.wsp?TMP_NPRO="+ source.nroprocesso;
  let hrefEmenta_sem_formatacao = "http://www.tjse.jus.br/tjnet/jurisprudencia/ementasemformatacao.wsp?tmp_numprocesso=" + source.nroprocesso +"&tmp_numacordao=" + source.nroacordao;
  let hreftexto_na_integra = "http://www.tjse.jus.br/tjnet/jurisprudencia/relatorio.wsp?tmp_numprocesso="+source.nroprocesso+"&tmp_numacordao="+source.nroacordao;
  
  //const ementa = highlight(txtementa,what,'highlight');

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("details")}>

        <div className="container_flex">
          <div className="Grid-cell">
            <span className="sk-panel__header">Nº do processo: </span>
            <a target="_blank" href={hrefProcesso} className={bemBlocks.item("link")} >
              {source.nroprocesso}
            </a>
          </div>
          <div className="Grid-cell">
            <span className="sk-panel__header">Órgão Julgador: </span>{source.orgaojulgador}
          </div>
          <div className="Grid-cell">
            <span className="sk-panel__header">Classe: </span>{source.descrecurso}
          </div>
        </div>

        <p/>
        <div className="container_flex">
          <div className="Grid-cell">
            <span className="sk-panel__header">Relator: </span>{relator}
          </div>
          <div className="Grid-cell">
            <span className="sk-panel__header">Julgamento: </span>{source.data_formatada.replace(/(\d{4})-(\d{2})-(\d{2})/,'$3/$2/$1')}
          </div>
        </div>

        <p/>
        <div>
          <span className="sk-panel__header">Ementa: </span>
          <div className={bemBlocks.item("text")} dangerouslySetInnerHTML={{__html:txtementa.replace(/(<([^>]+)>)/ig,"")}}></div>
        </div>

        <p/>
        <div>
          <a target="_blank" href={hrefEmenta_sem_formatacao} className={bemBlocks.item("link")} >
            Ementa sem Formatação
          </a>
        </div>
        
        <p/>
        <div>
          <a target="_blank" href={hreftexto_na_integra} className={bemBlocks.item("link")} >
            Texto na Íntegra
          </a>
        </div>
        
      </div>
    </div>
  )
}

function highlight(text,what,spanClass) {
  var content = text,
      pattern = new RegExp('(>[^<.]*)(' + what + ')([^<.]*)','g'),
      replaceWith = '$1<span ' + ( spanClass ? 'class="' + spanClass + '"' : '' ) + '">$2</span>$3',
      highlighted = content.replace(pattern,replaceWith);
  return highlighted
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