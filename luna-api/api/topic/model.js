const topic = [{
    topicID: 1,
    topicLevelID: 1,
    taskTopicID: 1,
    title: `Data Type`,
    description: `Lorem Ipsum is not simply random text.`,
    timeStamp: Date()
},
{
    topicID: 2,
    topicLevelID: 2,
    taskTopicID: 2,
    title: `String`,
    description: `Lorem Ipsum is not simply random text.`,
    timeStamp: Date()
},
{
    topicID: 3,
    topicLevelID: 3,
    taskTopicID: 3,
    title: `Array`,
    description: `Lorem Ipsum is not simply random text.`,
    timeStamp: Date()
},
{
    topicID: 4,
    topicLevelID: 1,
    taskTopicID: 1,
    title: `Loop`,
    description: `Lorem Ipsum is not simply random text.`,
    timeStamp: Date()
},
{
    topicID: 5,
    topicLevelID: 2,
    taskTopicID: 2,
    title: `Condition`,
    description: `Lorem Ipsum is not simply random text.`,
    timeStamp: Date()
},
{
    topicID: 6,
    topicLevelID: 3,
    taskTopicID: 3,
    title: `Data Structure`,
    description: `Lorem Ipsum is not simply random text.`,
    timeStamp: Date()
},
{
    topicID: 7,
    topicLevelID: 1,
    taskTopicID: 1,
    title: `Algorithm`,
    description: `Lorem Ipsum is not simply random text.`,
    timeStamp: Date()
}]

const user = {
        userID: 1,
        fullName: `Janjie beauty`,
        userName: `Janjie beauty`,
        userScore: [{
            userScoreID: 1,
            score: 99,
            topicID: 1,
            topicName: "Data Type",
            Task: [{
                taskID: 1,
                taskName: "Plus",
                timeStamp: Date()
            },
            {
                taskID: 2,
                taskName: "Minus",
                timeStamp: Date()
            }],
            timeStamp: Date()
        }]
    }

module.exports = {
    getAll: () => {
        return topic
    },
    getOne: (id) => {
        return topic.filter(t => t.topicID == id)[0]
    },
    getUserScore: (id) => {
        return user
    },
}