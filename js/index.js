class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfGuessing: 0
        }
    }

    updateNumberOfGuessing = (newValue) => {
        this.setState({
            numberOfGuessing: newValue
        })
    }

    render() {
        return (
            <div>
                <Header numberOfGuessing={this.state.numberOfGuessing} />
                <Body updateNumberOfGuessing={this.updateNumberOfGuessing} numberOfGuessing={this.state.numberOfGuessing} />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="header jumbotron text-center">
                <h2>Guessing random number</h2>
                <p>
                Tôi đã chọn một số random trong khoảng 1 đến 100, bạn có thể đoán
                được?
                </p>
                {
                    this.props.numberOfGuessing >= 7 && (
                        <p className="text-danger">
                            Số lần bạn đoán khá cao: {this.props.numberOfGuessing}. 
                            Hãy cẩn thận không là thua!
                        </p>
                    )
                }
            </div>
        );
    }
}

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 0,
            maximumNumberGuessing: 10,
            randomNumber: this.randomNumber(),
            message: "",
        }
    }

    // New game
    newGame = (e) => {
        this.setState({
            inputValue: 0,
            maximumNumberGuessing: 10,
            randomNumber: this.randomNumber(),
            message: "",
        });
    };

    // Get random number between 1 and 100
    randomNumber = () => {
        return Math.floor(Math.random() * 100 + 1);
    };

    // Event of input value change
    onValueChane = (e) => {
        this.setState({
            ...this.state,
            inputValue: parseInt(e.target.value),
        });
    };

    guessing = () => {
        const {inputValue, randomNumber} = this.state;
        const newNumberOfGuessing = this.props.numberOfGuessing + 1;
        this.props.updateNumberOfGuessing(newNumberOfGuessing)
        if (inputValue < randomNumber) {
            this.setState({
                ...this.state, message: "Your number is too small",
            });
        } else if (inputValue > randomNumber) {
            this.setState({
                ...this.state, message: "Your number is too big",
            });
        } else {
            alert("You win with score: " + newNumberOfGuessing);
            this.props.updateNumberOfGuessing('0')
            this.newGame();
        }
        if (newNumberOfGuessing >= this.state.maximumNumberGuessing) {
            alert("You lose!");
            this.props.updateNumberOfGuessing('0')
            this.newGame();
        }
    };

    render() {
        return (
            <div className="body">
                <button className="btn btn-primary" onClick={this.newGame}>New Game</button>
                <hr />
                <p className="text-bold">Số lần bạn đã đoán là: {this.props.numberOfGuessing}</p>
                <p className="text-bold">Số bạn đoán là: </p>
                <input type="number" max="100" value={this.state.inputValue} onChange={this.onValueChane} />
                <button className="btn bg-success text-white" onClick={this.guessing}>Đoán</button>
                <p>{this.state.message}</p>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
