const knex = require('../../sql/knex')

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
    getAll: async () => {
        let topic = await knex()
            .select()
            .table('topic')
        return topic
    },
    getOne: async (id) => {
        let topicid = await knex('topic')
            .where('topic_id', id)
        // return topic.filter(t => t.topicID == id)[0]
        return topicid
    },
    getUserScore: (id) => {
        return user
    },
}