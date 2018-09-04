import React from 'react'
import '../../static/css/bootstrap.min.css'
import styled from 'styled-components'

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

    // filter = () =>{
    //     return (
    //         <>
    //     )
    // }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-2">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Difficulty</h5>
                                <form>
                                    <div class="row">
                                        <div class="col-sm-1"></div>
                                        <div class="col-sm-11">
                                            <div class="custom-control custom-radio">
                                                <input class="custom-control-input" type="radio" name="difficulty" id="basic" value="basic" />
                                                <label class="custom-control-label" for="basic">
                                                    Basic
                                            </label>
                                            </div>
                                            <div class="custom-control custom-radio">
                                                <input class="custom-control-input" type="radio" name="difficulty" id="intermediately" value="intermediately" />
                                                <label class="custom-control-label" for="intermediately">
                                                    Intermediately
                                            </label>
                                            </div>
                                            <div class="custom-control custom-radio">
                                                <input class="custom-control-input" type="radio" name="difficulty" id="advance" value="advance" />
                                                <label class="custom-control-label" for="advance">
                                                    Advance
                                            </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <h5 class="card-title">Status</h5>
                                <form>
                                    <div class="row">
                                        <div class="col-sm-1"></div>
                                        <div class="col-sm-11">
                                            <div class="custom-control custom-radio">
                                                <input class="custom-control-input" type="radio" name="status" id="solved" value="solved" />
                                                <label class="custom-control-label" for="solved">
                                                    Solved
                                                </label>
                                            </div>
                                            <div class="custom-control custom-radio">
                                                <input class="custom-control-input" type="radio" name="status" id="unsolved" value="unsolved" />
                                                <label class="custom-control-label" for="unsolved">
                                                    Unsolved
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">

                    </div>
                    <div className="col-sm-2"></div>
                </div>
            </div>
        )
    }
}

export default TaskList