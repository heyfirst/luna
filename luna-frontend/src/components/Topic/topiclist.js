import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { actions as topicAction } from '../../ducks/reducers/topic'

const DivCard = styled.div`
    margin-bottom: 1.4375rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4.9375rem !important;
`

const DivCardInline = styled.div`
    margin-bottom: 1.4375rem; 
    width: 49%; 
    margin-left: 0.1875rem; 
    margin-right: 0.1875rem;
    border-radius: 4.9375rem !important;
`

const CardImage = styled.div`
    background-color: #F2994A;
    padding: 0rem;
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    min-height: 100%;
    border-radius: 50%;
`

const CardBody = styled.div`
    color: black;
    padding-right: 0.3125rem !important;
    padding-left: 0.3125rem !important;
`

const CardProgress = styled.div`
    height: 0.625rem !important;
`

const CardProgressBar = styled.div`
    width: ${({ percentage }) => `${percentage}%`};
    background-color: #47C9D1 !important;
`

const CardBodyAlignCenter = styled.div`
    padding-left: 0rem !important;
    padding-bottom: 0rem !important;
`

const PictureImg = styled.img`
    padding-top: 1.5625rem;
    width: 4.375rem; 
    height: 4.375rem;
    z-index: 100;
`

const ImgHidden = styled.div`
    width: 4.375rem; 
    height: 4.375rem;
    visibility: hidden;
`

const PTask = styled.div`
    text-align: center; 
    padding-top: 3.125rem;
    padding-right: 0.9375rem; 
    color: black;
`

class TopicList extends React.Component {

    state = {
        loading: false,
        topics: [],
        user: {},
        userScores: []
    }

    async componentDidMount() {
        const topic = await this.props.getTopic().payload
        console.log(topic)
        const user = await this.props.getUser().payload
        this.setState({
            topics: topic,
            user: user,
            userScores: user.userScore
        })
    }

    isScoreOverNinetyNine = (index) => {
        return this.state.user &&
            index - 1 >= 0 &&
            index <= this.state.user.userScore.length &&
            this.state.user.userScore[index - 1].score > 99
    }

    topicCard = (props) => (
        <div className="row">
            <div className="col-sm-3 card-image" >
                <CardImage>
                {props.index === 0 ?
                    <ImgHidden />
                    : this.isScoreOverNinetyNine(props.index)
                        ? null
                        : <picture>
                            <PictureImg className="img-fluid rounded mx-auto d-block" src={require('../../static/image/padlock.png')} />
                        </picture>
                }
                </CardImage>
            </div>
            <CardBody className="col-sm-7 card-body">
                <h4>{props.e.topic_name}</h4>
                <p>Lorem Ipsum is not simply random text.</p>
                {/* <p>{props.e.description}</p> */}
                <CardProgress className="progress">
                    <CardProgressBar percentage={props.percentage} className="progress-bar"></CardProgressBar>
                </CardProgress>
            </CardBody>
            <CardBodyAlignCenter className="col-sm-2 card-body align-self-center">
                <PTask className="mb-0 task">{ props.taskCount }/150</PTask>
            </CardBodyAlignCenter>
        </div>
    )

    countTask = (e) => {
        let result = 0
        this.state.userScores.map((u) => {
            if (u.topicID === e.id) {
                //result = u.Task.length 
                result = 28 // Mock Result
            }
        })
        return result
    }

    percentageCalc = (taskCount, totalTask) => {
        const total = (taskCount / totalTask) * 100
        return total
    }

    isMustShowInline = (e) => {
        return e.topic_name === 'Loop' || e.topic_name === 'Condition'
    }

    renderTopics = () => {
        return this.state.topics.map((e, index) => {
            const taskCount = this.countTask(e)
            const percentage = this.percentageCalc(taskCount, 150)//Mock Total Count
            const topicCardProps = {
                e,
                taskCount,
                percentage,
                index
            }
            if(index === 0){
                return (
                    <a href="#" key={index}>
                        <DivCard className="card w-50">
                            {this.topicCard(topicCardProps)}
                        </DivCard>
                    </a>
                )
            }
            if (this.isMustShowInline(e)) {
                if (this.isScoreOverNinetyNine(index)) {
                    return (
                        <a href='#' key={index}>
                            <DivCardInline className="card d-inline-flex">
                                {this.topicCard(topicCardProps)}
                            </DivCardInline>
                        </a>
                    )
                }
                return (
                    <DivCardInline className="card d-inline-flex" key={index}>
                        {this.topicCard(topicCardProps)}
                    </DivCardInline>
                )
            }
            if (this.isScoreOverNinetyNine(index)) {
                return (
                    <a href="#" key={index}>
                        <DivCard className="card w-50">
                            {this.topicCard(topicCardProps)}
                        </DivCard>
                    </a>
                )
            }
            return (
                <DivCard className="card w-50" key={index}>
                    {this.topicCard(topicCardProps)}
                </DivCard>
            )
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10" >
                        {this.renderTopics()}
                    </div>
                    <div className="col-sm-1"></div>
                </div>
            </div>
        )
    }
}

export default connect(
    i => ({
        topic: i.topic,
        user: i.user
    }),
    {
        getTopic: topicAction.getTopic,
        getUser: topicAction.getUser
    }
)(TopicList)
