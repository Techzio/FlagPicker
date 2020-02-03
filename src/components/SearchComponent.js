import React, {Component} from 'react';

const initialState = {
      showcountryComponent: false,
      showcontinentComponent: false,
      showflagComponent:false,
      selectedcontinent: "",
      selectedcountry: ""
    };

class Search extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
      showcountryComponent: false,
      showcontinentComponent: true,
      showflagComponent:false,
      selectedcontinent: "",
      selectedcountry: ""
    };

    }
    
    render(){
      return (
          <div>
            {this.state.showcontinentComponent ?
              <RenderContinent flags = {this.props.flags} onchangecontinent={this.onchangecontinent.bind(this)}/>:null}
            {this.state.selectedcontinent ?
                    <RenderCountry flags = {this.props.flags} selectedcontinent = {this.state.selectedcontinent}
                    onchangecountry={this.onchangecountry.bind(this)}
                   /> :
                    null
            }
            {this.state.showflagComponent ?
            <RenderFlag  flags = {this.props.flags} selectedcountry = {this.state.selectedcountry}
            selectedcontinent = {this.state.selectedcontinent}
            onclearflag={this.onclearflag.bind(this)}/> : null
            }
          </div>
      );
    }
    
    onchangecontinent(value){
        this.setState({showcountryComponent:true,
            selectedcontinent:{value}});
    }
    onchangecountry(value){
        this.setState({showflagComponent:true,
            selectedcountry:{value}});
    }
    onclearflag(){
                this.setState({showcountryComponent: false,
      showcontinentComponent: true,
      showflagComponent:false,
      selectedcontinent: "",
      selectedcountry: ""});
    }
}
function RenderContinent(props)
{
    const continent = props.flags.map((flag,index)=>{return(
        <option value={flag.continent} key={index}/>
    )})
    return(
        <div class="continent">
        <input type="text" name="continent" list="continentname" onChange={(event)=>props.onchangecontinent(event.target.value)}/>
        <datalist id="continentname">
        {continent}
        </datalist>
        </div>
    );
    
}
function RenderCountry(props)
{
   const flag = props.flags.filter((flag) => flag.continent === props.selectedcontinent.value)
   const countries = flag[0].countries.map((country,index)=>{return(
        <option value={country.name} key={index}/>
    )})
    return(
            <div class="country">
            <input type="text" name="country" list="countryname" onChange={(event)=>props.onchangecountry(event.target.value)}/>
            <datalist id="countryname">
            {countries}
            </datalist> 
            </div>
    );
}
function RenderFlag(props)
{
   const flag = props.flags.filter((flag) => flag.continent === props.selectedcontinent.value)
   const country = flag[0].countries.filter((country) => country.name === props.selectedcountry.value)
   console.log(country[0].flag);
    return(
            <div class="flag"> 
            {country[0].flag}
            <button class="center" onClick = {()=>props.onclearflag()}>Clear Flag</button>
            </div>
    );
    
}

export default Search;