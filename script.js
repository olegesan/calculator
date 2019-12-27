
const operants = ['+','-','/','*']

const Display = ({lastClicked, formula})=>{
    return(
        <div className='display'>
            <div id='formula'>
                {formula}
            </div>
            <div id='display'>
                {lastClicked}
            </div>
        </div>
    )
}

const Buttons = ({handleClick, handleClear, handleEquals, handleFloat, handleZero}) =>{
    return(
        <div className='buttons'>
            <button onClick={handleClear}id='clear'  className='button top-row' value='AC'>
                AC
            </button>
            <button id='sign'  className='button top-row' value='+/-'>
            +/-
            </button>
            <button id='percent'  className='button top-row' value='%'>
                %
            </button>
            <button id='divide' onClick={handleClick} className='button right-col' value='/'>
                /
            </button>
            <button id='seven' onClick={handleClick} className='button main-btns' value='7'>
                7
            </button>
            <button id='eight' onClick={handleClick} className='button main-btns' value='8'>
                8
            </button>
            <button id='nine' onClick={handleClick} className='button main-btns' value='9'>
                9
            </button>
            <button id='multiply' onClick={handleClick} className='button right-col' value='*'>
                X
            </button>
            <button id='four' onClick={handleClick} className='button main-btns' value='4'>
                4
            </button>
            <button id='five' onClick={handleClick} className='button main-btns' value='5'>
                5
            </button>
            <button id='six' onClick={handleClick} className='button main-btns' value='6'>
                6
            </button>
            <button id='subtract' onClick={handleClick} className='button right-col' value='-'>
                -
            </button>
            <button id='one' onClick={handleClick} className='button main-btns' value='1'>
                1
            </button>
            <button id='two' onClick={handleClick} className='button main-btns' value='2'>
                2
            </button>
            <button id='three' onClick={handleClick} className='button main-btns' value='3'>
                3
            </button>
            <button id='add' onClick={handleClick} className='button right-col' value='+'>
                +
            </button>
            <button id='zero' onClick={handleZero} className='button zero main-btns' value='0'>
                0
            </button>
            <button id='decimal' onClick={handleFloat} className='button main-btns' value='.'>
                .
            </button>
            <button id='equals' onClick={handleEquals} className='button right-col' value='='>
                =
            </button>
        </div>
    )
}
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lastClicked:'0',
            formula:'',
            answer:false,
            lastOperants:'',
            brackets:false,

        }
    this.handleClear = this.handleClear.bind(this)
    this.handleClick = this.handleClick.bind(this)
    }
    handleZero = ()=>{
        let lastClicked = this.state.lastClicked
        if(lastClicked!=='0'){
            if(!operants.includes(lastClicked)){
                this.setState(state=>{return {lastClicked:state.lastClicked+='0',formula:state.formula+='0'}})
            }else{
                this.setState(state=>{return {lastClicked:'0',formula:state.formula+='0'}})
            }
        }else if(this.state.formula.length===0){
            this.setState(state=>{return {formula:'0'}})
        }
        else{
        }
    }
    handleClear=()=>{
        this.setState({lastClicked:'0',formula:"", brackets:false})
    }
    handleEquals=()=>{
        let evaluated
        if(this.state.brackets){
            evaluated = eval(this.state.formula+=')')
        }else{
            evaluated = eval(this.state.formula)
        }
        this.setState({lastClicked:`${evaluated}`,formula:`${evaluated}`,answer:true, brackets:false})
    }
    handleFloat=()=>{
        let val = '.'
        let lastClicked = this.state.lastClicked
        if(lastClicked.indexOf('.')===-1){
            if(lastClicked==='0'){
                let formula = this.state.formula.slice(0,this.state.formula.length-1)
                formula+='0.'
                this.setState(state=>{return{lastClicked:'0.', formula}})
            }else if(operants.includes(lastClicked)){
                this.setState((state,props)=>{return{lastClicked:'0.',formula:state.formula+='0.'}})
            }
            else{
                this.setState((state,props)=>{return{lastClicked:state.lastClicked+='.',formula:state.formula+='.'}})
            }
        }
    }
    handleClick=(e)=>{
        let val = e.target.value
        let lastClicked = this.state.lastClicked
        let formula = this.state.formula.slice(0,this.state.formula.length-1)
        if(operants.includes(val)){
            if(this.state.lastOperants.length>=2){
                let newFormula = formula.slice(0,formula.length-2)
                newFormula+=val
                this.setState(state=>{return{
                    formula:newFormula, lastClicked:val,brackets:false,lastOperants:val
                }})
            }
            else if(this.state.brackets){
                this.setState(state=>{return{
                    formula:state.formula+=`)${val}`, lastClicked:val,brackets:false,lastOperants:val
                }})
            }
            else if(this.state.lastOperants.length>0 & this.state.lastOperants !== '-' & val === '-'){
                this.setState((state,props)=>{
                    return {lastClicked:lastClicked+='(-', formula:state.formula+='(-', lastOperants:state.lastOperants+=val, brackets:true}})
            }
            else if(this.state.lastOperants.length ===0){
                this.setState((state,props)=>{
                    return {lastClicked:val, formula:state.formula+=val, lastOperants:val}})
            }
            else{
                this.setState((state,props)=>{
                    return {lastClicked:val, formula:formula+=val, lastOperants:val}})
            }
        }
        else if(this.state.answer){
            this.setState({
                lastClicked:val, formula:val
            })
        }
        else if(operants.includes(this.state.lastClicked)){
            this.setState((state)=>{
                return {lastClicked:val, formula:state.formula+=val, lastOperants:''}})
        }
        else if(lastClicked==='0'){
            let formula = this.state.formula.slice(0,this.state.formula.length-1)
            formula+=val
            this.setState((state)=>{
                return {lastClicked:val, formula}})
        }
        else{
            if(!this.state.formula){
                this.setState((state,props)=>{
                    return {lastClicked:val, formula:state.formula+=val}})
            }
            else{
                this.setState((state,props)=>{
                    return {lastClicked:state.lastClicked+=val, formula:state.formula+=val, lastOperants:''}})
            }
        }
        this.setState((state,props)=>{
        return {answer:false}})
    }
    render(){
        return(
            <div className='app'>
                <div className='calc'>
                <Display lastClicked={this.state.lastClicked} formula={this.state.formula}/>
                <Buttons handleZero={this.handleZero}handleFloat={this.handleFloat}handleEquals={this.handleEquals}handleClick={this.handleClick} handleClear={this.handleClear}/>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<App/>, document.getElementById('root'))