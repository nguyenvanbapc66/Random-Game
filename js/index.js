class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Body/>
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="header jumbotron text-center">
                <h2>Guessing random number</h2>
                <p>
                    Tôi đã chọn một số random trong khoảng
                    1 đến 100, bạn có thể đoán được?
                </p>    
            </div>
        )
    }
}

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfGuessing: 0,
            inputValue: 0,
            randomNumber: this.randomNumber(),
            message: ''
        }
    }

    // New game
    newGame = (e) => {
        this.setState({
            numberOfGuessing: 0,
            inputValue: 0,
            maximumNumberGuessingL 10,
            randomNumber: this.randomNumber(),
            message: ''
        })
    }

    // Get random number between 1 and 100
    randomNumber = () => {
        return Math.floor(Math.random()*100 + 1)
    }

    // Event of input value change
    onValueChane = (e) => {
        // console.log(e.target.value)
        this.setState({
            ...this.state, inputValue: parseInt(e.target.value)
        })
    }

    enter = (e) => {
        console.log(e.target)
        this.guessing
    }

    guessing = () => {
        const {inputValue, randomNumber, numberOfGuessing} = this.state
        const newNumberOfGuessing = numberOfGuessing + 1
        if(inputValue < randomNumber) {
            this.setState({...this.state, numberOfGuessing: newNumberOfGuessing, message: "Your number is too small"})
        } else if(inputValue > randomNumber){
            this.setState({...this.state,numberOfGuessing: newNumberOfGuessing, message: "Your number is too big"})
        } else{
            alert("You win with score: " + (this.state.numberOfGuessing + 1))
            this.newGame()
        }
        if(newNumberOfGuessing >= this.state.maximunNumberGuessing) {
            alert("You lose!")
            this.newGame()
        }
    }

    render() {
        return (
            <div className="body">
                <button className="btn btn-primary" onClick={this.newGame}>New Game</button>
                <hr/>
                <p className="text-bold">Số lần bạn đã đoán là: {this.state.numberOfGuessing}</p>
                <p className="text-bold">Số bạn đoán là: </p>
                <input type="number" max="100" value={this.state.inputValue} onChange={this.onValueChane}/>
                <button className="btn bg-success text-white" onClick={this.guessing}>Đoán</button>
                <p>{this.state.message}</p>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))