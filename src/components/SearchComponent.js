import React, {Component} from 'react';

const initialState = {
      showcountryComponent: false,
      showcontinentComponent: false,
      showflagComponent:false,
      selectedcontinent: "",
      selectedcountry: []
    };

class Search extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
      showcountryComponent: false,
      showcontinentComponent: true,
      showflagComponent:false,
      selectedcontinent: "",
      selectedcountry: []
    };

    }
    
    render(){
      return (
          <div>
            {this.state.showcontinentComponent ?
              <RenderContinent flags = {this.props.flags} onchangecontinent={this.onchangecontinent.bind(this)}
               onkeypress={this.onkeypress.bind(this)}/>:null}
            {this.state.showcountryComponent ?
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
        var concatarray = this.state.selectedcountry.concat(value);
        this.setState({showflagComponent:true,
            selectedcountry:concatarray});
    }
    onclearflag(){
                this.setState({showcountryComponent: false,
      showcontinentComponent: false,
      showflagComponent:false,
      selectedcontinent: "",
      selectedcountry: []},() => this.setState({showcontinentComponent: true}));
    }
    onkeypress(){
        console.log("i am on onkeypress");
    }
}
function RenderContinent(props)
{
    const continent = props.flags.map((flag,index)=>{return(
        <option value={flag.continent} key={index}/>
    )})
    return(
        <div class="continent">
        <h1>Step1</h1>
        <p>Select a continent</p>
        <input class="inputclass" type="text" name="continent" list="continentname" onChange={(event)=>props.onchangecontinent(event.target.value)} onKeyPress={(event)=>props.onkeypress(event.target.value)}/>
        <datalist id="continentname">
        {continent}
        </datalist>
        </div>
    );
    
}
function RenderCountry(props)
{
   const flag = props.flags.filter((flag) => flag.continent === props.selectedcontinent.value)
    if(flag[0]){
   const countries = flag[0].countries.map((country,index)=>{return(
        <label><input class="check" type = "checkbox" key={index} name={country.name} onClick={(event)=>props.onchangecountry(event.target.name)}/>{country.name}<br/></label>
    )})
    return(
            <div class="country">
            <h1>Step2</h1>
            <p>Now, Select a Country</p>
            {countries}
            </div>
    );
}
}
function RenderFlag(props)
{
   console.log(props);
   const flag = props.flags.filter((flag) => flag.continent === props.selectedcontinent.value)  
   const countryflag = props.selectedcountry.map((selectedcountry)=>{
   const country = flag[0].countries.filter((country) => country.name === selectedcountry)
    return(
            <div>
            {country[0].flag}
            </div>
    )})
   return(
       <div class="flag">
       {countryflag}
       <button onClick = {()=>props.onclearflag()}>Clear Flag</button>
       </div>
   );
    
}

export default Search;