import React from 'react'
import '../../static/css/bootstrap.min.css'
import styled from 'styled-components'

const CardTask = styled.div`
    border-radius: 3.75rem !important;
`

const CardBody = styled.div`
    padding: 0.25rem !important;
`
const CardContent = styled.div`
    padding-left: 1.625rem !important;
    color: #00C0CC;
`
const Difficulty = styled.div`
    display: inline ;
    color: black;
`
const Score = styled.div`
    display: inline ;
    padding-left: 5rem;
    color: black;
`
const Solve = styled.div`
    margin-top: 1rem;
    background-color: #00C0CC !important;
`

class TaskList extends React.Component {
    state = {

    }

    async componentDidMount() {
        // const topic = await this.props.getTopic().payload
        // const user = await this.props.getUser().payload
        // this.setState({
        //     topics: topic,
        //     user: user,
        //     userScores: user.userScore
        // })
    }

    filter = () => (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Difficulty</h5>
                <form>
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-11">
                            <div className="custom-control custom-radio">
                                <input className="custom-control-input" type="radio" name="difficulty" id="basic" value="basic" />
                                <label className="custom-control-label" htmlFor="basic">
                                    Basic
                                </label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input className="custom-control-input" type="radio" name="difficulty" id="intermediately" value="intermediately" />
                                <label className="custom-control-label" htmlFor="intermediately">
                                    Intermediately
                                </label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input className="custom-control-input" type="radio" name="difficulty" id="advance" value="advance" />
                                <label className="custom-control-label" htmlFor="advance">
                                    Advance
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
                <h5 className="card-title">Status</h5>
                <form>
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-11">
                            <div className="custom-control custom-radio">
                                <input className="custom-control-input" type="radio" name="status" id="solved" value="solved" />
                                <label className="custom-control-label" htmlFor="solved">
                                    Solved
                                </label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input className="custom-control-input" type="radio" name="status" id="unsolved" value="unsolved" />
                                <label className="custom-control-label" htmlFor="unsolved">
                                    Unsolved
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

    taskCard = () => (
        <CardTask className="card">
            <a href="#">
                <CardBody className="card-body">
                    <div className="row">
                        <div className="col-sm-1">
                            <img src="http://placehold.it/60x60" className="rounded-circle"/>
                        </div>
                        <CardContent className="col-sm-9">
                            <h5 className="card-title"> Lorem Ipsum is not simply random text. </h5>
                            <Difficulty className="card-text"> Difficulty: Basic </Difficulty>
                            <Score className="card-text"> Score: 10 </Score>
                        </CardContent>
                        <div className="col-sm-2">
                            <h4><Solve className="badge badge-pill badge-info" > Solved </Solve></h4>
                        </div>
                    </div>
                </CardBody>
            </a>
        </CardTask>
    )

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-2">
                        {this.filter()}
                    </div>
                    <div className="col-sm-6">
                        {this.taskCard()}
                    </div>
                    <div className="col-sm-2"></div>
                </div>
            </div>
        )
    }
}

export default TaskList