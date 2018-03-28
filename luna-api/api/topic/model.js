const topic = [{
    topicID: 1,
    topicLevelID: 1,
    taskTopicID: 1,
    title: `Data Type`,
    description: `This is Topic Data Type`,
    timeStamp: Date()
},
{
    topicID: 2,
    topicLevelID: 3,
    taskTopicID: 1,
    title: `Array`,
    description: `This is Topic Array`,
    timeStamp: Date()
}]

module.exports = {
    getAll: () => {
        return topic
    },
    getOne: (id) => {
        return topic.filter(t => t.topicID == id)[0]
    }
}